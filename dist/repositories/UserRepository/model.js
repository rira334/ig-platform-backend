"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    isFake: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('User', schema);
//# sourceMappingURL=model.js.map