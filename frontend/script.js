// CONFIGURAÇÃO DA API
const API_URL = 'https://tarefas-chamados-ti-api.onrender.com/api/chamados';
let chamadosGlobal = [];
let filtroAtual = 'todos';

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  carregarChamados();
  setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Form de criação
  const formChamado = document.getElementById('formChamado');
  formChamado.addEventListener('submit', handleCriarChamado);

  // Filtros
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filtroAtual = e.target.dataset.filter;
      renderizarChamados();
    });
  });
}

// ============================================
// FETCH API CALLS
// ============================================

// GET: Listar todos os chamados
async function carregarChamados() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    chamadosGlobal = await response.json();
    renderizarChamados();
    atualizarContadores();
  } catch (error) {
    console.error('Erro ao carregar chamados:', error);
    mostrarToast('Erro ao carregar chamados', 'error');
    document.getElementById('chamadosList').innerHTML = `
      <div class="empty-state">
        <h3>❌ Erro ao carregar</h3>
        <p>Verifique se a API está rodando em ${API_URL}</p>
      </div>
    `;
  }
}

// POST: Criar novo chamado
async function handleCriarChamado(e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const responsavel = document.getElementById('responsavel').value.trim();

  if (!titulo) {
    mostrarToast('Título é obrigatório', 'warning');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        descricao: descricao || null,
        prioridade,
        responsavel: responsavel || null,
        status: 'aberto',
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const novoChamado = await response.json();
    chamadosGlobal.push(novoChamado);

    // Limpar form
    document.getElementById('formChamado').reset();
    document.getElementById('prioridade').value = 'baixa';

    mostrarToast('Chamado criado com sucesso! ✨', 'success');
    renderizarChamados();
    atualizarContadores();
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    mostrarToast('Erro ao criar chamado', 'error');
  }
}

// PATCH: Atualizar status
async function atualizarStatus(id, novoStatus) {
  try {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: novoStatus }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const chamadoAtualizado = await response.json();
    
    // Atualizar no array global
    const index = chamadosGlobal.findIndex(c => c.id === id);
    if (index !== -1) {
      chamadosGlobal[index] = chamadoAtualizado;
    }

    mostrarToast(`Status atualizado para "${novoStatus}" ✓`, 'success');
    renderizarChamados();
    atualizarContadores();
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    mostrarToast('Erro ao atualizar status', 'error');
  }
}

// PUT: Atualizar chamado completo
async function atualizarChamado(id) {
  const chamado = chamadosGlobal.find(c => c.id === id);
  if (!chamado) return;

  // Abrir modal de edição
  openModal('edit', {
    title: 'Editar Chamado',
    data: chamado,
    onSave: async (formData) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const chamadoAtualizado = await response.json();
        const index = chamadosGlobal.findIndex(c => c.id === id);
        if (index !== -1) chamadosGlobal[index] = chamadoAtualizado;

        mostrarToast('Chamado atualizado com sucesso! ✓', 'success');
        renderizarChamados();
        closeModal();
      } catch (error) {
        console.error('Erro ao atualizar chamado:', error);
        mostrarToast('Erro ao atualizar chamado', 'error');
      }
    }
  });
}

// DELETE: Deletar chamado
async function deletarChamado(id) {
  // Abrir modal de confirmação
  openModal('confirm', {
    title: 'Confirmar Exclusão',
    message: 'Tem certeza que deseja deletar este chamado?',
    onConfirm: async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        chamadosGlobal = chamadosGlobal.filter(c => c.id !== id);
        mostrarToast('Chamado deletado com sucesso! 🗑️', 'success');
        renderizarChamados();
        atualizarContadores();
        closeModal();
      } catch (error) {
        console.error('Erro ao deletar chamado:', error);
        mostrarToast('Erro ao deletar chamado', 'error');
      }
    }
  });
}

// ============================================
// RENDERIZAÇÃO
// ============================================

