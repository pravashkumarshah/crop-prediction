# AgriSmart AI — Intelligent Crop Recommendation System

An end-to-end web application that recommends the best crop to grow based on seven soil and climate parameters. A trained Keras neural network powers the backend; a React + Vite frontend presents results through an interactive, multilingual dashboard.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [How It Works](#3-how-it-works)
4. [Inputs and Outputs](#4-inputs-and-outputs)
5. [Dataset](#5-dataset)
6. [Model Performance](#6-model-performance)
7. [Tech Stack](#7-tech-stack)
8. [Folder Structure](#8-folder-structure)
9. [Prerequisites](#9-prerequisites)
10. [Windows Setup and Run Instructions](#10-windows-setup-and-run-instructions)
11. [Environment Variables](#11-environment-variables)
12. [API Reference](#12-api-reference)
13. [Notes and Limitations](#13-notes-and-limitations)

---

## 1. Project Overview

AgriSmart AI helps farmers and agronomists decide which of **22 common crops** is most suitable for their land by analysing soil nutrient levels, temperature, humidity, soil pH, and rainfall. The system returns a ranked recommendation with confidence scores, a detailed crop knowledge card, SHAP-based feature-importance explanations, and a persistent prediction history — all from a clean browser interface.

---

## 2. Features

| Feature | Description |
|---|---|
| **Crop Recommendation** | Neural network inference returns the top crop and top-3 alternatives with confidence percentages |
| **Input Validation** | All 7 parameters are validated against agronomically realistic bounds before inference |
| **Explainable AI (SHAP)** | Per-feature SHAP values explain *why* a crop was recommended |
| **Analytics Dashboard** | Dataset statistics, feature distributions, and per-class model metrics displayed as charts |
| **Crop Catalogue** | Browseable cards for all 22 supported crops with season, soil, water, climate, and NPK profiles |
| **Prediction History** | Last 50 predictions are saved locally in `results/prediction_history.json` |
| **Quick-Fill Samples** | Pre-loaded soil profiles for 9 common crops let users test the model instantly |
| **Multilingual UI** | Interface supports English plus 16 regional languages of India and Nepal |
| **Video Player** | Crop-specific farming tutorial videos embedded in the detail view |

---

## 3. How It Works

```
User inputs 7 parameters
        │
        ▼
Flask API (/api/predict)
        │
        ├─ Validation against agronomic bounds
        ├─ StandardScaler (scaler.pkl) normalises features
        ├─ Keras model (crop_recommendation_model.keras) produces 22-class softmax probabilities
        └─ Top prediction + Top-3 ranking returned as JSON
                │
                ▼
     React frontend renders result card,
     probability chart, SHAP bar chart,
     and crop knowledge details
```

---

## 4. Inputs and Outputs

### Inputs (all numeric, sent as JSON)

| Parameter | Full Name | Unit | Accepted Range |
|---|---|---|---|
| `N` | Nitrogen content | kg/ha | 0 – 300 |
| `P` | Phosphorus content | kg/ha | 0 – 300 |
| `K` | Potassium content | kg/ha | 0 – 350 |
| `temperature` | Air temperature | °C | -10 – 60 |
| `humidity` | Relative humidity | % | 0 – 100 |
| `ph` | Soil pH | pH scale | 1 – 14 |
| `rainfall` | Annual rainfall | mm | 0 – 1000 |

### Outputs (JSON response from `/api/predict`)

| Field | Description |
|---|---|
| `predicted_crop` | Top recommended crop name |
| `confidence` | Model confidence for the top crop (%) |
| `top_3` | Ranked list of the three most likely crops with confidence scores |
| `all_probabilities` | Full 22-class probability distribution |
| `crop_info` | Agronomic detail card (season, soil type, water needs, farmer tips, NPK profile) |
| `input_summary` | Echo of each input value with unit and an "Optimal / Above / Below average" status badge |
| `timestamp` | Date and time of the prediction |

### Supported Crops (22 classes)

Apple, Banana, Blackgram, Chickpea, Coconut, Coffee, Cotton, Grapes, Jute, Kidney Beans, Lentil, Maize, Mango, Moth Beans, Mung Bean, Muskmelon, Orange, Papaya, Pigeon Peas, Pomegranate, Rice, Watermelon.

---

## 5. Dataset

- **File:** `data/dataset/Crop_recommendation.csv`
- **Records:** 2,200 rows (100 samples per crop × 22 crops)
- **Features:** N, P, K, temperature, humidity, ph, rainfall, label
- **Source:** Kaggle — the exact dataset page and uploader are not known

---

## 6. Model Performance

Evaluated on a held-out test set of 440 samples (20 per class).

| Metric | Value |
|---|---|
| Test Accuracy | **97.5 %** |
| Test Loss | 0.0563 |
| Macro Precision | 0.98 |
| Macro Recall | 0.97 |
| Macro F1-Score | 0.97 |

**Architecture:** Keras Sequential neural network trained with `StandardScaler` feature normalisation and `LabelEncoder` class mapping. Trained model artefacts are stored as:

- `models/crop_recommendation_model.keras`
- `models/scaler.pkl`
- `models/label_encoder.pkl`

Full per-class metrics are in [`results/model_metrics.txt`](results/model_metrics.txt).

---

## 7. Tech Stack

**Backend**
- Python 3.12
- Flask 3.x + Flask-CORS
- TensorFlow / Keras 2.15+
- scikit-learn, NumPy, pandas, joblib
- SHAP 0.43+ (optional; endpoint degrades gracefully if absent)

**Frontend**
- React 19 + Vite 6
- Tailwind CSS 4
- Chart.js / react-chartjs-2
- Lucide React icons

---

## 8. Folder Structure

```
Crop_Pred/
├── app.py                        # Flask backend — all API routes
├── serve_frontend.py             # Alternative static server + API proxy (no npm needed)
├── run.bat                       # One-click launcher (opens backend + frontend in separate windows)
├── requirements.txt              # Python dependencies (pip install)
├── requirement.txt               # Legacy requirements file (superseded by requirements.txt)
├── .env.example                  # Environment variable template — copy to .env
│
├── data/
│   └── dataset/
│       └── Crop_recommendation.csv   # Training dataset (2,200 rows, 7 features + label)
│
├── models/
│   ├── crop_recommendation_model.keras  # Trained Keras model
│   ├── scaler.pkl                       # Fitted StandardScaler
│   └── label_encoder.pkl               # Fitted LabelEncoder (22 crop classes)
│
├── results/
│   ├── model_metrics.txt            # Test accuracy, loss, and per-class classification report
│   ├── crop_recommendations.csv     # Sample output records
│   └── prediction_history.json      # Runtime: last 50 predictions (auto-created)
│
├── notebooks/
│   └── crop_recommendation.ipynb   # Jupyter notebook used to train and evaluate the model
│
├── frontend/                        # React + Vite single-page application
│   ├── src/
│   │   ├── App.jsx                  # Root component and page layout
│   │   ├── api.js                   # Axios/fetch calls to Flask API
│   │   ├── components/              # UI components (form, result, charts, catalogue, history…)
│   │   ├── context/                 # LanguageContext for i18n
│   │   ├── data/                    # Crop video IDs and static data
│   │   └── i18n/                    # 17-language translation strings
│   ├── dist/                        # Pre-built production bundle (served by serve_frontend.py)
│   ├── package.json
│   └── vite.config.js
│
├── project_documentation/
│   ├── AgriSmart_AI_Project_Synopsis.pdf
│   ├── AgriSmart_AI_Project_Presentation.pptx
│   ├── diagrams/                    # System architecture, prediction workflow, evaluation charts
│   └── screenshots/                 # UI screenshots of each major view
│
└── tests/                           # Test scripts
```

---

## 9. Prerequisites

| Requirement | Minimum version | Notes |
|---|---|---|
| Python | 3.10+ | Tested on 3.12 |
| pip | Bundled with Python | — |
| Node.js | 18+ | Only needed if you want to rebuild the frontend from source |
| npm | Bundled with Node.js | Only needed for frontend dev / rebuild |

> **The `frontend/dist/` folder is already included in the repository.** If you only want to run the application you do **not** need Node.js — use `serve_frontend.py` instead of `npm run dev`.

---

## 10. Windows Setup and Run Instructions

### Option A — Quick start with `run.bat` (recommended for development)

This option runs the Vite dev server and requires Node.js.

#### Step 1 — Clone or download the project

```bat
cd C:\path\to\your\projects
:: place or clone the Crop_Pred folder here
cd Crop_Pred
```

#### Step 2 — Create and activate the Python virtual environment

```bat
python -m venv venv
venv\Scripts\activate
```

#### Step 3 — Install Python dependencies

```bat
pip install -r requirements.txt
```

> SHAP is optional. If it fails to install, remove or comment out its entry in `requirements.txt`, then run `pip install -r requirements.txt` again. The app will use its fallback explanation when SHAP is unavailable.

#### Step 4 — Configure environment variables

```bat
copy .env.example .env
```

Open `.env` in any text editor. The defaults (`PORT=5000`, `FLASK_DEBUG=False`) work as-is for local use. Add optional API keys only if you need the weather or AI assistant features.

#### Step 5 — Install frontend dependencies

```bat
cd frontend
npm install
cd ..
```

#### Step 6 — Launch both servers

```bat
run.bat
```

Two new Command Prompt windows open:

- **AgriSmart AI - Backend** — Flask API on `http://127.0.0.1:5000`
- **AgriSmart AI - Frontend** — Vite dev server on `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

### Option B — Pre-built frontend (no Node.js required)

Use this if you do not have Node.js installed or just want to run the app from the included production build.

#### Steps 1 – 4 are identical to Option A.

#### Step 5 — Start the Flask backend

Open a Command Prompt in the project root and run:

```bat
venv\Scripts\activate
python app.py
```

The backend starts on `http://127.0.0.1:5000`.

#### Step 6 — Start the static frontend server

Open a **second** Command Prompt in the project root and run:

```bat
venv\Scripts\activate
python serve_frontend.py
```

This serves the pre-built `frontend/dist/` bundle and proxies all `/api/*` calls to the Flask backend.

Open `http://localhost:5173` in your browser.

---

### Rebuilding the frontend (optional)

Only needed if you modify source files in `frontend/src/`.

```bat
cd frontend
npm install
npm run build
cd ..
```

The updated bundle is written to `frontend/dist/` and picked up automatically by `serve_frontend.py`.

---

## 11. Environment Variables

Copy `.env.example` to `.env` before running. Do **not** commit `.env` to version control.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Flask backend port |
| `FLASK_DEBUG` | `False` | Set `True` only during local development |
| `OPENWEATHER_API_KEY` | *(unset)* | Optional — OpenWeatherMap API key for weather integration |
| `GEMINI_API_KEY` | *(unset)* | Optional — Google Gemini key for AI assistant feature |
| `OPENAI_API_KEY` | *(unset)* | Optional — OpenAI key for AI assistant feature |

---

## 12. API Reference

All endpoints are served by the Flask backend on port 5000.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Model readiness check — returns loaded status and accuracy |
| `POST` | `/api/predict` | Main inference endpoint (see §4 for request/response shape) |
| `GET` | `/api/analytics` | Dataset statistics, feature distributions, and model metrics |
| `POST` | `/api/explain` | SHAP feature-importance values for a given input |
| `GET` | `/api/history` | Retrieve the last 50 prediction records |
| `DELETE` | `/api/history` | Clear saved prediction history |
| `GET` | `/api/catalogue` | Full crop catalogue with agronomic details and dataset stats |
| `GET` | `/api/samples` | Pre-loaded soil profiles for quick-fill in the UI |

---

## 13. Notes and Limitations

- Predictions are based entirely on the training dataset's statistical patterns. They are **not** a substitute for a soil laboratory test or advice from a local agricultural extension officer.
- The model was trained and evaluated on a balanced dataset of 2,200 samples. Performance may differ for soil profiles that fall outside the dataset's distribution.
- The SHAP explanation endpoint requires the `shap` package. If it is not installed the endpoint returns a gradient-based feature-importance approximation instead.
- Prediction history is stored in `results/prediction_history.json` (plain text, no database required). The file is capped at 50 entries.
- The `venv/` directory and `frontend/node_modules/` are excluded from version control via `.gitignore`.
