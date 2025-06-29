import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { UserGroup } from './UserGroup';

@Entity()
export class UserUserGroupMap {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  userGroupId!: number;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @ManyToOne(() => UserGroup, userGroup => userGroup.id)
  userGroup!: UserGroup;
}
