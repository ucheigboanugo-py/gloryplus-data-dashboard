import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# Directory to save the model
model_dir = os.path.join('backend', 'models')
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# Sample training data for sentiment analysis (positive and negative feedback examples)
data = [
    ("I love this church service!", "positive"),
    ("The experience was very uplifting.", "positive"),
    ("I enjoyed the message today.", "positive"),
    ("The event was poorly organized.", "negative"),
    ("I am not satisfied with the sermon.", "negative"),
    ("There were too many distractions.", "negative")
]

# Splitting data into features (X) and labels (y)
X, y = zip(*data)

# Train-test split (optional, useful for validating performance if you expand the dataset)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Building a pipeline with CountVectorizer and Naive Bayes classifier
model = make_pipeline(CountVectorizer(), MultinomialNB())

# Train the model
model.fit(X_train, y_train)

# Save the trained model as 'sentiment_model.pkl' in the 'backend/models' directory
model_path = os.path.join(model_dir, 'sentiment_model.pkl')
joblib.dump(model, model_path)

print(f"Model saved successfully at {model_path}")
