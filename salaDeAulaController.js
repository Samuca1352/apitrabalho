// Importa a conexão com o banco de dados
const db = require('./database');

// Objeto que conterá todos os métodos do controller
const salaDeAulaController = {

    // --- GetAllSalasDeAula ---
    // Retorna todas as salas de aula que não foram removidas
    getAll: (req, res) => {
        const sql = `SELECT * FROM salasdeaula WHERE removido = FALSE`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: 'Sucesso ao buscar todas as salas de aula!',
                data: rows
            });
        });
    },

    // --- GetSalasDeAulaByID ---
    // Retorna uma única sala de aula pelo ID, se não estiver removida
    getById: (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM salasdeaula WHERE salasdeaulaid = ? AND removido = FALSE`;

        db.get(sql, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (row) {
                res.json({
                    message: `Sucesso ao buscar a sala de aula com ID ${id}!`,
                    data: row
                });
            } else {
                res.status(404).json({ message: `Sala de aula com ID ${id} não encontrada.` });
            }
        });
    },

    // --- InsertSalasDeAula ---
    // Insere uma nova sala de aula
    create: (req, res) => {
        const { descricao, localizacao, capacidade } = req.body;

        // Validação simples dos dados de entrada
        if (!descricao || !capacidade) {
            return res.status(400).json({ error: 'Os campos "descricao" e "capacidade" são obrigatórios.' });
        }

        const sql = `INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES (?, ?, ?)`;
        const params = [descricao, localizacao, capacidade];

        db.run(sql, params, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'Sala de aula criada com sucesso!',
                data: {
                    id: this.lastID,
                    descricao: descricao,
                    localizacao: localizacao,
                    capacidade: capacidade
                }
            });
        });
    },

    // --- UpdateSalasDeAula ---
    // Atualiza uma sala de aula existente pelo ID
    update: (req, res) => {
        const id = req.params.id;
        const { descricao, localizacao, capacidade } = req.body;
        
        // Validação simples dos dados de entrada
        if (!descricao || !capacidade) {
            return res.status(400).json({ error: 'Os campos "descricao" e "capacidade" são obrigatórios.' });
        }
        
        const sql = `
            UPDATE salasdeaula 
            SET 
                descricao = ?, 
                localizacao = ?, 
                capacidade = ? 
            WHERE 
                salasdeaulaid = ?`;
        const params = [descricao, localizacao, capacidade, id];

        db.run(sql, params, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // this.changes retorna o número de linhas afetadas
            if (this.changes > 0) {
                res.json({
                    message: `Sala de aula com ID ${id} atualizada com sucesso!`,
                    changes: this.changes
                });
            } else {
                res.status(404).json({ message: `Sala de aula com ID ${id} não encontrada para atualização.` });
            }
        });
    },

    // --- DeleteSalasDeAula (Soft Delete) ---
    // "Remove" uma sala de aula, marcando o campo 'removido' como TRUE
    softDelete: (req, res) => {
        const id = req.params.id;
        const sql = `UPDATE salasdeaula SET removido = TRUE WHERE salasdeaulaid = ?`;

        db.run(sql, [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes > 0) {
                res.json({
                    message: `Sala de aula com ID ${id} removida (soft delete) com sucesso!`,
                    changes: this.changes
                });
            } else {
                res.status(404).json({ message: `Sala de aula com ID ${id} não encontrada para remoção.` });
            }
        });
    }
};

// Exporta o controller
module.exports = salaDeAulaController;
