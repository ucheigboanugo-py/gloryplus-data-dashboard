# backend/app.py
from flask import Flask, jsonify, request, render_template
import pandas as pd
import os
import joblib  # Import joblib to load the .pkl model

# Initialize the Flask app
app = Flask(__name__)

model_path = r"C:\Users\User\gloryplus-dashboard\gloryplus-data-dashboard\backend\models\sentiment_model.pkl"

# Load the sentiment model
sentiment_model = joblib.load(model_path)

# Route for dashboard home page
@app.route('/')
def dashboard():
    return render_template('dashboard.html')

# Attendance Prediction Route
@app.route('/predict_attendance', methods=['GET'])
def get_attendance_prediction():
    predictions = predict_attendance()
    return jsonify(predictions)

# Feedback Sentiment Analysis Route
@app.route('/analyze_sentiment', methods=['POST'])
def get_feedback_sentiment():
    data = request.get_json()
    feedback_data = data.get('feedback')
    if not feedback_data:
        return jsonify({"error": "Feedback data is required"}), 400

    # Use the sentiment_model to predict sentiment
    predictions = sentiment_model.predict([feedback_data])[0]  # Predict for a single feedback input
    return jsonify({"predicted_sentiment": predictions})

# Social Media Sentiment Analysis Route
@app.route('/social_media_analysis', methods=['GET'])
def get_social_media_sentiment():
    df = pd.read_csv('data/social_media.csv')
    
    # Group data by country and city, aggregating engagement count for map data
    location_data = df.groupby(['country', 'city']).size().reset_index(name='engagement_count')
    
    # Analyze social media sentiment
    predictions = analyze_social_media_sentiment()  # This function should be defined in sentiment_analysis.py
    
    return jsonify({
        "sentiment_analysis": predictions,
        "location_data": location_data.to_dict(orient="records")  # Send location data for the map
    })

# Follow-Up Tracking Route
@app.route('/track_followup', methods=['POST'])
def track_followup():
    data = request.get_json()
    member_id = data.get('member_id')
    action = data.get('action')

    if not member_id or not action:
        return jsonify({"error": "Both 'member_id' and 'action' are required"}), 400

    # Load follow-up data, append new entry, and save
    followup_path = os.path.join('data', 'followup.csv')
    followup_data = pd.read_csv(followup_path) if os.path.exists(followup_path) else pd.DataFrame(columns=['member_id', 'action'])
    followup_data = pd.concat([followup_data, pd.DataFrame([{'member_id': member_id, 'action': action}])], ignore_index=True)
    followup_data.to_csv(followup_path, index=False)
    
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
