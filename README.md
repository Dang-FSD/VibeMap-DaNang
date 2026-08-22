# VibeMap DaNang 🌴 🌊

[![English](https://img.shields.io/badge/Lang-English-blue)](#english) [![Tiếng Việt](https://img.shields.io/badge/Lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](#tiếng-việt)

---

<a name="english"></a>
## 🇬🇧 English

**VibeMap DaNang** is an AI-powered travel planning application designed to generate highly personalized itineraries for exploring Da Nang, Hoi An, and Hue. By leveraging Computer Vision and Advanced Large Language Models, the app analyzes users' aesthetic moodboards (images) and travel preferences to create the perfect trip.

### ✨ Features
- **AI Vision Moodboard Analysis:** Upload a photo and the AI will extract your aesthetic "vibe" (e.g., *Cyberpunk, Zen, Cultural, Chill*).
- **Smart Itinerary Generation:** Generates a complete daily itinerary based on the detected vibe, strict budget constraints, dietary needs, and travel companions.
- **Multilingual Support:** Fully supports English and Vietnamese across the entire UI and AI outputs.
- **Interactive Planner & Map:** View your generated itinerary on a sleek, interactive timeline and a dynamic map with precise coordinates.
- **Trip Management:** Save your favorite itineraries to your Dashboard and export them as text files for offline use.
- **AI Chatbot:** A built-in local guide chatbot powered by GPT/Groq that answers all your questions about Da Nang, formatted beautifully without tables.

### 🛡️ Security & Performance
- **OWASP Top 10 Protection:** Backend secured with `helmet` (HTTP headers), `express-rate-limit` (DDoS/Brute-force protection), `express-mongo-sanitize` (NoSQL injection), and `xss-clean` (Cross-site scripting).
- **JWT Authentication:** Secure user authentication and route protection.

### 🚀 Tech Stack
- **Frontend:** React, Tailwind CSS, Vite, Lucide-React, React-i18next, AOS Animations, React-Markdown.
- **Backend:** Node.js, Express, MongoDB, Mongoose, OpenAI SDK (connected to Groq/OpenAI).

### 🛠️ Setup Instructions
1. **Clone the repo:** `git clone https://github.com/Dang-FSD/VibeMap-DaNang.git`
2. **Setup Backend:**
   - `cd backend`
   - `npm install`
   - Create a `.env` file and add:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     OPENAI_API_KEY=your_openai_or_groq_key
     ```
   - `npm run dev`
3. **Setup Frontend:**
   - `cd frontend`
   - `npm install`
   - Create a `.env` file and add:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - `npm run dev`

---

<a name="tiếng-việt"></a>
## 🇻🇳 Tiếng Việt

**VibeMap DaNang** là một ứng dụng lập kế hoạch du lịch tích hợp Trí Tuệ Nhân Tạo (AI) nhằm tạo ra các lịch trình cá nhân hóa cao cấp để khám phá Đà Nẵng, Hội An và Huế. Bằng cách sử dụng Thị giác Máy tính (Computer Vision) và Mô hình Ngôn ngữ Lớn (LLMs), ứng dụng phân tích hình ảnh (moodboard) và sở thích du lịch của người dùng để thiết kế một chuyến đi hoàn hảo.

### ✨ Tính Năng Nổi Bật
- **Phân tích Moodboard bằng AI:** Tải lên một bức ảnh và AI sẽ trích xuất "Vibe" (thẩm mỹ/phong cách) của bạn (VD: *Cyberpunk, Zen, Văn hóa, Chill*).
- **Tạo Lịch Trình Thông Minh:** Tạo lịch trình hàng ngày chi tiết dựa trên vibe đã phân tích, tuân thủ nghiêm ngặt ngân sách, chế độ ăn uống, và người đi cùng.
- **Hỗ Trợ Song Ngữ:** Hỗ trợ hoàn toàn Tiếng Anh và Tiếng Việt trên toàn bộ giao diện và kết quả trả về từ AI.
- **Bản Đồ & Lịch Trình Tương Tác:** Xem lịch trình được tạo trên giao diện dòng thời gian (timeline) đẹp mắt và bản đồ động với tọa độ chính xác.
- **Quản Lý Chuyến Đi:** Lưu các lịch trình yêu thích vào Dashboard và xuất ra file văn bản (TXT) để dùng khi offline.
- **Chatbot AI Bản Địa:** Tích hợp chatbot hướng dẫn viên địa phương sử dụng GPT/Groq để trả lời mọi câu hỏi về Đà Nẵng, hiển thị rõ ràng không dùng bảng (table).

### 🛡️ Bảo Mật & Hiệu Suất
- **Bảo vệ OWASP Top 10:** Backend được bảo mật toàn diện với `helmet` (bảo vệ HTTP headers), `express-rate-limit` (chống DDoS/Brute-force), `express-mongo-sanitize` (chống NoSQL injection), và `xss-clean` (chống Cross-site scripting).
- **Xác Thực JWT:** Hệ thống đăng nhập và bảo vệ route an toàn bằng token.

### 🚀 Công Nghệ Sử Dụng
- **Frontend:** React, Tailwind CSS, Vite, Lucide-React, React-i18next, AOS Animations, React-Markdown.
- **Backend:** Node.js, Express, MongoDB, Mongoose, OpenAI SDK (kết nối Groq/OpenAI).

### 🛠️ Hướng Dẫn Cài Đặt
1. **Tải mã nguồn:** `git clone https://github.com/Dang-FSD/VibeMap-DaNang.git`
2. **Cài đặt Backend:**
   - `cd backend`
   - `npm install`
   - Tạo file `.env` và thêm:
     ```env
     PORT=5000
     MONGO_URI=chuỗi_kết_nối_mongodb_của_bạn
     JWT_SECRET=mã_bí_mật_jwt_của_bạn
     OPENAI_API_KEY=api_key_openai_hoặc_groq_của_bạn
     ```
   - `npm run dev`
3. **Cài đặt Frontend:**
   - `cd frontend`
   - `npm install`
   - Tạo file `.env` và thêm:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - `npm run dev`
