const Chamado = require('../models/chamado.model');

// Valores válidos para ENUM
const PRIORIDADES_VALIDAS = ['baixa', 'média', 'alta'];
const STATUS_VALIDOS = ['aberto', 'em andamento', 'resolvido'];

// Validar ENUM
const validarEnum = (valor, valoresValidos, campo) => {
  if (valor && !valoresValidos.includes(valor)) {
    return {
      valido: false,
      erro: `${campo} inválido. Valores aceitos: ${valoresValidos.join(', ')}`
    };
  }
  return { valido: true };
};

// Criar chamado
exports.criarChamado = async (req, res) => {
  try {
    const { titulo, descricao, prioridade, status, responsavel } = req.body;

    // Validar título
    if (!titulo) {
      return res.status(400).json({ error: 'O título é obrigatório.' });
    }

    // Validar prioridade se fornecida
    if (prioridade) {
      const validacao = validarEnum(prioridade, PRIORIDADES_VALIDAS, 'Prioridade');
      if (!validacao.valido) {
        return res.status(400).json({ error: validacao.erro });
      }
    }

    // Validar status se fornecido
    if (status) {
      const validacao = validarEnum(status, STATUS_VALIDOS, 'Status');
      if (!validacao.valido) {
        return res.status(400).json({ error: validacao.erro });
      }
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
    console.error('Erro ao criar chamado:', error);
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
};

// Listar todos
exports.listarChamados = async (req, res) => {
  try {
    const chamados = await Chamado.findAll();
    res.json(chamados);
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
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
    console.error('Erro ao buscar chamado:', error);
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

    // Validar prioridade se fornecida
    if (prioridade) {
      const validacao = validarEnum(prioridade, PRIORIDADES_VALIDAS, 'Prioridade');
      if (!validacao.valido) {
        return res.status(400).json({ error: validacao.erro });
      }
    }

    // Validar status se fornecido
    if (status) {
      const validacao = validarEnum(status, STATUS_VALIDOS, 'Status');
      if (!validacao.valido) {
        return res.status(400).json({ error: validacao.erro });
      }
    }

    await chamado.update({ titulo, descricao, prioridade, status, responsavel });
    res.json(chamado);
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
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

    // Validar status
    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório.' });
    }

    const validacao = validarEnum(status, STATUS_VALIDOS, 'Status');
    if (!validacao.valido) {
      return res.status(400).json({ error: validacao.erro });
    }

    chamado.status = status;
    await chamado.save();

    res.json(chamado);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
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
    console.error('Erro ao deletar chamado:', error);
    res.status(500).json({ error: 'Erro ao deletar chamado.' });
  }
};
