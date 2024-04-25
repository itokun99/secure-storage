import Utf8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import getFingerprint from "./fingerprint";

interface EncryptionServiceOptions {
  hashKey?: string;
  disabledKey?: string;
}

/**
 * EncryptionService
 */
const EncryptionService = class {
  secureKey: string = "";

  constructor(options?: EncryptionServiceOptions) {
    if (options) {
      this.secureKey = getFingerprint(
        options.hashKey || "",
        options.disabledKey || "",
      );
    }
  }

  /**
   * Function to encrypt data
   * @param value
   * @returns
   */
  encrypt(value: string) {
    return AES.encrypt(value, this.secureKey).toString();
  }

  /**
   * Function to decrypt data
   * @param value
   * @returns
   */
  decrypt(value: string) {
    try {
      var bytes = AES.decrypt(value, this.secureKey);
      return bytes.toString(Utf8) || null;
    } catch (ex) {
      return null;
    }
  }
};

export default EncryptionService;
