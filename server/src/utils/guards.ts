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

/**
 * Function that validates that an input is a boolean
 * @param data any data
 * @returns true if data is a boolean
 */
export function isBoolean(data: unknown): data is boolean {
  return data !== undefined && data !== null && typeof data === "boolean";
}

/**
 * Function that validates that an input is a valid Context
 * @param data any data
 * @returns true if data matches Context structure
 */
export function isContext(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const context = data as any;

  return (
    isIdentifier(context.id) &&
    isString(context.name) &&
    isIdentifier(context.icon_id) &&
    isBoolean(context.deleted)
  );
}

/**
 * Function that validates that an input is a valid NewContext
 * @param data any data
 * @returns true if data matches NewContext structure
 */
export function isNewContext(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const newContext = data as any;

  return (
    isString(newContext.name) &&
    (newContext.icon_id === undefined ||
      newContext.icon_id === null ||
      isIdentifier(newContext.icon_id))
  );
}
/**
 * Function that validates that an input is a valid Page
 * @param data any data
 * @returns true if data matches Page structure
 */
export function isPage(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const page = data as any;

  return isIdentifier(page.id) && isString(page.name) && isString(page.url);
}

/**
 * Function that validates that an input is a valid NewPage
 * @param data any data
 * @returns true if data matches NewPage structure
 */
export function isNewPage(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const newPage = data as any;

  return isString(newPage.name) && isString(newPage.url);
}
