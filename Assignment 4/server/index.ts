import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/users";
import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/user", userRoutes);

app.listen(PORT, () =>
  console.log(`Server is running live on port : http://localhost:${PORT}`)
);

