import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { securityLog } from '../middleware/securityLogger.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Register (OWASP A07: Tối thiểu 8 ký tự, validate email format)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Tên không được để trống' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 8 ký tự theo tiêu chuẩn bảo mật OWASP' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      securityLog('AUTH_REGISTER_FAILED', req, { email: normalizedEmail, reason: 'Email already exists' });
      return res.status(400).json({ message: 'Email này đã được sử dụng' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    await newUser.save();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET is not configured in environment variables');
      return res.status(500).json({ message: 'Lỗi cấu hình hệ thống' });
    }

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1d' });

    securityLog('AUTH_REGISTER_SUCCESS', req, { email: newUser.email, userId: newUser._id });

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

// Login (OWASP A07 & A09: Giám sát đăng nhập & phát hiện tấn công)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ email và mật khẩu' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      securityLog('AUTH_LOGIN_FAILED', req, { email: normalizedEmail, reason: 'User not found' });
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      securityLog('AUTH_LOGIN_FAILED', req, { email: normalizedEmail, reason: 'Invalid password' });
      return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('CRITICAL: JWT_SECRET is not configured in environment variables');
      return res.status(500).json({ message: 'Lỗi cấu hình hệ thống' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

    securityLog('AUTH_LOGIN_SUCCESS', req, { email: user.email, userId: user._id });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};
