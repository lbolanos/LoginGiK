import 'reflect-metadata';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap } from '@logingik/db';
import { authMiddleware } from './middleware/auth';
import { createAuthRouter } from './routes/auth';
import userRoutes from './routes/user';
import enterpriseRoutes from './routes/enterprise';
import userGroupRoutes from './routes/userGroup';
import permissionRoutes from './routes/permission';
import userGroupPermissionRoutes from './routes/userGroupPermission';
import userUserGroupMapRoutes from './routes/userUserGroupMap';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'database.sqlite',
  entities: [User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap],
  synchronize: true,
});

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = createAuthRouter(AppDataSource);

// Public routes
app.use('/api', authRoutes);

// Protected routes
app.use('/api', authMiddleware);
app.use('/api', enterpriseRoutes);
app.use('/api', userRoutes);
app.use('/api', userGroupRoutes);
app.use('/api', permissionRoutes);
app.use('/api', userGroupPermissionRoutes);
app.use('/api', userUserGroupMapRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
