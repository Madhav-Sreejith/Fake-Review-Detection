# 🚀 Deploying to Render.com

Follow these steps to host your Fake Review Detection API for free on Render.

## Step 1: Prepare your Repository
- Ensure all project files are in your GitHub repository.
- **IMPORTANT**: Make sure the serialized model files (`fake_review_model.pkl` and `scaler.pkl`) are in the `notebooks/` directory of your repo.
- The root of your repo should contain: `api.py`, `requirements.txt`, `Procfile`, and `render.yaml`.

## Step 2: Create a Render Web Service
1. Log in to [Render.com](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.

## Step 3: Configure Settings
- **Name**: `fake-review-api` (or any name you like).
- **Environment**: `Python`.
- **Region**: Choose the one closest to you.
- **Branch**: `main` (or your default branch).
- **Build Command**: `pip install -r requirements.txt`.
- **Start Command**: `gunicorn api:app`.
- **Plan**: Select **Free**.

## Step 4: Finalize Deployment
- Click **Create Web Service**.
- Wait for the build to complete. 
- Once the status is "Live", copy the Render URL (e.g., `https://fake-review-api.onrender.com`).

## Step 5: Update your React App
- In your React/Dashboard app, find where the API URL is defined.
- Replace `http://localhost:5000` with your new Render URL.
- Deploy your React app (e.g., to Vercel or Render Static Site).

---
> **Note on Free Tier**: Render's free instances spin down after 15 minutes of inactivity. The first request after a break might take 30-60 seconds to respond as the server boots up.
