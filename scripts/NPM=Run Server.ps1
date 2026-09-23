CD "C:\_WOLFFIE\_WOLFFIE-RC\server"

cls 

npm list --depth=0

npm run dev


http://localhost:3009
http://localhost:3009/api/health 
http://localhost:3009/api/status

Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess


taskkill /F /IM node.exe 




# 1. Test de status van de API
Invoke-RestMethod -Uri "http://localhost:3009/api/status" -Method Get

# 2. Test de auth/me endpoint
Invoke-RestMethod -Uri "http://localhost:3009/api/auth/me" -Method Get
# 1. Test de status van de API
Invoke-RestMethod -Uri "http://localhost:3009/api/status" -Method Get

# 2. Test de auth/me endpoint
Invoke-RestMethod -Uri "http://localhost:3009/api/auth/me" -Method Get


taskkill /F /IM node.exe
Get-Process -Name "node" -ErrorAction SilentlyContinue

