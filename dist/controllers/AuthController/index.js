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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BaseController_1 = __importDefault(require("../BaseController"));
const AdminRepository_1 = __importDefault(require("../../repositories/AdminRepository"));
const Encryption_1 = require("../../helpers/Encryption");
const schemas_1 = require("../../schemas");
const Authorization_1 = require("../../helpers/Authorization");
class AuthController extends BaseController_1.default {
    constructor() {
        super('/auth');
        this.admin = new AdminRepository_1.default();
    }
    initializeRoutes() {
        this.router.post('/sign-up', (req, res) => this.signUp(req, res));
        this.router.get('/check-token', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.checkToken(req, res));
        this.router.put('/update-url', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.updateUrl(req, res));
        this.router.post('/sign-in', (req, res) => this.signIn(req, res));
    }
    checkToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ status: true, user: req.params.user });
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkRes = yield this.admin.validateData(schemas_1.logInSchema, req.body);
                if (checkRes.err) {
                    throw new Error(checkRes.msg);
                }
            }
            catch (err) {
                res.status(422).json({ error: err.message, status: false, });
                return;
            }
            try {
                const user = yield this.admin.getOne({
                    username: req.body.username,
                });
                if (!user) {
                    throw new Error('Username is not valid');
                }
                const decrypted = Encryption_1.decrypt(user.password);
                if (decrypted !== req.body.password) {
                    throw new Error('Password is not valid');
                }
                const token = jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.TOKEN_SECRET, { expiresIn: '10h' });
                res.json({ token, user: this.admin.getFilteredData(user), status: true, });
            }
            catch (err) {
                res.status(400).json({ error: err.message, status: false, });
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateData = yield this.admin.validateData(schemas_1.signUpSchema, req.body);
                if (validateData.err) {
                    throw new Error(validateData.msg);
                }
            }
            catch (err) {
                res.status(422).json({ error: err.message, status: false, });
                return;
            }
            try {
                const password = Encryption_1.encrypt(req.body.password);
                const u = yield this.admin.createOne(Object.assign(Object.assign({}, req.body), { password }));
                const user = yield this.admin.getOne({ email: req.body.email, password });
                const token = jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.TOKEN_SECRET, { expiresIn: '10h' });
                res.json({ token, user: u, status: true });
            }
            catch (err) {
                res.status(400).json({ error: err.message, status: false });
            }
        });
    }
    updateUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            // @ts-ignore
            const _r = yield this.admin.update({ email: req.params.user.email }, { url });
            res.json(_r);
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=index.js.map