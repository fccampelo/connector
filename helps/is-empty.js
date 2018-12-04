/**
 * @desc verify that the fields are different from empty
 * @param value to be verified
 */
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
