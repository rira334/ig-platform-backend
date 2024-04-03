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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("../BaseController"));
const LastUsed_1 = __importDefault(require("../../repositories/LastUsed"));
const Authorization_1 = require("../../helpers/Authorization");
class LastUsedController extends BaseController_1.default {
    constructor() {
        super('/last-used');
        this.lastUsed = new LastUsed_1.default();
    }
    initializeRoutes() {
        this.router.post('/reset', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.resetLastUsed(req, res));
        this.router.get('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.getLastUsed(req, res));
    }
    getLastUsed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _res = yield this.lastUsed.getOne({});
                res.json(_res);
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    resetLastUsed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.lastUsed.delete({});
                yield this.lastUsed.createOne({ users: [] });
                res.json({ msg: 'Last Used Reset Done' });
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
}
exports.default = LastUsedController;
//# sourceMappingURL=index.js.map