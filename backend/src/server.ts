import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import userRouter from "./routers/userRouter";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
