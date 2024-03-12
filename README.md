
# Hygea FullStack Challenge - Backend

O desafio consiste em desenvolver um CRUD para uma entidade já existente chamada 'USER'. Além disso, é necessário criar um front-end que consuma a API, apresentando as funcionalidades de CRUD para essa entidade de USER. Na função de LIST, defina e implemente alguns filtros.

Um ponto EXTRA será a inclusão de uma funcionalidade de busca com autocompletar na lista de usuários.

## Entregáveis do Desafio
- [Aplicativo Mobile](https://github.com/djgoulart/hygea-challenge-app)
- [Aplicação Backend](https://github.com/djgoulart/test-hygea-backend)
  
#### Implementar os endpoints listados abaixo:
- GET - user/list
- GET - user/:id
- POST - user/create
- DELETE - user/delete/:id
- PUT - user/:id/edit

## Solução do desafio

Para a solução deste desafio foi adotada uma arquitetura simples em termos de organização, mas ao mesmo tempo robusta o suficiente para garantir a qualidade e longevidade do código implementado. Foram utilizados alguns conceitos de SOLID e Clean Architecture, além de testes unitários e e2e para garantir confiabilidade das entregas.

## Stack Utilizada
- NodeJS
- Fastify
- Prisma
- PostgreSQL

## Requisitos de sistema

* NodeJS 18+
* Docker (para uso em ambiente local)

## Ambiente de produção

A aplicação do backend está disponível de forma pública em: ```https://hygea-challenge-backend.onrender.com```

## Rodando o localmente
- instale as dependêndias do projeto
- crie um arquivo ``.env`` na raiz do projeto utilizando como modelo o arquivo ``.env.example`` que está localizado na pasta raiz do projeto. Todas as variáveis são obrigatórias.
- inicialize uma instância do banco de dados com o comando: ``docker compose up -d``
- gere os arquivos do Prisma: ``` npx prisma generate ```
- rode as migrations do projeto: ``` npx prisma migrate dev ```
- utilize o comando: ``npm run start:dev`` para inicializar a aplicação em modo desenvolvimento ou
- utilize o comando ``npm run build`` e em seguida ``npm start``para inicializar em modo de produção 

## Rodando Testes Unitários
Utilize o comando ``npm run test`` para rodar os testes unitários

## Rodando Testes E2E
Utilize o comando ``npm run test:e2e`` para rodar os testes e2e

Obs.: Os testes e2e rodam em um ambiente separado com banco temporário, veja a configuração dentro da pasta ```prisma/vitest-environment-prisma```
