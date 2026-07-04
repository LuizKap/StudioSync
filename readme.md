# 🎵 StudioSync

StudioSync é uma aplicação web para gerenciamento de reservas de estúdios musicais. O sistema permite que usuários criem uma conta, façam login, escolham uma sala disponível, realizem reservas e efetuem o pagamento através do Stripe.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento backend utilizando Node.js e arquitetura MVC, simulando um sistema que poderia ser utilizado por um estúdio de música real.

---

## ✨ Funcionalidades

* Cadastro e autenticação de usuários
* Login com JWT armazenado em cookies HTTP Only
* Criptografia de senhas com bcrypt
* Listagem de salas de estúdio
* Criação de reservas
* Validação de horários disponíveis
* Prevenção de conflitos entre reservas
* Cancelamento de reservas expiradas
* Integração com Stripe Checkout
* Confirmação automática da reserva através de Webhooks
* Interface responsiva

---

## 🛠 Tecnologias utilizadas

### Backend

* Node.js
* Express.js
* EJS
* JWT (jsonwebtoken)
* bcryptjs
* Day.js
* Stripe API

### Frontend

* HTML5
* CSS3
* JavaScript

---

## 📁 Estrutura do projeto

O projeto segue o padrão MVC (Model-View-Controller), separando responsabilidades entre regras de negócio, rotas, renderização das páginas e lógica da aplicação.

---

## 🚀 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/LuizKap/studiosync.git
```

Acesse a pasta:

```bash
cd studiosync
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` contendo as variáveis de ambiente necessárias:

```env
JWT_SECRET=sua_chave
STRIPE_SECRET=sua_chave
WEBHOOK_SECRET=sua_chave
```

Inicie o servidor:

```bash
npm start
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 💳 Pagamentos

Os pagamentos são processados utilizando o Stripe Checkout.

Após a confirmação do pagamento, um Webhook é recebido pelo servidor, que valida a assinatura enviada pelo Stripe e confirma automaticamente a reserva.

---

## 📱 Responsividade

O layout foi desenvolvido para funcionar em diferentes tamanhos de tela utilizando Flexbox, CSS Grid e Media Queries.

---

## 🔒 Segurança

* Senhas armazenadas utilizando bcrypt
* Autenticação com JWT
* Cookies HTTP Only
* Validação de dados de entrada
* Verificação de conflitos de horários
* Validação da assinatura dos Webhooks do Stripe

---

## 👨‍💻 Autor

Desenvolvido por Luiz Carlos como projeto de estudo para aprimoramento em desenvolvimento Full Stack com JavaScript.
