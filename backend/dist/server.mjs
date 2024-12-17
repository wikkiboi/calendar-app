import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("Express + Typescript Server");
});
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
