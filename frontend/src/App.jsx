import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import SearchProducts from './components/SearchProducts'
import ComparisonResults from './components/ComparisonResults'
import ProductsList from './components/ProductsList'
import PriceHistory from './components/PriceHistory'
import PricePrediction from './components/PricePrediction'

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [comparisonData, setComparisonData] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [apiHealth, setApiHealth] = useState(false)

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/health')
        if (response.ok) {
          setApiHealth(true)
        }
      } catch (error) {
        console.log('Backend API is not connected')
        setApiHealth(false)
      }
    }
    checkHealth()
  }, [])

  const handleSearch = (data) => {
    setComparisonData(data)
    setActiveTab('comparison')
  }

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId)
    setActiveTab('history')
  }

  return (
    <div className="app">
      <Header apiHealth={apiHealth} />
      
      <div className="navigation">
        <button 
          className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Search & Compare
        </button>
        <button 
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          📦 All Products
        </button>
        <button 
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📈 Price History
        </button>
        <button 
          className={`nav-btn ${activeTab === 'prediction' ? 'active' : ''}`}
          onClick={() => setActiveTab('prediction')}
        >
          🎯 Predict Price
        </button>
      </div>

      <div className="container">
        {!apiHealth && (
          <div className="warning-banner">
            ⚠️ Backend API is not connected. Make sure the backend is running on http://127.0.0.1:8000
          </div>
        )}

        {activeTab === 'search' && (
          <SearchProducts onSearch={handleSearch} />
        )}

        {activeTab === 'comparison' && comparisonData && (
          <ComparisonResults data={comparisonData} />
        )}

        {activeTab === 'products' && (
          <ProductsList onSelectProduct={handleProductSelect} />
        )}

        {activeTab === 'history' && selectedProductId && (
          <PriceHistory productId={selectedProductId} />
        )}

        {activeTab === 'prediction' && (
          <PricePrediction />
        )}
      </div>
    </div>
  )
}

export default App
