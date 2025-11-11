const Chamado = require('../models/chamado.model');

// Criar chamado
exports.criarChamado = async (req, res) => {
  try {
    const { titulo, descricao, prioridade, status, responsavel } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'O título é obrigatório.' });
    }

    const novoChamado = await Chamado.create({
      titulo,
      descricao,
      prioridade,
      status,
      responsavel,
    });

    res.status(201).json(novoChamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
};

// Listar todos
exports.listarChamados = async (req, res) => {
  try {
    const chamados = await Chamado.findAll();
    res.json(chamados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar chamados.' });
  }
};

// Buscar por ID
exports.buscarChamadoPorId = async (req, res) => {
  try {
    const chamado = await Chamado.findByPk(req.params.id);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado.' });
    }

    res.json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamado.' });
  }
};

// Atualizar chamado (PUT)
exports.atualizarChamado = async (req, res) => {
  try {
    const { titulo, descricao, prioridade, status, responsavel } = req.body;
    const chamado = await Chamado.findByPk(req.params.id);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado.' });
    }

    await chamado.update({ titulo, descricao, prioridade, status, responsavel });
    res.json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar chamado.' });
  }
};

// Atualizar apenas status (PATCH)
exports.atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const chamado = await Chamado.findByPk(req.params.id);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado.' });
    }

    if (!['aberto', 'em andamento', 'resolvido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' });
    }

    chamado.status = status;
    await chamado.save();

    res.json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status.' });
  }
};

// Deletar chamado
exports.deletarChamado = async (req, res) => {
  try {
    const chamado = await Chamado.findByPk(req.params.id);

    if (!chamado) {
      return res.status(404).json({ error: 'Chamado não encontrado.' });
    }

    await chamado.destroy();
    res.json({ message: 'Chamado deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar chamado.' });
  }
};
