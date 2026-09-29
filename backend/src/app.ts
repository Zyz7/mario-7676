import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("¡Hola desde Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

