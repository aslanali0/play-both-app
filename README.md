# 🎮 PlayBoth

A web platform for discovering video games and their soundtracks. Search games via Steam, listen to soundtracks, and save your favorites.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128.0-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Motor-47A248?logo=mongodb)

---

## ✨ Features

- 🔍 **Game Search** - Steam API integration with detailed game info
- 🎵 **Soundtrack Discovery** - YouTube integration for game music
- ⭐ **Favorites** - Save games and songs
- 👤 **User Profiles** - Customizable avatar and bio
- 🔐 **JWT Authentication** - Secure login with bcrypt password hashing
- 🎨 **Modern UI** - Neon-themed design with Tailwind CSS

---

## 🏗️ Tech Stack

**Frontend:** React 19 • TypeScript • Vite • React Router • Tailwind CSS 4 • Axios

**Backend:** FastAPI • MongoDB (Motor) • BeautifulSoup4 • Passlib • Python-JOSE • Uvicorn

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ • Python 3.9+ • MongoDB

### Setup

```bash
# Clone repository
git clone https://github.com/aslanali0/play-both-app.git
cd play-both-app

# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Configure environment (.env file)
# MONGODB_URL=mongodb://localhost:27017
# SECRET_KEY=your-secret-key
# STEAM_API_KEY=your-steam-api-key

# Start backend
uvicorn app.main:app --reload --port 8000

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

---

## 📁 Project Structure

```
play-both-app/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── database.py      # MongoDB setup
│   │   └── dependencies.py  # Auth middleware
│   ├── models/              # Pydantic models
│   ├── routers/             # API routes
│   ├── services/            # Business logic
│   └── utils/               # Helpers
├── frontend/
│   └── src/
│       ├── api/             # API client
│       ├── components/      # React components
│       ├── context/         # Auth context
│       ├── pages/           # Page components
│       └── types/           # TypeScript types
└── makefile                 # Quick commands
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Games** |
| GET | `/games/search?game_name={name}` | Search for games |
| **Authentication** |
| GET | `/auth/me?token={token}` | Get current user |
| **Users** |
| POST | `/users/register` | Register new user |
| POST | `/users/login` | Login |
| **Profile** |
| GET | `/profile/me?token={token}` | Get profile |
| PUT | `/profile/update` | Update profile |
| **Favorites** |
| GET | `/favorites/my?token={token}` | List favorites |
| POST | `/favorites/add` | Add favorite |
| POST | `/favorites/remove` | Remove favorite |

---

## 📝 License

Proprietary license. Contact for usage permissions.

---

## 👨‍💻 Developer

**[@aslanali0](https://github.com/aslanali0)**

---

<div align="center">

**⭐ Star this project if you find it useful! ⭐**

</div>
