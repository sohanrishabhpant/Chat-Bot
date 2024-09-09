# Real-Time Chatbot with GeminiApi

## Overview
This project is a real-time chatbot built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by GeminiApi. The chatbot is designed to provide instant responses, manage user conversations, and store them in a database for future reference. Inspired by GoogleGemini, it also features conversation management capabilities, enabling users to view, track, and delete their chat history.

## Features
- **Real-time Conversations:** Engage in real-time chat with the chatbot.
- **Conversation Storage:** Store user conversations in a MongoDB database for future reference.
- **Conversation Management:** Users can view, track, and delete their chat history.
- **Scalable Backend:** Built using Node.js and Express.js for handling API requests and managing conversations.
- **Responsive Frontend:** React.js-based UI providing a seamless user experience.
- **GeminiApi Integration:** Leverages GeminiApi for chatbot functionality, offering powerful language processing similar to GoogleGemini.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** GeminiApi
- ## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the `server` directory and configure the following variables:
    ```bash
    MONGO_URI=your_mongodb_uri
    GEMINI_API_KEY=your_gemini_api_key
    PORT=5000
    ```

5. **Run the server:**
    ```bash
    cd ../server
    npm start
    ```

6. **Run the client:**
    ```bash
    cd ../client
    npm start
    ```

7. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

## Usage
- Start a conversation by typing your query into the chatbot interface.
- The chatbot will respond in real-time using the GeminiApi.
- Conversations will be stored in the database, and users can view their chat history.
- Users can also delete conversations as needed.

## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.
