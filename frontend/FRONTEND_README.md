# Frontend - Price Comparison & Prediction System

A modern React-based user interface for comparing product prices across multiple websites and predicting future prices using machine learning.

## 📋 Features

### 🔍 Search & Compare Prices
- Search for any product by name
- Compare prices across multiple websites
- Identify the cheapest option
- Calculate savings on each platform

### 📦 View All Products
- Browse all products in the database
- Filter by category
- Click to view detailed price history

### 📈 Price History
- View complete price history for any product
- See statistics (average, min, max prices)
- Breakdown by website
- Historical data table

### 🎯 Price Prediction
- Use ML to predict future prices
- Input product ID and number of days ahead
- Get model performance metrics (MAE, RMSE, R² Score)
- Understand model confidence

## 🎨 UI Components

```
App.jsx (Main component)
├── Header.jsx (Navigation header with status indicator)
├── SearchProducts.jsx (Search form and instructions)
├── ComparisonResults.jsx (Display price comparison results)
├── ProductsList.jsx (Browse all products with category filter)
├── PriceHistory.jsx (View historical prices and statistics)
└── PricePrediction.jsx (ML-based price prediction)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Backend API running on `http://127.0.0.1:8000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm preview
```

## 🔧 Configuration

The frontend communicates with the backend API at:
```
http://127.0.0.1:8000
```

To change the API URL, update the fetch URLs in each component file.

## 📡 API Endpoints Used

The frontend integrates with these backend endpoints:

| Feature | Endpoint | Method |
|---------|----------|--------|
| Search & Compare | `/api/compare-prices` | GET |
| Get All Products | `/api/products` | GET |
| Price History | `/api/price-history` | GET |
| Predict Price | `/api/predict-price` | GET |
| Health Check | `/api/health` | GET |

## 🎨 Styling

The frontend uses a modern gradient design with:
- Purple gradient theme (#667eea to #764ba2)
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-friendly design

### Color Palette
- **Primary**: #667eea, #764ba2 (Purple Gradient)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Error**: #ef4444 (Red)
- **Info**: #0ea5e9 (Sky Blue)

## 📱 Responsive Design

The UI is fully responsive with breakpoints for:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔍 Features in Detail

### Search & Compare
1. Enter a product name
2. Click "Search"
3. View results from different websites
4. See the cheapest option highlighted
5. Click "View on [website]" for product link

### Browse Products
1. Go to "All Products" tab
2. Select a category (optional)
3. Click "View Price History" on any product
4. Analyze price trends

### Price History
1. View statistics (average, min, max price)
2. See breakdown by website
3. Browse complete historical data table
4. Identify price trends

### Price Prediction
1. Enter Product ID
2. Specify days ahead to predict
3. Click "Predict Price"
4. Review ML model metrics
5. Understand prediction confidence

## 🐛 Troubleshooting

### Backend Not Connected
If you see "Backend Disconnected" warning:
1. Make sure backend is running: `python -m uvicorn main:app --reload` (in backend directory)
2. Backend should be on `http://127.0.0.1:8000`
3. Check CORS settings in backend

### No Products Found
- Backend must have loaded sample data
- Check if CSV file exists in `backend/data/sample_data.csv`
- Verify database is initialized

### Prediction Fails
- Product needs at least 3 historical price records
- Check product ID is valid
- Try with fewer days ahead

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

## 🎓 Educational Purpose

This frontend is designed to help you understand:
- React hooks (useState, useEffect)
- API integration and fetch
- Component-based architecture
- State management
- Responsive design
- CSS Grid and Flexbox

## 📝 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchProducts.jsx
│   │   ├── ComparisonResults.jsx
│   │   ├── ProductsList.jsx
│   │   ├── PriceHistory.jsx
│   │   └── PricePrediction.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Tips

- Use browser DevTools to inspect API responses
- Check network tab to see API calls
- Try prediction with different time horizons
- Experiment with different categories

## 📞 Support

For issues or questions about specific features:
1. Check browser console for errors
2. Verify backend is running
3. Check API response in Network tab
4. Review component code comments

---

**Happy Shopping! 💰**
