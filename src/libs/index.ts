import { LocalStorageItem } from "./coreTypes";
import EncryptionService from "./encryption";
import envHelper from "./envHelper";
import getAllLocalStorageItems from "./localStorageHelpers";
import { getSecurePrefix } from "./utils";

/**
 * Function to return datatype of the value we stored
 * @param value
 * @returns
 */
const getDataType = (value: string | object | number | boolean | null) => {
  return typeof value === "object"
    ? "j"
    : typeof value === "boolean"
      ? "b"
      : typeof value === "number"
        ? "n"
        : "s";
};

/**
 * Function to create local storage key
 * @param key
 * @param value
 */
const getLocalKey = (
  prefix: string,
  key: string,
  value: string | object | number | boolean | null,
) => {
  let keyType = getDataType(value);
  return prefix + `${keyType}.` + key;
};

export interface SecureLocalStorageOptions {
  prefixKey: string;
  hashKey?: string;
  disabledKey?: string;
}

/**
 * This version of local storage supports the following data types as it is and other data types will be treated as string
 * object, string, number and Boolean
 */
export class SecureStorage {
  private _options: SecureLocalStorageOptions = {
    prefixKey: getSecurePrefix("@prefixkey"),
    hashKey: "",
  };
  private _localStorageItems: LocalStorageItem = {};

  constructor(options?: SecureLocalStorageOptions) {
    if (options) {
      this._options = {
        ...this._options,
        ...options,
        prefixKey: getSecurePrefix(options.prefixKey),
      };
    }
    this._localStorageItems = getAllLocalStorageItems(this._options.prefixKey);
  }

  /**
   * Function to set value to secure local storage
   * @param key to be added
   * @param value value to be added `use JSON.stringify(value) or value.toString() to save any other data type`
   */
  save<T = string | object | number | boolean>(key: string, value: T) {
    if (value === null || value === undefined) this.delete(key);
    else {
      let parsedValue =
        typeof value === "object" ? JSON.stringify(value) : value + "";
      let parsedKeyLocal = getLocalKey(this._options.prefixKey, key, value);
      let parsedKey = this._options.prefixKey + key;
      if (key != null) this._localStorageItems[parsedKey] = value;
      const encrypt = new EncryptionService({
        hashKey: this._options.hashKey,
        disabledKey: this._options.disabledKey || "",
      });
      localStorage.setItem(parsedKeyLocal, encrypt.encrypt(parsedValue));
    }
  }

  /**
   * Function to get value from secure local storage
   * @param key to get
   * @returns
   */
  get<T = string | object | number | boolean | null>(key: string) {
    let parsedKey = this._options.prefixKey + key;
    return (this._localStorageItems[parsedKey] ?? null) as T;
  }

  /**
   * Function to remove item from secure local storage
   * @param key to be removed
   */
  delete(key: string) {
    let parsedKey = this._options.prefixKey + key;
    let value = this._localStorageItems[parsedKey];
    let parsedKeyLocal = getLocalKey(this._options.prefixKey, key, value);
    if (this._localStorageItems[parsedKey] !== undefined)
      delete this._localStorageItems[parsedKey];
    localStorage.removeItem(parsedKeyLocal);
  }

  /**
   * Function to clear secure local storage
   */
  clear() {
    this._localStorageItems = {};
    localStorage.clear();
  }
}

export const storage = new SecureStorage({
  prefixKey: envHelper.getStoragePrefix() || "",
  disabledKey: envHelper.getDisabledKeys() || "",
  hashKey: envHelper.getHashKey() || "",
});
