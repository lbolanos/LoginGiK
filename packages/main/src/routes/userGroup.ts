import { Router } from 'express';
import { AppDataSource } from '../index';
import { UserGroup } from '@logingik/db';

const router: Router = Router();

router.post('/user-groups', async (req, res) => {
  const userGroupRepository = AppDataSource.getRepository(UserGroup);
  const { name } = req.body;
  const userGroup = new UserGroup();
  userGroup.name = name;
  await userGroupRepository.save(userGroup);
  res.send(userGroup);
});

router.get('/user-groups', async (req, res) => {
  const userGroupRepository = AppDataSource.getRepository(UserGroup);
  const userGroups = await userGroupRepository.find();
  res.send(userGroups);
});

export default router;
