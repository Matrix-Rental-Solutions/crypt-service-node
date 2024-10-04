export interface CryptOptions {
    saltRounds: number;
    crypt: {
        alg: CryptAlg;
        key: string;
        iv: string;
    };
}
export declare enum CryptAlg {
    AES_128_CBC = "aes-128-cbc",
    AES_256_CBC = "aes-256-cbc",
    DES_EDE3_CBC = "des-ede3-cbc"
}
