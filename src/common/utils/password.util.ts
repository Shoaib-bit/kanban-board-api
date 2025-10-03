// src/common/utils/password.util.ts
import * as bcrypt from 'bcrypt'

export class PasswordUtil {
    private static readonly SALT_ROUNDS = 10

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS)
    }

    static async comparePassword(
        plain: string,
        hashed: string
    ): Promise<boolean> {
        return bcrypt.compare(plain, hashed)
    }
}
