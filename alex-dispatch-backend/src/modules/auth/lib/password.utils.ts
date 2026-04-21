import bcrypt from 'bcrypt';

export class PasswordUtils {
  public static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
