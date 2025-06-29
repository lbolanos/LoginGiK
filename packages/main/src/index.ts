import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap } from '@logingik/db';
import { authMiddleware } from './middleware/auth';
import { seedDatabase } from './seed';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import enterpriseRoutes from './routes/enterprise';
import userGroupRoutes from './routes/userGroup';
import permissionRoutes from './routes/permission';
import userGroupPermissionRoutes from './routes/userGroupPermission';
import userUserGroupMapRoutes from './routes/userUserGroupMap';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Public routes
app.use('/api', authRoutes); 

// Protected routes
app.use('/api', authMiddleware);
app.use('/api', userRoutes);
app.use('/api', enterpriseRoutes);
app.use('/api', userGroupRoutes);
app.use('/api', permissionRoutes);
app.use('/api', userGroupPermissionRoutes);
app.use('/api', userUserGroupMapRoutes);

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap],
  synchronize: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    await seedDatabase();
  })
  .catch((error) => console.log(error));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
