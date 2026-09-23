const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Pad naar je database
const dbPath = path.join(__dirname, 'data', 'wolffie.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

console.log('--- TABELLEN IN DE DATABASE ---');
db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(tables);

    console.log('\n--- DATA UIT day_ahead_prices (laatste 5 rijen) ---');
    db.all("SELECT * FROM day_ahead_prices ORDER BY timestamp DESC LIMIT 5;", [], (err, rows) => {
        if (err) {
            console.log('Tabel day_ahead_prices bestaat wellicht nog niet of is leeg.');
        } else {
            console.table(rows);
        }
        db.close();
    });
}); 
