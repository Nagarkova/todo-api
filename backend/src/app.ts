import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.route';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.options('*', cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

export default app;
