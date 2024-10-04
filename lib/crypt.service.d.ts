import { CryptOptions } from "./crypt.extras";
export declare class CryptService {
    private readonly SALT_ROUNDS;
    private readonly CRYPT_ALG;
    private readonly CRYPT_KEY;
    private readonly CRYPT_IV;
    private constructor();
    static create(options: CryptOptions): CryptService;
    encrypt(plainText: string): string;
    decrypt(encryptedText: string): string;
    hash(plainText: string): Promise<string>;
    hashSync(plainText: string): string;
    compareHash(plainText: string, hash: string): Promise<boolean>;
    compareHashSync(plainText: string, hash: string): boolean;
}
