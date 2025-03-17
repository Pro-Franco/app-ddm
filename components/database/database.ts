import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('Contatos');

export async function setupDatabase() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      intValue  TEXT
    );
  `);
}

export async function addContact(name: string, cell: string) {
  await db.runAsync(
    'INSERT INTO contact (value, intValue) VALUES (?, ?)',
    name,
    cell
  );
}

export async function getContacts() {
  const allRows = (await db.getAllAsync('SELECT * FROM contact')) as {
    value: string;
    intValue: string;
  }[];
  return allRows.map((row) => ({ name: row.value, cell: row.intValue }));
}

export async function removeContact(name: string) {
  await db.runAsync('DELETE FROM contact WHERE value = ?', [name]);
}

export async function updateContact(
  oldName: string,
  newName: string,
  newcell: string
) {
  await db.runAsync(
    'UPDATE contact SET value = ?, intValue = ? WHERE value = ?',
    newName,
    newcell,
    oldName
  );
}
