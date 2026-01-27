#!/bin/bash
# 🚀 Script de Setup Automático - Chamados TI

echo "=========================================="
echo "🚀 Setup Automático - Chamados TI"
echo "=========================================="

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "\n${BLUE}✓ Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js não encontrado. Instale em: https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Verificar npm
echo -e "\n${BLUE}✓ Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Instalar dependências do back-end
echo -e "\n${BLUE}🔧 Instalando dependências do back-end...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependências instaladas${NC}"
else
    echo -e "${RED}✗ Erro ao instalar dependências${NC}"
    exit 1
fi

# Instalar CORS
echo -e "\n${BLUE}🔧 Instalando CORS...${NC}"
npm install cors
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ CORS instalado${NC}"
else
    echo -e "${RED}✗ Erro ao instalar CORS${NC}"
    exit 1
fi

# Criar .env se não existir
echo -e "\n${BLUE}📝 Configurando variáveis de ambiente...${NC}"
if [ ! -f .env ]; then
    cat > .env << EOF
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
EOF
    echo -e "${GREEN}✓ Arquivo .env criado${NC}"
else
    echo -e "${GREEN}✓ Arquivo .env já existe${NC}"
fi

echo -e "\n=========================================="
echo -e "${GREEN}✓ Setup concluído com sucesso!${NC}"
echo -e "=========================================="
echo -e "\n${BLUE}Próximos passos:${NC}"
echo -e "1. ${GREEN}npm start${NC}          (Iniciar back-end)"
echo -e "2. Abra uma nova aba do terminal"
echo -e "3. ${GREEN}cd frontend${NC}"
echo -e "4. ${GREEN}python -m http.server 8000${NC}  (Iniciar front-end)"
echo -e "5. Acesse ${BLUE}http://localhost:8000${NC}"
echo -e "\n"
