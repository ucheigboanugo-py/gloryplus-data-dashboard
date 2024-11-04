import requests
import pandas as pd

def fetch_instagram_data():
    user_id = "YourInstagramUserID"
    access_token = "YOUR_ACCESS_TOKEN"
    url = f"https://graph.instagram.com/{user_id}/insights?metric=audience_city&period=lifetime&access_token={access_token}"
    
    response = requests.get(url).json()
    audience_cities = response['data'][0]['values'][0]['value']  # City-level audience data
    
    data = [{'city': city, 'audience_count': count} for city, count in audience_cities.items()]
    
    df = pd.DataFrame(data)
    df.to_csv('data/social_media.csv', mode='a', header=False, index=False)
