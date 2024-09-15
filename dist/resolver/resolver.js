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
const record_model_1 = require("../model/record.model");
const resolver = {
    Mutation: {
        createRecord: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, position, level, }) {
            try {
                const response = yield record_model_1.RECORD.create({
                    name,
                    position,
                    level,
                });
                return response;
            }
            catch (error) { }
        }),
    },
    Query: {
        records: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield record_model_1.RECORD.find();
            return response;
        }),
    },
};
exports.default = resolver;
