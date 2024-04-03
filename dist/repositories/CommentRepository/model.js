"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('Comment', schema);
//# sourceMappingURL=model.js.map