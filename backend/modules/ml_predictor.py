"""
================================================================================
MACHINE LEARNING MODULE - ml_predictor.py

EXPLANATION:
This module handles all machine learning operations for price prediction.

What is Machine Learning?
- It's when computers LEARN from data instead of being told what to do
- The program finds patterns in old data to predict the future
- Like learning from history to predict what will happen next

What is Regression?
- A type of ML that predicts continuous numbers (like prices)
- Not like classification which predicts categories (like "expensive" or "cheap")
- Perfect for price prediction!

Why Linear Regression?
- SIMPLEST ML algorithm - great for beginners
- FAST - trains in seconds
- INTERPRETABLE - we can understand why it predicts what it predicts
- EFFECTIVE - works well for price prediction
- Formula: Price = m * (months passed) + b (like y = mx + b from school math)

How it works:
1. We give it historical prices
2. It finds the line of best fit (trend)
3. It uses that line to predict future prices

What is Training?
- Teaching the ML model using historical data
- Model learns: "When X happens, Y usually happens"
- Then it can predict Y when it sees X

================================================================================
"""

import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from datetime import datetime, timedelta
import warnings

warnings.filterwarnings('ignore')


class PricePredictionModel:
    """
    WHAT IT DOES: A machine learning model that predicts future prices
    
    KEY CONCEPTS:
    - X (features): Input data used to predict (time, market conditions, etc.)
    - Y (target): What we want to predict (price)
    - Training: Teaching the model using historical data
    - Prediction: Using the trained model to predict future prices
    """
    
    def __init__(self):
        """
        WHAT IT DOES: Initialize the ML model
        
        We initialize:
        - model: The Linear Regression object
        - scaler: Normalizes data (makes numbers easier to work with)
        - is_trained: Flag to check if model is trained
        """
        
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        self.is_trained = False
        self.training_accuracy = 0
        self.price_history = None
        self.dates = None
    
    
    def prepare_data(self, df, product_name):
        """
        WHAT IT DOES: Prepares data for training the ML model
        
        PARAMETERS:
        - df: DataFrame with historical price data
        - product_name: Name of the product to filter data
        
        RETURNS: X (features), Y (prices), dates
        
        EXPLANATION:
        - Filters data for the specific product
        - Groups by date and calculates average price
        - Converts dates to numbers (because ML needs numbers, not text)
        - Sorts data chronologically (oldest first)
        """
        
        # Filter data for this product
        product_data = df[df['product_name'] == product_name].copy()
        
        if product_data.empty:
            raise ValueError(f"No data found for product: {product_name}")
        
        # Convert date column to datetime format (if it's not already)
        product_data['date'] = pd.to_datetime(product_data['date'])
        
        # Group by date and get average price (in case multiple entries per date)
        daily_prices = product_data.groupby('date')['price'].mean().reset_index()
        
        # Sort by date (oldest first)
        daily_prices = daily_prices.sort_values('date').reset_index(drop=True)
        
        # Convert dates to numbers (days since first date)
        # ML needs numbers, not text!
        first_date = daily_prices['date'].min()
        days_since_start = (daily_prices['date'] - first_date).dt.days.values
        
        # X: Input features (we use days as our feature)
        # Shape needs to be 2D: [[1], [2], [3], ...] not [1, 2, 3, ...]
        X = days_since_start.reshape(-1, 1)
        
        # Y: Target values (prices we want to predict)
        Y = daily_prices['price'].values
        
        # Store for later use
        self.price_history = daily_prices
        self.dates = daily_prices['date'].values
        
        return X, Y, daily_prices['date'].values
    
    
    def train(self, X, Y):
        """
        WHAT IT DOES: Trains the ML model on historical price data
        
        PARAMETERS:
        - X: Input features (time/days)
        - Y: Target values (prices)
        
        EXPLANATION:
        - Scales features (normalizes them)
        - Fits Linear Regression model
        - Calculates accuracy metrics
        - Sets is_trained = True
        
        What "scaling" means:
        - Converts all numbers to similar range (usually 0-1)
        - Helps ML model learn better
        - Like converting miles and kilometers to same unit
        """
        
        # Step 1: Scale the features
        X_scaled = self.scaler.fit_transform(X)
        
        # Step 2: Train the model (fit it to the data)
        # This is where the magic happens!
        # The model finds the best line through the data points
        self.model.fit(X_scaled, Y)
        
        # Step 3: Make predictions on training data
        # To check how good our model is
        Y_pred = self.model.predict(X_scaled)
        
        # Step 4: Calculate R² score (model accuracy)
        # R² ranges from 0 to 1
        # 1 = perfect predictions
        # 0 = terrible predictions
        # 0.8+ = good model
        self.training_accuracy = r2_score(Y, Y_pred)
        
        # Mark model as trained
        self.is_trained = True
        
        return {
            "status": "success",
            "accuracy": self.training_accuracy,
            "message": f"Model trained! Accuracy: {self.training_accuracy:.2%}"
        }
    
    
    def predict_future_price(self, days_ahead=30):
        """
        WHAT IT DOES: Predicts price for a future date
        
        PARAMETERS:
        - days_ahead: How many days in the future to predict (default 30 days)
        
        RETURNS: Dictionary with prediction details
        
        EXPLANATION:
        - Uses the trained model to predict
        - Calculates confidence based on model accuracy
        - Returns predicted price and date
        
        FORMULA USED:
        Price = slope * time + intercept
        Where slope and intercept are learned from training data
        """
        
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        
        # Calculate days from start date to the future date
        last_date = self.dates[-1]
        future_date = last_date + timedelta(days=days_ahead)
        
        # Days since first date
        first_date = self.dates[0]
        future_days = (future_date - first_date).days
        
        # Reshape for prediction
        future_X = np.array([[future_days]])
        
        # Scale using the same scaler
        future_X_scaled = self.scaler.transform(future_X)
        
        # Make prediction
        predicted_price = self.model.predict(future_X_scaled)[0]
        
        # Confidence: Higher accuracy = higher confidence
        confidence = self.training_accuracy * 100
        
        return {
            "predicted_price": round(predicted_price, 2),
            "predicted_date": future_date.strftime("%Y-%m-%d"),
            "confidence": round(confidence, 2),
            "days_ahead": days_ahead
        }
    
    
    def predict_multiple_days(self, days_range=30):
        """
        WHAT IT DOES: Predicts prices for multiple days ahead
        
        PARAMETERS:
        - days_range: How many days to predict (will predict 1 to days_range)
        
        RETURNS: List of predictions
        """
        
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        
        predictions = []
        
        for day in range(1, days_range + 1):
            prediction = self.predict_future_price(day)
            predictions.append(prediction)
        
        return predictions
    
    
    def get_model_evaluation(self, X, Y):
        """
        WHAT IT DOES: Calculates evaluation metrics for the model
        
        PARAMETERS:
        - X: Input features
        - Y: Actual prices
        
        RETURNS: Dictionary with evaluation metrics
        
        METRIC EXPLANATIONS:
        
        1. MAE (Mean Absolute Error):
           - Average difference between predicted and actual
           - If MAE=100, predictions are off by ₹100 on average
           - Lower is better
           
        2. MSE (Mean Squared Error):
           - Like MAE but penalizes large errors more
           - Useful for finding outliers
           - Always positive, lower is better
           
        3. RMSE (Root Mean Squared Error):
           - Square root of MSE
           - Back to same scale as prices
           - More interpretable than MSE
           - Lower is better
           
        4. R² Score:
           - Percentage of variance explained by model
           - 0.9 = model explains 90% of price variation
           - Ranges from 0 to 1
           - Higher is better
        """
        
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Make predictions
        Y_pred = self.model.predict(X_scaled)
        
        # Calculate metrics
        mae = mean_absolute_error(Y, Y_pred)
        mse = mean_squared_error(Y, Y_pred)
        rmse = np.sqrt(mse)
        r2 = r2_score(Y, Y_pred)
        
        return {
            "MAE": round(mae, 2),
            "MSE": round(mse, 2),
            "RMSE": round(rmse, 2),
            "R2_Score": round(r2, 4),
            "Accuracy": f"{r2 * 100:.2f}%"
        }
    
    
    def get_model_coefficients(self):
        """
        WHAT IT DOES: Returns the model's learned parameters
        
        RETURNS: Slope and intercept
        
        INTERPRETATION:
        - Slope: How much price changes per day
        - Intercept: Base price (starting point)
        
        Formula: Price = slope * days + intercept
        """
        
        if not self.is_trained:
            raise Exception("Model must be trained first!")
        
        slope = self.model.coef_[0]
        intercept = self.model.intercept_
        
        # Interpret slope
        if slope > 0:
            trend = "INCREASING (Price going up)"
        elif slope < 0:
            trend = "DECREASING (Price going down)"
        else:
            trend = "STABLE (Price staying same)"
        
        return {
            "slope": round(slope, 4),
            "intercept": round(intercept, 2),
            "price_change_per_day": f"₹{abs(slope):.2f} per day",
            "trend": trend
        }


