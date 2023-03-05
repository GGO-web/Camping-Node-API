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
exports.deleteBagItem = void 0;
const asyncWrapper_1 = require("../../../../helpers/asyncWrapper");
const withController_1 = require("../../../../helpers/withController");
const bag_service_1 = require("../bag.service");
const deleteBagItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bagItemId } = req.query;
    yield bag_service_1.BagService.deleteBagItem(userId, bagItemId);
    return res.json({ message: "Bag item has been deleted successfully" });
});
exports.deleteBagItem = deleteBagItem;
exports.default = [
    (0, withController_1.withController)("/delete", "delete", (0, asyncWrapper_1.asyncWrapper)(exports.deleteBagItem))
];
