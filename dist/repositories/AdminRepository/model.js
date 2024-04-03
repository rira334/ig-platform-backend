"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: Object,
        required: true,
    },
});
exports.default = mongoose_1.model('Admin', schema);
//# sourceMappingURL=model.js.map