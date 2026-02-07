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
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Price Prediction</h2>
        <p className="text-gray-500">Forecast future prices using machine learning</p>
      </div>

      {/* Prediction Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Predict Future Prices</h3>
          <p className="text-center text-gray-500">
            Our ML model analyzes historical data to forecast future prices
          </p>
        </div>

        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label htmlFor="productId" className="block text-sm font-semibold text-gray-700 mb-2">
              Product ID
            </label>
            <input
              id="productId"
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID (e.g., 1)"
              disabled={loading}
              min="1"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none disabled:bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="daysAhead" className="block text-sm font-semibold text-gray-700 mb-2">
              Days Ahead to Predict
            </label>
            <input
              id="daysAhead"
              type="number"
              value={daysAhead}
              onChange={(e) => setDaysAhead(e.target.value)}
              placeholder="30"
              disabled={loading}
              min="1"
              max="365"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none disabled:bg-gray-50"
            />
            <p className="mt-2 text-sm text-gray-500">Enter a value between 1 and 365 days</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Data...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Prediction</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      {prediction && (
        <div className="space-y-6 animate-fade-in">
          {/* Prediction Results */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Prediction Results
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-purple-100 text-sm font-medium mb-2">Predicted Price</p>
                <p className="text-5xl font-bold">₹{prediction.predicted_price?.toLocaleString()}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <p className="text-purple-100 text-sm font-medium mb-2">Predicted Date</p>
                <p className="text-3xl font-bold">{prediction.predicted_date}</p>
              </div>
            </div>

            {prediction.confidence !== undefined && (
              <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-purple-100 text-sm font-medium">Confidence Level</p>
                  <p className="text-2xl font-bold">{prediction.confidence.toFixed(1)}%</p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {evaluation && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Model Performance Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {evaluation.MAE !== undefined && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <p className="text-blue-700 text-sm font-semibold mb-2">MAE (Mean Absolute Error)</p>
                    <p className="text-3xl font-bold text-blue-900 mb-2">₹{evaluation.MAE.toFixed(2)}</p>
                    <p className="text-sm text-blue-600">Average prediction error</p>
                  </div>
                )}

                {evaluation.RMSE !== undefined && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <p className="text-purple-700 text-sm font-semibold mb-2">RMSE (Root Mean Square Error)</p>
                    <p className="text-3xl font-bold text-purple-900 mb-2">₹{evaluation.RMSE.toFixed(2)}</p>
                    <p className="text-sm text-purple-600">Weighted error measure</p>
                  </div>
                )}

                {evaluation.R2_Score !== undefined && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <p className="text-green-700 text-sm font-semibold mb-2">R² Score</p>
                    <p className="text-3xl font-bold text-green-900 mb-2">{(evaluation.R2_Score * 100).toFixed(1)}%</p>
                    <p className="text-sm text-green-600">Model accuracy</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Understanding the Results
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Predicted Price:</span> ML model's estimate for the future date</p>
              <p><span className="font-semibold">Confidence:</span> Model certainty (0-100%, higher is better)</p>
              <p><span className="font-semibold">MAE:</span> Average error in rupees (lower is better)</p>
              <p><span className="font-semibold">RMSE:</span> Error metric that penalizes larger errors</p>
              <p><span className="font-semibold">R² Score:</span> Model accuracy (100% = perfect predictions)</p>
            </div>
          </div>
        </div>
      )}

      {/* How it Works */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How AI Price Prediction Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Data Collection</h4>
            <p className="text-sm text-gray-600">Gather historical price data across dates and retailers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Feature Engineering</h4>
            <p className="text-sm text-gray-600">Extract patterns and create time-series features</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Model Training</h4>
            <p className="text-sm text-gray-600">ML algorithm learns price patterns and trends</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Prediction</h4>
            <p className="text-sm text-gray-600">Forecast future prices using learned patterns</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricePrediction
