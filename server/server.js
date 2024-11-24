import express from "express"
import cors from "cors"
import pg from "pg"



  const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    port: PG_PORT,
  });
  db.connect();


const app = express();
const port = 3000;
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
    allowedHeaders: ['Content-Type'],
}



app.use(express.json());
app.use(cors(corsOptions));

app.get("/get-note", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes")
        res.json(result.rows)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/delete-note/:id", async(req, res) => {

    const id = req.params.id;
    await db.query("DELETE FROM notes WHERE id=$1", [id])

})

app.post("/send-note", async(req, res) => {
    
    const title = req.body.title
    const content = req.body.content
    try {
        await db.query(
            "INSERT INTO notes (title, note) VALUES ($1, $2)",
            [title, content]
        )
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  