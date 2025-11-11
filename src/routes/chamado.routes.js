const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamado.controller');

router.post('/', chamadoController.criarChamado);
router.get('/', chamadoController.listarChamados);
router.get('/:id', chamadoController.buscarChamadoPorId);
router.put('/:id', chamadoController.atualizarChamado);
router.patch('/:id/status', chamadoController.atualizarStatus);
router.delete('/:id', chamadoController.deletarChamado);

module.exports = router;
