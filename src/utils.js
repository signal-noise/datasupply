/**
 * @param {string} str
 * given a file path, returns filename, without extension
 */
export const getFileFromPath = function (str) {
  return str.substring(str.lastIndexOf("/") + 1);
};

/**
 * @param {string} str
 * given a file path, returns filename, without extension
 */
export const removeExtension = function (str) {
  return str.split(".")[0];
};
