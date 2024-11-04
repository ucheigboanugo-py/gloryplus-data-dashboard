# backend/sentiment_analysis.py
import pandas as pd
import pickle

# Load the sentiment analysis model
with open('models/sentiment_model.pkl', 'rb') as f:
    sentiment_model = pickle.load(f)

def analyze_feedback_sentiment(feedback_list):
    predictions = [sentiment_model.predict([feedback])[0] for feedback in feedback_list]
    return predictions

def analyze_social_media_sentiment():
    # Load social media data
    social_data = pd.read_csv('data/social_media_data.csv')
    sentiment_scores = [sentiment_model.predict([text])[0] for text in social_data['Content']]
    return sentiment_scores
