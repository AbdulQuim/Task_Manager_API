const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use(userRouter);
app.use(taskRouter);

app.listen(port);
