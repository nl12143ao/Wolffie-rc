const Database = require('better-sqlite3');
const db = new Database('C:/_WOLFFIE/_WOLFFIE-RC/data/wolffie.db');

try {
  db.prepare("ALTER TABLE energy_hours ADD COLUMN solar_to_load_kwh REAL DEFAULT 0").run();
  console.log("SUCCESS: Kolom solar_to_load_kwh toegevoegd aan energy_hours!");
} catch (err) {
  if (err.message.includes("duplicate column")) {
    console.log("SUCCESS: Kolom solar_to_load_kwh bestond al.");
  } else {
    console.error("FOUT:", err.message);
  }
}
db.close();

