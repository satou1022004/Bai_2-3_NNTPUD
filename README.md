Bài Ngày 2/3_NNTPUD
Nguyễn Quang Thành_2280602948


# 📦 BT_2_3_NNPTUD — REST API với Node.js + Express + MongoDB

API quản lý **User** và **Role** với đầy đủ chức năng CRUD, xoá mềm, và bật/tắt trạng thái người dùng.

---

## 🛠️ Công nghệ sử dụng

- **Node.js** + **Express** — server & routing
- **MongoDB** + **Mongoose** — database & ODM
- **dotenv** — quản lý biến môi trường

---

## 📁 Cấu trúc thư mục

```
BT_2_3_NNPTUD/
├── app.js
├── .env                  ← không được commit (tạo từ .env.example)
├── .env.example
├── .gitignore
├── package.json
├── Controllers/
│   ├── userController.js
│   └── roleController.js
├── Models/
│   ├── User.js
│   └── Role.js
└── Routes/
    └── Index.js
```

---

## ⚙️ Cài đặt & Chạy

### 1. Clone repo

```bash
git clone https://github.com/satou1022004/Bai_2-3_NNTPUD.git
cd Bai_2-3_NNTPUD
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Tạo file `.env`

```bash
cp .env.example .env
```

Sau đó mở file `.env` và điền thông tin:

```env
MONGODB_URI=mongodb://localhost:27017/BT_2_3_NNPTUD
PORT=3000
```

> ⚠️ Cần cài **MongoDB** và đang chạy trên máy, hoặc thay bằng connection string của MongoDB Atlas.

### 4. Chạy server

```bash
node app.js
```

Kết quả thành công:
```
✅ MongoDB connected
🚀 Server running on port 3000
```

---

## 📌 API Endpoints

### 🔷 Role

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/roles` | Tạo role mới |
| GET | `/api/roles` | Lấy tất cả roles |
| GET | `/api/roles/:id` | Lấy role theo ID |
| PUT | `/api/roles/:id` | Cập nhật role |
| DELETE | `/api/roles/:id` | Xoá mềm role |

#### Ví dụ tạo Role
```json
POST /api/roles
{
  "name": "Admin",
  "description": "Quản trị viên"
}
```

---

### 🔷 User

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/users` | Tạo user mới |
| GET | `/api/users` | Lấy tất cả users |
| GET | `/api/users/:id` | Lấy user theo ID |
| PUT | `/api/users/:id` | Cập nhật user |
| DELETE | `/api/users/:id` | Xoá mềm user |
| POST | `/api/users/enable` | Bật user (status → true) |
| POST | `/api/users/disable` | Tắt user (status → false) |

#### Ví dụ tạo User
```json
POST /api/users
{
  "username": "nguyenvana",
  "password": "123456",
  "email": "vana@gmail.com",
  "fullName": "Nguyễn Văn A",
  "role": "<ObjectID của Role>"
}
```

#### Ví dụ Enable / Disable
```json
POST /api/users/enable
{
  "email": "vana@gmail.com",
  "username": "nguyenvana"
}
```

---

## 🗂️ Cấu trúc dữ liệu

### User
| Field | Type | Mô tả |
|-------|------|-------|
| username | String | Unique, bắt buộc |
| password | String | Bắt buộc |
| email | String | Unique, bắt buộc |
| fullName | String | Mặc định: `""` |
| avatarUrl | String | Mặc định: avatar mặc định |
| status | Boolean | Mặc định: `false` |
| role | ObjectID | Ref → Role |
| loginCount | Number | Mặc định: `0` |
| isDeleted | Boolean | Soft delete, mặc định: `false` |

### Role
| Field | Type | Mô tả |
|-------|------|-------|
| name | String | Unique, bắt buộc |
| description | String | Mặc định: `""` |
| isDeleted | Boolean | Soft delete, mặc định: `false` |

---

## 🧪 Test API

Mở file `api-tester.html` trên trình duyệt để test trực tiếp tất cả endpoints (cần server đang chạy).
