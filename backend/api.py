from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

# 1. Initialize the API
app = FastAPI()

# Allow React to communicate with this API from anywhere (Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load the Production ML Pipeline
print("Loading AI Engine...")
pipeline = joblib.load('aerodynamics_pipeline.pkl')

# 3. Define the new Data Structure
class FlightData(BaseModel):
    zone: str
    stress: float
    vibration: float
    fatigue: float

@app.get("/")
def home():
    return {"status": "AeroDynamics v2 Engine Online"}

@app.post("/predict")
def predict_risk(data: FlightData):
    # Convert the incoming JSON into a Pandas DataFrame
    input_df = pd.DataFrame({
        'Airframe_Zone': [data.zone],
        'Stress_MPa': [data.stress],
        'Vibration_mm': [data.vibration],
        'Fatigue_Life_Cycles': [data.fatigue]
    })
    
    # Pass the DataFrame through the pipeline
    prediction = pipeline.predict(input_df)[0]
    
    # Ensure the score stays within 0-100 bounds
    final_score = max(0, min(100, prediction))
    
    return {"risk_score": round(final_score, 2)}