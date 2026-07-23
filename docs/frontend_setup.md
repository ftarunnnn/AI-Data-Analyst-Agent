# ⚛️ Frontend Setup Guide

This guide explains how to install, build, and run the React/Vite/TypeScript frontend dashboard for the Aether AI Data Analyst Platform.

---

## 📋 Prerequisites
- **Node.js**: Make sure you have Node.js installed (v18.x or later is recommended). You can verify it with:
  ```bash
  node -version
  ```
- **npm**: The Node Package Manager should be installed alongside Node.js. Check the version:
  ```bash
  npm -version
  ```

---

## 🛠️ Installation Steps

### 1. Navigate to Frontend Directory
Open your terminal and change directories to the `frontend` folder:
```bash
cd frontend
```

### 2. Install Project Dependencies
Run npm install to pull in all required libraries (React, Vite, Tailwind CSS, Lucide icons, etc.):
```bash
npm install
```
*Note: This will read the dependencies listed in `package.json` and download them into a `node_modules` folder.*

---

## 🏃 Running the Development Server

Start the local hot-reloading development server:
```bash
npm run dev
```

You should see an output in the console similar to:
```text
  VITE v5.4.10  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 🌐 Accessing the Application
Open your browser and navigate to:
👉 **[http://localhost:5173](http://localhost:5173)**

The interface features:
- **Dashboard**: High-level telemetry of recent database analytics, connected resources, active threads, and quick stats.
- **Analytics Playground**: Interactive AI text-to-SQL console allowing query simulation and data preview.
- **Data Connectors**: View database schemas, connected warehouses, indexed CSVs, and API connectors.
- **Settings**: Configuration settings for API keys, user profiles, and application tokens.

---

## 🏗️ Production Build

To build the React application for production deployment, compile the static files (HTML, CSS, JS):
```bash
npm run build
```
This command compiles and optimizes the code, saving the output bundles inside the `frontend/dist/` directory.

### Previewing the Production Build Locally
You can test the production-compiled files locally before deployment with:
```bash
npm run preview
```
This runs a local server hosting the contents of the `dist/` directory.
