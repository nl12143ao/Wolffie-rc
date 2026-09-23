
CD "C:\_WOLFFIE\_WOLFFIE-RC\my-app"

#npm install --verbose #Install dependencies 

npm list --depth=0


npm run dev





# 2. Test de auth/me endpoint
Invoke-RestMethod -Uri "http://localhost:3009/api/auth/me" -Method Get

# 1. Test de status van de API
Invoke-RestMethod -Uri "http://localhost:3009/api/status" -Method Get

# 2. Test de auth/me endpoint
Invoke-RestMethod -Uri "http://localhost:3009/api/auth/me" -Method Get


