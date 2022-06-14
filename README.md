# Smartsoft labs test

This is the frontend technical test of [Smartsoftlabs](https://www.smartsoftlabs.com/en/home/) 

Assessment consist in resolve generate a CRUD with a plublic API, generate a new section to show obtained data in a table with angular material, activate login and protect the routes and add information to dashboard related with data of CRUD.

## Installation

First of all install node dependencies:

```bash
npm install
```
Run the application:
```bash
ng serve 
```

## Usage

After run start command you can see web app on:
```bash
localhost:4200
```
1. Click on "Iniciar sesion" if you don't login, you can't access to other view because each route is protected with the user loged and its json web token.
2. Click on "Productos" to see the new CRUD data, in this section you can:
* View data of the public api [Fake Store API](https://fakestoreapi.com/) 
* Create a new product clicking on top button (+) 
* Update an existing product clicking its data in the table
* Delete an product 
3. On dashboard you can see the CRUD products stats if you click on the last card
