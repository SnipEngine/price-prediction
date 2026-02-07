import { useState, useEffect } from 'react'
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
  const [isCheckingHealth, setIsCheckingHealth] = useState(true)

  // Check API health on mount and periodically
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/health')
        setApiHealth(response.ok)
      } catch (error) {
        setApiHealth(false)
      } finally {
        setIsCheckingHealth(false)
      }
    }
    
    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (data) => {
    setComparisonData(data)
    setActiveTab('comparison')
  }

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId)
    setActiveTab('history')
  }

  const tabs = [
    { id: 'search', label: 'Search & Compare', icon: '🔍', description: 'Find best deals' },
    { id: 'products', label: 'All Products', icon: '📦', description: 'Browse catalog' },
    { id: 'history', label: 'Price History', icon: '📈', description: 'Track trends' },
    { id: 'prediction', label: 'Price Prediction', icon: '🎯', description: 'Forecast prices' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 group relative px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{tab.icon}</span>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-semibold">{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-400'}`}>
                      {tab.description}
                    </div>
                  </div>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Status Banner - Only show if disconnected */}
        {!apiHealth && !isCheckingHealth && (
          <div className="mb-6 animate-fade-in">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 shadow-sm">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-red-800 font-semibold">Backend Service Unavailable</h3>
                  <p className="text-red-600 text-sm mt-1">
                    Unable to connect to API at <code className="bg-red-100 px-2 py-0.5 rounded">http://127.0.0.1:8000</code>. 
                    Please ensure the backend server is running.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'search' && <SearchProducts onSearch={handleSearch} />}
          {activeTab === 'comparison' && comparisonData && <ComparisonResults data={comparisonData} />}
          {activeTab === 'products' && <ProductsList onSelectProduct={handleProductSelect} />}
          {activeTab === 'history' && <PriceHistory productId={selectedProductId} />}
          {activeTab === 'prediction' && <PricePrediction />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2026 PriceTracker Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${apiHealth ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-xs text-gray-500">
                {apiHealth ? 'System Operational' : 'System Offline'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
