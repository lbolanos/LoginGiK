import { AppDataSource } from './index';
import { User, UserGroup, Permission, UserGroupPermission, UserUserGroupMap } from '@logingik/db';

const entities = ['user', 'enterprise', 'usergroup', 'permission'];

export const seedDatabase = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const userGroupRepository = AppDataSource.getRepository(UserGroup);
  const permissionRepository = AppDataSource.getRepository(Permission);
  const userGroupPermissionRepository = AppDataSource.getRepository(UserGroupPermission);
  const userUserGroupMapRepository = AppDataSource.getRepository(UserUserGroupMap);

  // 1. Check if superuser already exists
  const superuserExists = await userRepository.findOne({ where: { username: 'superuser' } });
  if (superuserExists) {
    console.log('Database has already been seeded.');
    return;
  }

  console.log('Seeding database...');

  // 2. Create Permissions
  const allPermissions: Permission[] = [];
  for (const entity of entities) {
    for (const action of ['create', 'read', 'update', 'delete']) {
      const permissionName = `${entity}:${action}`;
      const permission = permissionRepository.create({ name: permissionName });
      await permissionRepository.save(permission);
      allPermissions.push(permission);
    }
  }
  console.log('Created permissions.');

  // 3. Create Master UserGroup
  const masterGroup = userGroupRepository.create({ name: 'master' });
  await userGroupRepository.save(masterGroup);
  console.log('Created master usergroup.');

  // 4. Map Permissions to Master UserGroup
  for (const permission of allPermissions) {
    const mapping = userGroupPermissionRepository.create({
      userGroupId: masterGroup.id,
      permissionId: permission.id,
    });
    await userGroupPermissionRepository.save(mapping);
  }
  console.log('Mapped permissions to master group.');

  // 5. Create Superuser
  const superuser = userRepository.create({
    username: 'superuser',
    password: 'password', // This will be hashed by the BeforeInsert hook
  });
  await userRepository.save(superuser);
  console.log('Created superuser.');

  // 6. Map Superuser to Master UserGroup
  const userMap = userUserGroupMapRepository.create({
    userId: superuser.id,
    userGroupId: masterGroup.id,
  });
  await userUserGroupMapRepository.save(userMap);
  console.log('Mapped superuser to master group.');

  console.log('Database seeding completed successfully.');
};
