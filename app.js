
// Standard requires
const express = require("express");

// Local requires
const UserRouter = require("./controller/UserController");
const CasinoRouter = require("./controller/CasinoController");
const Util = require('./util/Utils');

const PORT = process.env.PORT || Util.getConfigParameter('port');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/User', UserRouter);
app.use('/Casino', CasinoRouter);

app.listen(PORT, () => console.log(`server has been started on ${PORT}`));
