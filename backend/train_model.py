import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import joblib

print("Loading dataset...")
df = pd.read_csv('hydraulic_routing_data.csv')

# 1. Define Features (X) and Target (y)
# Notice we now include the text-based 'Airframe_Zone'
X = df[['Airframe_Zone', 'Stress_MPa', 'Vibration_mm', 'Fatigue_Life_Cycles']]
y = df['Failure_Risk_Score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Build the Preprocessing Transformer
# This automatically converts 'Fuselage', 'Wing Root', etc. into mathematical binary columns
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['Airframe_Zone'])
    ],
    remainder='passthrough' # Leave the numeric columns (Stress, Vib, Fatigue) alone
)

# 3. Create the Production Pipeline
print("Compiling and training the ML Pipeline...")
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train the entire pipeline at once
pipeline.fit(X_train, y_train)

# 4. Evaluate Performance
predictions = pipeline.predict(X_test)
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\n--- Model Performance ---")
print(f"Mean Squared Error: {mse:.2f}")
print(f"Accuracy (R-Squared): {r2 * 100:.2f}%")

# 5. Export the Pipeline
joblib.dump(pipeline, 'aerodynamics_pipeline.pkl')
print("\n✅ Production pipeline saved successfully as 'aerodynamics_pipeline.pkl'!")