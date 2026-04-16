import pandas as pd
import numpy as np

def generate_aerospace_data(num_samples=2000):
    np.random.seed(42)
    
    zones = ['Fuselage', 'Wing Root', 'Wing Tip', 'Tail Fin']
    data = []

    for _ in range(num_samples):
        zone = np.random.choice(zones)
        
        # Base physical parameters
        stress = np.random.uniform(10, 400)
        vibration = np.random.uniform(0.5, 30)
        fatigue = np.random.uniform(5, 250)
        
        # Calculate risk based on the SPECIFIC zone's tolerance
        risk_score = 0
        
        if zone == 'Fuselage':
            # Highly stable, low vibration tolerance
            risk_score = (stress * 0.1) + (vibration * 2.5) + (fatigue * 0.2)
        elif zone == 'Wing Root':
            # Built for high stress, but vulnerable to extreme fatigue
            risk_score = (stress * 0.05) + (vibration * 1.5) + (fatigue * 0.4)
        elif zone == 'Wing Tip':
            # High vibration expected, low stress tolerance
            risk_score = (stress * 0.3) + (vibration * 0.8) + (fatigue * 0.3)
        elif zone == 'Tail Fin':
            # Balanced vulnerability
            risk_score = (stress * 0.2) + (vibration * 1.8) + (fatigue * 0.3)
            
        # Add some random noise for realistic ML training
        risk_score += np.random.normal(0, 5)
        
        # Clamp score between 0 and 100
        risk_score = max(0, min(100, risk_score))
        
        data.append([zone, stress, vibration, fatigue, risk_score])

    df = pd.DataFrame(data, columns=['Airframe_Zone', 'Stress_MPa', 'Vibration_mm', 'Fatigue_Life_Cycles', 'Failure_Risk_Score'])
    df.to_csv('hydraulic_routing_data.csv', index=False)
    print(f"✅ Generated {num_samples} part-specific data points in 'hydraulic_routing_data.csv'")

if __name__ == "__main__":
    generate_aerospace_data()