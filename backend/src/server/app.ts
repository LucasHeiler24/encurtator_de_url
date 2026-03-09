import express from "express";
import cors from "cors";
import routerUrl from "../routers/url.js";
import routerUser from "../routers/user.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/url', routerUrl);
app.use('/auth', routerUser);

app.listen(8000);