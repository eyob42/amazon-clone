# 🛒 Amazon Clone - Full Stack E-Commerce Application

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://amazon-clone-omega-sage.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/github-repo-blue)](https://github.com/eyob42/amazon-clone)

A fully functional e-commerce platform inspired by Amazon, built with modern web technologies. This project simulates a real-world shopping experience with product browsing, user authentication, shopping cart, and secure payment processing.

## ✨ Features

- **User Authentication**: Secure sign-up and login using **Firebase Authentication**.
- **Product Catalog**: Browse a wide range of products fetched from the [Fake Store API](https://fakestoreapi.com/).
- **Shopping Cart**: Add, remove, and adjust quantities of items in your cart. Cart state is managed globally using React Context.
- **Checkout & Payments**: Seamless and secure payment processing integrated with **Stripe**.
- **Order History**: View a list of your past orders with details like items, total, and status.
- **Protected Routes**: Certain pages (like checkout and orders) are protected and require user authentication.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js with Vite
- **Routing**: React Router DOM
- **State Management**: React Context API & useReducer
- **Styling**: CSS Modules
- **Authentication**: Firebase SDK
- **Payments**: Stripe React Components
- **HTTP Client**: Axios

### Backend & Services

- **Backend**: Custom Node.js + Express API (separate repository)
- **Database**: MongoDB Atlas
- **Payment Processing**: Stripe API
- **Authentication Service**: Firebase
- **Hosting**: Frontend on Vercel, Backend on Render

## 🚀 Live Demo

Experience the live application: [**https://amazon-clone-omega-sage.vercel.app/**](https://amazon-clone-omega-sage.vercel.app/)

- **Test User**: `abebech@gmail.com`
- **Test Password**: `123456`

_(Use Stripe test card `4242 4242 4242 4242` with any future date and CVC)_

## 📁 Project Structure (Frontend)

amazon-clone/
├── public/
├── src/
│ ├── Api/ # API endpoint configuration
│ ├── Components/ # Reusable UI components (Header, ProductCard, etc.)
│ ├── Pages/ # Main page components (Landing, Cart, Payment, Orders)
│ ├── Utility/ # Reducer, action types, Firebase config
│ ├── App.jsx # Main app component with context provider
│ ├── Router.jsx # Application routing
│ └── main.jsx # Entry point
├── .env # Environment variables (not in repo)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

text

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Firebase project (for authentication)
- A Stripe account (for payments)
- The backend API server running (see [amazon-api](https://github.com/eyob42/amazon-api) repository)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/eyob42/amazon-clone.git
    cd amazon-clone
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id

    VITE_API_URL=http://localhost:5000/api # Or your deployed backend URL
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open your browser** and navigate to `http://localhost:5173`

🔗 Connecting to the Backend
This frontend application requires the backend API to be running for full functionality (cart, orders, payments). The backend code is available in a separate repository:

https://github.com/eyob42/amazon-api

Follow the instructions in the backend repository's README to set up and run the API server. Make sure the VITE_API_URL in your frontend .env file points to the correct backend URL.

🌐 Deployment
Frontend Deployment (Vercel)
The frontend is configured for easy deployment on Vercel. Connect your GitHub repository to Vercel and add the same environment variables listed in the .env file to your Vercel project settings.

Backend Deployment (Render)
The backend is deployed on Render. Ensure the MONGODB_URI and STRIPE_KEY are correctly set in Render's environment variables. The live backend URL is https://amazon-api-ld36.onrender.com.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is open source and available under the MIT License.

👏 Acknowledgements
Fake Store API for providing realistic e-commerce data.

Stripe for the payment infrastructure.

Firebase for authentication services.

The React, Vite, and Express.js communities for excellent tools and documentation.
