const express = require("express");
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Rota GET para obter a lista de todos os repositórios
app.get("/repositories", (request, response) => {
  // Aqui inicia a lógica para lidar com a requisição GET para '/repositories'

  // Retorna a resposta da requisição com a lista de todos os repositórios existentes (variável 'repositories')
  return response.json(repositories);
});


// Rota POST para criar um novo repositório
app.post("/repositories", (request, response) => {
  // Aqui inicia a lógica para criar um novo repositório com o método HTTP POST

  // Extrai os campos 'title', 'url' e 'techs' do corpo da requisição
  const { title, url, techs } = request.body;

  // Cria um objeto 'repository' com os dados fornecidos na requisição
  const repository = {
    id: uuid(), // Aqui é utilizada uma lógica para gerar um ID único (como o pacote 'uuid')
    title, // Título do repositório
    url, // URL do repositório
    techs, // Tecnologias associadas ao repositório
    likes: 0, // Inicializa o número de likes do repositório como zero
  };

  // Adicionei o novo repositório ao array 'repositories'
  repositories.push(repository);

  // Retorna o objeto 'repository' recém-criado como resposta da requisição, com status 201 (Created), em formato JSON
  return response.status(201).json(repository);
});


// Rota PUT para atualizar um repositório existente com base no ID
app.put("/repositories/:id", (request, response) => {
  // Aqui iniciei a logica para atualizar um repositorio com o metodo HTTP PUT

  // Extrai o parâmetro 'id' da URL da requisição
  const { id } = request.params;
  // Extrai os campos 'title', 'url' e 'techs' do corpo da requisição
  const { title, url, techs } = request.body;

  // Encontra o índice do repositório no array 'repositories' com base no 'id' fornecido
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  // Verifica se o repositório não foi encontrado
  if (repositoryIndex < 0) {
    // Caso não tenha sido encontrado, retorna um status 404 (Not Found) com uma mensagem de erro em JSON
    return response.status(404).json({ error: 'Repositorio não encontrado' });
  }

  // Criei um objeto 'repository' com os dados atualizados do repositório
  const repository = {
    id, // Mantém o mesmo ID
    title, // Atualiza o título do repositório
    url, // Atualiza a URL do repositório
    techs, // Atualiza as tecnologias do repositório
    likes: repositories[repositoryIndex].likes, // Mantém o número de likes inalterado
  };

  // Atualizei o repositório na posição 'repositoryIndex' do array 'repositories'
  repositories[repositoryIndex] = repository;

  // Retornei o objeto 'repository' atualizado como resposta da requisição em formato JSON
  return response.json(repository);
});



// Rota DELETE para deletar um repositorio com base no ID
app.delete("/repositories/:id", (request, response) => {
  // Aqui iniciei a logica para deletar um repositorio com o metodo HTTP DELETE

  // Extrai o parâmetro 'id' da URL da requisição
  const { id } = request.params;

  // Encontra o índice do repositorio no array 'repositories' com base no 'id' fornecido
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  // Verifica se o repositorio não foi encontrado
  if (repositoryIndex < 0) {
    // Caso não tenha sido encontrado, retorna um status 404 (Not Found) com uma mensagem de erro em JSON
    return response.status(404).json({ error: 'Repository not found' });
  }

  // Removi o repositório encontrado na posição 'repositoryIndex' do array 'repositories'
  repositories.splice(repositoryIndex, 1);

  // Retornei um status 204 (No Content) indicando que a operacao foi bem-sucedida, sem conteudo a ser retornado
  return response.status(204).send();
});



// Rota POST para adicionar um "like" a um repositório específico com base no ID
app.post("/repositories/:id/like", (request, response) => {
  // Aqui iniciei a lógica para adicionar um "like" a um repositório com o método HTTP POST

  // Extrai o parâmetro 'id' da URL da requisição
  const { id } = request.params;

  // Procura no array 'repositories' o repositório com o 'id' correspondente
  const repository = repositories.find(repo => repo.id === id);

  // Verifica se o repositório não foi encontrado (!repository)
  if (!repository) {
    // Caso não tenha sido encontrado, retorna um status 404 (Not Found) com uma mensagem de erro em JSON
    return response.status(404).json({ error: 'Repositorio não encontrado' });
  }

  // Incrementa o número de likes do repositório encontrado
  repository.likes++;

  // Retorna o repositório atualizado, incluindo o novo número de likes, como resposta da requisição em formato JSON
  return response.json(repository);
});

module.exports = app;
