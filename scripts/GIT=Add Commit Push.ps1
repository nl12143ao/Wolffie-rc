
$dir = "C:\_WOLFFIE\_WOLFFIE-RC"
$url = "https://github.com/nl12143ao/Wolffie-rc"

Set-Location $dir 
Get-ChildItem -Path "scripts"

git status

git add scripts/
git commit -m "feat: toevoegen git beheerscripts en bijwerken npm opstartscript"
git push origin main

git status



# 1. Voeg alle bestanden uit de scripts map toe (zowel gewijzigd als nieuw)
git add scripts/

# 2. Maak een duidelijke commit aan
git commit -m "feat: toevoegen git beheerscripts en bijwerken npm opstartscript"

# 3. Push de commits naar GitHub
git push origin main

git status


