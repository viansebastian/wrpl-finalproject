#  2434 Game Store

For the final project for the Software Engineering Workshop course, we are tasked to create a e-commerce software that utilizes payment gateways. Using the PERN (PostgreSQL, Expressjs, React, and Nodejs) stack and Stripe integration, we managed to built a functional web e-commerce app. 

# Main Functionalities:

- User account creation, authorization and authentification using JSON Web Tokens (JWTs) for regular users and administrator users
- Persistent cart storage (items placed in cart by user persist throughout separate sessions)
- Stripe integrated check out (Please don't actually buy a non-existant product with a card on our site)
- Full-stack integration with persistent database for users' carts and products sold by our store
  - Administrator dashboard, complete with data tables to enable real-time adding, editting, and deletion of products from the comfort of the website itself
- A lovely image carousel on the home page that shows off some of the popular games on the store page

##  How to run on your local machine

1. Clone this repository down on your local machine 

2. Install packages

```bash
npm install
```

3. Add a `.env` file with your secret value for auth

```
DATABASE_URL = 'your-postgress-database-url'
JWT_SECRET= 'somesecretvalue'
```

4. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

This step is optional but recommended for better troubleshooting.

5. Seed the database

```bash
npm run seed
```

6. Start the server
   
```bash
npm run dev
```

7. Open your browser at `http://localhost:3000`

8. Buy something, but please don't actually use your actual credit card information.
