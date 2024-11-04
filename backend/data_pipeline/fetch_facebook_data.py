import requests
import pandas as pd

def fetch_facebook_data():
    page_id = "YourPageID"
    access_token = "YOUR_ACCESS_TOKEN"
    url = f"https://graph.facebook.com/v12.0/{page_id}/insights?metric=page_impressions_by_country_unique&access_token={access_token}"
    
    response = requests.get(url).json()
    impressions = response['data'][0]['values']  # Contains country-level impressions
    
    # Transform impressions data to store with date for tracking
    data = [{'date': item['end_time'], 'country': country, 'impressions': count}
            for item in impressions for country, count in item['value'].items()]
    
    df = pd.DataFrame(data)
    df.to_csv('data/social_media.csv', mode='a', header=False, index=False)
