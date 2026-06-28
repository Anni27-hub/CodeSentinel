# CodeSentinel

## AI-Powered GitHub Pull Request Reviewer

CodeSentinel is a full-stack web application that helps developers review GitHub pull requests using AI. Users can connect their GitHub account, browse repositories, select pull requests, run AI-powered analysis, view review history, and post generated review comments back to GitHub.

**Tech Stack:** React, Vite, Tailwind CSS, Node.js, Express, MongoDB, GitHub OAuth, Groq Llama 3.3 70B

---

## Features

- GitHub OAuth authentication
- Repository and pull request browsing
- Pull request file/diff retrieval
- AI-powered code review generation
- Review scoring across quality, security, performance, maintainability, and readability
- Risk level classification
- Review history stored in MongoDB
- Copy review summary
- Export review report
- Post AI review comments directly to GitHub pull requests
- Responsive dark-themed dashboard

---

## How It Works

1. User connects GitHub using OAuth.
2. CodeSentinel fetches accessible repositories.
3. User selects a repository and pull request.
4. Changed files are fetched from GitHub.
5. AI analyzes the pull request diff.
6. A structured review is generated and saved.
7. User can view history, export the review, or post it to GitHub.

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- GitHub OAuth
- Express Session
- Groq SDK
- PDFKit

---

## Project Structure

```txt
CodeSentinel/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js
- MongoDB Atlas or local MongoDB
- GitHub OAuth App
- Groq API key

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:5000
```

Frontend will run at:

```txt
http://localhost:5173
```

Backend will run at:

```txt
http://localhost:5000
```

---

## GitHub OAuth Setup

Create a GitHub OAuth app from:

```txt
GitHub Settings > Developer Settings > OAuth Apps
```

For local development:

```txt
Homepage URL:
http://localhost:5173

Authorization callback URL:
http://localhost:5000/auth/github/callback
```

For production:

```txt
Homepage URL:
https://your-vercel-url.vercel.app

Authorization callback URL:
https://your-render-backend-url.onrender.com/auth/github/callback
```

---

## Deployment

### Backend: Render

Render settings:

```txt
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Backend environment variables:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://your-render-backend-url.onrender.com/auth/github/callback
FRONTEND_URL=https://your-vercel-url.vercel.app
GROQ_API_KEY=your_groq_api_key
```

---

### Frontend: Vercel

Vercel settings:

```txt
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Frontend environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## Important Notes

- Do not commit `.env` files.
- Do not commit `node_modules`.
- For production OAuth to work, the GitHub callback URL must exactly match the Render backend callback URL.
- After changing environment variables on Render or Vercel, redeploy the service.
- On Render free tier, the backend may sleep after inactivity and take some time to wake up.

---

## Author

**Anish Agarwal**

- GitHub: [Anni27-hub](https://github.com/Anni27-hub)
- LinkedIn: [Anish Agarwal](https://www.linkedin.com/in/anish-agarwal-b37521225/)

---

## Acknowledgements

- GitHub REST API
- Groq
- React
- Node.js
- MongoDB
