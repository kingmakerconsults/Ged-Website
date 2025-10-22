# Backend Setup for Mr. Smith's Learning Canvas 

This backend server provides AI-powered features for the GED preparation platform, including the "Smith a Quiz" generator.

## Environment Variables

To run this server, you must configure the necessary environment variables. This is crucial for connecting to the Google AI services.

### Render.com Deployment

If you are deploying this service on Render, follow these steps:

1.  Navigate to your service's dashboard on Render.
2.  Go to the **Environment** tab.
3.  Under "Environment Variables," click **Add Environment Variable**.
4.  Create a new variable with the following key and value:
    *   **Key**: `GOOGLE_AI_API_KEY`
    *   **Value**: `YOUR_SECRET_API_KEY_HERE`
5.  In the **Settings** tab, update the build and start commands so the frontend bundle is created before the backend boots:
    *   **Build Command**:

        ```bash
        cd frontend && npm ci && npm run build && cd ../backend && npm ci
        ```

    *   **Start Command**:

        ```bash
        cd backend && node server.js
        ```

Render will automatically use this variable to power the application and will now find the built SPA in `frontend/dist` when `server.js` starts. Ensure you do not expose this key in your frontend code.

### Local Development

For local development:

1.  Create a file named `.env` in this `backend` directory.
2.  Add the following line to the `.env` file:

    ```
    GOOGLE_AI_API_KEY=YOUR_SECRET_API_KEY_HERE
    ```

3.  Ensure that your `.gitignore` file includes `.env` to prevent the key from being committed to your repository.

> **Tip:** A starter configuration is available at `backend/.env.example`. Copy it to `backend/.env` and update the values for your environment.

The `server.js` file is configured to load this variable automatically using `dotenv`.