import cors from "cors";
import express from "express";
import pg from "pg";
import RacesController from "./modules/races/infra/http/controllers/RacesController";
import errorHandlerMiddleware from "./shared/errors/error-handler";

const pool = new pg.Pool()
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
const racesController = new RacesController();

app
  .get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()");
  res.send(`DB is on and the time of it is ${rows[0].now}`);
});

app
  .get('/test', (req, res) => {
  res.send({ greeting: 'Hello, world!' });
})

app
  .get(
    '/schedule',
    racesController
      .index);

app
  .get(
    '/schedule/show:link?',
    racesController
      .show);

app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

