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
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class RepositroyWithPagination extends BaseRepository_1.default {
    getPage({ page, perPage, query, sort, aggregate, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (aggregate) {
                const results = yield this.model.aggregate(aggregate).sort(sort).limit(perPage).skip((page - 1) * perPage);
                return {
                    data: this.getFilteredData(results),
                    page,
                    perPage,
                };
            }
            else {
                const results = yield this.model.find(query).sort(sort).limit(perPage).skip((page - 1) * perPage);
                return {
                    data: this.getFilteredData(results),
                    page,
                    perPage,
                };
            }
        });
    }
}
exports.default = RepositroyWithPagination;
//# sourceMappingURL=RepositoryWithPagination.js.map