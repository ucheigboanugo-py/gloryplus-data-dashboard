# data_pipeline/store_data.py

import pandas as pd
from sqlalchemy import create_engine

def store_data_in_db(data_path):
    engine = create_engine('sqlite:///data/social_data.db')  # Change to your DB type
    data = pd.read_csv(data_path)
    data.to_sql('social_media_data', engine, if_exists='replace', index=False)

if __name__ == "__main__":
    store_data_in_db("data/processed/social_data_cleaned.csv")
