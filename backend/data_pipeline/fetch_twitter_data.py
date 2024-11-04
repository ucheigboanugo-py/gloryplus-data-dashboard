import tweepy
import pandas as pd

def fetch_twitter_data():
    auth = tweepy.OAuthHandler('API_KEY', 'API_SECRET_KEY')
    auth.set_access_token('ACCESS_TOKEN', 'ACCESS_TOKEN_SECRET')
    api = tweepy.API(auth)

    tweets = api.user_timeline(screen_name="YourChurchAccount", count=100, tweet_mode="extended")
    data = [{
        'created_at': tweet.created_at, 
        'text': tweet.full_text, 
        'location': tweet.user.location  # User-provided location
    } for tweet in tweets]
    
    df = pd.DataFrame(data)
    df.to_csv('data/social_media.csv', mode='a', header=False, index=False)
