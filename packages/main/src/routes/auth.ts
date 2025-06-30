import { Router } from 'express';
import { DataSource } from 'typeorm';
import { User } from '@logingik/db';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-super-secret-key'; // Should be in an env file

export const createAuthRouter = (dataSource: DataSource): Router => {
  const router: Router = Router();

  router.post('/login', async (req, res) => {
    const userRepository = dataSource.getRepository(User);
    const { username, password } = req.body;
    const user = await userRepository.findOne({ where: { username } });

    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.send({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });

  return router;
};
