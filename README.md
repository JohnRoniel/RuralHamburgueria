# RuralHamburgueria

Este projeto foi criado com o objetivo de simular um pequeno controlador de hamburgueria, permitindo gerenciar o caixa, os insumos e outras informações essenciais de um negócio de alimentação.

## Estrutura do Projeto

```plaintext
.env
.gitignore
index.js
LICENSE
package.json
README.md
src/
    config/
        database.js
    model/
        InventoryModel.js
    routes/
        generator.js
        index.js
        inventory.js
    server.js
    views/
        error.ejs
        generator.ejs
        index.ejs
        inventory/
            edit.ejs
            index.ejs
            new.ejs
        layout.ejs
        partials/
            navbar.ejs
template.env
```

## Implementação

- database.js: Configuração da conexão com o MongoDB.
- InventoryModel.js: Modelo para gerenciar o inventário da hamburgueria.
- generator.js: Rotas relacionadas ao gerenciamento do caixa.
- index.js: Rota principal do sistema.
- inventory.js: Rotas para manipulação do inventário (adicionar, editar, remover itens).
- server.js: Arquivo de configuração e inicialização do servidor Express.
- views: Diretório contendo as views renderizadas pelo EJS, responsável pela interface de usuário.
- routes: Diretório contendo as rotas da aplicação.

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo LICENSE.
