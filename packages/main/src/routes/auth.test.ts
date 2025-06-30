import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../index';
import { User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap } from '@logingik/db';
import { createAuthRouter } from './auth';
import { QueryRunner, DataSource } from 'typeorm';

describe('Auth Router', () => {
  let testDataSource: DataSource;
  let userCounter = 0;

  beforeAll(async () => {
    // Create a separate test database connection
    testDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap],
      synchronize: true,
    });
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  beforeEach(async () => {
    userCounter++;
    // Clear all data before each test by recreating the schema
    await testDataSource.synchronize(true);
  });

  it('should return a token for valid credentials', async () => {
    // Create a fresh app instance for this test
    const app = express();
    app.use(express.json());
    const authRouter = createAuthRouter(testDataSource);
    app.use('/api', authRouter);

    const enterprise = new Enterprise();
    enterprise.name = 'test-enterprise';
    await testDataSource.getRepository(Enterprise).save(enterprise);

    const user = new User();
    user.username = `testuser${userCounter}`;
    user.password = 'password';
    user.enterprise = enterprise;
    await testDataSource.getRepository(User).save(user);

    const response = await request(app)
      .post('/api/login')
      .send({ username: `testuser${userCounter}`, password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    // Create a fresh app instance for this test
    const app = express();
    app.use(express.json());
    const authRouter = createAuthRouter(testDataSource);
    app.use('/api', authRouter);
    
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'wronguser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid credentials');
  });
});
