
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'wolffie.db');

// Open de database strikt in READ-ONLY modus (veilig!)
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Kan database niet openen:', err.message);
        process.exit(1);
    }
});

console.log('=== LOKALE DATABASE INSPECTIE (READ-ONLY) ===\n');

// 1. Toon alle aanwezige tabellen
db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
        console.error('Fout bij ophalen tabellen:', err.message);
        db.close();
        return;
    }
    
    console.log('Aanwezige tabellen in wolffie.db:');
    if (tables.length === 0) {
        console.log(' (Geen tabellen gevonden - database is leeg)');
    } else {
        tables.forEach(t => console.log(`  ✓ ${t.name}`));
    }
    
    // 2. Toon specifiek de kolommen van de day_ahead_prices tabel (indien aanwezig)
    db.all("PRAGMA table_info(day_ahead_prices);", [], (err, columns) => {
        console.log('\nKolommen in tabel "day_ahead_prices":');
        if (err || columns.length === 0) {
            console.log('  ⚠ Tabel "day_ahead_prices" bestaat nog niet in deze database.');
        } else {
            columns.forEach(col => {
                const pk = col.pk ? ' [PRIMARY KEY]' : '';
                const notNull = col.notnull ? ' NOT NULL' : '';
                console.log(`  - ${col.name} (${col.type})${notNull}${pk}`);
            });
        }
        
        db.close();
        console.log('\n[Klaar - er is niets gewijzigd]');
    });
});

