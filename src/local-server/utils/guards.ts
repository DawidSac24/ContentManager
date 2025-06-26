/* Common type guards */
// Ces type guards sont utilisés pour valider les données de l'application.

import { Context, NewContext } from "../models/context.model";
import { Page, NewPage } from "../models/page.model";

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
 * Function that validates that an input is an array
 * @param data any data
 * @returns true if data is an array
 */
export function isArray(data: unknown): data is unknown[] {
  return Array.isArray(data);
}

/**
 * Function that validates that an input is a new context
 * @param data any data
 * @returns true if data is a new context
 */
export function isNewContext(data: unknown): data is NewContext {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "object" &&
    "name" in data &&
    isString(data.name)
  );
}

/**
 * Function that validates that an input is a context
 * @param data any data
 * @returns true if data is a context
 */
export function isContext(data: unknown): data is Context {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "object" &&
    "id" in data &&
    isIdentifier(data.id) &&
    "name" in data &&
    isString(data.name) &&
    "pages" in data &&
    isArray(data.pages) &&
    "isDeleted" in data &&
    isBoolean(data.isDeleted)
  );
}

/**
 * Function that validates that an input is a new page
 * @param data any data
 * @returns true if data is a new page
 */
export function isNewPage(data: unknown): data is NewPage {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "object" &&
    "title" in data &&
    isString(data.title) &&
    "url" in data &&
    isString(data.url)
  );
}

/**
 * Function that validates that an input is a page
 * @param data any data
 * @returns true if data is a page
 */
export function isPage(data: unknown): data is Page {
  return (
    data !== undefined &&
    data !== null &&
    typeof data === "object" &&
    "id" in data &&
    isIdentifier(data.id) &&
    "title" in data &&
    isString(data.title) &&
    "url" in data &&
    isString(data.url)
  );
}

export function isPagesArray(data: unknown): data is Page[] {
  return isArray(data) && data.length > 0;
}