function renderizarChamados() {
  const container = document.getElementById('chamadosList');

  // Filtrar chamados
  let chamadosFiltrados = chamadosGlobal;
  if (filtroAtual !== 'todos') {
    chamadosFiltrados = chamadosGlobal.filter(c => c.status === filtroAtual);
  }

  // Se vazio
  if (chamadosFiltrados.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>📭 Nenhum chamado encontrado</h3>
        <p>Comece criando um novo chamado acima!</p>
      </div>
    `;
    return;
  }

  // Renderizar cards
  container.innerHTML = chamadosFiltrados
    .map(chamado => criarCardChamado(chamado))
    .join('');
}

function criarCardChamado(chamado) {
  const statusFormatado = formatarStatus(chamado.status);
  const prioridadeFormatada = formatarPrioridade(chamado.prioridade);

  return `
    <article class="chamado-card" data-id="${chamado.id}">
      <div class="chamado-header">
        <h3 class="chamado-title">${escapeHtml(chamado.titulo)}</h3>
        <span class="chamado-id">#${chamado.id}</span>
      </div>

      <div class="chamado-meta">
        <span class="badge badge-status ${chamado.status.replace(' ', '-')}">
          ${statusFormatado}
        </span>
        <span class="badge badge-priority ${chamado.prioridade}">
          ${prioridadeFormatada}
        </span>
      </div>

      ${chamado.descricao ? `
        <p class="chamado-description">${escapeHtml(chamado.descricao)}</p>
      ` : ''}

      ${chamado.responsavel ? `
        <div class="chamado-responsavel">
          <strong>👤 Responsável:</strong> ${escapeHtml(chamado.responsavel)}
        </div>
      ` : ''}

      <div class="chamado-actions">
        <button class="btn btn-small btn-info" onclick="atualizarChamado(${chamado.id})">
          ✏️ Editar
        </button>
        <button class="btn btn-small btn-success" onclick="showStatusMenu(${chamado.id})">
          ✓ Status
        </button>
        <button class="btn btn-small btn-danger" onclick="deletarChamado(${chamado.id})">
          🗑️ Deletar
        </button>
      </div>
    </article>
  `;
}

// ============================================
// UTILITÁRIOS
// ============================================
// Modal helpers
function getModalElements() {
  return {
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalFooter: document.getElementById('modalFooter'),
  };
}

function openModal(type, opts = {}) {
  const { modal, modalTitle, modalBody, modalFooter } = getModalElements();
  modalTitle.textContent = opts.title || '';
  modalBody.innerHTML = '';
  modalFooter.innerHTML = '';

  if (type === 'edit') {
    const form = buildEditForm(opts.data);
    modalBody.appendChild(form);

    const btnSave = document.createElement('button');
    btnSave.className = 'btn btn-primary';
    btnSave.textContent = 'Salvar';
    btnSave.addEventListener('click', () => {
      const formData = {
        titulo: form.querySelector('#modal_titulo').value.trim(),
        descricao: form.querySelector('#modal_descricao').value.trim() || null,
        prioridade: form.querySelector('#modal_prioridade').value,
        status: form.querySelector('#modal_status').value,
        responsavel: form.querySelector('#modal_responsavel').value.trim() || null,
      };
      if (!formData.titulo) {
        mostrarToast('Título é obrigatório', 'warning');
        return;
      }
      opts.onSave && opts.onSave(formData);
    });

    const btnCancel = document.createElement('button');
    btnCancel.className = 'btn btn-warning';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', closeModal);

    modalFooter.appendChild(btnCancel);
    modalFooter.appendChild(btnSave);

  } else if (type === 'status') {
    const select = document.createElement('select');
    select.id = 'modal_status';
    ['aberto', 'em andamento', 'resolvido'].forEach(s => {
      const o = document.createElement('option');
      o.value = s;
      o.textContent = formatarStatus(s);
      if (opts.data && opts.data.status === s) o.selected = true;
      select.appendChild(o);
    });

    const wrapper = document.createElement('div');
    wrapper.appendChild(select);
    modalBody.appendChild(wrapper);

    const btnSave = document.createElement('button');
    btnSave.className = 'btn btn-primary';
    btnSave.textContent = 'Salvar';
    btnSave.addEventListener('click', () => {
      opts.onSave && opts.onSave({ status: select.value });
    });

    const btnCancel = document.createElement('button');
    btnCancel.className = 'btn btn-warning';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', closeModal);

    modalFooter.appendChild(btnCancel);
    modalFooter.appendChild(btnSave);

  } else if (type === 'confirm') {
    const p = document.createElement('p');
    p.textContent = opts.message || '';
    modalBody.appendChild(p);

    const btnConfirm = document.createElement('button');
    btnConfirm.className = 'btn btn-danger';
    btnConfirm.textContent = 'Confirmar';
    btnConfirm.addEventListener('click', () => {
      opts.onConfirm && opts.onConfirm();
    });

    const btnCancel = document.createElement('button');
    btnCancel.className = 'btn btn-warning';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', closeModal);

    modalFooter.appendChild(btnCancel);
    modalFooter.appendChild(btnConfirm);
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const { modal, modalBody, modalFooter } = getModalElements();
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalBody.innerHTML = '';
  modalFooter.innerHTML = '';
}

function buildEditForm(data = {}) {
  const form = document.createElement('div');

  form.innerHTML = `
    <div class="form-group">
      <label for="modal_titulo">Título *</label>
      <input id="modal_titulo" type="text" value="${escapeHtml(data.titulo || '')}" />
    </div>
    <div class="form-group">
      <label for="modal_descricao">Descrição</label>
      <textarea id="modal_descricao" rows="4">${escapeHtml(data.descricao || '')}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="modal_prioridade">Prioridade</label>
        <select id="modal_prioridade">
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modal_status">Status</label>
        <select id="modal_status">
          <option value="aberto">Aberto</option>
          <option value="em andamento">Em Andamento</option>
          <option value="resolvido">Resolvido</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="modal_responsavel">Responsável</label>
      <input id="modal_responsavel" type="text" value="${escapeHtml(data.responsavel || '')}" />
    </div>
  `;

  // Setar selects para valores atuais
  setTimeout(() => {
    const p = form.querySelector('#modal_prioridade');
    const s = form.querySelector('#modal_status');
    if (p && data.prioridade) p.value = data.prioridade;
    if (s && data.status) s.value = data.status;
  }, 0);

  return form;
}

// Substitui o uso de prompt/confirm por modal amigável
function showStatusMenu(id) {
  const chamado = chamadosGlobal.find(c => c.id === id);
  if (!chamado) return;

  openModal('status', {
    title: 'Alterar Status',
    data: chamado,
    onSave: (payload) => {
      atualizarStatus(id, payload.status);
      closeModal();
    }
  });
}

function formatarStatus(status) {
  const map = {
    'aberto': '🔴 Aberto',
    'em andamento': '🟡 Em Andamento',
    'resolvido': '🟢 Resolvido',
  };
  return map[status] || status;
}

function formatarPrioridade(prioridade) {
  const map = {
    'baixa': '📊 Baixa',
    'média': '📈 Média',
    'alta': '🔥 Alta',
  };
  return map[prioridade] || prioridade;
}

function atualizarContadores() {
  const total = chamadosGlobal.length;
  const abertos = chamadosGlobal.filter(c => c.status === 'aberto').length;
  const andamento = chamadosGlobal.filter(c => c.status === 'em andamento').length;
  const resolvidos = chamadosGlobal.filter(c => c.status === 'resolvido').length;

  document.querySelector('[data-filter="todos"]').textContent = `Todos (${total})`;
  document.querySelector('[data-filter="aberto"]').textContent = `Abertos (${abertos})`;
  document.querySelector('[data-filter="em andamento"]').textContent = `Em Andamento (${andamento})`;
  document.querySelector('[data-filter="resolvido"]').textContent = `Resolvidos (${resolvidos})`;
}

function mostrarToast(mensagem, tipo = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.textContent = mensagem;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}
