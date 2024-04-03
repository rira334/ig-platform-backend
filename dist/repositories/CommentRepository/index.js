"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = __importDefault(require("../BaseRepository"));
const helper_1 = require("./helper");
const model_1 = __importDefault(require("./model"));
class CommentRepository extends BaseRepository_1.default {
    constructor() {
        super(model_1.default, helper_1.filteredObjects);
    }
}
exports.default = CommentRepository;
//# sourceMappingURL=index.js.map