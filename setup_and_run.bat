@echo off
echo ========================================
echo Installing Backend Dependencies
echo ========================================
cd backend\venv\Scripts
pip install fastapi uvicorn pandas numpy scikit-learn beautifulsoup4 requests python-multipart
cd ..\..\..

echo.
echo ========================================
echo Installing Frontend Dependencies
echo ========================================
cd frontend
call npm install
cd ..

echo.
echo ========================================
echo Setup Complete! 
echo To start the project:
echo 1. Open one terminal and run: cd backend && python -m uvicorn main:app --reload
echo 2. Open another terminal and run: cd frontend && npm run dev
echo ========================================
