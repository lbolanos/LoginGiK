import { Router } from 'express';
import { AppDataSource } from '../index';
import { User } from '@logingik/db';

const router: Router = Router();

router.post('/users', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const { username, password } = req.body;
  const user = new User();
  user.username = username;
  user.password = password;
  await userRepository.save(user);
  res.status(201).send({ id: user.id, username: user.username });
});

router.get('/users', async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ select: ['id', 'username'] });
  res.send(users);
});

export default router;
export {};