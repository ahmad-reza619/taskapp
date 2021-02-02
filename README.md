# Task App

Create task for people!

### Tech Stack

- Node JS
- Express JS (Backend)
- React JS (Frontend)
- Postgre SQL (DB)
- Sequelize (ORM)
- Chakra UI (UI Library)

### Features

- Login
- Logout
- Create user
- Add Task
- Edit Task
- Delete Task
- Find common Task between 2 or more user
- Dark theme 😎 (Because why not?)

### Running locally

1. Clone this repo
2. run `npm i`
3. Create `.env` file, with the example on `.env.example`. Explanation about .env file can be found below
4. run `node migrate`, this will create the admin user with `admin@admin.com` and `admin` as email and password respectively
5. run the client build with `npm run build:client` and then run the server with `npm run start`
6. Open up your browser on port 3001 🎉

#### About env file
1. username - your postgresql username
2. password - your postgresql password
3. dbName - the database name. Note that you must create the database yourself first before migrating the App
