import express from 'express';
import authRoutes from './auth/authRoutes.js';
import driversRoutes from './routers/driversRouter.js';
import fleetsRoutes from './routers/fleetsRouter.js';
import reportRoutes from './routers/reportRouter.js';
import travelRoutes from './routers/travelRouter.js';
import userRoutes from './routers/userRouter.js';
import { verifyToken } from './auth/authMiddleware.js';
import cors from 'cors';



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(
  cors({ origin: "http://localhost:5173"}),
);


app.use('/api/auth', authRoutes);
app.use('/api/drivers', verifyToken, driversRoutes);
app.use('/api/fleets', verifyToken, fleetsRoutes);
app.use('/api/reports', verifyToken, reportRoutes);
app.use('/api/travels', verifyToken, travelRoutes);
app.use('/api/user', verifyToken, userRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});