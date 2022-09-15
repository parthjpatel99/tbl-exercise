require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const morgam = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try{
        const page = req.query.page;
        const items = req.query.items;
        const input = req.query.input;
        
        console.log(page, items, input);
        const postsData = await db.query(
            "SELECT Id, Title, Score, OwnerUserId, substring(Body for 140) as Body, AnswerCount FROM Posts WHERE textcol @@ to_tsquery($3) LIMIT $2 OFFSET ($1 - 1) * $2", [page, items, input]
            );
            // const postsData = await db.query(
            //     "SELECT Id, Title, Score, OwnerUserId, substring(Body for 140) as Body, AnswerCount FROM Posts WHERE Body || ' ' || Title ILIKE $3 LIMIT $2 OFFSET ($1 - 1) * $2", [page, items, `%${input}%`]
            //     );
        res.status(200).json({
            status: "success",
            results: postsData.rows.length,
            data: {
                posts: postsData.rows
            } 
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});