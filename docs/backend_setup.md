# 🐍 Backend Setup Guide

This guide details how to configure, seed, and run the Python FastAPI backend of the Aether AI Data Analyst Platform.

---

## 📋 Prerequisites
- **Python**: Ensure you have Python 3.10 or higher installed. You can check your version with:
  ```bash
  python --version
  ```

---

## 🛠️ Installation & Configuration Steps

### 1. Navigate to Backend Directory
Open your terminal and change directories to the `backend` folder:
```bash
cd backend
```

### 2. Set Up a Virtual Environment (Optional but Recommended)
A virtual environment keeps the project dependencies isolated.
* **On Windows (PowerShell/CMD)**:
  If a `venv` folder is already present, activate it:
  ```powershell
  .\venv\Scripts\activate
  ```
  If you need to create a new one:
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```
* **On macOS/Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

### 3. Install Dependencies
Install all required libraries using pip:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a local `.env` file to store project settings. Copy the structure from the example file:
```bash
cp .env.example .env
```
*(On Windows PowerShell, use `copy .env.example .env`)*

By default, the `.env` contents look like this:
```env
PROJECT_NAME="Aether AI Data Analyst API"
API_V1_STR="/api/v1"
ENVIRONMENT="development"
LOG_LEVEL="INFO"
ALLOWED_ORIGINS="http://localhost:5173,http://127.0.0.1:5173"
SECRET_KEY="aether-secret-key-change-in-production"
```

### 5. Initialize the Database
The project utilizes a mock SQLite database containing mock e-commerce data (categories, products, orders, customers, etc.). Initialize the database by running the setup script:
```bash
python scripts/init_db.py
```
This script will:
1. Create a SQLite database at `backend/data/ecommerce.db`.
2. Generate table schemas.
3. Seed random, structured mock data.
4. Export CSV copies of the database tables to `backend/data/csv/` for convenience.

---

## 🏃 Running the Backend Server

Start the local server using `uvicorn` with auto-reload enabled:
```bash
python -m uvicorn app.main:app --reload --port 8000
```

Upon a successful startup, you should see logs similar to:
```text
[2026-07-23 23:05:00] [INFO] [aether_backend:11] - Starting Aether AI Data Analyst API in [development] mode...
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

---

## 🔍 Verifying the APIs

The backend auto-documents all registered API endpoints. Once the server is running, open your web browser and navigate to:
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alternative ReDoc UI**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check Status**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

### Key Endpoints Available:
- **`GET /api/v1/health`**: Checks API and model server status.
- **`GET /api/v1/datasources`**: Lists all connected data sources (such as the SQLite DB and mock uploaded CSV configurations).
- **`POST /api/v1/analytics/query`**: Accepts a natural language prompt or direct SQL queries and runs them against the SQLite dataset, returning structured rows, column definitions, and metadata.
