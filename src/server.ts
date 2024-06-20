import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get('/movies', async (_, res) => {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: { title: 'asc' },
            include: {
                genre: true,
                language: true
            },
        });
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: "An error occurred while fetching movies" });
    }
});

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
});
