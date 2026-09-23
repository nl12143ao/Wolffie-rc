
cd "C:\_WOLFFIE\_WOLFFIE-RC"

# 1. Zorg dat Git hoofdletters streng behandelt
git config core.ignorecase false

# 2. Verwijder de PascalCase variant expliciet uit de index
git rm --cached my-app/src/App.vue

# 3. Zorg dat je fysiek de kleine letter 'app.vue' op schijf hebt staan
# (Als je hem nog niet hebt, maak/hernoem hem nu naar app.vue)

# 4. Voeg de kleine letter toe aan Git
git add my-app/src/app.vue

# 5. Commit en push naar GitHub
git commit -m "Switch from App.vue to lowercase app.vue"
git push origin main


git push origin main
git status
