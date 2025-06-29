import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserGroup } from './UserGroup';
import { Permission } from './Permission';

@Entity()
export class UserGroupPermission {
  @PrimaryColumn()
  userGroupId!: number;

  @PrimaryColumn()
  permissionId!: number;

  @ManyToOne(() => UserGroup, userGroup => userGroup.id)
  userGroup!: UserGroup;

  @ManyToOne(() => Permission, permission => permission.id)
  permission!: Permission;
}
