
$dir = "C:\_WOLFFIE\_WOLFFIE-RC"
$url = "https://github.com/nl12143ao/Wolffie-rc"

git clone $url $dir

Set-Location $dir 

git status


git pull origin main



Set-Location $dir 

# 1. Haal de nieuwste stand op van GitHub
git fetch origin

# 2. Reset je lokale bestanden exact naar de stand van GitHub (overschrijft lokale verschillen)
git reset --hard origin/main


