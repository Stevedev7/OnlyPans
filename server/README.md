# Online Collaborative recipe book Backend.

## Steps to run the development server.
1) Clone this repository and navigate into it's directory on your local machine using terminal/command prompt or git bash.
2) Install packages using `npm install` or `yarn install`
3) Run the local mysql server.
4) Create a .env file and Fill the details for env variables. Refer the .env.example for this.
5) Create tables for the mysql databse by running `npx prisma db push` to migrate the db schema to the MySQL database.
6) Seed the database by running the command `npx prisma db seed`
7) Start the development server by running `yarn dev`
8) Open http://localhost:9000/api/doc on your browser for the api reference.