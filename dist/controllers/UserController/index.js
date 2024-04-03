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
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const Authorization_1 = require("../../helpers/Authorization");
const schemas_1 = require("../../schemas");
const helper_1 = require("./helper");
class UserController extends BaseController_1.default {
    constructor() {
        super('/user');
        this.user = new UserRepository_1.default();
    }
    initializeRoutes() {
        this.router.get('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.getUsers(req, res));
        this.router.post('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.createUser(req, res));
        this.router.put('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.updateUser(req, res));
        this.router.delete('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.deleteUser(req, res));
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.params.user;
                const other = req.body;
                const updated = {};
                const keys = [];
                helper_1.objectsToUpdate.forEach((k) => {
                    if (typeof other[k] !== 'undefined') {
                        keys.push(k);
                        updated[k] = other[k];
                    }
                });
                const schema = schemas_1.getSchemaObject(keys, schemas_1.signUpSchema);
                const validateData = yield this.user.validateData(schema, updated);
                if (validateData.err) {
                    throw new Error(validateData.msg);
                }
                const t = yield this.user.update({ _id: other._id }, updated);
                if (t) {
                    const updatedUser = Object.assign(Object.assign({}, user), updated);
                    res.status(200).json({ status: true, msg: 'Updated successfully', data: updatedUser });
                    return;
                }
                throw new Error('Error Occurred');
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const other = req.body;
                const t = yield this.user.delete({ _id: other._id });
                if (t) {
                    const updatedUser = Object.assign({}, other);
                    res.status(200).json({ status: true, msg: 'Deleted successfully', data: updatedUser });
                    return;
                }
                throw new Error('Error Occurred');
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.createOne(req.body);
                res.json({ status: true, user });
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.user.getAll();
                res.json(users);
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=index.js.map