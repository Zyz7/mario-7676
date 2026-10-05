import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}/api/v1`);
});
