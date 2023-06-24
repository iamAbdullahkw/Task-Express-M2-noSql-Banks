let accounts = require("./accounts");
const express = require("express");
const dotEnv = require("dotenv");
const connectDb = require("./database");
const app = express();
connectDb();
const accountsRoutes = require("./api/accounts/accounts.routes");
dotEnv.config();

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
