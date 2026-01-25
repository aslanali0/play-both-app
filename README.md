# 🎮 PlayBoth

**PlayBoth** is a modern web platform where you can discover video games and their soundtracks together. Search for games, listen to their soundtracks, and save your favorites!

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128.0-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Motor-47A248?logo=mongodb)

---

## ✨ Features

- 🔍 **Game Search**: Search games via Steam and view detailed information
- 🎵 **Soundtrack Discovery**: Listen to game soundtracks with YouTube integration
- ⭐ **Favorites System**: Add your favorite games and songs to your collection
- 👤 **User Profile**: Customizable profile
- 🔐 **Secure Authentication**: JWT-based authentication system
- 🎨 **Modern UI**: Neon-themed interface designed with Tailwind CSS
- 📱 **Responsive Design**: Mobile and desktop compatible

---

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern React features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern, fast Python web framework
- **MongoDB (Motor)** - Async database driver
- **PyMongo** - MongoDB integration
- **BeautifulSoup4** - Web scraping
- **Passlib & Python-JOSE** - Security and JWT
- **Uvicorn** - ASGI server

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18+)
- **Python** (3.9+)
- **MongoDB** (local or cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/aslanali0/play-both-app.git
cd play-both-app
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (example)
# Set required environment variables:
# MONGODB_URL=mongodb://localhost:27017
# SECRET_KEY=your-secret-key
# STEAM_API_KEY=your-steam-api-key

# Start the server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

---

## 📁 Project Structure

```
play-both-app/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI main application
│   │   ├── database.py       # MongoDB connection
│   │   └── dependencies.py   # Auth middleware
│   ├── models/               # Pydantic models
│   ├── routers/              # API routes
│   │   ├── auth_routes.py
│   │   ├── game_routes.py
│   │   ├── favorites_routes.py
│   │   └── profile_routes.py
│   ├── services/             # Business logic layer
│   │   ├── game_service.py
│   │   ├── steam_service.py
│   │   ├── scraper_service.py
│   │   └── youtube_service.py
│   └── utils/                # Helper functions
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # React components
│   │   │   ├── NavBar.tsx
│   │   │   ├── GameCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── profile/
│   │   ├── context/          # React Context (Auth)
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignUpPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Main React component
│   │   └── main.tsx          # Entry point
│   └── vite.config.ts        # Vite configuration
│
└── README.md
```

---

## 🔌 API Endpoints

### 🎮 Games
- `GET /games/search?game_name={name}` - Search for a game

### 🔐 Authentication
- `GET /auth/me?token={token}` - Authenticate current user

### 👥 Users
- `POST /users/register` - Register new user
- `POST /users/login` - User login

### 👤 Profile
- `GET /profile/me?token={token}` - Get profile information
- `PUT /profile/update` - Update profile

### ⭐ Favorites
- `GET /favorites/my?token={token}` - List favorites
- `POST /favorites/add` - Add to favorites
- `POST /favorites/remove` - Remove from favorites

---

## 🎨 Main Dependencies

### Frontend
```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.12.0",
  "axios": "^1.13.2",
  "@tailwindcss/vite": "^4.1.18"
}
```

### Backend
```txt
fastapi==0.128.0
motor==3.7.1
pymongo==4.16.0
passlib==1.7.4
python-jose==3.5.0
beautifulsoup4==4.14.3
```

---

## 🔒 Security

- **JWT Token** based authentication
- **Bcrypt** password hashing
- **CORS** middleware for secure cross-origin requests
- Protected routes with authentication guards

---

## 🎯 Usage

1. **Sign Up**: Create an account from the `/signup` page
2. **Login**: Sign in with your credentials
3. **Search Games**: Use the search bar on the home page to find games
4. **Listen to Soundtracks**: Play game music via YouTube integration
5. **Save Favorites**: Bookmark your favorite content
6. **Manage Profile**: Update your avatar and bio


---

## 📝 License

This project is under a proprietary license. Please contact for usage permissions.

---

## 👨‍💻 Developer

**[@aslanali0](https://github.com/aslanali0)**

---

## 🐛 Bug Reports

If you encounter any issues, please report them in the [Issues](https://github.com/aslanali0/play-both-app/issues) section.

---

<div align="center">

**⭐ If you like this project, don't forget to give it a star! ⭐**

</div>
