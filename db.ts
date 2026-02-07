import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "AubeSupplies.db";

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: database_name, location: 'default' });
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  // Settings table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Salles table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS salles (
      id TEXT PRIMARY KEY,
      nom TEXT,
      emplacement TEXT,
      niveau TEXT,
      photoId TEXT
    );
  `);

  // Materiel table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS materiel (
      id TEXT PRIMARY KEY,
      salleId TEXT,
      categorie TEXT,
      nom TEXT,
      marque TEXT,
      couleur TEXT,
      etat TEXT,
      dateAcq TEXT,
      dateRen TEXT,
      infos TEXT,
      photoId TEXT,
      FOREIGN KEY (salleId) REFERENCES salles (id)
    );
  `);

  // Notes table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      date TEXT
    );
  `);

  // Alerts table
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      title TEXT,
      message TEXT,
      date TEXT,
      read INTEGER DEFAULT 0,
      materielId TEXT,
      FOREIGN KEY (materielId) REFERENCES materiel (id)
    );
  `);

  // Photos table (for base64 storage as requested to be offline-first and clone of current logic)
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      data TEXT
    );
  `);
};

export const initDB = async () => {
  const db = await getDBConnection();
  await createTables(db);
  return db;
};
