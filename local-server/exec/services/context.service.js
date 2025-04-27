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
exports.ContextService = void 0;
const db_service_1 = require("./db.service");
class ContextService {
    static add(newContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readwrite");
            const store = tx.objectStore("contexts");
            const context = {
                name: newContext.name,
                pages: [],
                isDeleted: false,
            };
            const id = yield store.add(context);
            yield tx.done; // Ensure the transaction complete
            return {
                id: id,
                name: context.name,
                pages: context.pages,
                isDeleted: context.isDeleted,
            };
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readonly");
            const store = tx.objectStore("contexts");
            const allContexts = yield store.getAll();
            return allContexts;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readonly");
            const store = tx.objectStore("contexts");
            const index = store.index("by-id");
            const context = yield index.get(id); // Get the first record where 'title' matches title
            return context;
        });
    }
    static update(updatedContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readwrite");
            const store = tx.objectStore("contexts");
            yield store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
            yield tx.done;
        });
    }
    static softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readwrite");
            const store = tx.objectStore("contexts");
            const updatedContext = yield this.getById(id);
            if (!updatedContext) {
                throw new Error(`Context with id ${id} not found`);
            }
            updatedContext.isDeleted = true;
            yield store.put(updatedContext); // 'put' will update if the key exists, or add if it doesn't
            yield tx.done;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, db_service_1.getDatabase)();
            const tx = db.transaction("contexts", "readwrite");
            const store = tx.objectStore("contexts");
            yield store.delete(id);
            yield tx.done;
        });
    }
}
exports.ContextService = ContextService;
