import { useState } from 'react'

function PricePrediction() {
  const [productId, setProductId] = useState('')
  const [daysAhead, setDaysAhead] = useState('30')
  const [prediction, setPrediction] = useState(null)
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePredict = async (e) => {
    e.preventDefault()

    if (!productId.trim()) {
      setError('Please enter a product ID')
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)
    setEvaluation(null)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/predict-price?product_id=${productId}&days_ahead=${daysAhead}`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to predict price')
      }

      const data = await response.json()
      setPrediction(data.prediction)
      setEvaluation(data.model_evaluation)
    } catch (err) {
      setError(err.message)
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prediction-section">
      <h2>🎯 Price Prediction</h2>

      <div className="prediction-form-card">
        <h3>🔮 Predict Future Price Using ML</h3>
        <p className="form-description">
          Our machine learning model analyzes historical price data to predict future prices.
        </p>

        <form onSubmit={handlePredict}>
          <div className="form-group">
            <label htmlFor="productId">Product ID:</label>
            <input
              id="productId"
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID (e.g., 1)"
              disabled={loading}
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="daysAhead">Days Ahead to Predict:</label>
            <input
              id="daysAhead"
              type="number"
              value={daysAhead}
              onChange={(e) => setDaysAhead(e.target.value)}
              placeholder="30"
              disabled={loading}
              min="1"
              max="365"
            />
          </div>

          <button 
            type="submit" 
            className="predict-btn"
            disabled={loading}
          >
            {loading ? '🔄 Predicting...' : '🎲 Predict Price'}
          </button>
        </form>

        {error && (
          <div className="error-message">❌ {error}</div>
        )}
      </div>

      {prediction && (
        <div className="prediction-results">
          <h3>📊 Prediction Results</h3>
          
          <div className="prediction-box">
            <div className="prediction-item">
              <p className="label">Predicted Price:</p>
              <p className="value highlight">₹ {prediction.predicted_price?.toLocaleString()}</p>
            </div>
            
            <div className="prediction-item">
              <p className="label">Predicted Date:</p>
              <p className="value">{prediction.predicted_date}</p>
            </div>

            {prediction.confidence !== undefined && (
              <div className="prediction-item">
                <p className="label">Confidence Level:</p>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
                <p className="confidence-text">{prediction.confidence.toFixed(1)}%</p>
              </div>
            )}
          </div>

          {evaluation && (
            <div className="model-evaluation">
              <h4>📈 Model Performance Metrics</h4>
              <div className="metrics-grid">
                {evaluation.MAE !== undefined && (
                  <div className="metric-card">
                    <p className="metric-label">MAE (Mean Absolute Error)</p>
                    <p className="metric-value">₹ {evaluation.MAE.toFixed(2)}</p>
                    <p className="metric-description">Average prediction error in rupees</p>
                  </div>
                )}

                {evaluation.RMSE !== undefined && (
                  <div className="metric-card">
                    <p className="metric-label">RMSE (Root Mean Square Error)</p>
                    <p className="metric-value">₹ {evaluation.RMSE.toFixed(2)}</p>
                    <p className="metric-description">More weight on larger errors</p>
                  </div>
                )}

                {evaluation.R2_Score !== undefined && (
                  <div className="metric-card">
                    <p className="metric-label">R² Score</p>
                    <p className="metric-value">{(evaluation.R2_Score * 100).toFixed(1)}%</p>
                    <p className="metric-description">Model accuracy (higher is better)</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="prediction-info">
            <h4>💡 Understanding the Results:</h4>
            <ul>
              <li><strong>Predicted Price:</strong> The ML model's estimate of the product price on the predicted date</li>
              <li><strong>Confidence:</strong> How confident the model is in this prediction (0-100%)</li>
              <li><strong>MAE:</strong> Average error in rupees. Lower is better</li>
              <li><strong>RMSE:</strong> Similar to MAE but penalizes larger errors more</li>
              <li><strong>R² Score:</strong> Model fitness. 100% means perfect predictions</li>
            </ul>
          </div>
        </div>
      )}

      <div className="how-it-works">
        <h3>❓ How ML Price Prediction Works</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>1️⃣ Data Collection</h4>
            <p>We gather historical price data for the product across different dates and websites.</p>
          </div>
          <div className="info-card">
            <h4>2️⃣ Feature Engineering</h4>
            <p>We extract meaningful features from dates and create time-series representations.</p>
          </div>
          <div className="info-card">
            <h4>3️⃣ Model Training</h4>
            <p>Machine learning algorithm learns patterns in historical prices to make predictions.</p>
          </div>
          <div className="info-card">
            <h4>4️⃣ Prediction</h4>
            <p>Using learned patterns, the model predicts what the price might be on a future date.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricePrediction
