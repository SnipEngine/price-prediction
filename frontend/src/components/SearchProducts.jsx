import { useState } from 'react'

function SearchProducts({ onSearch }) {
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!productName.trim()) {
      setError('Please enter a product name')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/compare-prices?product_name=${encodeURIComponent(productName)}`
      )

      if (!response.ok) {
        throw new Error('Product not found')
      }

      const data = await response.json()
      onSearch(data)
    } catch (err) {
      setError(err.message || 'Failed to search products')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-section">
      <div className="search-card">
        <h2>🔍 Search & Compare Prices</h2>
        <form onSubmit={handleSearch}>
          <div className="search-input-group">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name (e.g., Samsung Galaxy, iPhone 15)..."
              className="search-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="search-btn"
              disabled={loading}
            >
              {loading ? '🔄 Searching...' : '🔎 Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <div className="search-info">
          <p className="info-title">💡 How it works:</p>
          <ul className="info-list">
            <li>Enter any product name to search</li>
            <li>We'll compare prices across multiple websites</li>
            <li>See which retailer offers the best deal</li>
            <li>Calculate how much you can save</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchProducts
