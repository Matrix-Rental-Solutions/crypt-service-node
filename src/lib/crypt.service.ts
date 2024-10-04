import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { CryptOptions } from "./crypt.extras";

export class CryptService {
  private readonly SALT_ROUNDS: number;
  private readonly CRYPT_ALG: string;
  private readonly CRYPT_KEY: string;
  private readonly CRYPT_IV: string;

  private constructor(options: CryptOptions) {
    this.SALT_ROUNDS = options.saltRounds;
    this.CRYPT_ALG = options.crypt.alg;
    this.CRYPT_KEY = options.crypt.key;
    this.CRYPT_IV = options.crypt.iv;
  }

  static create(options: CryptOptions): CryptService {
    console.info("[CryptService] create");
    return new CryptService(options);
  }

  encrypt(plainText: string): string {
    const cipher = crypto.createCipheriv(
      this.CRYPT_ALG,
      Buffer.from(this.CRYPT_KEY, "hex"),
      Buffer.from(this.CRYPT_IV, "hex")
    );
    const data = Buffer.from(plainText);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return encrypted.toString("hex");
  }

  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(
      this.CRYPT_ALG,
      Buffer.from(this.CRYPT_KEY, "hex"),
      Buffer.from(this.CRYPT_IV, "hex")
    );
    let text = decipher.update(encryptedText, "hex", "utf8");
    text += decipher.final("utf8");
    return text;
  }

  hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  hashSync(plainText: string): string {
    return bcrypt.hashSync(plainText, this.SALT_ROUNDS);
  }

  compareHash(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  compareHashSync(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
