import { useState, useEffect } from 'react'

function ProductsList({ onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:8000/api/products')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data.products || [])
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))].filter(Boolean)

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="products-section">
        <div className="loading">
          <p>⏳ Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="products-section">
      <h2>📦 All Products</h2>
      
      {error && (
        <div className="error-message">❌ {error}</div>
      )}

      <div className="category-filter">
        <h3>📂 Filter by Category:</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>📭 No products found</p>
        </div>
      ) : (
        <div>
          <p className="results-count">Found {filteredProducts.length} product(s)</p>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  {product.category && (
                    <span className="product-category">{product.category}</span>
                  )}
                </div>
                <div className="product-details">
                  <p><strong>ID:</strong> {product.id}</p>
                </div>
                <button 
                  className="view-history-btn"
                  onClick={() => onSelectProduct(product.id)}
                >
                  📈 View Price History
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsList
