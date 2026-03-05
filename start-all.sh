#!/bin/bash

echo "🚀 Starting TELsTP Unified Command Center..."

# Start backend
echo "📡 Starting Backend Server..."
python3 command_center.py &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 3

# Start frontend
echo "🎨 Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "📡 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID