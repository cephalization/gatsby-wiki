/**
 * Ensure localstorage is a feature of the browser
 */
const hasStorage = () => {
  try {
    localStorage.setItem('test_storage::internal', 'test');
    localStorage.removeItem('test_storage::internal');
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Store desired data in localstorage
 *
 * @param {string} key name to store data with
 * @param {any} data will be stringified and stored
 */
export const persistToLocalStorage = (key, data) => {
  if (hasStorage()) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

/**
 * Retrieve and parse data from localstorage
 *
 * @param {string} key data to retrieve and parse
 */
export const restoreFromLocalStorage = key => {
  if (hasStorage()) {
    return JSON.parse(localStorage.getItem(key));
  }

  return undefined;
};
