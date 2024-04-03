"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = exports.logInSchema = exports.signUpSchema = exports.getSchemaObject = void 0;
const auth_1 = require("./auth");
Object.defineProperty(exports, "signUpSchema", { enumerable: true, get: function () { return auth_1.signUpSchema; } });
Object.defineProperty(exports, "logInSchema", { enumerable: true, get: function () { return auth_1.logInSchema; } });
const event_1 = require("./event");
Object.defineProperty(exports, "eventSchema", { enumerable: true, get: function () { return event_1.eventSchema; } });
const yup = __importStar(require("yup"));
const getSchemaObject = (keys, schemaObject) => {
    const fields = {};
    if (schemaObject.fields) {
        keys.forEach((k) => {
            if (schemaObject.fields[k]) {
                fields[k] = schemaObject.fields[k];
            }
        });
    }
    return yup.object().shape(fields);
};
exports.getSchemaObject = getSchemaObject;
//# sourceMappingURL=index.js.map