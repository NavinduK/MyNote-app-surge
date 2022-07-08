# MY NOTE WEB APP - Keep simple notes
The project is on a simple note creation app with a user control Admin Dashbord. Users cannot register to the system by them self, they can only be connect to the system through admins, admins can add users with email and temp password. Upon user login they need to reset the password added by admin and fill users details. Then they can CRUD their notes to the app.
	
## Technologies Used
* Frontend : React.JS
* Backend : Node.JS + Express
* Database : MongoDB
* Deployment : Docker

## Setup & Run

### Docker build and run
Execute following from root directory to build & run docker containers
```
$ make build
$ make run
```

### Node Setup and Run 
Frontend
```
$ cd client
$ npm install
$ npm start
```
Backend
```
$ cd server
$ npm install
$ npm run dev
```

### Add an admin to system
Replace following ```<email>``` with the unregistered **Email** for admin and ```<password>``` with a new password for **Password**
```
$ cd server
$ node seed.js -e <email> -p <password>
```
