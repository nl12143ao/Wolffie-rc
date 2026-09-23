
const Database = require("better-sqlite3");
const db = new Database("C:/_WOLFFIE/_WOLFFIE-RC/data/wolffie.db");

const columns = [
  "grid_import_kwh",
  "grid_export_kwh",
  "battery_charge_kwh",
  "battery_discharge_kwh",
  "grid_to_load_kwh",
  "grid_to_battery_kwh",
  "solar_to_load_kwh",
  "solar_to_battery_kwh",
  "battery_to_load_kwh",
  "load_kwh"
];

columns.forEach(col => {
  try {
    db.prepare(`ALTER TABLE energy_hours ADD COLUMN ${col} REAL DEFAULT 0`).run();
    console.log(`SUCCESS: Kolom ${col} toegevoegd.`);
  } catch (err) {
    if (err.message.includes("duplicate column")) {
      console.log(`INFO: Kolom ${col} bestond al.`);
    } else {
      console.error(`FOUT bij ${col}:`, err.message);
    }
  }
});

db.close();

/**
Jouw project gebruikt better-sqlite3 als database-driver. 
Omdat dat pakket al netjes in de node_modules van je project staat, 
draaien al je eigen scripts en migraties (zoals je voorbeeld hierboven) daar vlekkeloos op 
zonder dat je iets extra's hoeft te installeren.

Als je nu snel en veilig de inhoud van je tabellen wilt inzien met datzelfde better-sqlite3, 
dan kun je in een nieuw scriptje (db-inspect.cjs) exact dezelfde stijl aanhouden:

*/
