# Real-Time Chat Application

A scalable real-time chat application built using React, Node.js, Socket.IO, and MongoDB. Supports instant messaging, and persistent chat history.

## Features

- Real-time messaging using WebSocket
- User authentication (JWT)
- Online/offline status
- Persistent chat storage (MongoDB)
- Responsive modern UI
- Multiple users support 
- Group chat support
- Modern notification system 

---

📸 Screenshots

![alt text](<Screenshot 2026-02-26 024725.png>)

![alt text](<Screenshot 2026-02-26 190737.png>)

---

## Local Development Setup

Follow these steps to run the application on your local machine without Docker.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (either local or Atlas)

### 1. Backend Setup

1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    Create a `.env` file in the `Backend` directory with:
    ```env
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

---

## Docker Setup

You can run the entire application using Docker Compose.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running with Docker

1.  **Environment Variables**: Ensure you have a `.env` file in the `Backend` directory with the necessary configurations (see `Backend/.env`).
2.  **Build and Start**: Build the images and start the containers using the following command in the root directory:
    ```bash
    docker-compose up --build
    ```
3.  **Access the Application**:
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:8000](http://localhost:8000)

---
