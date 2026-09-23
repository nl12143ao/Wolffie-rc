
cd "C:\_WOLFFIE\_WOLFFIE-RC\server"

# 1. Backend packages installeren
cd "server"
npm install --verbose #Install dependencies 
npm audit 
Test-Path "C:\_WOLFFIE\_WOLFFIE-RC\server\node_modules"

npm run dev


# 2. Frontend packages installeren
cd "C:\_WOLFFIE\_WOLFFIE-RC\my-app"
npm install --verbose #Install dependencies 
npm run dev


taskkill /F /IM node.exe
Get-Process -Name "node" -ErrorAction SilentlyContinue
