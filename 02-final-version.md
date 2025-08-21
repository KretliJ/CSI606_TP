# **CSI606-2025-01 - Trabalho Final - Resultados**

## _Discente: Jonas Elias Kretli_

---

## Resumo

Este trabalho apresenta o desenvolvimento do Sistema de Votação Universal. A aplicação visa oferecer uma plataforma onde usuários podem criar, encerrar e deletar as próprias votações, além de votar nas votações de outros usuários e buscá-las por ID.

O sistema foi desenvolvido com React + JSX no frontend, e firebase para operações CRUD e de autenticação de usuário, proporcionando um framework de backend acessível através de qualquer instância executada do projeto.

---

## 1. Funcionalidades implementadas

* Cadastro de Usuário e Autenticação

  	- Registro e login de usuários

* Busca de votações

  	- Procurar votações por ID

* Criação de votações

	- Criar votações com título e perguntas

* Gerenciamento de votações

	- Fechar e apagar votações existente do usuário logado
---

## 2. Funcionalidades previstas e não implementadas

	- O usuário cuja conta registrou uma votação, deve ser capaz de compartilhar a mesma para outros usuários, de forma externa (não há um link ou outra forma expressa de compartilhamento, senão por ID).

---

## 3. Outras funcionalidades implementadas

- Integração com firebase para gerenciar autenticação e banco de dados das votações de forma centralizada e acessível para qualquer instância local com acesso à rede.
- Protótipo inicial evoluído para versão funcional com navegação integrada.

---

## 4. Principais desafios e dificuldades

- Criação de uma interface minimalista e intuitiva.
- Garantir persistência do estado de login do usuário.
- Garantir exibição do estado atual da votação na interface.

---

## 5. Instruções para instalação e execução

1. Clonar o repositório do projeto:
   ```bash
   git clone <link-do-repositorio>
   cd ./csi606_sistemaVoto/
   ```
2. Instalar dependências:
   ```bash
   npm install
   ```
3. Executar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acessar a aplicação em:
   ```bash
   http://localhost:5173
   ```
	-Ou a porta padrão do vite em seu dispositivo
---

## 6. Referências

- Material disciplina CSI606
- Documentação google firebase
- Documentação React
- How To Make Sign In & Sign Up Form Using React JS | ReactJS Login & Registration Form (https://www.youtube.com/watch?v=8QgQKRcAUvM)
- Firebase Auth with React Step-by-Step Tutorial || Login Register auth with firebase React Firestore (https://www.youtube.com/watch?v=GE27BkUZbXk)
- How to Build a Voting App with Firebase and React | Unique Voter ID Authentication (https://www.youtube.com/watch?v=H3Nxt8Z0YEQ)
