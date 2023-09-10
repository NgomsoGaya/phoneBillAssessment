//import required packages and modules
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars"
import 'dotenv/config'
import pgPromise from "pg-promise";
import flash from "express-flash";
import session from "express-session";

//create an instance of the express application
const app = express();

//configure postgreSQL database connection
const pgp = pgPromise();
const DATABASE_URL = process.env.DATABASE_URL ||
  "postgres://bplrfftq:lGzAPM295sQEml0ivHf8V9T211aZFVUf@dumbo.db.elephantsql.com/bplrfftq";
const config = {
  connectionString: DATABASE_URL,
};
const db = pgp(config);

//configure handlebars for template rendering
const handlebars = exphbs.create({
  partialsDir: "./views/partials",
  layoutsDir: "./views/layouts",
});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

//set up session management and flash messages
app.use(
  session({
    secret: "greeting with routes",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

//serve static files from the 'public' directory
app.use(express.static("public"));

//parse request bodies as JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: "main" }));
app.use(bodyParser.json());

app.get('/', );
app.post('/calc_bill',);
app.get('/price_plans',);
app.get('/price_plans/:id',);
app.get('/link_user',);
app.post('/link_user',);

//start the express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("App started at port", PORT);
});