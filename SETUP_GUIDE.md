# 📖 COMPLETE SETUP GUIDE - Step by Step

## 🎯 What You'll Learn
By following this guide, you'll set up a complete full-stack application with:
- Python Backend with FastAPI
- React Frontend
- SQLite Database
- Machine Learning Model
- Web Scraping

---

## 🔧 Prerequisites

Before starting, you need:
1. **Computer** - Windows, Mac, or Linux
2. **Python 3.8+** - Download from [python.org](https://www.python.org)
3. **Node.js 14+** - Download from [nodejs.org](https://nodejs.org)
4. **Git** (Optional) - Download from [git-scm.com](https://git-scm.com)
5. **Code Editor** - VS Code recommended (free)
6. **Admin Access** - To install packages

---

## 📋 PART 1: Backend Setup (Python)

### **1.1 Check Python Installation**

Open Command Prompt (Windows) or Terminal (Mac/Linux):

```bash
python --version
```

You should see: `Python 3.8.0` or higher

If not found, install Python from [python.org](https://www.python.org)

### **1.2 Navigate to Backend Directory**

```bash
cd path/to/price-prediction/backend
```

Replace `path/to/price-prediction` with your actual folder path.

**Example on Windows:**
```bash
cd C:\Users\YourName\OneDrive\Desktop\price-prediction\backend
```

### **1.3 Create Virtual Environment (Optional but Recommended)**

What is a Virtual Environment?
- A separate Python installation for this project
- Prevents conflicts with other projects
- Like a sandbox for your project

```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate
```

After activation, you'll see `(venv)` at the start of your command line.

### **1.4 Install Required Packages**

```bash
pip install -r requirements.txt
```

What does this do?
- Reads requirements.txt
- Downloads all packages listed
- Installs them in your environment
- Takes 1-5 minutes (depends on internet speed)

**Packages being installed:**
- fastapi - Web framework
- uvicorn - Server for FastAPI
- pandas - Data manipulation
- scikit-learn - Machine Learning
- beautifulsoup4 - Web scraping
- requests - HTTP library
- sqlalchemy - Database ORM

### **1.5 Start the Backend Server**

```bash
python -m uvicorn main:app --reload
```

What does this command do?
- `python -m uvicorn` - Runs the Uvicorn server
- `main:app` - Runs the FastAPI app in main.py
- `--reload` - Auto-restarts when code changes

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

✅ **Backend is ready!**

---

## 📋 PART 2: Frontend Setup (React)

### **2.1 Check Node.js Installation**

Open a **NEW** command prompt/terminal:

```bash
node --version
npm --version
```

You should see versions like `v14.17.0` and `6.14.13`

If not found, install Node.js from [nodejs.org](https://nodejs.org)

### **2.2 Navigate to Frontend Directory**

```bash
cd path/to/price-prediction/frontend
```

**Example on Windows:**
```bash
cd C:\Users\YourName\OneDrive\Desktop\price-prediction\frontend
```

### **2.3 Install Frontend Dependencies**

```bash
npm install
```

What does this do?
- Reads package.json
- Downloads React and Vite with dependencies
- Installs in `node_modules` folder
- Takes 2-5 minutes (Vite is faster!)

**Why Vite?**
- ⚡ Lightning fast development server (< 1 second start)
- 🔥 Instant Hot Module Replacement (see changes instantly)
- 📦 Optimized production builds
- 🎯 Modern and simple configuration
- Much faster than Create React App!

### **2.4 Start the Frontend Server**

```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in 145 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

A browser window should automatically open with the application!

✅ **Frontend is ready!**

**Note:** Vite starts much faster than Create React App. Your changes will also reflect instantly with Hot Module Replacement (HMR)!

---

## 🧪 PART 3: Test the Application

### **Test 1: Check Backend API**

1. Open browser
2. Go to `http://127.0.0.1:8000/docs`
3. You should see Swagger UI (interactive API documentation)
4. Click on different endpoints to test

### **Test 2: Check Frontend**

1. Frontend should already be open at `http://localhost:3000`
2. You should see:
   - Title: "Price Comparison & Prediction System"
   - Search bar
   - Welcome message

### **Test 3: Search for a Product**

1. Type "Samsung Galaxy A12" in search bar
2. Click Search button
3. Wait for results (2-5 seconds)
4. You should see:
   - Price from Amazon: ₹9,999
   - Price from Flipkart: ₹10,499
   - Price from SnapDeal: ₹9,899
   - Cheapest option highlighted

### **Test 4: Predict Future Price**

1. In the Prediction section
2. Change "Days ahead" if you want (default: 30)
3. Click "Predict Price" button
4. Wait for ML model to train
5. See predicted price with confidence level

---

## 🆘 TROUBLESHOOTING

### **Problem 1: Python not found**
```
'python' is not recognized as an internal or external command
```

**Solution:**
- Install Python from [python.org](https://www.python.org)
- During installation, check "Add Python to PATH"
- Restart command prompt

### **Problem 2: Module not found**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
# Make sure you're in backend folder
cd backend

# Install requirements again
pip install -r requirements.txt
```

### **Problem 3: Port already in use**
```
Address already in use: ('127.0.0.1', 8000)
```

**Solution - Option 1:**
```bash
# Change port in command
python -m uvicorn main:app --port 8001 --reload
```

**Solution - Option 2:**
- Kill the process using the port
- Restart your computer

### **Problem 4: CORS error (Frontend can't reach Backend)**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Make sure backend is running at `http://127.0.0.1:8000`
- Check CORS settings in main.py are correct
- Clear browser cache
- Try a different browser

### **Problem 5: Node modules folder too large**
```
Cannot delete node_modules (too large)
```

**Solution:**
```bash
# Delete and reinstall (last resort)
rm -rf node_modules package-lock.json
npm install
```

### **Problem 6: No predictions appearing**
```
"Not enough historical data to make prediction"
```

**Solution:**
- Need at least 3 data points
- Check sample_data.csv is in backend/data/
- Restart backend to reload data

---

## 📝 PART 4: File Locations

**Make sure these files exist:**

```
✓ backend/main.py
✓ backend/requirements.txt
✓ backend/data/sample_data.csv
✓ backend/modules/database.py
✓ backend/modules/scraper.py
✓ backend/modules/ml_predictor.py

✓ frontend/package.json
✓ frontend/src/App.js
✓ frontend/src/index.js
✓ frontend/src/components/SearchBar.js
✓ frontend/src/components/PriceComparison.js
✓ frontend/src/components/PricePrediction.js
```

---

## 🎯 PART 5: How to Use the Application

### **Step 1: Search for a Product**
- Type product name (e.g., "Samsung Galaxy A12")
- Click Search button
- See prices from all websites

### **Step 2: Find Cheapest Option**
- Green box shows cheapest website
- Shows exactly how much you save
- Click link to go to website

### **Step 3: Predict Future Price**
- Click "Predict Price" button
- Machine Learning model trains on historical data
- Shows predicted price for next 30 days
- Shows model confidence (0-100%)

### **Step 4: Understand Metrics**
- **MAE**: Average prediction error (in rupees)
- **RMSE**: Root error (slightly higher than MAE)
- **Accuracy**: How well model explains price changes

---

## 🚀 PART 6: Running Everything Together

**Terminal/Command Prompt 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

**Terminal/Command Prompt 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Now you have:
- ✅ Backend API running at `http://127.0.0.1:8000`
- ✅ Frontend UI running at `http://localhost:3000`
- ✅ Database automatically created
- ✅ ML models ready to make predictions
- ✅ Vite will auto-reload on code changes (HMR)

---

## 📊 PART 7: Understanding the Data Flow

```
User searches "Samsung"
        ↓
React Frontend (SearchBar component)
        ↓
HTTP Request to Backend API
        ↓
FastAPI receives request
        ↓
Web Scraper searches all websites
        ↓
Returns: {"Amazon": 9999, "Flipkart": 10499, ...}
        ↓
React Frontend displays results
        ↓
User clicks "Predict Price"
        ↓
ML Model trains on historical data from database
        ↓
Linear Regression predicts future price
        ↓
React shows prediction with confidence level
```

---

## ✨ PART 8: Customization Tips

### **Add Your Own Products**

1. Edit `backend/data/sample_data.csv`
2. Add rows with your product data
3. Restart backend

```csv
product_id,product_name,website,price,date,category
5,Your Product,Amazon,5000,2024-01-01,Electronics
5,Your Product,Flipkart,5200,2024-01-01,Electronics
```

### **Change Styling**

Edit `frontend/src/App.css` to change colors, fonts, layout

### **Add More Websites**

1. Add scrapers in `backend/modules/scraper.py`
2. Return results in same format
3. Automatic! No other changes needed

---

## 🎓 Learning Resources

- **FastAPI Docs**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- **React Docs**: [https://react.dev/](https://react.dev/)
- **Scikit-learn ML**: [https://scikit-learn.org/](https://scikit-learn.org/)
- **SQL Basics**: [https://www.w3schools.com/sql/](https://www.w3schools.com/sql/)
- **Python Basics**: [https://www.python.org/](https://www.python.org/)

---

## ✅ Verification Checklist

- ✅ Python version 3.8+
- ✅ Node.js version 14+
- ✅ Backend starts without errors
- ✅ Frontend shows in browser
- ✅ Can search for products
- ✅ See price comparison results
- ✅ Can predict prices
- ✅ Database file created (price_comparison.db)
- ✅ All CSV data loaded

---

## 🎉 You're Done!

Congratulations! Your complete price prediction system is running!

**Next Steps:**
1. Test all features
2. Try searching different products
3. Understand how ML predictions work
4. Prepare presentation for college

