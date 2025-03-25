import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoute from "./routes/order.route";
import authRoutes from "./routes/auth.route";
import assignRoutes from "./routes/assign.route";
import serviceRoutes from "./routes/service.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", orderRoute);
app.use("/auth", authRoutes);
app.use("/assign", assignRoutes);
app.use("/services", serviceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
