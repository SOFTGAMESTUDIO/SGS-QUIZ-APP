
# SGS Quiz App 🎓🔥

An advanced and interactive quiz platform developed by **Sift Game Studio**, built using **React**, **Firebase**, and modern UI/UX practices. This app supports real-time quizzes, AI-based proctoring, secure authentication, exam management, and user analytics.

## 🌐 Live Demo

> 🔗 Coming Soon...

---

## 📦 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Authentication**: Email/Password, Google Sign-In
- **AI Proctoring**: Face detection, eye tracking (Webcam-based)
- **Dev Tools**: Vite, ESLint, Prettier
- **Mobile Support**: CapacitorJS (Android/iOS builds)

---

## 📂 Project Structure

```

sgs-quiz-app/
│
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # React context (Auth, Cart, etc.)
│   ├── Modules/            # Feature-specific modules (e.g. SignIn, Quiz)
│   ├── pages/              # React route pages
│   ├── utils/              # Helper functions and configs
│   └── DataBase/           # Firebase config
├── .env                    # Environment variables (excluded from Git)
├── .gitignore
├── package.json
└── README.md               # You're here!

````

---

## 🚀 Features

- 📝 **Dynamic Quiz System** with timer, scoring, and levels
- 🎥 **AI Proctoring**: Face detection, eye tracking, cheating detection
- 📊 **Admin Dashboard** for managing users, quizzes, and results Conet with Websiet not in app 
- 🔐 **Secure Auth** with Firebase and Google Sign-In
- 📱 **Mobile App Ready** via Capacitor
- 🎨 **Modern UI** with light/dark theme support
- 📜 **PDF Certificates**, result tracking, and leaderboard

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/SOFTGAMESTUDIO/sgs-quiz-app.git
cd sgs-quiz-app
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Do **NOT** commit `.env` file — it’s ignored via `.gitignore`

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 🧪 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore, Authentication, and Storage
3. Create Web App and get your Firebase config for `.env`
4. Setup Firebase rules and index if needed

---

## 🤖 Capacitor (Optional for Android/iOS)

```bash
npx cap add android
npx cap open android
```

---

## 👨‍💻 Contributing

PRs are welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ Developed by

**Sift Game Studio**
🔗 [softgamestudio.in](https://softgamestudio.in)
📧 [softgamestudio@gmail.com](mailto:softgamestudio@gmail.com)
📱 +91-xxxxxxxxxx

```

---

Let me know if you'd like to add:
- Status badges (build, license, Firebase deploy)
- Deployment steps (Vercel, Netlify, Firebase Hosting)
- Screenshots or video preview section
```


The App is Conect with same data base from Our Siet The app is controled on Our Websiet 