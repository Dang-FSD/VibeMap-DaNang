/**
 * Security Audit Logger (OWASP A09: Security Logging and Monitoring)
 * Ghi lại các sự kiện bảo mật quan trọng: Đăng nhập sai, đăng nhập thành công,
 * vi phạm rate-limit, truy cập trái phép.
 */
export const securityLog = (event, req = {}, details = {}) => {
  const timestamp = new Date().toISOString();
  const ip = req?.ip || req?.headers?.['x-forwarded-for'] || req?.socket?.remoteAddress || 'unknown';
  const method = req?.method || 'UNKNOWN';
  const url = req?.originalUrl || req?.url || 'UNKNOWN';
  const userAgent = req?.headers?.['user-agent'] || 'unknown';

  const logEntry = {
    timestamp,
    event,
    ip,
    method,
    url,
    userAgent,
    ...details
  };

  // Định dạng hiển thị cảnh báo nổi bật trên console / log stream của server
  if (event.includes('FAILED') || event.includes('BLOCKED') || event.includes('UNAUTHORIZED')) {
    console.warn(`🔒 [SECURITY WARNING] [${timestamp}] [${event}] IP: ${ip} | Path: ${url} | Details:`, JSON.stringify(details));
  } else {
    console.log(`🛡️ [SECURITY AUDIT] [${timestamp}] [${event}] IP: ${ip} | Path: ${url} | Details:`, JSON.stringify(details));
  }

  return logEntry;
};
