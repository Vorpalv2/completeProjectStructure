import "dotenv/config";
import express from "express";
import { mainRoutes } from "./src/routes/mainRoutes.routes.js";
import passport from "passport";
import session from "express-session";
import users from "./src/model/users.model.js";
import GoogleStratergy from "passport-google-oidc";
const rootDirectory = process.cwd();

const app = express();

app.set("views", rootDirectory + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shynessboy",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(users.createStrategy());
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

app.use(`/`, mainRoutes);

function connectToServer() {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on Port ${process.env.PORT}`);
  });
}

export { connectToServer };
