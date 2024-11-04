from googleapiclient.discovery import build
import pandas as pd

def fetch_youtube_data():
    api_key = "YOUR_API_KEY"
    youtube = build('youtube', 'v3', developerKey=api_key)

    # Use Analytics API to get country-level viewer data
    request = youtube.analytics().reports().query(
        ids="channel==MINE",
        startDate="2023-01-01",
        endDate="2023-12-31",
        metrics="viewerPercentage",
        dimensions="country",
    )
    response = request.execute()

    data = [{'country': item['country'], 'viewer_percentage': item['viewerPercentage']} 
            for item in response['rows']]
    
    df = pd.DataFrame(data)
    df.to_csv('data/social_media.csv', mode='a', header=False, index=False)
