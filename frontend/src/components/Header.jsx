import React from 'react'

function Header({ apiHealth }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="app-title">💰 Price Comparison & Prediction</h1>
          <p className="app-subtitle">Find the best deals and predict future prices</p>
        </div>
        <div className="status-indicator">
          <div className={`status-dot ${apiHealth ? 'online' : 'offline'}`}></div>
          <span className="status-text">
            {apiHealth ? 'Backend Connected ✓' : 'Backend Disconnected ✗'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
