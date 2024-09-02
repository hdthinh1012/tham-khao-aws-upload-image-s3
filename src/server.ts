import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as Router } from "./routes";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 80;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use("/api", Router);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});