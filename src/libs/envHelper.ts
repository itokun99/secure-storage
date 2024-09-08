// const SUPPORTED_PREFIX = ["", "REACT_APP_", "NEXT_PUBLIC_", "VITE_"];

export type SECURE_LOCAL_STORAGE_KEYS =
  | "STORAGE_DISABLED_KEYS"
  | "STORAGE_KEY"
  | "STORAGE_HASH_KEY";

/**
 * Function to get STORAGE_HASH_KEY
 * @returns
 */
const getHashKey = () => {
  let value: string | null | undefined = null;
  try {
    if (typeof process.env != "undefined") {
      value =
        process.env.STORAGE_HASH_KEY ||
        process.env.REACT_APP_STORAGE_HASH_KEY ||
        process.env.NEXT_PUBLIC_STORAGE_HASH_KEY ||
        process.env.VITE_STORAGE_HASH_KEY;
    } else {
      console.warn(`warning : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};

/**
 * Function to get SECURE_LOCAL_STORAGE_PREFIX
 * @returns
 */
const getStoragePrefix = () => {
  let value: string | null | undefined = null;
  try {
    if (typeof process.env != "undefined") {
      value =
        process.env.STORAGE_KEY ||
        process.env.REACT_APP_STORAGE_KEY ||
        process.env.NEXT_PUBLIC_STORAGE_KEY ||
        process.env.VITE_STORAGE_KEY;
    } else {
      console.warn(`warning : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};
/**
 * Function to get SECURE_LOCAL_STORAGE_DISABLED_KEYS
 * @returns
 */
const getDisabledKeys = () => {
  let value: string | null | undefined = null;
  try {
    if (typeof process.env != "undefined") {
      value =
        process.env.STORAGE_DISABLED_KEYS ||
        process.env.REACT_APP_STORAGE_DISABLED_KEYS ||
        process.env.NEXT_PUBLIC_STORAGE_DISABLED_KEYS ||
        process.env.VITE_STORAGE_DISABLED_KEYS;
    } else {
      console.warn(`warning : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};

const envHelper = {
  getHashKey,
  getStoragePrefix,
  getDisabledKeys,
};

export default envHelper;
