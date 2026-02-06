import { useState, useEffect } from 'react'

function PriceHistory({ productId }) {
  const [priceHistory, setPriceHistory] = useState([])
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPriceHistory()
  }, [productId])

  const fetchPriceHistory = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://127.0.0.1:8000/api/price-history?product_id=${productId}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch price history')
      }

      const data = await response.json()
      setPriceHistory(data.prices || [])
      
      // Get product name from first record if available
      if (data.prices && data.prices.length > 0) {
        setProductName(data.prices[0].product_name || `Product #${productId}`)
      }
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="history-section">
        <div className="loading">
          <p>⏳ Loading price history...</p>
        </div>
      </div>
    )
  }

  // Calculate statistics
  const prices = priceHistory.map(p => p.price).filter(p => p !== null)
  const avgPrice = prices.length > 0 ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 0
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0

  // Group by website
  const byWebsite = {}
  priceHistory.forEach(record => {
    if (!byWebsite[record.website]) {
      byWebsite[record.website] = []
    }
    byWebsite[record.website].push(record)
  })

  return (
    <div className="history-section">
      <h2>📈 Price History</h2>
      <p className="product-name">Product: <strong>{productName}</strong> (ID: {productId})</p>

      {error && (
        <div className="error-message">❌ {error}</div>
      )}

      {priceHistory.length === 0 ? (
        <div className="no-results">
          <p>📭 No price history available for this product</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Average Price</p>
              <p className="stat-value">₹ {Number(avgPrice).toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Lowest Price</p>
              <p className="stat-value">₹ {minPrice.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Highest Price</p>
              <p className="stat-value">₹ {maxPrice.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Total Records</p>
              <p className="stat-value">{priceHistory.length}</p>
            </div>
          </div>

          <div className="website-breakdown">
            <h3>🌐 By Website</h3>
            <div className="websites-grid">
              {Object.entries(byWebsite).map(([website, records]) => (
                <div key={website} className="website-card">
                  <h4>{website}</h4>
                  <p className="record-count">{records.length} records</p>
                  <div className="price-points">
                    {records.slice(0, 3).map((record, idx) => (
                      <div key={idx} className="price-point">
                        <span className="date">{record.date}</span>
                        <span className="price">₹ {record.price?.toLocaleString()}</span>
                      </div>
                    ))}
                    {records.length > 3 && (
                      <p className="more-records">+{records.length - 3} more records</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="full-history">
            <h3>📋 Complete History</h3>
            <div className="table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Website</th>
                    <th>Price</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {priceHistory.map((record, idx) => (
                    <tr key={idx}>
                      <td>{record.date}</td>
                      <td>{record.website}</td>
                      <td className="price">₹ {record.price?.toLocaleString()}</td>
                      <td>
                        {record.link ? (
                          <a 
                            href={record.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="quick-link"
                          >
                            View →
                          </a>
                        ) : (
                          <span className="no-link">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PriceHistory
