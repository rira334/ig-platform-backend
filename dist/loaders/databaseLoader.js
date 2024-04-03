"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("../helpers/Logger"));
function databaseLoader() {
    mongoose_1.default
        .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { Logger_1.default.applicationLogger('Connected to MongoDB'); });
}
exports.default = databaseLoader;
//# sourceMappingURL=databaseLoader.js.map