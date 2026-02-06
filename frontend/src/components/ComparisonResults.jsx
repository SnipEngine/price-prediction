import React from 'react'

function ComparisonResults({ data }) {
  const { product, comparison, cheapest } = data

  if (!comparison) {
    return (
      <div className="comparison-section">
        <div className="no-results">
          <p>❌ No comparison data available. Please search again.</p>
        </div>
      </div>
    )
  }

  // Convert comparison object to array for easier iteration
  const priceEntries = Object.entries(comparison)

  return (
    <div className="comparison-section">
      <div className="comparison-header">
        <h2>💳 Price Comparison Results</h2>
        <p className="product-name">Product: <strong>{product}</strong></p>
      </div>

      {cheapest && cheapest.website && (
        <div className="cheapest-highlight">
          <div className="cheapest-icon">🏆</div>
          <div className="cheapest-content">
            <h3>Best Deal Found!</h3>
            <p className="cheapest-website">{cheapest.website}</p>
            <p className="cheapest-price">₹ {cheapest.price?.toLocaleString()}</p>
            {cheapest.savings && Object.entries(cheapest.savings).length > 0 && (
              <p className="savings-info">
                💰 Save up to ₹ {Math.max(...Object.values(cheapest.savings)).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="comparison-grid">
        <h3>📊 Price Breakdown</h3>
        <div className="prices-container">
          {priceEntries.map(([website, priceData]) => {
            const isCheapest = cheapest?.website === website
            return (
              <div 
                key={website} 
                className={`price-card ${isCheapest ? 'cheapest' : ''}`}
              >
                <div className="website-name">
                  {isCheapest && <span className="badge">✓ Best Deal</span>}
                  <h4>{website}</h4>
                </div>
                <div className="price-display">
                  <p className="price-label">Price:</p>
                  <p className="price-value">
                    ₹ {priceData.price?.toLocaleString()}
                  </p>
                </div>
                {priceData.link && (
                  <a 
                    href={priceData.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-link"
                  >
                    View on {website} →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {cheapest?.savings && (
        <div className="savings-summary">
          <h3>💡 Savings Calculator</h3>
          <div className="savings-list">
            {Object.entries(cheapest.savings).map(([website, savings]) => (
              <div key={website} className="savings-item">
                <span className="website">{website}</span>
                <span className="amount">Save ₹ {savings.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ComparisonResults
