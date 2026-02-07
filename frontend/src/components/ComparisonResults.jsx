import React from 'react'

function ComparisonResults({ data }) {
  const { product, comparison, cheapest, note, available_count, total_checked } = data

  console.log('ComparisonResults received:', data) // Debug log

  if (!comparison) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Comparison Data</h3>
        <p className="text-gray-500">Please search again to see comparison results</p>
      </div>
    )
  }

  // Convert comparison object to array for easier iteration
  const priceEntries = Object.entries(comparison)
  
  // Calculate max savings only from available products with non-null savings
  const availableSavings = cheapest?.savings 
    ? Object.values(cheapest.savings).filter(s => s !== null && s !== undefined)
    : []
  const maxSavings = availableSavings.length > 0 ? Math.max(...availableSavings) : 0

  return (
    <div className="space-y-6">
      {/* Note about estimated prices if present */}
      {note && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-amber-900">📊 Estimated Prices</h3>
              <p className="text-amber-700">{note}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-green-200 animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-900">Search Complete!</h3>
            <p className="text-green-700">
              {available_count > 0 
                ? `Found real prices on ${available_count} out of ${total_checked || priceEntries.length} websites`
                : `Checked ${total_checked || priceEntries.length} websites - no listings found`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Price Comparison Results</h2>
        <p className="text-gray-500">Comparing prices for: <span className="font-semibold text-gray-900">{product}</span></p>
      </div>

      {/* Best Deal Highlight */}
      {cheapest && cheapest.website && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-yellow-200 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎉 Best Deal Found!</h3>
              <p className="text-lg font-semibold text-orange-700 mb-1">{cheapest.website}</p>
              <p className="text-4xl font-bold text-orange-600 mb-2">₹{cheapest.price?.toLocaleString()}</p>
              {maxSavings > 0 && (
                <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-700 font-semibold">Save up to ₹{maxSavings.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Price Comparison Cards */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Price Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceEntries.map(([website, priceData]) => {
            const isCheapest = cheapest?.website === website
            const isAvailable = priceData.available !== false && priceData.price !== null
            
            return (
              <div 
                key={website} 
                className={`relative rounded-xl p-6 transition-all duration-300 ${
                  !isAvailable
                    ? 'bg-gray-100 border-2 border-gray-300 opacity-75'
                    : isCheapest 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 shadow-xl hover:scale-105' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:scale-105'
                }`}
              >
                {isCheapest && isAvailable && (
                  <div className="absolute -top-3 -right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
                      ✓ Best Deal
                    </span>
                  </div>
                )}
                
                {!isAvailable && (
                  <div className="absolute -top-3 -right-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-500 text-white shadow-lg">
                      Not Listed
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{website}</h4>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  {isAvailable ? (
                    <p className={`text-3xl font-bold ${
                      isCheapest ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      ₹{priceData.price?.toLocaleString()}
                    </p>
                  ) : (
                    <div className="text-center py-2">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-lg font-semibold text-gray-500">Not Available</p>
                      <p className="text-xs text-gray-400 mt-1">Product not found</p>
                    </div>
                  )}
                </div>
                
                {priceData.link && (
                  <a 
                    href={priceData.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`block w-full py-2 px-4 rounded-lg font-semibold text-center transition-all ${
                      isAvailable
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-400 text-gray-600 cursor-default'
                    }`}
                  >
                    {isAvailable ? 'View Deal →' : 'View Search →'}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Savings Summary */}
      {cheapest?.savings && Object.keys(cheapest.savings).length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Savings Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(cheapest.savings)
              .filter(([_, savings]) => savings !== null && savings !== undefined)
              .map(([website, savings]) => (
                <div key={website} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-semibold text-gray-900">{website}</span>
                  <span className="text-lg font-bold text-green-600">
                    {savings === 0 ? 'Best Price!' : `Save ₹${savings.toLocaleString()}`}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* Search Another Product Button */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search Another Product</span>
        </button>
      </div>
    </div>
  )
}

export default ComparisonResults
