import Database from 'better-sqlite3';

const db = new Database('./database.sqlite', {
  // verbose: console.log // opcional: loga as queries
});
 
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS refreshTokens (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     token TEXT UNIQUE NOT NULL,
//     creation TEXT datetime('now')
//     duration TEXT 
//   )  
// `)

// db.prepare(`
//   ALTER TABLE users ADD COLUMN password TEXT NOT NULL
// `).run();

// db.prepare(`
//   ALTER TABLE users ADD COLUMN role TEXT CHECK(role in ('Visitante', 'Funcionário', 'Administrador'))
// `).run()

// db.prepare(`
//   ALTER TABLE users ADD COLUMN created_at TEXT CURRENT_TIMESTAMP
// `).run()



// db.prepare(`
//   UPDATE users SET role = 'Funcionário' WHERE id = 3
// `).run();

// db.prepare(`
//     UPDATE users SET created_at = DATETIME('now', 'localtime')
// `).run()





// exemplo: criar tabela
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     role TEXT CHECK(role in ('Visitante', 'Funcionário', 'Administrador')),
//     created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
//   )
// `).run();

export default db;
