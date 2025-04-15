/**
 * Function that validates that an input is a number
 * @param data any data
 * @returns true if data is a number
 */
export function isNumber(data: unknown): data is number {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "number" &&
    !isNaN(data)
  );
}

/**
 * Function that validates that an input is a number and is an integer
 * @param data any data
 * @returns true if data is a number and is an integer
 */
export function isInteger(data: unknown): data is number {
  return isNumber(data) && Number.isInteger(data);
}

/**
 * Function that validates that an input is a positive number
 * @param data any data
 * @returns true if data is a positive number
 */
export function isPositiveNumber(data: unknown): data is number {
  return isNumber(data) && data > 0;
}

/**
 * Function that validates that an input is a positive integer
 * @param data any data
 * @returns true if data is a positive integer
 */
export function isPositiveInteger(data: unknown): data is number {
  return isInteger(data) && data > 0;
}

/**
 * Function that validates that an input is a valid identifier
 * @param data any data
 * @returns true if data is a valid identifier
 */
export function isIdentifier(data: unknown): data is number {
  return isPositiveInteger(data);
}

/**
 * Function that validates that an input is a string
 * @param data any data
 * @returns true if data is a string
 */
export function isString(data: unknown): data is string {
  return data !== undefined && data !== null && typeof data === "string";
}
