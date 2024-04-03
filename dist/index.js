"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microframework_1 = require("microframework");
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = __importDefault(require("./helpers/Logger"));
const apiLoader_1 = __importDefault(require("./loaders/apiLoader"));
const databaseLoader_1 = __importDefault(require("./loaders/databaseLoader"));
dotenv_1.default.config();
microframework_1.bootstrapMicroframework({
    loaders: [
        databaseLoader_1.default,
        apiLoader_1.default,
    ],
})
    .then(() => Logger_1.default.microframeworkLogger('Application is up and running.'))
    .catch(error => Logger_1.default.microframeworkLogger(`Application is crashed: ${error}`));
//# sourceMappingURL=index.js.map