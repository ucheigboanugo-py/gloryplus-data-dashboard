# data_pipeline/process_data.py

import pandas as pd
import os

def clean_and_process_data(file_path):
    data = pd.read_csv(file_path)
    data.drop_duplicates(inplace=True)
    # Additional cleaning, e.g., standardizing location or sentiment scoring
    return data

def save_processed_data(data, output_path):
    data.to_csv(output_path, index=False)

if __name__ == "__main__":
    input_path = "data/raw/social_data.csv"
    output_path = "data/processed/social_data_cleaned.csv"
    data = clean_and_process_data(input_path)
    save_processed_data(data, output_path)
