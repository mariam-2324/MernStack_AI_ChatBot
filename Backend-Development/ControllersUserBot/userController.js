import mongoose from 'mongoose';
import { userModel } from '../ModelsUserBot/userModel.js';
import { BotModel } from '../ModelsUserBot/botModel.js';


export const userPrompt = async (req, res) => {
    try {
        const {text} = req.body;

    if (!text?.trim()) {
        res.status(400).json({
            error : "text should not be empty"
        })
    }
    const userProm = await userModel.create({
            sender : "user",
            text
        })

        const botData = {
  "hi": "Welcome, how can I help you.?",
  "how are you" : "I am perfectly fine, ALHUMDULLILAH...!",
  "what is web development": "Web development is the process of building and maintaining websites and web applications for the internet.",
  "what is mern stack": "MERN stack is a collection of JavaScript-based technologies: MongoDB, Express.js, React, and Node.js.",
  "what is html": "HTML (HyperText Markup Language) is the standard markup language used to structure web pages.",
  "what is css": "CSS (Cascading Style Sheets) is used to style and layout HTML elements on a web page.",
  "what is javascript": "JavaScript is a programming language used to make web pages interactive and dynamic.",
  "what is react": "React is a JavaScript library developed by Meta for building user interfaces, especially single-page applications.",
  "what is jsx": "JSX is a syntax extension for JavaScript that allows you to write HTML-like code directly inside React.",
  "what is component in react": "A component is a reusable, self-contained piece of UI code in React.",
  "what is state in react": "State is a built-in object used to store property values or data that belong to a component and change over time.",
  "what is props in react": "Props (properties) are read-only inputs passed from a parent component to a child component in React.",
  "what is react hook": "Hooks are special functions in React that let you use state and lifecycle features in functional components.",
  "what is nodejs": "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JS code outside a browser.",
  "what is expressjs": "Express.js is a minimal and flexible web application framework for Node.js used to build APIs and backend servers.",
  "what is mongodb": "MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like formats.",
  "what is mongoose": "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that manages data relationships and schema validation.",
  "what is rest api": "REST API is an architectural style for designing networked applications using standard HTTP methods like GET, POST, PUT, and DELETE.",
  "what is virtual dom": "Virtual DOM is a lightweight copy of the real DOM in memory that React uses to optimize rendering performance.",
  "what is npm": "NPM (Node Package Manager) is a package manager for JavaScript used to install and manage external libraries and dependencies.",
  "what is middleware in express": "Middleware functions in Express execute during the request-response cycle and can modify requests or end the cycle.",
  "what is jwt": "JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred securely between two parties for authentication.",
  "what is single page application": "A Single Page Application (SPA) is a web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server.",
  "what is cors": "CORS (Cross-Origin Resource Sharing) is a HTTP-header based mechanism that allows a server to indicate any origins other than its own from which a browser should permit loading resources.",
  "what is async await in javascript": "Async/await is a modern syntax in JavaScript used to handle asynchronous operations more cleanly than using traditional promises or callbacks.",
  "what is dom": "DOM (Document Object Model) is a programming interface for web documents that represents the page as a tree structure of nodes.",
  "what is npm vs npx": "NPM is a package manager used to install packages, while NPX is a package runner used to execute packages without installing them globally.",
  "what is flexbox": "Flexbox is a 1D CSS layout model designed to distribute space along a single row or column efficiently.",
  "what is css grid": "CSS Grid is a 2D layout system for the web that lets you organize content into rows and columns.",
  "what is responsive web design": "Responsive web design makes web pages render well on a variety of devices and screen sizes automatically.",
  "what is localstorage": "LocalStorage is a web storage API that allows web applications to store key-value pairs in a web browser with no expiration date.",
  "what is sessionstorage": "SessionStorage is a web storage API that stores data for the duration of the page session, which expires when the browser tab is closed.",
  "what is redux": "Redux is a predictable state management library for JavaScript applications, commonly used with React for managing global application state.",
  "what is useContext hook": "useContext is a React hook that allows you to share and manage state across components without passing props manually down through every level.",
  "what is useEffect hook": "useEffect is a React hook that lets you perform side effects in functional components, such as data fetching or DOM manipulation.",
  "what is routing in express": "Routing in Express refers to determining how an application responds to a client request to a particular endpoint, URI, or HTTP method.",
  "what is dotenv": "dotenv is a zero-dependency module that loads environment variables from a .env file into Node.js process.env.",
  "what is body parser": "Body-parser is a middleware in Node.js that extracts the incoming request stream and exposes it on req.body in a usable format.",
  "what is indexed database in mongodb": "Indexes in MongoDB support the efficient execution of queries by reducing the amount of data the database needs to scan.",
  "what is pagination": "Pagination is the process of dividing a large dataset into smaller, discrete chunks or pages to improve performance and user experience.",
  "what is web socket": "WebSocket is a communication protocol that provides full-duplex, real-time channels over a single TCP connection.",
  "what is deployment in web development": "Deployment is the process of publishing a web application's code and assets to a server or cloud platform so it becomes accessible to users on the internet.",
  "what is event bubbling": "Event bubbling is a type of event propagation where the event first triggers on the innermost element and then bubbles up to outer parent elements.",
  "what is closure in javascript": "A closure is a function that remembers and accesses variables from its outer lexical scope even after that outer function has finished executing.",
  "what is hovers vs active in css": "Hover applies styles when a mouse passes over an element, while Active applies styles during the moment the element is clicked.",
  "what is hoisting in javascript": "Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during compilation.",
  "what is shadow dom": "Shadow DOM is a browser feature that allows a hidden, isolated DOM tree to be attached to an element for web component encapsulation.",
  "what is server side rendering": "Server-side rendering (SSR) generates the full HTML for a page on the server in response to a request, sending ready-to-display markup to the browser.",
  "what is client side rendering": "Client-side rendering (CSR) renders pages directly in the browser using JavaScript to manipulate the DOM dynamically.",
  "what is nextjs": "Next.js is a popular React framework that provides features like server-side rendering, static site generation, and file-system based routing.",
  "what is tailwind css": "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build custom designs directly in HTML or JSX.",
  "what is typescript": "TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions.",
  "what is promise in javascript": "A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value.",
  "what is cors error": "A CORS error occurs when a browser blocks a cross-origin HTTP request because the server has not explicitly allowed that origin via CORS headers.",
  "what is lazy loading": "Lazy loading is a design pattern that postpones the loading of non-critical resources like images or scripts until they are actually needed.",
  "what is npm package json": "package.json is a manifest file in Node.js projects that contains project metadata, scripts, and a list of installed package dependencies.",
  "what is mongo schema": "A Mongo schema defines the structure of documents, default values, and data validation rules within a MongoDB collection via Mongoose.",
  "what is rest vs graphql": "REST relies on fixed endpoints returning fixed data structures, whereas GraphQL allows clients to request exact data fields from a single endpoint.",
  "what is web performance optimization": "Web performance optimization involves techniques like minification, caching, image compression, and code splitting to speed up website load times.",
  "what is http status code 404": "HTTP status code 404 indicates that the client was able to communicate with a given server, but the server could not find the requested resource.",
  "what is http status code 500": "HTTP status code 500 indicates an Internal Server Error, meaning the server encountered an unexpected condition that prevented it from fulfilling the request.",
  "what is web socket vs HTTP": "HTTP is a stateless request-response protocol, whereas WebSocket provides a persistent, bi-directional connection for real-time data flow."
}

const normalText= text.toLowerCase().trim();
const botResponse = botData[normalText] || "Sorry, I can't understand what are you asking about.";

const botrespond = await BotModel.create({
    text : botResponse
})

return res.status(200).json({
    userMessage : userProm.text,
    botMessage : botrespond.text
})
    } catch (error) {
        console.error("The bot is not responding", error);
        res.status(500).json({
            success : false,
            error: `The server is throwing an ${error}`
        })
        
        
    }
    
}

