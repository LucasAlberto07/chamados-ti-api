'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chamados', [
      {
        titulo: 'Impressora não funciona',
        descricao: 'A impressora da sala 101 está com problema de conectividade. Precisa de manutenção urgente.',
        prioridade: 'alta',
        status: 'aberto',
        responsavel: 'João Silva',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Configurar novo computador',
        descricao: 'Novo colaborador chegou e precisa de um computador configurado com todos os softwares necessários.',
        prioridade: 'média',
        status: 'em andamento',
        responsavel: 'Maria Santos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Atualizar Microsoft Office',
        descricao: 'Atualizar versão do Microsoft Office para todos os computadores do setor financeiro.',
        prioridade: 'média',
        status: 'em andamento',
        responsavel: 'Carlos Oliveira',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Trocar HD do servidor',
        descricao: 'HD do servidor principal está falhando. Agendado para sábado à noite.',
        prioridade: 'alta',
        status: 'resolvido',
        responsavel: 'Pedro Costa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Corrigir conexão WiFi',
        descricao: 'WiFi da sala de reuniões está instável. Verificar roteador e antenas.',
        prioridade: 'baixa',
        status: 'resolvido',
        responsavel: 'Ana Silva',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Instalar scanner de rede',
        descricao: 'Comprado novo scanner de rede. Precisa de instalação e configuração.',
        prioridade: 'baixa',
        status: 'aberto',
        responsavel: 'Roberto Dias',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Backup completo do servidor',
        descricao: 'Realizar backup completo de todos os dados do servidor de arquivos.',
        prioridade: 'alta',
        status: 'em andamento',
        responsavel: 'Lucas Fernandes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Atualizar antivírus',
        descricao: 'Atualizar assinatura do antivírus em todas as máquinas da rede.',
        prioridade: 'média',
        status: 'aberto',
        responsavel: 'Juliana Costa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chamados', null, {});
  }
};
