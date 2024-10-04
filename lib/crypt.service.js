"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
class CryptService {
    constructor(options) {
        this.SALT_ROUNDS = options.saltRounds;
        this.CRYPT_ALG = options.crypt.alg;
        this.CRYPT_KEY = options.crypt.key;
        this.CRYPT_IV = options.crypt.iv;
    }
    static create(options) {
        console.info("[CryptService] create");
        return new CryptService(options);
    }
    encrypt(plainText) {
        const cipher = crypto.createCipheriv(this.CRYPT_ALG, Buffer.from(this.CRYPT_KEY, "hex"), Buffer.from(this.CRYPT_IV, "hex"));
        const data = Buffer.from(plainText);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return encrypted.toString("hex");
    }
    decrypt(encryptedText) {
        const decipher = crypto.createDecipheriv(this.CRYPT_ALG, Buffer.from(this.CRYPT_KEY, "hex"), Buffer.from(this.CRYPT_IV, "hex"));
        let text = decipher.update(encryptedText, "hex", "utf8");
        text += decipher.final("utf8");
        return text;
    }
    hash(plainText) {
        return bcrypt.hash(plainText, this.SALT_ROUNDS);
    }
    hashSync(plainText) {
        return bcrypt.hashSync(plainText, this.SALT_ROUNDS);
    }
    compareHash(plainText, hash) {
        return bcrypt.compare(plainText, hash);
    }
    compareHashSync(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}
exports.CryptService = CryptService;
//# sourceMappingURL=crypt.service.js.map