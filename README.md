# Aether AI Data Analyst Platform

Welcome to the **Aether AI Data Analyst Platform**, a full-stack application designed to connect natural language queries to database analytical pipelines. It features a FastAPI backend running a SQLite engine and a modern React/Vite/TypeScript frontend dashboard.

This repository is split into two primary components:
1. **Backend**: A Python FastAPI service that executes SQL queries against a sample E-Commerce SQLite database.
2. **Frontend**: A React single-page application built with Vite, TypeScript, TailwindCSS, and Lucide icons.

---

## 📂 Repository Structure

```text
├── backend/                   # FastAPI Python backend
│   ├── app/                   # Core application code (endpoints, configurations)
│   ├── data/                  # SQLite database and export CSV files
│   ├── scripts/               # DB initialization script
│   ├── venv/                  # Python virtual environment (if initialized)
│   └── requirements.txt       # Backend dependencies
├── frontend/                  # React Vite frontend
│   ├── src/                   # React source code (pages, components, styles)
│   ├── package.json           # Frontend dependencies and scripts
│   ├── vite.config.ts         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS styling configuration
└── docs/                      # Setup and usage guides
    ├── backend_setup.md       # Step-by-step guide for Python backend
    ├── frontend_setup.md      # Step-by-step guide for Vite/React frontend
    └── architecture.md        # DB schema, tech stack, and API documentation
```

---

## 🚀 Quick Start Guide

To get this application running on your local machine, follow the detailed setup guides:

### 1. Backend Setup (FastAPI + SQLite)
Configure the Python environment, generate the sample database, and start the local API server:
👉 **[Backend Setup Guide](file:///c:/Users/aruni/Desktop/New%20folder%20(2)/docs/backend_setup.md)**

### 2. Frontend Setup (React + Vite)
Install dependencies and spin up the frontend hot-reloading development server:
👉 **[Frontend Setup Guide](file:///c:/Users/aruni/Desktop/New%20folder%20(2)/docs/frontend_setup.md)**

### 3. Architecture & APIs
Understand the underlying database tables, relations, and the REST endpoints:
👉 **[Architecture & Database Guide](file:///c:/Users/aruni/Desktop/New%20folder%20(2)/docs/architecture.md)**

---

## 🛠️ Tech Stack Overview

- **Backend**: FastAPI, SQLite3, Uvicorn, Pydantic v2
- **Frontend**: React (v18), Vite, TypeScript, Tailwind CSS, Lucide React, React Router Dom