def train_model_from_csv(csv_path, product_name):
    """
    WHAT IT DOES: Complete pipeline to train model from CSV file
    
    PARAMETERS:
    - csv_path: Path to CSV with historical data
    - product_name: Product to train model for
    
    RETURNS: Trained model object and evaluation metrics
    """
    
    # Load data from CSV
    df = pd.read_csv(csv_path)
    
    # Create model
    model = PricePredictionModel()
    
    # Prepare data
    X, Y, dates = model.prepare_data(df, product_name)
    
    # Train model
    training_result = model.train(X, Y)
    
    # Get evaluation metrics
    evaluation = model.get_model_evaluation(X, Y)
    
    return model, evaluation, training_result


if __name__ == "__main__":
    # Example usage
    print("="*60)
    print("MACHINE LEARNING PRICE PREDICTOR")
    print("="*60)
    
    # Train model
    csv_path = "../data/sample_data.csv"
    product_name = "Samsung Galaxy A12"
    
    print(f"\n📚 Training model for: {product_name}")
    print(f"📂 Data source: {csv_path}\n")
    
    model, evaluation, training_result = train_model_from_csv(csv_path, product_name)
    
    # Show results
    print(f"[+] {training_result['message']}\n")
    
    print("📊 Model Evaluation Metrics:")
    for metric, value in evaluation.items():
        print(f"  {metric}: {value}")
    
    # Get coefficients
    print("\n📈 Model Coefficients:")
    coeff = model.get_model_coefficients()
    for key, value in coeff.items():
        print(f"  {key}: {value}")
    
    # Make prediction
    print("\n🔮 Future Price Prediction:")
    prediction = model.predict_future_price(days_ahead=30)
    for key, value in prediction.items():
        print(f"  {key}: {value}")
