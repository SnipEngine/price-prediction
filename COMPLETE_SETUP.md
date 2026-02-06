# 🚀 Complete Setup Guide - Price Comparison & Prediction System

This guide will help you set up and run the entire project (backend + frontend).

## 📋 Prerequisites

Make sure you have installed:
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

Verify installation:
```bash
python --version
node --version
npm --version
```

## 📂 Project Structure

```
price-prediction/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── data/
│   │   └── sample_data.csv
│   └── modules/
│       ├── database.py
│       ├── ml_predictor.py
│       └── scraper.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
```

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

The `requirements.txt` includes:
- FastAPI
- Uvicorn
- Pandas
- Scikit-learn
- Other ML libraries

### Step 4: Run Backend Server
```bash
python -m uvicorn main:app --reload
```

You should see:
```
✓ PRICE PREDICTION API STARTING
📍 Server: http://127.0.0.1:8000
📚 Docs: http://127.0.0.1:8000/docs
```

**Backend is now running!** ✅

### Test Backend:
- Visit: http://127.0.0.1:8000/docs (Interactive API documentation)
- Test endpoints in Swagger UI
- Or check health: http://127.0.0.1:8000/api/health

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal (Keep Backend Running)

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies
```bash
npm install
```

This installs React, Vite, and other dependencies from `package.json`.

### Step 4: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

**Frontend is now running!** ✅

---

## ✅ Verify Everything Works

### Check Backend:
1. Open http://127.0.0.1:8000/api/health
2. Should return: `{"status": "healthy", "message": "API is running successfully"}`

### Check Frontend:
1. Open http://localhost:5173 in your browser
2. You should see the app with navigation tabs
3. Backend status should show "Backend Connected ✓"

### Test Features:

#### 1. Search & Compare
- Click "🔍 Search & Compare" tab
- Type a product name (e.g., "iPhone", "Samsung")
- Click "Search"
- View price comparisons

#### 2. View All Products
- Click "📦 All Products" tab
- See products loaded from database
- Filter by category
- Click product to see price history

#### 3. Price History
- From products list, click "View Price History"
- See statistics and historical data
- View breakdown by website

#### 4. Predict Price
- Click "🎯 Predict Price" tab
- Enter a Product ID (try ID 1)
- Set days ahead (e.g., 30)
- Click "Predict Price"
- See ML prediction with confidence

---

## 🌐 API Routes Available

| Feature | Route |
|---------|-------|
| Root | GET `/` |
| Health Check | GET `/api/health` |
| Compare Prices | GET `/api/compare-prices?product_name=Samsung` |
| All Products | GET `/api/products` |
| Price History | GET `/api/price-history?product_id=1` |
| Predict Price | GET `/api/predict-price?product_id=1&days_ahead=30` |
| Predictions | GET `/api/predictions?product_id=1` |

---

## 📁 Sample Data

The system comes with sample data in `backend/data/sample_data.csv`:

```csv
product_id,product_name,category,website,price,date
1,iPhone 15,Electronics,Amazon,79999,2024-01-15
1,iPhone 15,Electronics,Flipkart,79499,2024-01-15
...
```

The data is automatically loaded when the backend starts.

---

## 🐛 Troubleshooting

### Frontend shows "Backend Disconnected"
- ✅ Make sure backend is running on http://127.0.0.1:8000
- ✅ Check no other app is using port 8000
- ✅ Check browser console for CORS errors

### "ModuleNotFoundError: No module named 'fastapi'"
- ✅ Run `pip install -r requirements.txt` in backend directory
- ✅ Make sure virtual environment is activated

### "Port 5173 is already in use"
- ✅ Kill the process using that port or change port:
  ```bash
  npm run dev -- --port 5174
  ```

### "Port 8000 is already in use" (Backend)
- ✅ Kill the process or run on different port:
  ```bash
  python -m uvicorn main:app --reload --port 8001
  ```

### No products appear
- ✅ Check if backend loaded sample data (check logs)
- ✅ Verify CSV file exists: `backend/data/sample_data.csv`
- ✅ Check database was initialized

### Prediction fails
- ✅ Product needs at least 3 price records
- ✅ Verify product_id is correct
- ✅ Check backend logs for errors

---

## 🔄 Full Startup Sequence

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

**Browser:**
- Open http://localhost:5173
- Everything should work! ✨

---

## 📦 Build for Production

### Build Frontend:
```bash
cd frontend
npm run build
npm run preview
```

### Deploy Backend:
```bash
# Without reload flag (production):
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🎓 Learning Resources

### Frontend (React + Vite):
- Components Breakdown
- State Management with Hooks
- API Integration
- Responsive CSS Grid Layout
- Error Handling

### Backend (FastAPI):
- REST API Design
- CORS Configuration
- Database Integration
- Machine Learning Integration
- Error Handling & Validation

---

## 💡 Tips

1. **Use Vite's HMR** - Frontend updates instantly when you save
2. **Check /docs** - Backend Swagger UI shows all endpoints
3. **Network Tab** - Browser DevTools shows all API calls
4. **Console** - Check for errors in browser console
5. **Browser DevTools** - Inspect API responses

---

## 📝 Next Steps

After everything is running:

1. **Test all features** - Try each tab and functionality
2. **Add more data** - Modify `sample_data.csv` for more products
3. **Customize UI** - Modify `App.css` for your preferred colors
4. **Deploy** - Deploy to cloud providers like:
   - Frontend: Vercel, Netlify
   - Backend: Heroku, Railway, AWS

---

## ❓ FAQs

**Q: Can I run both on same machine?**  
A: Yes! Use two terminals - one for backend, one for frontend.

**Q: Do I need to modify API URL?**  
A: Only if you change the backend server address. Default is `http://127.0.0.1:8000`.

**Q: How to add more products?**  
A: Add rows to `backend/data/sample_data.csv` then restart backend.

**Q: Can I make predictions work better?**  
A: Add more historical price data to improve ML model accuracy.

---

**Happy Building! 🚀**

For detailed component documentation, see:
- [Backend README](../backend/README.md)
- [Frontend README](./FRONTEND_README.md)
