/* Common type guards */
// Ces type guards sont utilisés pour valider les données de l'application.

import { Category, NewCategory } from "../models/category.model";
import { Order, OrderItem } from "../models/order.model";
import { NewProduct, Product } from "../models/product.model";
import { NewTicket, Ticket } from "../models/ticket.model";
import { NewUser, User } from "../models/user.model";


/**
 * Function that validates that an input is a number
 * @param data any data
 * @returns true if data is a number
 */
export function isNumber(data: unknown): data is number {
  return data !== undefined && data !== null && typeof data === 'number' && !isNaN(data);
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
  return data !== undefined && data !== null && typeof data === 'string';
}

/**
 * Function that validates that an input is a string with a maximum length
 * @param data any data
 * @param maxLength maximum length of the string
 * @returns true if data is a string with a length less than or equal to maxLength
 */
export function isStringMaxLength(data: unknown, maxLength: number): data is string {
  return isString(data) && data.length <= maxLength;
}

/**
 * Function that validates that an input is a string within an array of accepted values
 * @param data any data
 * @param array array of accepted values
 * @returns true if data is a string within the array
 */
export function isStringInArray(data: unknown, array: string[]): data is string {
  return isString(data) && array.includes(data);
}

/**
 * Function that validates that an input is a date
 * @param data any data
 * @returns true if data is a date
 */
export function isDateString(data: unknown): data is string {
  return isString(data) && !isNaN(new Date(data).getTime());
}


/* Project type guards */
// Ces type guards ont été développés pour valider les données des modèles de l'application.
// Commencez par développer les modèles correspondants.
// Décommentez ensuite les fonctions ci-dessous pour les utiliser dans votre code.
// Il est possible que vous deviez les adapter à votre code.


 /**
  * Function that validates that an input is a new category
  * @param data any data
  * @returns true if data is a new category
  */
 export function isNewCategory(data: unknown): data is NewCategory {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'name' in data && isStringMaxLength(data.name, 50) &&
     'description' in data && isString(data.description);
 }

 /**
  * Function that validates that an input is a category
  * @param data any data
  * @returns true if data is a category
  */
 export function isCategory(data: unknown): data is Category {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'categoryId' in data && isIdentifier(data.categoryId) && 
     'name' in data && isStringMaxLength(data.name, 50) &&
     'description' in data && isString(data.description) &&
     'status' in data && isStringInArray(data.status, ['AVAILABLE', 'UNAVAILABLE']);
}

 /**
  * Function that validates that an input is a new product
  * @param data any data
  * @returns true if data is a new product
  */
 export function isNewProduct(data: unknown): data is NewProduct {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'name' in data && isStringMaxLength(data.name, 50) &&
     'description' in data && isString(data.description) &&
     'price' in data && isPositiveNumber(data.price) &&
     'categoryId' in data && isIdentifier(data.categoryId);
 }

 /**
  * Function that validates that an input is a product
  * @param data any data
  * @returns true if data is a product
  */
 export function isProduct(data: unknown): data is Product {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'productId' in data && isIdentifier(data.productId) &&
     'name' in data && isString(data.name) &&
     'description' in data && isString(data.description) &&
     'price' in data && isPositiveNumber(data.price) &&
     'categoryId' in data && isIdentifier(data.categoryId) &&
     'status' in data && isStringInArray(data.status, ['AVAILABLE', 'UNAVAILABLE']);
 }

 /**
  * Function that validates that an input is a new user
  * @param data any data
  * @returns true if data is a new user
  */
 export function isNewUser(data: unknown): data is NewUser {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'firstName' in data && isStringMaxLength(data.firstName, 50) &&
     'lastName' in data && isStringMaxLength(data.lastName, 50);
 }

 /**
  * Function that validates that an input is a user
  * @param data any data
  * @returns true if data is a user
  */
 export function isUser(data: unknown): data is User {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'userId' in data && isIdentifier(data.userId) &&
     'firstName' in data && isStringMaxLength(data.firstName, 50) &&
     'lastName' in data && isStringMaxLength(data.lastName, 50) &&
     'role' in data && isStringInArray(data.role, ['client', 'admin']) &&
     'status' in data && isStringInArray(data.status, ['ENABLED', 'DISABLED']);
 }

 /**
  * Function that validates that an input is an order
  * @param data any data
  * @returns true if data is an order
  */
 export function isOrder(data: unknown): data is Order {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'orderId' in data && isIdentifier(data.orderId) &&
     'clientId' in data && isIdentifier(data.clientId) &&
     (!('orderDate' in data)|| ('orderDate' in data && isDateString(data.orderDate))) &&
     'status' in data && isStringInArray(data.status, ['NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']);
 }

 /**
  * Function that validates that an input is an order item
  * @param data any data
  * @returns true if data is an order item
  */
 export function isOrderItem(data: unknown): data is OrderItem {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'orderId' in data && isIdentifier(data.orderId) &&
     'productId' in data && isIdentifier(data.productId) &&
     (!('unitPrice' in data) || ('unitPrice' in data && isPositiveNumber(data.unitPrice))) &&
     'quantity' in data && isPositiveInteger(data.quantity);
 }

 /**
  * Function that validates that an input is a new ticket
  * @param data any data
  * @returns true if data is a new ticket
  */
 export function isNewTicket(data: unknown): data is NewTicket {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'orderId' in data && isIdentifier(data.orderId) &&
     'title' in data && isStringMaxLength(data.title, 100) &&
     'description' in data && isString(data.description);
 }

 /**
  * Function that validates that an input is a ticket
  * @param data any data
  * @returns true if data is a ticket
  */
 export function isTicket(data: unknown): data is Ticket {
   return data !== undefined && data !== null && typeof data === 'object' &&
     'ticketId' in data && isIdentifier(data.ticketId) &&
     'orderId' in data && isIdentifier(data.orderId) &&
     'title' in data && isStringMaxLength(data.title, 100) &&
     'description' in data && isString(data.description) &&
     'status' in data && isStringInArray(data.status, ['OPEN', 'IN_PROGRESS', 'CLOSED']);
 }