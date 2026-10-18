# 🤖 WebNexa AI – MERN Stack AI Chatbot

A full-stack web development AI assistant built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) styled with **Tailwind CSS**. **WebNexa AI** provides real-time answers to technical questions about web development, JavaScript concepts, React hooks, and backend architecture.

---

## 📸 Visual Overview

![WebNexa AI Chat Interface Placeholder]()
*Figure 1: Cyberpunk/Futuristic AI Chatbot interface featuring glassmorphism cards, interactive glow effects, and live message histories.*

---

## 🏗️ System Architecture & Workflow

```
[ User Input ] ➔ (React Frontend via Axios POST) 
                     │
                     ▼
         [ Node.js + Express API Router ]
                     │
                     ▼
         [ User-Bot Controller Logic ]
         ├─ Validate text input
         ├─ Store User prompt in MongoDB
         ├─ Lookup matching response in bot knowledgebase
         └─ Store Bot response in MongoDB
                     │
                     ▼
         [ HTTP 200 JSON Response ] ➔ [ React UI Updates State ]
```

---

## ⚙️ Backend Implementation

### 1. `index.js` – Express Server & Entry Point

Bootstraps the Express application, configures middleware, initiates database connection, and defines API endpoints.

```javascript
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from "express";
import { DatabaseConnection } from './db_Connect/db_config.js'
import userRouter from './Routes/userRoute.js'

const app = express();

app.use(express.json());
app.use(cors());

DatabaseConnection();

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

app.use("/userRoute", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`app is running at ${process.env.PORT}`);
});
```

#### 🔍 Line-by-Line Breakdown:
* `import dotenv from 'dotenv'; dotenv.config();`: Loads environment variables from `.env` file into `process.env`.
* `import cors from 'cors';`: Enables Cross-Origin Resource Sharing (CORS) to allow requests from frontend origins.
* `import express from "express";`: Imports the core Express framework.
* `import { DatabaseConnection } ...`: Imports the asynchronous MongoDB connection setup function.
* `const app = express();`: Creates an instance of an Express application.
* `app.use(express.json());`: Middleware that parses incoming payloads with JSON content types (`req.body`).
* `app.use(cors());`: Activates CORS for all incoming API routes.
* `DatabaseConnection();`: Invokes the database handler to establish connection with MongoDB.
* `app.get("/", ...)`: Test root route to confirm backend operations.
* `app.use("/userRoute", userRouter);`: Binds `/userRoute` URL path to the userRouter routes middleware.
* `app.listen(...)`: Starts the HTTP server on the designated `PORT`.

---

### 2. `Database-Config.js` – MongoDB Connection

Manages database connectivity using Mongoose ODM.

```javascript
import mongoose from 'mongoose';

export const DatabaseConnection = async () => {
    try {
        console.log("DB_URI :", process.env.DB_URI);
        await mongoose.connect(process.env.DB_URI);
        console.log("DataBase is connected");
    } catch (error) {
        console.log("There is an error", error);
        console.error(error);
        return
    }
}
```

#### 🔍 Explanation:
* `mongoose.connect(process.env.DB_URI)`: Asynchronously opens a default connection string to the MongoDB cluster provided in environment variables.
* Includes error trapping with `try...catch` blocks to log issues during database handshake.

---

### 3. Database Schemas & Models

#### `userModel.js` – User Query Schema
```javascript
import mongoose from 'mongoose';

const userSch = mongoose.Schema({
    sender: {
        type: String,
        required: true,
        enum: ["user"]
    },
    text: {
        type: String,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

export const userModel = mongoose.model("userSchema", userSch)
```

#### `botModel.js` – Bot Response Schema
```javascript
import mongoose from 'mongoose';

const botSch = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    } 
})

export const BotModel = mongoose.model("BotSchema", botSch)
```

#### 🔍 Key Schema Fields:
* `sender`: Ensures identity integrity constrained by `enum: ["user"]`.
* `text`: Mandatory String field storing query text or system responses.
* `timestamp`: Automatically assigns present timestamp using `Date.now`.

---

