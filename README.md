# Sistema de Agendamentos para Salão de Beleza

## Sobre o projeto

Este projeto foi desenvolvido com a ideia de facilitar a rotina de profissionais da área da beleza, principalmente cabeleireiros que ainda utilizam agendas de papel para organizar seus horários e clientes.

A ideia surgiu observando a rotina da minha mãe, que é cabeleireira e utiliza bastante uma agenda de mão. Nela, ela precisa anotar manualmente informações como nome do cliente, telefone, horário marcado e o procedimento que será realizado.

Com o tempo, esse tipo de organização pode acabar dificultando a procura por informações, principalmente quando é necessário encontrar rapidamente os dados de um cliente ou verificar quais horários estão disponíveis.

Por isso, a proposta deste sistema é substituir parte dessa organização manual por uma aplicação onde seja possível cadastrar e consultar clientes, produtos, procedimentos e agendamentos de maneira mais simples.

A ideia é que, futuramente, seja possível realizar pesquisas e encontrar rapidamente todas as informações necessárias para o atendimento.

---

## Objetivo

O objetivo principal do sistema é permitir que a profissional consiga organizar sua rotina de trabalho em um único lugar.

Entre as principais funcionalidades estão:

- Cadastro de clientes;
- Cadastro de produtos;
- Cadastro de procedimentos;
- Controle da agenda;
- Associação entre cliente, procedimento, data e horário;
- Atualização dos dados cadastrados;
- Exclusão de registros;
- Consulta rápida das informações;
- Autenticação de usuários utilizando JWT.

---

## Tecnologias utilizadas

O backend do projeto foi desenvolvido utilizando:

- **NestJS** - framework utilizado para a construção da API;
- **TypeScript** - linguagem utilizada no desenvolvimento;
- **Prisma ORM** - responsável pela comunicação entre a aplicação e o banco de dados;
- **SQLite** - banco de dados utilizado no projeto;
- **JWT** - utilizado para autenticação e proteção das rotas;
- **bcryptjs** - utilizado para trabalhar com o hash das senhas;
- **class-validator** - utilizado para validar os dados enviados para a API.

---

## Estrutura do sistema

O sistema possui atualmente as seguintes entidades principais:

### Usuário

O usuário representa a pessoa que possui acesso ao sistema.

Ele é utilizado principalmente para autenticação.

Principais informações:

- Nome;
- Email;
- Senha armazenada em formato de hash;
- Perfil.

As rotas do sistema são protegidas por autenticação JWT. Apenas as rotas de login e cadastro de usuário podem ser utilizadas sem um token.

---

### Cliente

Representa os clientes atendidos pelo salão.

Um cliente possui informações como:

- Nome;
- Telefone;
- Email;
- Observações.

Esses dados permitem que a profissional encontre rapidamente as informações de uma pessoa sem precisar procurar manualmente em uma agenda de papel.

O sistema permite:

- Cadastrar um cliente;
- Listar todos os clientes;
- Buscar um cliente pelo ID;
- Atualizar um cliente;
- Excluir um cliente.

---

### Produto

Representa os produtos utilizados ou comercializados pelo salão.

Um produto possui:

- Nome;
- Descrição;
- Preço;
- Quantidade em estoque.

O sistema permite:

- Cadastrar produtos;
- Listar produtos;
- Buscar um produto;
- Atualizar preço, quantidade ou outras informações;
- Excluir produtos.

---

### Procedimento

Representa os serviços realizados no salão.

Alguns exemplos seriam:

- Corte;
- Escova;
- Coloração;
- Manicure;
- Hidratação.

Cada procedimento possui:

- Nome;
- Descrição;
- Preço;
- Duração em minutos.

A duração é uma informação importante porque pode ser utilizada pela agenda para calcular quanto tempo determinado atendimento irá ocupar.

---

### Agendamento

O agendamento é responsável por relacionar um cliente com um procedimento em determinada data e horário.

Por exemplo:

```text
Cliente: Maria Silva
Procedimento: Corte feminino
Data: 10/10/2026
Horário: 14:00
Status: AGENDADO