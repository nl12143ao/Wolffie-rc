const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'wolffie.db');

try {
    // Open de database in read-only modus (veilig)
    const db = new DatabaseSync(dbPath, { readOnly: true });

    console.log('=== LOKALE DATABASE INSPECTIE (NATIVE NODE.JS) ===\n');

    // 1. Toon alle aanwezige tabellen
    const tablesQuery = db.prepare("SELECT name FROM sqlite_master WHERE type='table';");
    const tables = tablesQuery.all();

    console.log('Aanwezige tabellen in wolffie.db:');
    if (tables.length === 0) {
        console.log(' (Geen tabellen gevonden - database is leeg)');
    } else {
        tables.forEach(t => console.log(`  ✓ ${t.name}`));
    }

    // 2. Toon kolommen van day_ahead_prices
    console.log('\nKolommen in tabel "day_ahead_prices":');
    try {
        const columnsQuery = db.prepare("PRAGMA table_info(day_ahead_prices);");
        const columns = columnsQuery.all();
        
        if (columns.length === 0) {
            console.log('  ⚠ Tabel "day_ahead_prices" bestaat nog niet.');
        } else {
            columns.forEach(col => {
                const pk = col.pk ? ' [PRIMARY KEY]' : '';
                const notNull = col.notnull ? ' NOT NULL' : '';
                console.log(`  - ${col.name} (${col.type})${notNull}${pk}`);
            });
        }
    } catch (e) {
        console.log('  ⚠ Tabel "day_ahead_prices" is niet gevonden of nog niet aangemaakt.');
    }

    console.log('\n[Klaar - er is niets gewijzigd]');

} catch (err) {
    console.error('Fout bij openen database:', err.message);
}

/**
Ah, Node.js kan het pakket sqlite3 niet vinden in je projectomgeving.
Maar je gebruikt Node.js v24.21.0, en moderne versies van Node (vanaf v22+) hebben iets fantastisch: 
native SQLite ingebouwd! Je hoeft dus helemaal geen externe pakketten te installeren; 
Node kan het zelf rechtstreeks lezen.

Het sqlite3-pakket is een traditionele, externe Node.js-module (een npm-pakket) 
die je via npm install sqlite3 moet installeren om vanuit JavaScript met SQLite-databases te kunnen werken.

Moet dat een js of een cjs zijn?
Het maakt in principe niet uit, maar .cjs is in jouw geval de veiligste keuze.
Waarom? Als jouw project in package.json is ingesteld als een moderne module ("type": "module"), 
dan verwacht Node.js in .js bestanden de import-syntax. 
Omdat wij hier gebruikmaken van require(), zou Node.js dan gaan mopperen.
Door de extensie .cjs te gebruiken, dwing je Node.js om het script 
als een klassiek CommonJS-bestand te behandelen, waardoor require() altijd feilloos werkt 
— ongeacht de instellingen in je package.json.
Je kunt het dus gerust als db-check.cjs laten staan!

*/