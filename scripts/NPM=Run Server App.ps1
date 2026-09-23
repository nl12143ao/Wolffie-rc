git status 
git check-ignore -v "scripts/NPM=Run Server App.ps1"

# 1. Backend packages installeren
cd "C:\_WOLFFIE\_WOLFFIE-RC\server"
npm install

cd "C:\_WOLFFIE\_WOLFFIE-RC\server"
npm run dev


# 2. Frontend packages installeren
cd "C:\_WOLFFIE\_WOLFFIE-RC\my-app"
npm install

cd "C:\_WOLFFIE\_WOLFFIE-RC\my-app"
npm run dev
