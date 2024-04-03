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
const CommentRepository_1 = __importDefault(require("../../repositories/CommentRepository"));
const LastUsed_1 = __importDefault(require("../../repositories/LastUsed"));
const Authorization_1 = require("../../helpers/Authorization");
const axios_1 = __importDefault(require("axios"));
class CommentController extends BaseController_1.default {
    constructor() {
        super('/comment');
        this.user = new UserRepository_1.default();
        this.comment = new CommentRepository_1.default();
        this.lastUsed = new LastUsed_1.default();
    }
    initializeRoutes() {
        this.router.get('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.getComments(req, res));
        this.router.post('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.createComment(req, res));
        this.router.put('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.updateComment(req, res));
        this.router.post('/post-comments', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.addComments(req, res));
        this.router.delete('/', (req, res, next) => Authorization_1.authenticationMiddleWare(req, res, next), (req, res) => this.deleteComment(req, res));
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const other = req.body;
                const t = yield this.comment.delete({ _id: other._id });
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
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const t = yield this.comment.update({ _id: req.body._id }, req.body);
                if (t) {
                    const updatedComment = Object.assign({}, req.body);
                    res.status(200).json({ status: true, msg: 'Updated successfully', data: updatedComment });
                    return;
                }
                throw new Error('Error Occurred');
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.comment.createOne(req.body);
                res.json({ status: true, user });
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.comment.getAll();
                res.json(users);
            }
            catch (e) {
                res.status(400).json({ status: false, msg: e.message });
            }
        });
    }
    addComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({ status: true });
            const real = req.body.real;
            const fake = req.body.fake.map((f) => (Object.assign(Object.assign({}, f), { comments: [1, 2, 3, 4, 5].map(() => '🔥🔥🔥') })));
            const usersLength = (yield this.user.getAll()).length;
            const _lastUsed = yield this.lastUsed.getOne({});
            const data = { real, fake };
            if (_lastUsed) {
                const _users = [
                    ..._lastUsed.users,
                    ...(real.map((r) => r.username)),
                    ...(fake.map((r) => r.username)),
                ];
                if (_users.length >= usersLength) {
                    yield this.lastUsed.update({}, { users: [] });
                }
                else {
                    yield this.lastUsed.update({}, { users: _users });
                }
            }
            try {
                yield axios_1.default.post('/add-comment', data, {
                    data,
                    // @ts-ignore
                    baseURL: req.params.user.url,
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.default = CommentController;
//# sourceMappingURL=index.js.map