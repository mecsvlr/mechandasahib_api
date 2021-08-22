const express = require('express');
const bodyParser = require('body-parser');
const mogoose = require("mongoose");

const userRoutes = require("./routes/users");
const memberRoutes = require("./routes/members");
const organizationRoutes = require("./routes/organizations");

const app = express();

mogoose.connect("mongodb+srv://mechanda:"+process.env.MONGO_ALTAS_PW+"@cluster0.xsebl.mongodb.net/masjidAPI", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
        .then(()=>{console.log("Connected to Database")})
        .catch(()=>{console.log("Db connection failed!")});

// mogoose.set('useCreateIndex', true);

const methodOverride=require('method-override');

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

app.use(methodOverride('_method'));

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next()
});

app.use("/api/users",userRoutes);
app.use("/api/members",memberRoutes);
app.use("/api/organizations",organizationRoutes);


module.exports = app;
