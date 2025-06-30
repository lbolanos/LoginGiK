import { Router } from 'express';
import { AppDataSource } from '../index';
import { Permission } from '@logingik/db';

const router: Router = Router();

router.post('/permissions', async (req, res) => {
  const permissionRepository = AppDataSource.getRepository(Permission);
  const { name } = req.body;
  const permission = new Permission();
  permission.name = name;
  await permissionRepository.save(permission);
  res.send(permission);
});

router.get('/permissions', async (req, res) => {
  const permissionRepository = AppDataSource.getRepository(Permission);
  const permissions = await permissionRepository.find();
  res.send(permissions);
});

export default router;
export {};