import { Router } from 'express';
import { AppDataSource } from '../index';
import { UserUserGroupMap } from '@logingik/db';

const router: Router = Router();

router.post('/user-user-group-maps', async (req, res) => {
  const userUserGroupMapRepository = AppDataSource.getRepository(UserUserGroupMap);
  const { userId, userGroupId } = req.body;
  const userUserGroupMap = new UserUserGroupMap();
  userUserGroupMap.userId = userId;
  userUserGroupMap.userGroupId = userGroupId;
  await userUserGroupMapRepository.save(userUserGroupMap);
  res.send(userUserGroupMap);
});

router.get('/user-user-group-maps', async (req, res) => {
  const userUserGroupMapRepository = AppDataSource.getRepository(UserUserGroupMap);
  const userUserGroupMaps = await userUserGroupMapRepository.find();
  res.send(userUserGroupMaps);
});

export default router;
export {};