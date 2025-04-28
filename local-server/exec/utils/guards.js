"use strict";
/* Common type guards */
// Ces type guards sont utilisés pour valider les données de l'application.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isPositiveNumber = isPositiveNumber;
exports.isPositiveInteger = isPositiveInteger;
exports.isIdentifier = isIdentifier;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isArray = isArray;
exports.isNewContext = isNewContext;
exports.isContext = isContext;
exports.isNewPage = isNewPage;
exports.isPage = isPage;
/**
 * Function that validates that an input is a number
 * @param data any data
 * @returns true if data is a number
 */
function isNumber(data) {
    return (data !== undefined &&
        data !== null &&
        typeof data === "number" &&
        !isNaN(data));
}
/**
 * Function that validates that an input is a number and is an integer
 * @param data any data
 * @returns true if data is a number and is an integer
 */
function isInteger(data) {
    return isNumber(data) && Number.isInteger(data);
}
/**
 * Function that validates that an input is a positive number
 * @param data any data
 * @returns true if data is a positive number
 */
function isPositiveNumber(data) {
    return isNumber(data) && data > 0;
}
/**
 * Function that validates that an input is a positive integer
 * @param data any data
 * @returns true if data is a positive integer
 */
function isPositiveInteger(data) {
    return isInteger(data) && data > 0;
}
/**
 * Function that validates that an input is a valid identifier
 * @param data any data
 * @returns true if data is a valid identifier
 */
function isIdentifier(data) {
    return isPositiveInteger(data);
}
/**
 * Function that validates that an input is a string
 * @param data any data
 * @returns true if data is a string
 */
function isString(data) {
    return data !== undefined && data !== null && typeof data === "string";
}
/**
 * Function that validates that an input is a boolean
 * @param data any data
 * @returns true if data is a boolean
 */
function isBoolean(data) {
    return data !== undefined && data !== null && typeof data === "boolean";
}
/**
 * Function that validates that an input is an array
 * @param data any data
 * @returns true if data is an array
 */
function isArray(data) {
    return Array.isArray(data);
}
/**
 * Function that validates that an input is a new context
 * @param data any data
 * @returns true if data is a new context
 */
function isNewContext(data) {
    return (data !== undefined &&
        data !== null &&
        typeof data === "object" &&
        "name" in data &&
        isString(data.name));
}
/**
 * Function that validates that an input is a context
 * @param data any data
 * @returns true if data is a context
 */
function isContext(data) {
    return (data !== undefined &&
        data !== null &&
        typeof data === "object" &&
        "id" in data &&
        isIdentifier(data.id) &&
        "name" in data &&
        isString(data.name) &&
        "pages" in data &&
        isArray(data.pages) &&
        "isDeleted" in data &&
        isBoolean(data.isDeleted));
}
/**
 * Function that validates that an input is a new page
 * @param data any data
 * @returns true if data is a new page
 */
function isNewPage(data) {
    return (data !== undefined &&
        data !== null &&
        typeof data === "object" &&
        "title" in data &&
        isString(data.title) &&
        "url" in data &&
        isString(data.url));
}
/**
 * Function that validates that an input is a page
 * @param data any data
 * @returns true if data is a page
 */
function isPage(data) {
    return (data !== undefined &&
        data !== null &&
        typeof data === "object" &&
        "id" in data &&
        isIdentifier(data.id) &&
        "title" in data &&
        isString(data.title) &&
        "url" in data &&
        isString(data.url));
}
