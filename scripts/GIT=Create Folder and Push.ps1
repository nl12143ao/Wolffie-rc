
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
