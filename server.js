// Importa o framework Express
const express = require('express');
// Importa as rotas da nossa aplicação
const routes = require('./routes');

// Inicializa a aplicação Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Middleware para permitir que o Express entenda JSON no corpo das requisições
app.use(express.json());

// Middleware para usar as rotas definidas no arquivo routes.js
app.use('/api', routes);

// Rota raiz para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.send('API do Sistema Acadêmico no ar!');
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse em http://localhost:${PORT}`);
});
