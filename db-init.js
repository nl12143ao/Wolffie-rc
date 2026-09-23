
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'wolffie.db');
const schemaPath = path.join(__dirname, 'database', 'Wolffie_Db_Schema.sql');

const db = new sqlite3.Database(dbPath);
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

db.exec(schemaSql, (err) => {
    if (err) {
        console.error('Fout bij uitvoeren schema:', err.message);
    } else {
        console.log('✓ Database succesvol geïnitialiseerd vanuit Wolffie_Db_Schema.sql!');
    }
    db.close();
});
