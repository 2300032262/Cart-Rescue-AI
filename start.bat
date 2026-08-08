@echo off
title Cart Rescue AI - Live Backend Server
echo =========================================================
echo 🚀 CART RESCUE AI - REAL-TIME WORKSPACE
echo =========================================================
echo.
echo Starting backend server on http://localhost:3000...
echo Opening browser...
echo.
timeout /t 2 /nobreak >nul
start http://localhost:3000
npm start
