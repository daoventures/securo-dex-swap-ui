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
const express_1 = __importDefault(require("express"));
const getTokens_1 = require("./utils/getTokens");
const swapTokens_1 = require("./utils/swapTokens");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*" //"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
});
app.get("/getTokensForNetwork", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let responseVal = {};
        if (req.query.network) {
            responseVal = yield (0, getTokens_1.getTokensForNetwork)(req.query.network);
        }
        else {
            throw new Error("Network not provided");
        }
        res.json(responseVal);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
app.post("/swap", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let responseVal = { url: "" };
        let { network, tokenIn, tokenOut, tokenInAmount } = req.body;
        responseVal = yield (0, swapTokens_1.swapTokens)(network, tokenIn, tokenOut, tokenInAmount.toString());
        res.json({ data: responseVal });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
app.listen(9000, () => {
    console.log("started listening on port 9000");
});