### 4. `userRoute.js` – API Route Handlers

Defines the API endpoint mapping for user message interactions.

```javascript
import express from 'express';
const userRouter = express.Router();
import { userPrompt } from '../ControllersUserBot/userController.js';

userRouter.post("/userRout", userPrompt)

export default userRouter;
```

#### 🔍 Explanation:
* `userRouter.post("/userRout", userPrompt)`: Defines a HTTP `POST` route at `/userRoute/userRout` targeting the `userPrompt` controller function.

---

### 5. `user-bot Controller.js` – Bot Query Matching & Response Logic

Handles input verification, lookup matching inside a knowledge dictionary, database logging, and JSON responses.

```javascript
import mongoose from 'mongoose';
import { userModel } from '../ModelsUserBot/userModel.js';
import { BotModel } from '../ModelsUserBot/botModel.js';

export const userPrompt = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text?.trim()) {
            res.status(400).json({ error: "text should not be empty" })
        }

        const userProm = await userModel.create({
            sender: "user",
            text
        });

        const botData = {
            "hi": "Welcome, how can I help you.?",
            "what is mern stack": "MERN stack is a collection of JavaScript-based technologies: MongoDB, Express.js, React, and Node.js.",
            // ... key-value knowledge repository
        };

        const normalText = text.toLowerCase().trim();
        const botResponse = botData[normalText] || "Sorry, I can't understand what are you asking about.";

        const botrespond = await BotModel.create({
            text: botResponse
        });

        return res.status(200).json({
            userMessage: userProm.text,
            botMessage: botrespond.text
        });
    } catch (error) {
        console.error("The bot is not responding", error);
        res.status(500).json({
            success: false,
            error: `The server is throwing an ${error}`
        });
    }
}
```

#### 🔍 Execution Flow:
1. Extract `text` from request body (`req.body`).
2. Validate non-empty payload input; return `400 Bad Request` if invalid.
3. Save user prompt into MongoDB via `userModel.create()`.
4. Standardize input text via `.toLowerCase().trim()`.
5. Match text against key-value static dictionary `botData` or fallback to default message.
6. Record system answer into MongoDB via `BotModel.create()`.
7. Return payload back to client (`userMessage` & `botMessage`).

---

## 🎨 Frontend Implementation (React & Tailwind CSS)

### 1. `main.jsx` & `App.jsx` – Frontend Bootstrap
* **`main.jsx`**: Initializes client application into DOM root container element.
* **`App.jsx`**: Renders the core parent UI view `UserBot`.

---

### 2. `UserBot.jsx` – Interactive Chat UI Component

Handles state, API HTTP requests via Axios, key shortcuts, and responsive UI layout.

```javascript
import { useState } from "react";
import axios from "axios";

const UserBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMessage = async () => {
    if (!input.trim()) return;

    const submittedInput = input;
    setLoading(true);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3000/userRoute/userRout", {
        text: submittedInput,
      });

      if (response.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: response.data.userMessage, sender: "user" },
          { text: response.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") handleMessage();
  };

  return (
    // ... JSX Elements styled with Tailwind CSS
  );
};

export default UserBot;
```

#### 🔍 State & Method Breakdown:
* **States**:
  * `input`: Manages real-time value changes in the text field.
  * `messages`: Array of chat entries (`{ text, sender }`) rendered sequentially.
  * `loading`: Boolean flag displaying loading spinner state during pending HTTP requests.

* **Handlers**:
  * `handleMessage()`: Dispatches request payload using Axios POST, appends returned responses to state array, and resets loading status.
  * `pressEnter(e)`: Keyboard listener checking for the "Enter" key trigger to send messages automatically.

---

## 🛠️ Tech Stack Overview

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS 4, Axios |
| **Backend** | Node.js, Express.js, Cors, Dotenv |
| **Database** | MongoDB, Mongoose ODM |
| **Deployment Utilities** | Nodemon, Serverless-HTTP |

---

## 🚀 Quickstart Installation Guide

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (.env file)
PORT=3000
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/webnexa

# Launch development server
npm run dev
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite React server
npm run dev
```
