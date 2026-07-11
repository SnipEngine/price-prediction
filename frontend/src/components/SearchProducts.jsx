import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function SearchProducts({ onSearch }) {
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!productName.trim()) {
      setError('Please enter a product name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}/api/compare-prices?product_name=${encodeURIComponent(
          productName
        )}`
      )

      if (!response.ok) {
        throw new Error('Product not found')
      }

      const data = await response.json()
      onSearch(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const popularSearches = [
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'MacBook Pro M3',
    'Sony WH-1000XM5',
  ]

  return (
    <div className="space-y-8">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Find the Best Deals
          </h2>

          <p className="text-gray-500 mt-2">
            Compare prices across multiple retailers instantly
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Search for any product..."
            className="w-full border rounded-xl p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700"
          >
            {loading ? 'Searching...' : 'Search & Compare Prices'}
          </button>

        </form>
                {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-3">
            {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Popular Searches
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => setProductName(item)}
              className="border rounded-xl p-3 hover:bg-blue-50 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold mb-2">
            Real-Time Prices
          </h3>

          <p className="text-gray-600 text-sm">
            Get the latest prices from multiple retailers.
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold mb-2">
            Price Comparison
          </h3>

          <p className="text-gray-600 text-sm">
            Compare prices side by side.
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold mb-2">
            Save Money
          </h3>

          <p className="text-gray-600 text-sm">
            Find the best deals instantly.
          </p>
        </div>

      </div>
          </div>
  )
}

export default SearchProducts
