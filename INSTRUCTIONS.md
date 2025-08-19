**💼 Cenário da Prova**

O objetivo da prova é desenvolver um back-end em Node, de um sistema de **gestão de bibliotecas comunitárias**. O sistema precisa permitir a gestão de livros e empréstimos. Seu desafio é modelar e implementar duas entidades principais: **Livro** e **Empréstimo**.

**🚩 Requisitos Técnicos**

- Utilize Node.Js
- Siga princípios da **Modelagem de Domínio Rico**: separar Camadas de Domínio, Aplicação, Infraestrutura e API
- Crie uma **API RESTful** para interação com as entidades
- Utilizar um banco de dados relacional
- Utilize algum ORM de mercado

**📚 Entidades**

1. **Livro**
- Propriedades:
    - Id, Titulo, Autor, AnoPublicacao, QuantidadeDisponivel
- Regras de domínio:
    - Não permitir criar um livro sem título ou autor
    - Reduzir QuantidadeDisponivel ao realizar um empréstimo
    - Aumentar QuantidadeDisponivel ao realizar uma devolução
1. **Empréstimo**
- Propriedades:
    - Id, LivroId, DataEmprestimo, DataDevolucao, Status (Ativo, Devolvido)
- Regras de domínio:
    - Só é possível criar um empréstimo se houver pelo menos um exemplar disponível
    - Não é possível devolver um livro já devolvido

**✅ O que deve ser entregue**

1. **API RESTful** com endpoints para:
    - Criar livro
    - Obter Livro por Id
    - Solicitar empréstimo
    - Devolver empréstimo
    - Listar livros e empréstimos
2. **Testes unitários** para regras de domínio e serviços de aplicação
3. Arquivo README.md com instruções de como rodar o projeto

**🧠 O que será avaliado**

- Clareza na aplicação dos conceitos de modelagem de domínios ricos
- Implementação RESTful (verbos, URIs, status HTTP)
- Qualidade do código, uso de boas práticas e testes automatizados
- Separação bem definida entre as camadas do sistema e suas respectivas responsabilidades