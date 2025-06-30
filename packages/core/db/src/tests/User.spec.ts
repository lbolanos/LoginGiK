import 'reflect-metadata';
import { User } from '../entities/User';

describe('User Entity', () => {
  it('should hash the password before insert', async () => {
    const user = new User();
    user.password = 'password123';
    await user.hashPassword();
    expect(user.password).not.toBe('password123');
  });

  it('should compare the password correctly', async () => {
    const user = new User();
    user.password = 'password123';
    await user.hashPassword();
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const user = new User();
    user.password = 'password123';
    await user.hashPassword();
    const isMatch = await user.comparePassword('wrongpassword');
    expect(isMatch).toBe(false);
  });
});
