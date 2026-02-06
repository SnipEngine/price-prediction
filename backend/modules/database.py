"""
================================================================================
DATABASE MODULE - database.py

EXPLANATION:
This module handles all database operations using SQLite.
SQLite is a lightweight database perfect for beginners - no server needed!

What is SQLite?
- A simple database that stores data in a single file
- No need to install complex database servers
- Perfect for learning and small projects
- Data is stored locally on your computer

What are Tables?
- Tables are like spreadsheets with rows and columns
- Each row represents a record (one product price entry)
- Each column represents a field (product_name, price, date, etc.)

Why use a database?
- To store historical data permanently
- To compare prices across different websites
- To train ML models on historical prices
- To avoid losing data when the program stops

================================================================================
"""

import sqlite3
from datetime import datetime
import os

# Path where the database file will be created
DATABASE_PATH = "price_comparison.db"


def initialize_database():
    """
    WHAT IT DOES: Creates database tables when the program first runs
    
    EXPLANATION:
    - Connects to SQLite database (creates it if doesn't exist)
    - Creates 3 tables: products, prices, and predictions
    - If tables already exist, this function does nothing
    """
    
    # Connect to database (creates file if it doesn't exist)
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    # Table 1: PRODUCTS
    # Stores information about products
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT NOT NULL,
            category TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Table 2: PRICES
    # Stores price history of products from different websites
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS prices (
            price_id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            website TEXT NOT NULL,
            price REAL NOT NULL,
            website_link TEXT,
            recorded_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    """)
    
    # Table 3: PREDICTIONS
    # Stores ML predictions for future prices
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            prediction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            predicted_price REAL NOT NULL,
            predicted_date DATE NOT NULL,
            model_accuracy REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    """)
    
    # Save all changes to database
    connection.commit()
    connection.close()
    print("✓ Database initialized successfully!")


def add_product(product_id, product_name, category):
    """
    WHAT IT DOES: Adds a new product to the database
    
    PARAMETERS:
    - product_id: Unique ID for the product
    - product_name: Name of the product (e.g., "Samsung Galaxy A12")
    - category: Category of the product (e.g., "Electronics")
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO products (product_id, product_name, category)
            VALUES (?, ?, ?)
        """, (product_id, product_name, category))
        
        connection.commit()
        return True
    except sqlite3.IntegrityError:
        # Product already exists, no problem
        return False
    finally:
        connection.close()


def add_price(product_id, website, price, recorded_date, website_link=None):
    """
    WHAT IT DOES: Adds a price record for a product from a website
    
    PARAMETERS:
    - product_id: Which product this price belongs to
    - website: Which website (Amazon, Flipkart, etc.)
    - price: The actual price
    - recorded_date: When was this price recorded (YYYY-MM-DD format)
    - website_link: Full URL/link to the product on the website
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("""
        INSERT INTO prices (product_id, website, price, website_link, recorded_date)
        VALUES (?, ?, ?, ?, ?)
    """, (product_id, website, price, website_link, recorded_date))
    
    connection.commit()
    connection.close()


def get_product_prices(product_id):
    """
    WHAT IT DOES: Retrieves all prices for a specific product
    
    RETURNS: List of dictionaries with price information including links
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("""
        SELECT website, price, website_link, recorded_date FROM prices
        WHERE product_id = ?
        ORDER BY recorded_date DESC
    """, (product_id,))
    
    rows = cursor.fetchall()
    connection.close()
    
    # Convert to list of dictionaries for easier use
    prices = [
        {
            "website": row[0],
            "price": row[1],
            "link": row[2],
            "date": row[3]
        }
        for row in rows
    ]
    
    return prices


def get_prices_for_date(product_id, date):
    """
    WHAT IT DOES: Gets prices for a specific product on a specific date
    
    RETURNS: Dictionary with website and prices
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("""
        SELECT website, price FROM prices
        WHERE product_id = ? AND recorded_date = ?
    """, (product_id, date))
    
    rows = cursor.fetchall()
    connection.close()
    
    return {row[0]: row[1] for row in rows}


def get_all_products():
    """
    WHAT IT DOES: Retrieves all products from database
    
    RETURNS: List of all products
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("SELECT product_id, product_name, category FROM products")
    rows = cursor.fetchall()
    connection.close()
    
    products = [
        {
            "product_id": row[0],
            "product_name": row[1],
            "category": row[2]
        }
        for row in rows
    ]
    
    return products


def save_prediction(product_id, predicted_price, predicted_date, model_accuracy):
    """
    WHAT IT DOES: Saves ML model's price prediction to database
    
    PARAMETERS:
    - product_id: Which product is being predicted
    - predicted_price: What the model predicts the price will be
    - predicted_date: On what date this price is predicted
    - model_accuracy: How accurate the model is (0-100 scale)
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("""
        INSERT INTO predictions (product_id, predicted_price, predicted_date, model_accuracy)
        VALUES (?, ?, ?, ?)
    """, (product_id, predicted_price, predicted_date, model_accuracy))
    
    connection.commit()
    connection.close()


def get_predictions(product_id):
    """
    WHAT IT DOES: Retrieves all predictions for a product
    
    RETURNS: List of predictions
    """
    
    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()
    
    cursor.execute("""
        SELECT predicted_price, predicted_date, model_accuracy
        FROM predictions
        WHERE product_id = ?
        ORDER BY predicted_date DESC
    """, (product_id,))
    
    rows = cursor.fetchall()
    connection.close()
    
    predictions = [
        {
            "predicted_price": row[0],
            "predicted_date": row[1],
            "model_accuracy": row[2]
        }
        for row in rows
    ]
    
    return predictions


if __name__ == "__main__":
    initialize_database()
