
# Desafio Football Tracker - Backend

O desafio consiste em desenvolver uma aplicação para gerenciar um programa de recompensas gamificado para um determinado público alvo. Nesse caso, os jogadores de futebol listados em uma API: [API-FOOTBALL](https://dashboard.api-football.com/). 

### Cada Jogador recebe pontos com base em alguns critérios.
- 1 ponto por cada ``GOL`` realizado na temporada (2020)
- 1 ponto por cada ``ASSISTÊNCIA`` realizada na temporada (2020)
- 5 pontos por cada participação em ``EVENTOS PRESENCIAIS``.

Os eventos presenciais serão registrados na aplicação que será construída.

### Os jogadores ganharão "níveis" com base em usa pontuação.
- Jogadores com menos de ``15`` pontos são ``bronze``.
- Jogadores com pontuação ``entre 15 e 29`` são ``prata``.
- Jogadores com ``30 pontos ou mais`` são ``ouro``

## Entregáveis do Desafio
- [Frontend ](https://github.com/djgoulart/desafio-football-tracker-frontend): Aplicação para gerenciar as informações
- [Backend](https://github.com/djgoulart/desafio-football-tracker-backend): Uma api construída para cuidar da sincronização e exportação dos dados
- [AppSheet](https://www.appsheet.com/template/mobilepreview?appId=31b60ea4-be47-47da-bcff-f0baa15af8ff) Um aplicativo low code para demonstração das informações
- [Google Sheet](https://docs.google.com/spreadsheets/d/1RgNmoyI4uJPZILHdnt6buvAPiqtVAOciJe1W7oMcSCM/edit?usp=sharing) Uma planilha do google para onde os dados são exportados.

## Solução do desafio
Para a solução deste desafio foi adotada uma arquitetura simples em termos de organização, mas ao mesmo tempo robusta o suficiente para garantir a qualidade e longevidade do código implementado. 

## Stack Utilizada
- NodeJS
- Fastify
- Prisma
- PostgreSQL

## Fluxo de sincronização
A sincronização dos dados da aplicação com os dados da API Football ocorre sob demanda e pode ser iniciada/pausada por meio dos endpoints listados abaixo.

- GET: /sync/start
- GET: /sync/stop
- GET: /sync/status

Ao iniciado o processo de sincronização se estende por tempo indeterminado até que o mesmo seja manualmente interrompido ou até que todos os dados de jogadores na API Football (Season 2020) sejam armazenados no banco de dados desta aplicação.

Durante a sincronização, são feitas ``3 requests por minuto`` em um endpoint paginado, que devolve até ``20 registros`` por vez. 
<br /><br />
<img src="https://github.com/djgoulart/desafio-football-tracker-backend/blob/0ae62194db3a1eace30b43e29ad52a0b03bcbe06/docs/sync-logs.png" width="830" alt="logs de sincronização" />
<br />
<br />
Após cada requisição, os dados são armazenados no banco de dados, juntamente com um log que funciona como mecanismo de controle e ajuda a continuar processo caso o mesmo seja interrompido.

<img src="https://github.com/djgoulart/desafio-football-tracker-backend/blob/17e5a49f0d3071313c8dc0023ac257347a679489/docs/sync.png" width="830" alt="processo de sincronização" />

## Exportação de dados
A exportação dos dados da aplicação envia os registros dos jogadores para uma [planilha do Google](https://docs.google.com/spreadsheets/d/1RgNmoyI4uJPZILHdnt6buvAPiqtVAOciJe1W7oMcSCM/edit?usp=sharing) para que posteriormente os dados possam ser utilizados em uma aplicação low code do Google AppSheet.

A cada requisição, criamos um Worker para processar os dados utilizando o módulo worker_threads do Node.Js, tornando assim o processo mais eficiente não bloqueando a requisição.

Em uma melhoria futura enviaremos uma notificação ao solicitante quando o processo terminar, utilizando SSE (Server Sent Events) ou broker de mensagens.

- GET: /export

## Requisitos de sistema

* NodeJS 18+
* Docker + Docker Compose (para uso em ambiente local)

## Ambiente de produção

A aplicação do backend está disponível de forma pública em: [https://football-tracker-backend.onrender.com](https://football-tracker-backend.onrender.com)

## Ambiente de desenvolvimento local
### Requisitos:
- Você vai precisar de uma chave de autenticação da [API-FOOTBALL](https://dashboard.api-football.com/) que pode ser obtida gratuitamente.
- Caso queira testar a exportação de dados será necessário uma chave de autenticação da API do Google Sheets. [Acesse esta documentação](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication) com instruções detalhadas.

### Passo a passo: 
- instale as dependências do projeto: ```npm install```
- crie um arquivo ```.env``` na raiz do projeto utilizando como modelo o arquivo ```.env.example``` como modelo. Todas as variáveis são obrigatórias.
- inicialize uma instância do banco de dados com o comando: ``docker compose up -d``
- gere os arquivos do Prisma: ``` npx prisma generate ```
- rode as migrations do projeto: ```npx prisma migrate dev ```
- utilize o comando: ``npm run start:dev`` para inicializar a aplicação em modo desenvolvimento ou
- utilize o comando ``npm run build`` e em seguida ``npm start``para inicializar em modo de produção 
- Será necessário obter uma chave de autenticação da API
