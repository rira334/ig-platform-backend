"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("../helpers/Logger"));
dotenv_1.default.config();
let command = null;
process.argv.forEach((val) => {
    if (val.includes('command')) {
        //@ts-ignore
        command = val.split('command=')[1];
    }
});
const kill = () => process.kill(process.pid, 'SIGINT');
const commands = {
    test: () => {
        console.log('Test Command');
        return;
    },
};
mongoose_1.default
    .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { Logger_1.default.applicationLogger('Connected to MongoDB'); })
    .then(() => {
    if (command) {
        if (commands[command]) {
            commands[command]();
        }
        else {
            Logger_1.default.applicationLogger('Command is not valid');
            kill();
        }
    }
    else {
        Logger_1.default.applicationLogger('Add command key');
        kill();
    }
});
//# sourceMappingURL=index.js.map