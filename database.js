// Importa o driver do sqlite3
const sqlite3 = require('sqlite3').verbose();

// Define o caminho e o nome do arquivo do banco de dados
const DB_PATH = 'database.sqlite';

// Cria uma nova instância do banco de dados e abre a conexão
// Se o arquivo não existir, ele será criado
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // O serialize garante que os comandos sejam executados em sequência
        db.serialize(() => {
            // Cria a tabela 'salasdeaula' se ela ainda não existir
            db.run(`
                CREATE TABLE IF NOT EXISTS salasdeaula (
                    salasdeaulaid INTEGER PRIMARY KEY AUTOINCREMENT,
                    descricao TEXT NOT NULL,
                    localizacao TEXT,
                    capacidade INTEGER NOT NULL,
                    removido BOOLEAN DEFAULT FALSE
                )
            `, (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela salasdeaula', err.message);
                } else {
                    console.log('Tabela "salasdeaula" criada ou já existente.');
                }
            });
        });
    }
});

// Exporta a instância do banco de dados para ser usada em outras partes da aplicação
module.exports = db;
