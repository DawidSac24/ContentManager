"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// starts the server
app_1.app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
