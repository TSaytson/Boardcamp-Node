import express from "express";
import cors from 'cors';
import gamesRoutes from './routes/games.routes.js';
import customersRoutes from './routes/customers.routes.js';
import rentalsRoutes from './routes/rents.routes.js';


const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port: ${port}`));
