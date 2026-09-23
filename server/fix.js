const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:/_WOLFFIE/_WOLFFIE-RC/data/wolffie.db');

db.run("ALTER TABLE energy_hours ADD COLUMN grid_import_kwh REAL DEFAULT 0", (err) => {
if (err && !err.message.includes("duplicate column")) {
console.error("MIGRATIE FOUT:", err.message);
} else {
console.log("SUCCESS: Kolom grid_import_kwh is nu aanwezig in energy_hours.");
}
db.close();
});
