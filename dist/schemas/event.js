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
exports.eventSchema = void 0;
const yup = __importStar(require("yup"));
exports.eventSchema = yup.object().shape({
    tags: yup.array().required().min(1),
    locationFormatted: yup.string().required(),
    country: yup.string().required(),
    location: yup.object().required(),
    images: yup.array().required().min(1),
    description: yup.string().required().min(10),
    startHour: yup.string().required(),
    date: yup.string().required(),
    title: yup.string().required().min(5),
});
//# sourceMappingURL=event.js.map