import { Router } from 'express';
import { AppDataSource } from '../index';
import { Enterprise } from '@logingik/core';

const router: Router = Router();

router.post('/enterprises', async (req, res) => {
  const enterpriseRepository = AppDataSource.getRepository(Enterprise);
  const { name } = req.body;
  const enterprise = new Enterprise();
  enterprise.name = name;
  await enterpriseRepository.save(enterprise);
  res.send(enterprise);
});

router.get('/enterprises', async (req, res) => {
  const enterpriseRepository = AppDataSource.getRepository(Enterprise);
  const enterprises = await enterpriseRepository.find();
  res.send(enterprises);
});

export default router;
