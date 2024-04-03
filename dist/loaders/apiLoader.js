"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const LastUsedController_1 = __importDefault(require("../controllers/LastUsedController"));
const App_1 = __importDefault(require("../helpers/App"));
function apiLoader() {
    const app = new App_1.default([
        new AuthController_1.default(),
        new UserController_1.default(),
        new CommentController_1.default(),
        new LastUsedController_1.default(),
    ], process.env.API_PORT || process.env.PORT, '/api', 'API');
    app.listen();
}
exports.default = apiLoader;
//# sourceMappingURL=apiLoader.js.map