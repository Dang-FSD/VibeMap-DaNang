# VibeMap DaNang 🌴 🌊

[![English](https://img.shields.io/badge/Lang-English-blue)](#english) [![Tiếng Việt](https://img.shields.io/badge/Lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](#tiếng-việt)

---

<a name="english"></a>
## 🇬🇧 English

**VibeMap DaNang** is a full-stack, AI-driven travel ecosystem designed to generate highly personalized, culturally immersive itineraries for exploring Da Nang, Hoi An, and Hue. Moving beyond generic travel recommendations, VibeMap leverages Advanced Large Language Models (LLMs) to deeply analyze user-selected "vibes," strict budgets, and nuanced travel preferences to craft the perfect, day-by-day trip.

### ✨ Core Features
1. **Smart AI Itinerary Engine:**
   - **Vibe & Preference Selection:** Users define their trip by selecting a specific mood/vibe (e.g., *Cyberpunk, Zen, Adventurous, Romantic, Cultural*) alongside explicit parameters like exact daily budget (VND), travel companions (solo, couple, family), pace, dietary restrictions, and primary goals.
   - **Zero-Budget-Tolerance AI Processing:** The backend AI strictly enforces budget constraints. For example, budgets under 500k VND will exclusively return free attractions (beaches, markets) and street food, while high budgets will unlock fine dining and 5-star resort recommendations.
   - **Geographic Logic:** Ensures that locations generated for the same day are geographically clustered to optimize travel time.
2. **Interactive Planner & Dynamic Mapping:**
   - Visualizes the AI-generated itinerary on a sleek, timeline-based UI.
   - Integrates with `react-leaflet` to plot precise geographical coordinates of every recommended location on an interactive map.
3. **Trip Management & Export:**
   - Users can securely save generated itineraries to their personal Dashboard (`MyTrips`).
   - Includes a robust **Offline Export** feature, allowing users to download their entire itinerary as a `.txt` file directly to their local device.
4. **AI Local Guide Chatbot:**
   - A built-in, context-aware chatbot powered by the Groq/OpenAI API.
   - Answers specific local queries, provides on-the-fly recommendations, and strictly formats responses in readable, mobile-friendly bullet points (no markdown tables).
5. **Full Bilingual Support (i18n):**
   - The entire UI seamlessly switches between English and Vietnamese using `react-i18next`.
   - The Backend dynamically adjusts the LLM System Prompts based on the user's language state, ensuring the AI strictly outputs the itinerary in the requested language.

### 🏗️ Technical Architecture
VibeMap DaNang operates on a decoupled, three-tier architecture (MERN stack + React Native + AI):

* **Frontend (Web App):**
  - **Framework:** React 18, Vite.
  - **Styling & UI:** Tailwind CSS, Lucide-React, AOS (Animate On Scroll) for cinematic landing page animations.
  - **Routing & State:** `react-router-dom` for secure routing based on JWT authentication state.
* **Frontend (Mobile App):**
  - **Framework:** React Native, Expo SDK 57.
  - **Routing:** Expo Router.
  - **Purpose:** A scaffolded cross-platform native shell ready to consume the exact same backend APIs to deliver VibeMap on iOS and Android.
* **Backend (API Layer):**
  - **Core:** Node.js, Express.js.
  - **Database:** MongoDB (using Mongoose for Object Data Modeling). Features robust schemas for `User` and `Trip`.
  - **AI Integration:** OpenAI SDK, configured to seamlessly route through Groq's high-speed inference endpoints (`llama-3.2-11b-vision-preview` / `gpt-oss-120b`).

### 🛡️ Security Hardening (OWASP Top 10)
The backend is fortified against common vulnerabilities:
- **`helmet`**: Sets critical security HTTP headers (protects against Clickjacking, MIME-sniffing).
- **`express-rate-limit`**: Mitigates Brute-Force and DDoS attacks by capping requests (100 requests / 15 mins per IP).
- **`express-mongo-sanitize`**: Prevents NoSQL Injection by sanitizing user-supplied data (stripping `$` and `.` operators).
- **`xss-clean`**: Protects against Cross-Site Scripting (XSS) by filtering malicious HTML/JS from request bodies.
- **`jsonwebtoken` & `bcrypt`**: Ensures passwords are cryptographically hashed and sessions are stateless and secure.

### 📂 Repository Structure
```
VibeMap_Danang/
├── backend/
│   ├── src/
│   │   ├── controllers/ # Logic for Auth, Trips, and AI processing
│   │   ├── models/      # Mongoose schemas (User.js, Trip.js, Location.js)
│   │   ├── routes/      # Express route definitions
│   │   └── services/    # External API integrations (aiService.js)
│   └── server.js        # Express entry point & Security middleware
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI (AiScannerModal, Navbar)
│   │   ├── locales/     # i18n JSON files (en.json, vi.json)
│   │   ├── pages/       # Core views (Home, Dashboard, Planner, Login, Register)
│   │   └── services/    # Axios API client wrapper
│   └── public/images/   # Locally served static assets
└── mobile/              # Expo React Native App
    ├── app/             # Expo Router screens
    └── package.json     # Expo SDK 57 configuration
```

### 🛠️ Setup Instructions

#### 1. Environment Variables
Create a `.env` file in each respective directory:

**`backend/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_or_groq_key
AI_MODEL=gpt-3.5-turbo # Use Groq model string if GROQ_API is true
GROQ_API=true # Set to true to route OpenAI SDK through Groq
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

#### 2. Running the Ecosystem
Open three separate terminal windows:

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Web Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Mobile App:**
```bash
cd mobile
npm install
npx expo start -c
```
*(Use the Expo Go app on iOS/Android to scan the QR code).*

---

<a name="tiếng-việt"></a>
## 🇻🇳 Tiếng Việt

**VibeMap DaNang** là một hệ sinh thái ứng dụng lập kế hoạch du lịch toàn diện tích hợp Trí Tuệ Nhân Tạo (AI). Thay vì đưa ra các gợi ý đại trà, VibeMap sử dụng Mô hình Ngôn ngữ Lớn (LLMs) để phân tích sâu sắc các "Vibe" (thẩm mỹ/phong cách), ngân sách và sở thích cá nhân của người dùng, từ đó thiết kế ra một chuyến đi hoàn hảo và cá nhân hóa nhất tại Đà Nẵng, Hội An và Huế.

### ✨ Các Tính Năng Cốt Lõi
1. **Động Cơ Lập Lịch Trình AI Thông Minh:**
   - **Lựa chọn Vibe & Sở thích:** Người dùng thiết lập chuyến đi bằng cách chọn một Vibe cụ thể (VD: *Cyberpunk, Zen, Khám phá, Lãng mạn, Văn hóa*) cùng với các thông số cực kỳ chi tiết như ngân sách chính xác mỗi ngày (VNĐ), bạn đồng hành, nhịp độ di chuyển, chế độ ăn kiêng, và mục tiêu chính.
   - **Xử lý AI Tuân thủ Ngân sách Tuyệt đối:** Backend AI buộc phải tuân thủ ngân sách. Ví dụ: Ngân sách dưới 500k VNĐ sẽ chỉ trả về các địa điểm tham quan miễn phí và quán ăn bình dân, trong khi ngân sách cao sẽ mở khóa các nhà hàng Fine Dining và Resort 5 sao.
   - **Logic Địa Lý:** Đảm bảo các địa điểm được đề xuất trong cùng một ngày phải nằm gần nhau để tối ưu hóa thời gian di chuyển.
2. **Lịch Trình Tương Tác & Bản Đồ Động:**
   - Hiển thị lịch trình do AI tạo ra trên giao diện dòng thời gian (timeline) hiện đại.
   - Tích hợp `react-leaflet` để chấm tọa độ địa lý chính xác của từng địa điểm lên bản đồ tương tác.
3. **Quản Lý & Xuất Chuyến Đi:**
   - Người dùng có thể lưu lại các lịch trình yêu thích vào Dashboard cá nhân (`MyTrips`).
   - Tính năng **Xuất File Offline** cho phép tải toàn bộ lịch trình dưới dạng file văn bản (`.txt`) trực tiếp về máy tính/điện thoại.
4. **Chatbot Hướng Dẫn Viên Bản Địa:**
   - Chatbot tích hợp sẵn sử dụng API Groq/OpenAI, có khả năng hiểu ngữ cảnh.
   - Trả lời các câu hỏi cụ thể về địa phương và được yêu cầu định dạng văn bản dễ đọc bằng các gạch đầu dòng (không sử dụng bảng markdown gây vỡ giao diện mobile).
5. **Hỗ Trợ Song Ngữ Toàn Diện (i18n):**
   - Giao diện UI chuyển đổi mượt mà giữa Tiếng Anh và Tiếng Việt bằng `react-i18next`.
   - Backend tự động nhận diện ngôn ngữ hiện tại của người dùng để điều chỉnh **System Prompt** của AI, ép buộc AI phải trả về dữ liệu bằng đúng ngôn ngữ được yêu cầu.

### 🏗️ Kiến Trúc Kỹ Thuật (Technical Architecture)
VibeMap DaNang hoạt động trên kiến trúc 3 lớp phân tách (Three-tier architecture):

* **Frontend (Web App):**
  - **Framework:** React 18, Vite.
  - **Giao diện:** Tailwind CSS, Lucide-React, AOS (tạo hiệu ứng cuộn trang điện ảnh).
  - **Routing & State:** `react-router-dom` xử lý định tuyến bảo mật dựa trên trạng thái đăng nhập JWT.
* **Frontend (Mobile App):**
  - **Framework:** React Native, Expo SDK 57.
  - **Routing:** Expo Router.
  - **Mục đích:** Ứng dụng di động đa nền tảng (Native Shell) đã được khởi tạo sẵn sàng để kết nối với Backend API, mang trải nghiệm VibeMap lên iOS và Android.
* **Backend (API Layer):**
  - **Lõi:** Node.js, Express.js.
  - **Cơ sở dữ liệu:** MongoDB (Mongoose ODM). Định nghĩa cấu trúc dữ liệu chặt chẽ cho `User` và `Trip`.
  - **Tích hợp AI:** OpenAI SDK, được cấu hình để định tuyến qua các endpoint suy luận tốc độ cao của Groq (`llama-3.2-11b-vision-preview` / `gpt-oss-120b`).

### 🛡️ Tiêu Chuẩn Bảo Mật (OWASP Top 10)
Backend được trang bị các lớp phòng thủ vững chắc trước các cuộc tấn công mạng phổ biến:
- **`helmet`**: Thiết lập các HTTP headers bảo mật cốt lõi (chống Clickjacking, MIME-sniffing).
- **`express-rate-limit`**: Ngăn chặn tấn công Brute-Force và DDoS bằng cách giới hạn lưu lượng (100 requests / 15 phút mỗi IP).
- **`express-mongo-sanitize`**: Chống NoSQL Injection bằng cách lọc bỏ các toán tử độc hại (xóa ký tự `$` và `.`).
- **`xss-clean`**: Bảo vệ hệ thống khỏi Cross-Site Scripting (XSS) bằng cách làm sạch các mã HTML/JS độc hại từ payload người dùng.
- **`jsonwebtoken` & `bcrypt`**: Đảm bảo mật khẩu được băm mã hóa an toàn và phiên đăng nhập (session) hoàn toàn stateless.

### 📂 Cấu Trúc Mã Nguồn (Repository Structure)
```
VibeMap_Danang/
├── backend/
│   ├── src/
│   │   ├── controllers/ # Xử lý logic cho Auth, Trips, và AI
│   │   ├── models/      # Mongoose schemas (User.js, Trip.js)
│   │   ├── routes/      # Định tuyến Express API
│   │   └── services/    # Tích hợp API bên ngoài (aiService.js)
│   └── server.js        # Điểm bắt đầu Express & Middleware Bảo mật
├── frontend/
│   ├── src/
│   │   ├── components/  # Các UI Component dùng chung
│   │   ├── locales/     # File ngôn ngữ i18n (en.json, vi.json)
│   │   ├── pages/       # Các màn hình chính (Home, Dashboard, Planner...)
│   │   └── services/    # Client gọi API bằng Axios
│   └── public/images/   # Tài nguyên ảnh tĩnh
└── mobile/              # Ứng dụng di động Expo React Native
    ├── app/             # Các màn hình Expo Router
    └── package.json     # Cấu hình thư viện Expo SDK 57
```

### 🛠️ Hướng Dẫn Cài Đặt

#### 1. Biến Môi Trường (Environment Variables)
Tạo file `.env` ở trong từng thư mục tương ứng:

**`backend/.env`**
```env
PORT=5000
MONGO_URI=chuỗi_kết_nối_mongodb_của_bạn
JWT_SECRET=mã_bí_mật_jwt_của_bạn
OPENAI_API_KEY=api_key_openai_hoặc_groq_của_bạn
AI_MODEL=gpt-3.5-turbo # Nhập tên model Groq nếu bật GROQ_API
GROQ_API=true # Đặt thành true để ép OpenAI SDK chạy qua máy chủ Groq
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

#### 2. Chạy Hệ Sinh Thái
Mở 3 cửa sổ Terminal (Command Prompt) riêng biệt:

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Web Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Mobile App:**
```bash
cd mobile
npm install
npx expo start -c
```
*(Sử dụng ứng dụng Expo Go trên iOS/Android để quét mã QR và chạy app trên điện thoại).*
