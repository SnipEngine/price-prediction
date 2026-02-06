# 📱 Online Product Price Comparison and Future Price Prediction System

## 🎯 Project Overview

This is a **complete full-stack machine learning project** designed for college internship submission. It compares product prices across multiple e-commerce websites and predicts future price trends using Machine Learning.

### **What Problem Does This Solve?**
- Users waste time checking multiple websites for best prices
- Price trends are unpredictable without data analysis
- No simple way to predict when to buy a product

### **Our Solution**
- 🔍 **Search once** → Compare prices across all websites automatically
- 💰 **Find the cheapest** → Shows savings on each website
- 🔮 **Predict prices** → ML model predicts future prices based on historical data

---

## 📚 Learning Outcomes

After completing this project, you'll understand:

1. ✅ **Machine Learning Basics** - How Linear Regression works
2. ✅ **Web Scraping** - How to extract data from websites
3. ✅ **Backend Development** - Building REST APIs with FastAPI
4. ✅ **Frontend Development** - Creating UI with React
5. ✅ **Databases** - Storing and retrieving data with SQLite
6. ✅ **Full-Stack Development** - Connecting all components together

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (React)                       │
│  - Search Bar                                               │
│  - Price Comparison Table                                   │
│  - Prediction Chart                                         │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                          │
│  - /api/compare-prices  → Compare prices                    │
│  - /api/predict-price   → ML predictions                    │
│  - /api/price-history   → Historical data                   │
└────────┬────────────────────────┬──────────────┬─────────────┘
         │                        │              │
    Scraper          Database      ML Model      │
    (BeautifulSoup) (SQLite)    (Scikit-learn)   │
         │                        │              │
    Amazon,          prices.db    Linear      Products
    Flipkart,                     Regression   Data
    SnapDeal                                    CSV
```

---

## 💻 Technology Stack

### **Backend**
- **Language**: Python 3.8+
- **Framework**: FastAPI (Modern, Fast, Easy to learn)
- **ML Library**: Scikit-learn (Simple ML algorithms)
- **Database**: SQLite (No setup needed, file-based)
- **Web Scraping**: BeautifulSoup + Requests

### **Frontend**
- **Framework**: React.js (Popular, Component-based)
- **Styling**: CSS3 (No heavy frameworks)
- **HTTP Client**: Axios/Fetch API

### **Deployment**
- **No Cloud Deployment** - Runs locally on your computer
- **Perfect for College Projects** - No monthly bills!

---

## 📦 Project Structure

```
price-prediction/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── price_comparison.db     # SQLite database (auto-created)
│   ├── modules/
│   │   ├── __init__.py
│   │   ├── database.py         # Database operations
│   │   ├── scraper.py          # Web scraping
│   │   └── ml_predictor.py     # Machine Learning model
│   ├── models/                 # Trained models (if any)
│   └── data/
│       └── sample_data.csv     # Historical price data
│
├── frontend/
│   ├── package.json            # Node.js dependencies
│   ├── public/
│   │   └── index.html          # HTML entry point
│   └── src/
│       ├── index.js            # React entry point
│       ├── App.js              # Main component
│       ├── App.css             # Styles
│       └── components/
│           ├── SearchBar.js    # Search component
│           ├── PriceComparison.js    # Price display
│           └── PricePrediction.js    # ML predictions
│
├── README.md                   # This file
└── SETUP_GUIDE.md             # Installation steps
```

---

## 🚀 Quick Start Guide

### **Step 1: Install Python**
Download Python 3.8+ from [python.org](https://www.python.org)

### **Step 2: Setup Backend**

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend
python -m uvicorn main:app --reload
```

**Backend will start at**: `http://127.0.0.1:8000`

### **Step 3: Test Backend (Optional)**
Open in browser: `http://127.0.0.1:8000/docs` - You'll see interactive API documentation!

### **Step 4: Setup Frontend**

```bash
# Navigate to frontend folder
cd frontend

# Install Node.js dependencies
npm install

# Start React app
npm start
```

