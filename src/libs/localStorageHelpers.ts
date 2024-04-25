import { LocalStorageItem } from "./coreTypes";
import EncryptionService from "./encryption";

/**
 * Function to preload all the local storage data
 * @returns
 */
const getAllLocalStorageItems = (prefixKey: string, hashKey?: string) => {
  const localStorageItems: LocalStorageItem = {};
  if (typeof window !== "undefined") {
    const encrypt = new EncryptionService({ hashKey });
    for (const [key, value] of Object.entries(localStorage)) {
      if (key.startsWith(prefixKey)) {
        let keyType = key.replace(prefixKey, "")[0];
        let parsedKey = key.replace(/[.][bjns][.]/, ".");
        let decryptedValue = encrypt.decrypt(value);
        let parsedValue = null;
        if (decryptedValue != null)
          switch (keyType) {
            case "b":
              parsedValue = decryptedValue === "true";
              break;
            case "j":
              try {
                parsedValue = JSON.parse(decryptedValue);
              } catch (ex) {
                parsedValue = null;
              }
              break;
            case "n":
              try {
                parsedValue = Number(decryptedValue);
              } catch (ex) {
                parsedValue = null;
              }
              break;
            default:
              parsedValue = decryptedValue;
          }
        localStorageItems[parsedKey] = parsedValue;
      }
    }
  }
  return localStorageItems;
};

export default getAllLocalStorageItems;
