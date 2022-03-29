# GlobalProyect
### Fully  responsive single page application.
#### Global proyect is designed using React, sequelize, express, redux, only css, supertest and mocha.

## Views

Global's views consists of 6 differents routes:

* Landing page '/': Introduction into the proyect and its tecnologies.

### Desktop view:
<img src="./Media/global_gif.gif" width="350px"/>

### Mobile view:
<img src="./Media/Responsive1.png" height="350px"/>


* Home '/home': Display of all the countries in the world. Filters to sort the countries based on name, population and/or continent. 
  Searchbar for searching specific countries. Pagination for easy navigation.

### Desktop view:
<img src="./Media/Global_img1.png" width="350px"/> 

### Mobile view:
<img src="./Media/Responsive2.png" height="350px"/> <img src="./Media/Responsive3.png" height="350px"/> <img src="./Media/Responsive4.png" height="350px"/> 
<img src="./Media/Responsive5.png" height="350px"/>


* Country detail '/home/:id': Detail of an specific country, displaying more information about the country and its associated activities.

### Desktop view:
<img src="./Media/Global_img8.png" width="350px"/> <img src="./Media/Global_img10png" width="350px"/>

### Mobile view:
<img src="./Media/Responsive9.png" height="350px"/> <img src="./Media/Responsive10.png" height="350px"/> <img src="./Media/Responsive11.png" height="350px"/>
<img src="./Media/Responsive12.png" height="350px"/>


* Create activity '/home/createActivity': Controlled form to create touristic activities in the desired countries.

### Desktop view:
<img src="./Media/Global_img3.png" width="350px"/> <img src="./Media/Global_img4.png" width="350px"/>

### Mobile view:
<img src="./Media/Responsive13.png" height="350px"/> <img src="./Media/Responsive14.png" height="350px"/> <img src="./Media/Responsive15.png" height="350px"/>


* Activities '/home/activities': Display of all the created activities in the database. Pagination for practical navigation.

### Desktop view:
<img src="./Media/Global_img2.png" width="350px"/>

### Mobile view:
<img src="./Media/Responsive7.png" height="350px"/>


* Activity detail '/home/activities/:activityId': Detail of an specific activity with all the information and the associated countries.

### Desktop view:
<img src="./Media/Global_img9.png" width="350px"/> 

### Mobile view:
<img src="./Media/Responsive8.png" height="350px"/>


The countries data was extracted from the [API](https://restcountries.com/v3/all) and modified for practical uses.
The database recieves this data and creates all the countries in the Country table. 
The activities get loaded into the database in the Activity table.
The relation between Country and Activity is many to many, in the CountryActivity table.

The models and server request are fully tested using mocha.
The react components are tested using supertest.

## How to use

- First of all, you will need to have text editor ([VScode](https://code.visualstudio.com/download) recomended). 
- Then install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/). If you have averything ready then open VScode and run in the terminal:

```bash
# Clone this repository
$ git clone https://github.com/Facundo-Romano/GlobalProyect.git
```

- Inside the api folder, you will need to create a file named ".env" like this:

    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    
- You will need to have PostgreSQL installed (learn how [here](https://www.guru99.com/download-install-postgresql.html)).
- If you already have PostgrSQL, create a new database called countries (learn how [here](https://www.guru99.com/postgresql-create-database.html), tip: scroll down to the section: Create Database using pgAdmin, it is the easier one.).
- Inside your .env file complete DB_USER with your postgreSQL user and DB_PASSWORD with your postgreSQL password. Complete DB_HOST with localhost. 


- Now that everything is completed you can start the app. In the terminal run the following commands:

```bash
# Go into the api folder
$ cd api
# Install dependencies
$ npm install
# Run the backend
$ npm start
# Open new terminal
$ cd client
# Install dependencies
$ npm install
# Run the frontend
$ npm start
```
