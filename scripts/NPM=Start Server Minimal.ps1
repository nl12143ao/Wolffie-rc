
taskkill /F /IM node.exe 

Get-Process -Name "node" -ErrorAction SilentlyContinue

CD "C:\_WOLFFIE\_WOLFFIE-RC\server"

$script = @'
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("C:/_WOLFFIE/_WOLFFIE-RC/data/wolffie.db");

db.serialize(() => {
  // 1. Voeg ontbrekende kolom toe aan energy_hours
  db.run("ALTER TABLE energy_hours ADD COLUMN grid_import_kwh REAL DEFAULT 0", (err) => {
    if (err && !err.message.includes("duplicate column")) console.error("Fout bij kolom:", err.message);
    else console.log("SUCCESS: Kolom grid_import_kwh aanwezig.");
  });

  // 2. Schakel alle modules uit in de database
  db.run("UPDATE settings SET value = 'false' WHERE key LIKE '%enabled%' OR key LIKE '%alphaess%'", (err) => {
    if (err) console.error("Fout bij modules:", err.message);
    else console.log("SUCCESS: Alle externe modules uitgeschakeld.");
    db.close();
  });
});
'@




