# 🎮 ZippyGo - Sistema Gamificado Educacional

ZippyGo é um sistema gamificado voltado para escolas, que permite aos professores acompanharem o desempenho dos alunos através de atividades interativas, conquistas e elementos de RPG.

## 🧠 Objetivo

Oferecer um ambiente educacional mais motivador e envolvente para alunos, onde eles podem:
- Subir de nível e ganhar XP
- Desbloquear skins, troféus e títulos
- Receber atividades dos professores e submetê-las
- Ser avaliados de forma automatizada ou manual

## 👥 Tipos de Usuário

- **Estudante (Student)**: participa das turmas, realiza atividades e evolui no sistema.
- **Professor**: cria turmas, envia atividades e acompanha o desempenho dos alunos.
- **Administrador (futuramente)**: gerencia o sistema globalmente (usuários, configurações, etc).

## 🧱 Funcionalidades Principais

- Autenticação de usuário (login, registro)
- Sistema de turmas e relação professor-aluno
- Envio e correção de atividades
- Tipos de questões: múltipla escolha, verdadeiro/falso, preencher lacunas, associação
- Sistema de XP, níveis, rubis e conquistas
- Skins e títulos personalizáveis
- Notificações para alunos

## 📐 Estrutura Inicial

O sistema é dividido em módulos com base em uma modelagem orientada a objetos:
- `User`, `Student`, `Professor`
- `Classroom`, `Classwork`, `ClassworkSubmission`
- `Trophy`, `Skin`, `Title`
- Relações N:N com classes intermediárias como `StudentProfessor`, `StudentTrophy`, etc.

## 🛠 Tecnologias (sugestão)

- **Backend**: Java 
- **Banco de Dados**: PostgreSQL / MySQL
- **Frontend**: HTML, CSS, JS ou frameworks como React (futuramente)
- **Controle de versão**: Git + GitHub

