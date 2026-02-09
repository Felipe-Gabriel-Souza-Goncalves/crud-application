import Database from 'better-sqlite3';

const db = new Database('./database.sqlite', {
  verbose: console.log // opcional: loga as queries
});
 
// db.prepare(`
//   ALTER TABLE users ADD COLUMN password TEXT NOT NULL
// `).run();

// exemplo: criar tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

export default db;
