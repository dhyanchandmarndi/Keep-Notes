# 📝 Keep Notes (MERN Stack)

A simple and efficient **Note Taking Application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project demonstrates **full-stack development**, **containerization with Docker**, and **deployment on Render & Netlify**.

---

## 🚀 Features
- ✍️ Create, Read, Update, and Delete (CRUD) notes  
- 🔐 User authentication & authorization (JWT-based)  
- 📱 Responsive design with React and Tailwind CSS  
- 🗄️ RESTful API with Express & Node.js  
- 🐳 Dockerized for containerized development  
- 🌐 Deployed on:
  - **Frontend:** Netlify  
  - **Backend:** Render  

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT  
- **Deployment:** Netlify (frontend), Render (backend)  
- **Containerization:** Docker  

---

## 📂 Project Structure
```bash
keep-notes/
│── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
│── backend/ # Express backend
│ ├── routes/
│ ├── models/ 
│ └── package.json
│
│── docker-compose.yml # Docker config
│── README.md

```
---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/dhyanchandmarndi/Keep-Notes.git
cd keep-notes
```
### 2. Setup environment variables
server/.env
```bash

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```
client/.env
```bash


VITE_API_URL=https://your-backend-url.onrender.com
```

### 3. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run locally
```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev
```

Frontend → http://localhost:5173

Backend → http://localhost:8010

### 🐳 Run with Docker
```bash
# Build and start containers
docker-compose up --build
```
### 🌐 Deployment

Frontend: Netlify (https://dapper-taiyaki-dbf565.netlify.app/)

Backend: Render (https://keep-notes-dd94.onrender.com)

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or issue.
