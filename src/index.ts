import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const pool = new pg.Pool()
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware)

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT NOW()");
  res.send(`DB is on and the time of it is ${rows[0].now}`);
});

app.get('/test', (req, res) => {
  res.send({ greeting: 'Hello, world!' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

