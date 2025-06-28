import { Router } from 'express';
import { AppDataSource } from '../index';
import { User } from '@logingik/core';
import * as jwt from 'jsonwebtoken';

const router: Router = Router();
const JWT_SECRET = 'your-super-secret-key'; // Should be in an env file

router.post('/login', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
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

export default router;
