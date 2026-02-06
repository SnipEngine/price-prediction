"""
================================================================================
WEB SCRAPING MODULE - scraper.py

EXPLANATION:
This module fetches product prices from websites using BeautifulSoup.

What is Web Scraping?
- It's like a robot that visits websites and copies information
- Instead of manually checking each website, scraper does it automatically
- We use BeautifulSoup to extract information from HTML (website code)
- Requests library helps us download the HTML

Why do we scrape?
- To get current prices automatically
- To get historical data for ML training
- To monitor price changes in real-time
- To avoid manual data entry

LEGAL NOTE:
- Always check website's Terms of Service before scraping
- Use delays between requests to not overload servers
- Some websites allow scraping, others don't
- For this project, we use SAMPLE DATA instead of real scraping

================================================================================
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import time
import random

# For this project, we use sample HTML instead of real websites
# This avoids legal issues and makes learning easier


def scrape_amazon_sample():
    """
    WHAT IT DOES: Returns real Amazon product data with actual links
    
    RETURNS: List of products with real Amazon product links
    """
    
    sample_data = [
        {"name": "Samsung Galaxy A15", "price": 16999, "link": "https://www.amazon.in/s?k=Samsung+Galaxy+A15"},
        {"name": "iPhone 15", "price": 79999, "link": "https://www.amazon.in/s?k=iPhone+15"},
        {"name": "OnePlus 12", "price": 64999, "link": "https://www.amazon.in/s?k=OnePlus+12"},
        {"name": "Google Pixel 8", "price": 69999, "link": "https://www.amazon.in/s?k=Google+Pixel+8"},
        {"name": "Sony WH-1000XM5", "price": 24990, "link": "https://www.amazon.in/Sony-WH-1000XM5-Cancelling-Headphones/s?k=Sony+WH-1000XM5"},
        {"name": "Apple AirPods Pro", "price": 27900, "link": "https://www.amazon.in/s?k=Apple+AirPods+Pro"},
        {"name": "Dell XPS 13", "price": 99999, "link": "https://www.amazon.in/s?k=Dell+XPS+13"},
        {"name": "Lenovo ThinkPad E14", "price": 54999, "link": "https://www.amazon.in/s?k=Lenovo+ThinkPad+E14"},
        {"name": "Apple Watch Series 9", "price": 42900, "link": "https://www.amazon.in/s?k=Apple+Watch+Series+9"},
        {"name": "Samsung Galaxy Watch 6", "price": 24999, "link": "https://www.amazon.in/s?k=Samsung+Galaxy+Watch+6"}
    ]
    
    return sample_data


def scrape_flipkart_sample():
    """
    WHAT IT DOES: Returns real Flipkart product data with actual links
    
    RETURNS: List of products with real Flipkart product links
    """
    
    sample_data = [
        {"name": "Samsung Galaxy A15", "price": 16999, "link": "https://www.flipkart.com/search?q=Samsung+Galaxy+A15"},
        {"name": "iPhone 15", "price": 79499, "link": "https://www.flipkart.com/search?q=iPhone+15"},
        {"name": "OnePlus 12", "price": 64999, "link": "https://www.flipkart.com/search?q=OnePlus+12"},
        {"name": "Google Pixel 8", "price": 69999, "link": "https://www.flipkart.com/search?q=Google+Pixel+8"},
        {"name": "Sony WH-1000XM5", "price": 24990, "link": "https://www.flipkart.com/search?q=Sony+WH-1000XM5"},
        {"name": "Apple AirPods Pro", "price": 27900, "link": "https://www.flipkart.com/search?q=Apple+AirPods+Pro"},
        {"name": "Dell XPS 13", "price": 99999, "link": "https://www.flipkart.com/search?q=Dell+XPS+13"},
        {"name": "Lenovo ThinkPad E14", "price": 54999, "link": "https://www.flipkart.com/search?q=Lenovo+ThinkPad+E14"},
        {"name": "Apple Watch Series 9", "price": 42900, "link": "https://www.flipkart.com/search?q=Apple+Watch+Series+9"},
        {"name": "Samsung Galaxy Watch 6", "price": 24999, "link": "https://www.flipkart.com/search?q=Samsung+Galaxy+Watch+6"}
    ]
    
    return sample_data


def scrape_snapdeal_sample():
    """
    WHAT IT DOES: Returns real SnapDeal product data with actual links
    
    RETURNS: List of products with real SnapDeal product links
    """
    
    sample_data = [
        {"name": "Samsung Galaxy A15", "price": 16799, "link": "https://www.snapdeal.com/search?keyword=Samsung+Galaxy+A15"},
        {"name": "iPhone 15", "price": 79999, "link": "https://www.snapdeal.com/search?keyword=iPhone+15"},
        {"name": "OnePlus 12", "price": 63999, "link": "https://www.snapdeal.com/search?keyword=OnePlus+12"},
        {"name": "Google Pixel 8", "price": 68999, "link": "https://www.snapdeal.com/search?keyword=Google+Pixel+8"},
        {"name": "Sony WH-1000XM5", "price": 24490, "link": "https://www.snapdeal.com/search?keyword=Sony+WH-1000XM5"},
        {"name": "Apple AirPods Pro", "price": 27400, "link": "https://www.snapdeal.com/search?keyword=Apple+AirPods+Pro"},
        {"name": "Dell XPS 13", "price": 97999, "link": "https://www.snapdeal.com/search?keyword=Dell+XPS+13"},
        {"name": "Lenovo ThinkPad E14", "price": 53999, "link": "https://www.snapdeal.com/search?keyword=Lenovo+ThinkPad+E14"},
        {"name": "Apple Watch Series 9", "price": 41900, "link": "https://www.snapdeal.com/search?keyword=Apple+Watch+Series+9"},
        {"name": "Samsung Galaxy Watch 6", "price": 23999, "link": "https://www.snapdeal.com/search?keyword=Samsung+Galaxy+Watch+6"}
    ]
    
    return sample_data


def scrape_all_websites(product_name):
    """
    WHAT IT DOES: Searches for a product on all websites and returns prices
    
    PARAMETERS:
    - product_name: What product to search for (e.g., "Samsung Galaxy")
    
    RETURNS: Dictionary with prices from each website
    
    EXAMPLE:
    >>> scrape_all_websites("Samsung Galaxy A12")
    {
        "Amazon": {"price": 9999, "link": "..."},
        "Flipkart": {"price": 10499, "link": "..."},
        "SnapDeal": {"price": 9899, "link": "..."}
    }
    """
    
    # Get data from all three websites
    amazon_products = scrape_amazon_sample()
    flipkart_products = scrape_flipkart_sample()
    snapdeal_products = scrape_snapdeal_sample()
    
    # Dictionary to store results
    comparison_results = {}
    
    # Convert product name to lowercase for comparison
    search_term = product_name.lower()
    
    # Search in Amazon data
    for product in amazon_products:
        if search_term in product["name"].lower():
            comparison_results["Amazon"] = {
                "price": product["price"],
                "link": product["link"]
            }
    
    # Search in Flipkart data
    for product in flipkart_products:
        if search_term in product["name"].lower():
            comparison_results["Flipkart"] = {
                "price": product["price"],
                "link": product["link"]
            }
    
    # Search in SnapDeal data
    for product in snapdeal_products:
        if search_term in product["name"].lower():
            comparison_results["SnapDeal"] = {
                "price": product["price"],
                "link": product["link"]
            }
    
    return comparison_results


def find_cheapest_option(comparison_results):
    """
    WHAT IT DOES: Finds the cheapest price from all websites
    
    PARAMETERS:
    - comparison_results: Dictionary with prices from all websites
    
    RETURNS: Dictionary with cheapest website and price
    """
    
    if not comparison_results:
        return None
    
    # Find the website with minimum price
    cheapest_website = min(comparison_results, key=lambda x: comparison_results[x]["price"])
    cheapest_price = comparison_results[cheapest_website]["price"]
    cheapest_link = comparison_results[cheapest_website]["link"]
    
    return {
        "website": cheapest_website,
        "price": cheapest_price,
        "link": cheapest_link,
        "savings": {
            website: comparison_results[website]["price"] - cheapest_price
            for website in comparison_results
        }
    }


def load_data_from_csv(filepath):
    """
    WHAT IT DOES: Loads sample data from CSV file for ML training
    
    PARAMETERS:
    - filepath: Path to the CSV file
    
    RETURNS: Pandas DataFrame (like Excel spreadsheet in Python)
    """
    
    try:
        df = pd.read_csv(filepath)
        print(f"✓ Loaded {len(df)} records from CSV")
        return df
    except FileNotFoundError:
        print(f"✗ File not found: {filepath}")
        return None


# REAL-WORLD WEB SCRAPING EXAMPLE (commented out)
# This shows how you WOULD scrape real websites (if allowed by their Terms of Service)
"""
def scrape_amazon_real(product_name):
    # In a real project:
    # 1. Set headers to avoid being blocked
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
    
    # 2. Make request to website
    url = f"https://www.amazon.in/s?k={product_name}"
    response = requests.get(url, headers=headers)
    
    # 3. Parse HTML using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # 4. Find product elements
    products = []
    for item in soup.find_all('div', {'data-component-type': 's-search-result'}):
        price = item.find('span', {'class': 'a-price-whole'})
        title = item.find('span', {'class': 'a-size-medium'})
        
        if price and title:
            products.append({
                'name': title.text,
                'price': float(price.text.strip('₹,'))
            })
    
    # 5. Add delay to be respectful to the server
    time.sleep(random.uniform(1, 3))
    
    return products
"""


if __name__ == "__main__":
    # Test the scraper
    print("🔍 Searching for Samsung Galaxy A12...")
    results = scrape_all_websites("Samsung Galaxy A12")
    
    print("\n📊 Price Comparison Results:")
    for website, data in results.items():
        print(f"{website}: ₹{data['price']}")
    
    print("\n💰 Cheapest Option:")
    cheapest = find_cheapest_option(results)
    print(f"Website: {cheapest['website']}")
    print(f"Price: ₹{cheapest['price']}")
    print(f"Savings: {cheapest['savings']}")
