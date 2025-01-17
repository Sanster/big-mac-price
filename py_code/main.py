import pandas as pd

headers = [
    "name",
    "iso_a3",  # iso code of the country
    "currency_code",  # currency code of the country
    "local_price",  # local price of the Big Mac in the country
    "dollar_ex",  # dollar exchange rate
    "GDP_dollar",
    "GDP_local",
    "date",
]

target_date = "2024-07-01"

df = pd.read_csv("big-mac-source-data-v2.csv")

df = df[df["date"] == target_date]

print(len(df))

print(df.head())

# convert to json
df.to_json("big-mac-index.json", orient="records")