**Frontend will start at**: `http://127.0.0.1:3000`

---

## 🔌 API Endpoints

### **1. Compare Prices**
```
GET /api/compare-prices?product_name=Samsung+Galaxy+A12

Response:
{
  "status": "success",
  "product": "Samsung Galaxy A12",
  "comparison": {
    "Amazon": {"price": 9999, "link": "..."},
    "Flipkart": {"price": 10499, "link": "..."}
  },
  "cheapest": {
    "website": "Amazon",
    "price": 9999,
    "savings": {"Flipkart": 500}
  }
}
```

### **2. Predict Price**
```
GET /api/predict-price?product_id=1&days_ahead=30

Response:
{
  "status": "success",
  "prediction": {
    "predicted_price": 9400,
    "predicted_date": "2024-05-01",
    "confidence": 85.5
  },
  "model_evaluation": {
    "MAE": 50.25,
    "RMSE": 62.45,
    "Accuracy": "85.50%"
  }
}
```

### **3. Get Price History**
```
GET /api/price-history?product_id=1

Response:
{
  "status": "success",
  "product_id": 1,
  "total_records": 12,
  "prices": [
    {"website": "Amazon", "price": 9999, "date": "2024-01-01"},
    ...
  ]
}
```

### **4. Get All Products**
```
GET /api/products

Response:
{
  "status": "success",
  "total_products": 4,
  "products": [
    {"product_id": 1, "product_name": "Samsung Galaxy A12", "category": "Electronics"},
    ...
  ]
}
```

---

## 🤖 Machine Learning Explained

### **What is Linear Regression?**
A simple ML algorithm that finds the best-fit line through data points.

**Real-World Example:**
- Data: Price of Samsung phone over 4 months
- Linear Regression finds: Trend (price going up/down by ₹X per day)
- Prediction: Using that trend, predict next month's price

**Formula:**
```
Price = slope × (Days) + intercept

Example:
Price = 150 × 30 + 5000 = ₹9500 (predicted price for 30 days ahead)
```

### **Why Linear Regression for Beginners?**
1. ✅ **Simple** - Easy to understand and implement
2. ✅ **Fast** - Trains in milliseconds
3. ✅ **Interpretable** - You can explain why it predicts something
4. ✅ **Effective** - Works well for price data
5. ✅ **Perfect for Learning** - Foundation for advanced ML

### **Model Evaluation Metrics**

**1. MAE (Mean Absolute Error)**
- Average difference between predicted and actual price
- If MAE = ₹100, predictions are off by ₹100 on average
- **Lower is better**

**2. RMSE (Root Mean Square Error)**
- Like MAE but penalizes large errors more
- If RMSE = ₹150, typical error is ₹150
- **Lower is better**

**3. R² Score (Coefficient of Determination)**
- How well the model explains price variation
- 0.9 = Model explains 90% of price changes
- Range: 0 to 1
- **Higher is better**

---

## 💾 Database Schema

### **Table 1: products**
```
product_id      | product_name        | category      | created_at
1               | Samsung Galaxy A12  | Electronics   | 2024-01-01
2               | iPhone 13           | Electronics   | 2024-01-01
```

### **Table 2: prices**
```
price_id | product_id | website  | price | recorded_date | created_at
1        | 1          | Amazon   | 9999  | 2024-01-01    | 2024-01-01
2        | 1          | Flipkart | 10499 | 2024-01-01    | 2024-01-01
3        | 1          | Amazon   | 9899  | 2024-02-01    | 2024-02-01
```

### **Table 3: predictions**
```
prediction_id | product_id | predicted_price | predicted_date | model_accuracy
1             | 1          | 9400            | 2024-05-01     | 0.855
```

---

## 📊 Sample Data

The project includes **sample_data.csv** with 48 records of product prices from 4 products across 3 websites over 4 months.

**Sample Products:**
- Samsung Galaxy A12 (Mobile Phone)
- iPhone 13 (Mobile Phone)
- Sony Headphones
- Lenovo Laptop

---

