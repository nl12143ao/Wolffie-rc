
git status 
git check-ignore -v "scripts"
git check-ignore -v "scripts/NPM=Run Server App.ps1"

"C:\Program Files\nodejs\node.exe"
$env:Path += ";C:\Program Files\nodejs\"
$env:Path -split ';'

$env:Path -split ';' | Select-String "node"
C:\nvm4w\nodejs
C:\Program Files\nodejs\

nvm list 
    22.19.0
    20.19.5
    16.15.0

node -v
npm -v


