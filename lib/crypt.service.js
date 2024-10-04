"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var CryptService = /** @class */ (function () {
    function CryptService(options) {
        this.SALT_ROUNDS = options.saltRounds;
        this.CRYPT_ALG = options.crypt.alg;
        this.CRYPT_KEY = options.crypt.key;
        this.CRYPT_IV = options.crypt.iv;
        // Way to generate Random hex
        // this.CRYPT_KEY = crypto.randomBytes(32).toString("hex");
        // this.CRYPT_IV = crypto.randomBytes(16).toString("hex");
    }
    CryptService.create = function (options) {
        console.info("[CryptService] create");
        return new CryptService(options);
    };
    CryptService.prototype.encrypt = function (plainText) {
        var cipher = crypto.createCipheriv(this.CRYPT_ALG, Buffer.from(this.CRYPT_KEY, "hex"), Buffer.from(this.CRYPT_IV, "hex"));
        var data = new Buffer(plainText);
        var encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return encrypted.toString("hex");
    };
    CryptService.prototype.decrypt = function (encryptedText) {
        var decipher = crypto.createDecipheriv(this.CRYPT_ALG, Buffer.from(this.CRYPT_KEY, "hex"), Buffer.from(this.CRYPT_IV, "hex"));
        var text = decipher.update(encryptedText, "hex", "utf8");
        text += decipher.final("utf8");
        return text;
    };
    CryptService.prototype.hash = function (plainText) {
        return bcrypt.hash(plainText, this.SALT_ROUNDS);
    };
    CryptService.prototype.hashSync = function (plainText) {
        return bcrypt.hashSync(plainText, this.SALT_ROUNDS);
    };
    CryptService.prototype.compareHash = function (plainText, hash) {
        return bcrypt.compare(plainText, hash);
    };
    CryptService.prototype.compareHashSync = function (plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    };
    return CryptService;
}());
exports.CryptService = CryptService;
//# sourceMappingURL=crypt.service.js.map