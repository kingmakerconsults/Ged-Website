# Mr. Smith's Learning Canvas
This is my new version

This project is a web-based learning application featuring interactive quizzes and an AI-powered quiz generator. The application has been structured into a frontend and a backend to securely manage API keys for the AI service.

## Project Structure

-   `/frontend`: Contains the `index.html` file with all the React-based client-side code.
-   `/backend`: Contains the Node.js/Express server that acts as a secure proxy for the Google AI API.

## Running the Application

To run this application, you will need to run both the frontend and the backend servers.

### Prerequisites

-   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.
-   A modern web browser.
-   A Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure your API Key:**
    -   Create a new file named `.env` inside the `backend` directory.
    -   Copy the contents of `.env.example` into your new `.env` file.
    -   Replace `"YOUR_API_KEY_HERE"` with your actual Google AI API key. The file should look like this:
        ```
        GOOGLE_AI_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3001`.

### Frontend Setup

The frontend is a single `index.html` file that can be served by any simple HTTP server. One of the easiest ways is to use the `serve` package.

1.  **Install `serve` globally (if you don't have it):**
    ```bash
    npm install -g serve
    ```

2.  **Navigate to the frontend directory from the project root:**
    ```bash
    cd frontend
    ```

3.  **Start the frontend server:**
    ```bash
    serve -l 3000
    ```
    The `-l 3000` flag tells it to listen on port 3000.

4.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`. You can now use the application, and the AI Quiz Generator will work by communicating with your local backend server.
