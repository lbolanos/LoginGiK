import { Router } from 'express';
import { AppDataSource } from '../index';
import { UserGroupPermission } from '@logingik/db';

const router: Router = Router();

router.post('/user-group-permissions', async (req, res) => {
  const userGroupPermissionRepository = AppDataSource.getRepository(UserGroupPermission);
  const { userGroupId, permissionId } = req.body;
  const userGroupPermission = new UserGroupPermission();
  userGroupPermission.userGroupId = userGroupId;
  userGroupPermission.permissionId = permissionId;
  await userGroupPermissionRepository.save(userGroupPermission);
  res.send(userGroupPermission);
});

router.get('/user-group-permissions', async (req, res) => {
  const userGroupPermissionRepository = AppDataSource.getRepository(UserGroupPermission);
  const userGroupPermissions = await userGroupPermissionRepository.find();
  res.send(userGroupPermissions);
});

export default router;
