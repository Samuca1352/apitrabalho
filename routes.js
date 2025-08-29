// Importa o framework Express e o Router
const express = require('express');
const router = express.Router();

// Importa o controller que criamos
const salaDeAulaController = require('./salaDeAulaController');

// --- Rotas para Salas de Aula ---

// Rota para buscar todas as salas de aula (GET /api/salas)
router.get('/salas', salaDeAulaController.getAll);

// Rota para buscar uma sala de aula por ID (GET /api/salas/:id)
router.get('/salas/:id', salaDeAulaController.getById);

// Rota para criar uma nova sala de aula (POST /api/salas)
router.post('/salas', salaDeAulaController.create);

// Rota para atualizar uma sala de aula por ID (PUT /api/salas/:id)
router.put('/salas/:id', salaDeAulaController.update);

// Rota para fazer o soft delete de uma sala de aula por ID (DELETE /api/salas/:id)
router.delete('/salas/:id', salaDeAulaController.softDelete);


// Exporta o router com todas as rotas definidas
module.exports = router;
