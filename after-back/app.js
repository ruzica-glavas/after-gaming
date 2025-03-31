import express from "express";
const app = express();
import cors from "cors"
const port = process.env.SERVER_PORT || 3000;

//import router
//import serverRouter from "./routers/serverRouter.js";

//middleware cors
app.use(cors());

//middleware express
app.use(express.json());






app.listen(port, () => {
    console.log(`Server avviato sulla porta: ${port}`);
});