## 🧪 Testing the Project

### **Test 1: Search for Products**
1. Open frontend at `http://127.0.0.1:3000`
2. Search for "Samsung Galaxy A12"
3. Compare prices from Amazon, Flipkart, SnapDeal

### **Test 2: Get Predictions**
1. Click "Predict Price"
2. See predicted price for 30 days ahead
3. View model confidence and accuracy

### **Test 3: API Testing**
1. Open `http://127.0.0.1:8000/docs`
2. Try different endpoints
3. See live API documentation

---

## ⚙️ How to Add Your Own Data

### **Step 1: Create CSV with your data**
```csv
product_id,product_name,website,price,date,category
1,Your Product,Website1,1000,2024-01-01,Category
1,Your Product,Website2,1100,2024-01-01,Category
```

### **Step 2: Replace sample_data.csv**
Put your CSV in `backend/data/sample_data.csv`

### **Step 3: Restart backend**
Data will be automatically loaded into database

---

## 🔐 Legal Considerations

⚠️ **Web Scraping Guidelines:**
1. Always check website's **Terms of Service** before scraping
2. Respect **robots.txt** file
3. Use **delays** between requests (don't overload servers)
4. This project uses **sample data** to avoid legal issues
5. For production, use **official APIs** (if available)

---

## 🐛 Troubleshooting

### **Issue: Backend won't start**
```
Error: Port 8000 already in use
Solution: Change port in main.py or kill the process using port 8000
```

### **Issue: Frontend can't reach backend**
```
Error: CORS policy blocked request
Solution: Make sure backend is running at http://127.0.0.1:8000
```

### **Issue: Database errors**
```
Solution: Delete price_comparison.db and restart backend to recreate
```

### **Issue: No predictions available**
```
Solution: Make sure at least 3 data points exist for the product
```

---

## 📝 Sample Output

### **Price Comparison Output**
```
Samsung Galaxy A12 - Price Comparison
=====================================
Amazon: ₹9,999 ← Cheapest!
Flipkart: ₹10,499 (Save ₹500)
SnapDeal: ₹9,899 (Save ₹100)
```

### **Prediction Output**
```
Predicted Price for 30 Days Ahead
=================================
Predicted Price: ₹9,400
Date: 2024-05-01
Confidence: 85.5%
Model Accuracy (R²): 0.855 (85.5%)
```

---

## 🎓 College Submission Checklist

- ✅ Project works without cloud deployment
- ✅ All code is well-commented
- ✅ README documentation complete
- ✅ Beginner-friendly explanations
- ✅ Sample data included
- ✅ All imports and dependencies listed
- ✅ No unnecessary external packages
- ✅ Code runs without errors
- ✅ Suitable for internship project

---

## 🚀 Future Enhancements

1. **Advanced ML Algorithms**
   - Use ARIMA for time series predictions
   - Use Neural Networks for better accuracy
   - Ensemble methods combining multiple models

2. **Real Web Scraping**
   - Scrape actual e-commerce websites
   - Use Selenium for dynamic content
   - Schedule daily price updates

3. **User Features**
   - User authentication (login/signup)
   - Price alerts (notify when price drops)
   - Wishlist functionality
   - Price history graphs

4. **Mobile App**
   - Create React Native mobile app
   - Push notifications for price drops
   - Offline functionality

5. **Cloud Deployment**
   - Deploy backend on Heroku/AWS
   - Host frontend on Netlify/Vercel
   - Use cloud database (PostgreSQL)

6. **Advanced Analytics**
   - Competitor analysis
   - Market trends
   - Seasonal price patterns

---

## 📞 Support & Questions

If you get stuck:
1. Check the error message carefully
2. Look in troubleshooting section
3. Check API documentation at `/docs`
4. Review commented code
5. Check sample data format

---

## 📄 License

This project is for educational purposes. Feel free to use and modify for learning.

---

## ✍️ Authors

Created for College Internship Project
Year: 2024

---

**Happy Learning! 🎉**

Good luck with your project presentation!

