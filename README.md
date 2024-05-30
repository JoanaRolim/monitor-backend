# Monitor de Sites - Backend

Este repositório contém uma aplicação backend desenvolvido em Node.js para monitoramento da disponibilidade de sites informados pelos usuários. A aplicação verifica periodicamente a disponibilidade da porta HTTP/HTTPS desses sites, registrando o status da disponibilidade e o tempo de resposta. Os usuários podem visualizar o histórico da disponibilidade dos sites monitorados através de uma interface web. Os dados são armazenados em um banco de dados MongoDB.

## Estrutura do Projeto

monitor-de-sites/
├── config/
│   ├── config.js
│   └── db.js
├── controller/
│   └── sitesController.js
├── models/
│   └── Site.js
├── routes/
│   └── sites.js
├── utils/
│   └── siteUtils.js
├── tests/
│   └── siteUtils.test.js
├── seed.js
├── app.js
├── jest.config.js
└── README.md

# Pré-requisitos

* Node.js instalado
* MongoDB instalado
* Git instalado

## Configuração do Ambiente

### Clonando o Repositório

```
git clone https://github.com/JoanaRolim/monitor-backend.git
cd monitor-de-sites
```

### Instalando Dependências

Instale as dependências necessárias com o npm:

`npm install`

### Configurando o MongoDB

A aplicação espera que o MongoDB esteja rodando na máquina local na porta padrão (27017). Certifique-se de que o MongoDB está em execução.

Você pode ajustar as configurações de conexão ao banco de dados no arquivo `config/config.js`:

```
module.exports = {
  db: {
    host: 'localhost',
    port: '27017',
    name: 'monitor-de-sites'
  }
};
```

### Populando o Banco de Dados (Opcional)

Você pode adicionar dados iniciais ao banco de dados executando o script de seed:

```
node src/seed.js
```

### Rodando a Aplicação

Inicie o servidor:

```
npm start
```

O servidor estará rodando na porta 3000. Você pode acessar a API através de `http://localhost:3000`.

### Executando Testes

Os testes são essenciais para garantir que todas as funcionalidades da aplicação estão funcionando corretamente. Neste projeto, utilizamos o Jest. Os testes estão localizados na pasta `tests` e são divididos em testes de unidade e de integração. Execute os testes unitários com o comando:

```
npm test
```

## Arquitetura do Projeto

### Configuração

* `config/config.js`: Configurações de conexão ao banco de dados.
* `config/db.js`: Script para conectar ao MongoDB.

### Controladores

* `controller/sitesController.js`: Contém a lógica para adicionar e listar sites monitorados.

### Modelos

* `models/Site.js`: Define o esquema do modelo Site no MongoDB.

### Rotas

* `routes/sites.js`: Define as rotas da API para adicionar e listar sites.

### Utilitários

* `utils/siteUtils.js`: Contém a lógica para verificar a disponibilidade dos sites.

### Testes

* `tests/siteUtils.test.js`: Testes unitários para a funcionalidade de verificação de sites.

### Aplicação

* `app.js`: Arquivo principal da aplicação que configura o servidor Express e rotas.

### Seed

* `seed.js`: Script para popular o banco de dados com dados iniciais.

## Funcionalidades

* Adicionar sites para monitoramento.
* Verificar a disponibilidade dos sites periodicamente.
* Registrar o status de disponibilidade e tempo de resposta dos sites.
* Exibir o histórico de disponibilidade dos sites monitorados.

### Adicionar um Site

Endpoint: `POST /sites`

Corpo da Requisição:

```
{
  "url": "https://exemplo.com"
}
```

### Listar Sites

Endpoint: `GET /sites`

## Diferenciais Implementados

* Utilização do Angular na interface web (não incluída no exemplo atual, mas pode ser adicionada).
* Implementação de testes unitários com Jest.
* Utilização de Clean Code e boas práticas de desenvolvimento.
# monitor-backend
