# backend/predictive_model.py
from prophet import Prophet
import pandas as pd
import numpy as np

# Sample data loading
historical_data = pd.DataFrame({
    'ds': pd.date_range(start='2023-01-01', periods=52, freq='W'),
    'y': np.random.randint(300, 500, 52)  # Example attendance numbers
})

def predict_attendance():
    model = Prophet()
    model.fit(historical_data)
    future = model.make_future_dataframe(periods=12, freq='M')  # 12 months forecast
    forecast = model.predict(future)
    forecast_data = forecast[['ds', 'yhat']].tail(12)  # Keep last 12 months
    return forecast_data.to_dict(orient='records')

