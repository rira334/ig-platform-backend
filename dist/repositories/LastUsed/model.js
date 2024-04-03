"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    users: {
        type: Array,
        required: true,
    },
});
exports.default = mongoose_1.model('LastUsed', schema);
//# sourceMappingURL=model.js.map