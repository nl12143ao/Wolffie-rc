
git add .gitignore 
git commit -m "chore: Add gitignore voor npm, dist and data folders"

git push origin main 
git status


# 1. Voeg de gehele scripts map (en alle .ps1 bestanden daarin) toe aan Git
git add scripts/

# 2. Maak de commit aan
git commit -m "Toevoegen powershell startscripts"

# 3. Stuur alle commits naar je GitHub repository
git push origin main

git status



Get-ChildItem -Path "scripts"

# 1. Voeg alle bestanden uit de scripts map toe (zowel gewijzigd als nieuw)
git add scripts/

# 2. Maak een duidelijke commit aan
git commit -m "feat: toevoegen git beheerscripts en bijwerken npm opstartscript"

# 3. Push de commits naar GitHub
git push origin main

git status
