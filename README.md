# GTransporte — API REST para Gestão de Transporte 🚌
 
Sistema de gestão de transporte desenvolvido para a disciplina de **Criação de Serviços Web com REST** (UNIFACISA), com foco prático na construção de uma API RESTful completa em Node.js/Express e um frontend em React consumindo essa API.
 
> ⚠️ **Status: projeto acadêmico/de aprendizado.** Construído como exercício prático de REST API, autenticação e modelagem relacional — não é um sistema em produção.
 
## Sobre o projeto
 
O GTransporte simula a gestão de uma frota de transporte: motoristas, veículos, viagens e relatórios de viagem, com autenticação de usuários e controle de acesso via token. O projeto foi usado como exercício de ponta a ponta — desde a modelagem do banco relacional até a proteção de rotas por middleware e o consumo da API por um frontend React com filtros dinâmicos.
 
## Funcionalidades implementadas
 
- **Autenticação:** cadastro e login de usuários com senha criptografada (bcrypt) e emissão de token JWT
- **Middleware de autorização:** todas as rotas de negócio (frotas, motoristas, viagens, relatórios) exigem token válido
- **CRUD completo** (criar, listar, buscar por ID, atualizar, remover) para:
  - **Motoristas** (`/api/drivers`) — nome, CNH, categoria, telefone, status
  - **Frotas/veículos** (`/api/fleets`) — placa, modelo, ano, capacidade, status
  - **Viagens** (`/api/travels`) — origem, destino, veículo, motorista, data, status
  - **Relatórios** (`/api/reports`) — vinculados a uma viagem e ao usuário que registrou
- **Frontend React** com dashboard (totais de frotas, motoristas ativos, viagens em andamento) e páginas dedicadas para Frotas, Motoristas, Rotas e Relatórios, consumindo a API via `fetch`/token Bearer
## Stack técnica
 
**Backend:** Node.js, Express 5, MySQL (via `mysql2`, connection pooling), JWT, bcrypt
 
**Frontend:** React 19, Vite, React Router
 
## Estrutura do repositório
 
```
GTransporte/
├── Backend/
│   ├── auth/           # Rotas de autenticação e middleware JWT
│   ├── config/         # Conexão com MySQL (pool de conexões)
│   ├── controllers/    # Lógica de cada recurso (drivers, fleets, reports, travels, user)
│   ├── models/         # Queries SQL de cada entidade
│   ├── routers/        # Definição das rotas REST por recurso
│   └── index.js
└── Frontend/
    └── src/
        ├── home/        # Dashboard e páginas de Frotas, Motoristas, Rotas, Relatórios
        ├── login/       # Tela de login
        └── register/    # Tela de cadastro
```
 
## Como rodar localmente
 
### Pré-requisitos
- Node.js
- Uma instância MySQL com as tabelas `users`, `drivers`, `fleets`, `travels` e `reports` (schema relacional do projeto)
### Backend
 
```bash
cd Backend
npm install
cp .env.example .env
# preencha DB_HOST, DB_USER, DB_PASSWORD, DB_NAME e JWT_SECRET
node index.js
```
 
A API sobe em `http://localhost:3000`.
 
### Frontend
 
```bash
cd Frontend
npm install
npm run dev
```
 
A aplicação sobe em `http://localhost:5173`.
 
