import Database from 'better-sqlite3';

const db = new Database('./database.sqlite', {
  // verbose: console.log // opcional: loga as queries
});

// exemplo: criar tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role in ('Visitante', 'Funcionário', 'Administrador')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;
