import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { connectDb, app } from './database/db.js';
import session from 'express-session';
import flash from 'connect-flash';
import { indexRouter } from './router/main.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended : true}))
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 
app.use(express.static(path.join(__dirname, "public"))); 

connectDb();


app.use(session({
    secret: 'dsfkjdslkfjslkdjf',  
    resave: false,
    saveUninitialized: true,
}));
  
  // Set up connect-flash middleware after session
  app.use(flash());

 app.use((req, res, next) => {
    res.locals.successMssg = req.flash('success'); 
    res.locals.errorMssg = req.flash('error'); 
    console.log(res.locals.successMssg); 

    next(); 
});



app.use("/", indexRouter)

