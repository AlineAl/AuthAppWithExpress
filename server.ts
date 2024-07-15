const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const route = require("./route/AuthRoutes");

import connectToDB from "./database/db";
import createUserTable from "./database/createUserTable";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', route);

connectToDB();
createUserTable();

app.listen(port, () => {
    console.log(`Le serveur tourne bien sur ${port}`);
})