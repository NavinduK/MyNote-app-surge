var mongoose = require('mongoose');
var User = require('./models/user.model');

var dotenv = require('dotenv');
dotenv.config();

var MongoURL = process.env.MONGO_URL;
mongoose.connect(MongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    , (err) => {
        if (err) return console.log(err);
        global.db = mongoose.connection;
        global.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    });

function addNewAdmin() {
    const emailIndex = process.argv.indexOf('-e');
    const passIndex = process.argv.indexOf('-p');
    let user = { email: "", password: "", accountType: "admin" };

    if (emailIndex > -1 && passIndex > -1) {
        user.email = process.argv[emailIndex + 1];
        user.password = process.argv[passIndex + 1];
        // console.log(user.email);
        // console.log(user.password);
        let admin = new User(user);
        admin.setPassword(user.password);
        admin.save().then(() =>{
            console.log("Admin Adding Success!");
            console.log("You can now login to admin account");
            console.log("Email : ",user.email);
            console.log("Password : ",user.password);
            process.exit(1);
        }).catch((err)=>{
            console.log("Error Adding Admin");
            console.log(err);
            process.exit(1);
        });
    } else {
        console.log("Error fetching email and password");
    }
}

addNewAdmin();


