"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = getDatabase;
const idb_1 = require("idb");
let dbPromise = null;
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dbPromise) {
            dbPromise = (0, idb_1.openDB)("contexts-database", 1, {
                upgrade(db, oldVersion, newVersion, transaction) {
                    // Create contexts store with auto-increment ID
                    if (!db.objectStoreNames.contains("contexts")) {
                        const contextsStore = db.createObjectStore("contexts", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        contextsStore.createIndex("by-id", "id");
                        contextsStore.createIndex("by-name", "name");
                    }
                    // Create pages store with auto-increment ID
                    if (!db.objectStoreNames.contains("pages")) {
                        const pagesStore = db.createObjectStore("pages", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        pagesStore.createIndex("by-id", "id");
                        pagesStore.createIndex("by-title", "title");
                        pagesStore.createIndex("by-url", "url"); // url probably not needed !!!
                    }
                },
            });
        }
        return dbPromise;
    });
}
