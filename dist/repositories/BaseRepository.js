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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model, filteredItems) {
        this.model = model;
        this.filteredItems = filteredItems || [];
    }
    getModel() {
        return this.model;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find();
            }
            catch (err) {
                return [];
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ _id: id });
            }
            catch (err) {
                return {};
            }
        });
    }
    getOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne(data);
            }
            catch (err) {
                return {};
            }
        });
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.deleteOne(data);
            }
            catch (err) {
                return {};
            }
        });
    }
    update(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.updateOne(filter, data);
            }
            catch (err) {
                return {};
            }
        });
    }
    getFilteredData(data) {
        if (Array.isArray(data)) {
            const filtered = data.map((d) => {
                const f = {};
                this.filteredItems.forEach((i) => {
                    if (typeof d[i] !== 'undefined') {
                        f[i] = d[i];
                    }
                });
                return f;
            });
            return filtered;
        }
        const filtered = {};
        this.filteredItems.forEach((i) => {
            if (data[i]) {
                filtered[i] = data[i];
            }
        });
        return filtered;
    }
    createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = new this.model(data);
                return item.save();
            }
            catch (err) {
                console.log(err);
                return { error: true };
            }
        });
    }
    getWithAggregation(pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.aggregate(pipeline);
            }
            catch (err) {
                return null;
            }
        });
    }
    checkBody(values, body) {
        for (let i = 0; i < values.length; i++) {
            if (!body[values[i]]) {
                return `${values[i]} is required`;
            }
        }
        return null;
    }
    validateData(schema, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield schema.validate(body);
                return { err: false, value: res };
            }
            catch (err) {
                return { err: true, msg: err.message };
            }
        });
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map