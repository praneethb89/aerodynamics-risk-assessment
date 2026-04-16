# AeroDynamics Risk Assessment Engine

![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688)
![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-F7931E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

An enterprise-grade, end-to-end Machine Learning pipeline and telemetry dashboard designed to predict localized structural failure risks in aerospace components.

## 🚀 System Architecture

Unlike traditional monolithic assessments, this V2 architecture evaluates risk based on **part-specific structural tolerances** (e.g., Wing Root vs. Fuselage).

1. **Synthetic Physics Generation:** Built a custom data generator to model 2,000 flight profiles, injecting controlled Gaussian noise to simulate real-world sensor inaccuracies.
2. **Machine Learning Pipeline:** Implemented a Scikit-Learn Pipeline utilizing `One-Hot Encoding` for categorical airframe zones, feeding into a `Random Forest Regressor`. 
3. **High-Performance API:** Deployed the trained `.pkl` model via a FastAPI backend, resolving complex physics inferences in under 20 milliseconds.
4. **Interactive Telemetry UI:** Developed a responsive React dashboard with Framer Motion data visualization, stateful session auditing, and automated PDF reporting using `jsPDF`.

## ✨ Key Features

* **Zone-Specific AI:** The model dynamically adjusts its failure thresholds based on the selected airframe zone.
* **Explainable AI (XAI):** Achieved an R-Squared accuracy of 93.38% with clear feature importance mapping (68% Fatigue Cycles, 24% Vibration, 8% Static Stress).
* **Live Audit Trail:** Maintains a stateful history of all simulation parameters and outcomes during a session.
* **Automated Reporting:** Generates downloadable, branded PDF engineering reports instantly from the session state.

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide-React
* **Backend:** Python, FastAPI, Uvicorn
* **Data Science:** Pandas, NumPy, Scikit-Learn, Joblib
* **Utilities:** jsPDF (Reporting)

## 💻 Local Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/aerodynamics-risk-assessment.git](https://github.com/yourusername/aerodynamics-risk-assessment.git)