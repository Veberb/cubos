# Cubos

- Ambiente

  - Node - v10.15.0

- Endpoints

  - Os endpoints estão todos mapeados em um arquivo JSON para importar no postman: [Arquivo](postman/).

- Dados:

  - Na raiz do projeto, será criado um arquivo chamado **db.json**, onde será salvo as informações geradas pelo sistema.
  - Existem três tipos de regras: Day, Daily e Weekly.
  - Quando a regra for do tipo `Weekly`, deve ser enviado um array com o nome dos dias da semana. Exemplo: ['Sunday'].
  - Todos os dados estão exemplificados no postman.

- Rodando o projeto
  - Na raiz do projeto, rodar comando `npm install` para instalar as dependencias do front e backend.
  - Rodar o comando `npm start` para subir o backend disponível no endereço http://localhost:3000
