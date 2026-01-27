@echo off
REM ==========================================
REM 🚀 Script de Setup Automático - Chamados TI (Windows)
REM ==========================================

echo.
echo ==========================================
echo 🚀 Setup Automático - Chamados TI
echo ==========================================
echo.

REM Verificar Node.js
echo [*] Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [X] Node.js não encontrado. Instale em: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [✓] Node.js %NODE_VERSION%
echo.

REM Verificar npm
echo [*] Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [X] npm não encontrado
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [✓] npm %NPM_VERSION%
echo.

REM Instalar dependências
echo [*] Instalando dependências do back-end...
call npm install
if %ERRORLEVEL% neq 0 (
    echo [X] Erro ao instalar dependências
    pause
    exit /b 1
)
echo [✓] Dependências instaladas
echo.

REM Instalar CORS
echo [*] Instalando CORS...
call npm install cors
if %ERRORLEVEL% neq 0 (
    echo [X] Erro ao instalar CORS
    pause
    exit /b 1
)
echo [✓] CORS instalado
echo.

REM Criar .env se não existir
echo [*] Configurando variáveis de ambiente...
if not exist .env (
    (
        echo PORT=3000
        echo NODE_ENV=development
        echo DB_PATH=./database.sqlite
    ) > .env
    echo [✓] Arquivo .env criado
) else (
    echo [✓] Arquivo .env já existe
)
echo.

echo ==========================================
echo [✓] Setup concluído com sucesso!
echo ==========================================
echo.
echo Próximos passos:
echo 1. [Terminal 1] npm start
echo 2. [Terminal 2] cd frontend ^&^& python -m http.server 8000
echo 3. Acesse http://localhost:8000
echo.
pause
