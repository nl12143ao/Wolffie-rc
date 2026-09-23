
const Database = require('better-sqlite3');
const db = new Database('C:/_WOLFFIE/_WOLFFIE-RC/data/wolffie.db');

const columns = [
  'battery_to_load_kwh',
  'solar_to_grid_kwh'
];

columns.forEach(col => {
  try {
    db.prepare(`ALTER TABLE energy_hours ADD COLUMN \${col} REAL DEFAULT 0`).run();
    console.log(`SUCCESS: Kolom \${col} toegevoegd.`);
  } catch (err) {
    if (err.message.includes("duplicate column")) {
      console.log(`INFO: Kolom \${col} bestond al.`);
    } else {
      console.error(`FOUT bij \${col}:`, err.message);
    }
  }
});

db.close();
