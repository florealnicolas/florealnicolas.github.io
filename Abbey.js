const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoDBH = require("./MongoDB/mongoDB");
const MongoDBStore = require("connect-mongodb-session")(session);

const port = 80;
const db = new MongoDBH();

const store = new MongoDBStore({
    uri: 'mongodb://abbot:tobba@ds149511.mlab.com:49511/abbey',
    collection: 'sessions'
});

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false
    },
    store: store,
    secret: "useryebba",
    resave: true,
    saveUninitialized: false,
};

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionConfig));

app.listen(port, () => {
    console.log("Listening on port " + port + ".");
});

app.get("/", (request, response, next) => {

    const user = request.session.user;

    console.log("USER",user);

    if ("newcomer" == user) {
        response.cookie("user", "newcomer");
    }

    if (user == null) {
        response.redirect("/login.html");
    }

    else {
        next();
    }
});

app.post("/LOGIN", (request, response) => {

    let potUser = request.body.user;
    console.log("POTENTIAL USER:", potUser.username);

    db.openConnection();
    db.getSearchCollectionByNameCursor("player", potUser.username).on("data", function (result) {

        let candidateUser = result;

        console.log("MORE POTENTIAL USER:", candidateUser.name);

        if (candidateUser.password == potUser.password) {
            console.log("LOGGED IN!");
            request.session.user = candidateUser.name;
            response.cookie("user", candidateUser.name);
            db.closeConnection();
            response.redirect("/");
        }

        else {
            console.log("LOGIN FAILED");
            db.closeConnection();
            response.redirect("/login.html");
        }
    });
});

app.get("/REGISTER", (request, response) => {
    request.session.user = "newcomer";
    response.cookie("user", "newcomer");
    response.redirect("/");
});

app.get("/LOGOUT", (request, response) => {
    request.session.user = null;
    response.cookie("user", null);
    response.redirect("/");
});

app.post("/PASSWORDCHANGE", (request, response) => {

   const oldPassword = request.body.passwordChange.currentPassword;
   const newPassword = request.body.passwordChange.newPassword;
   const confirmation = request.body.passwordChange.confirmNewPassword;

   console.log("USER",request.session.user);

   db.openConnection();

    db.getSearchCollectionByNameCursor("player", request.session.user).on("data", function (result) {
        let user = result;

        console.log(user);

        if (oldPassword == user.password) {

            if (confirmation == newPassword) {
                user.password = newPassword;
                console.log("Your password has been changed.");
                db.saveSomething(user);
                response.redirect("/");
                //db.closeConnection();
            }
        }

        else {
            console.log("Your current password was not correct.");
            response.redirect("/");
            //db.closeConnection();
        }
    });

});

app.use(express.static(__dirname + "/web"));