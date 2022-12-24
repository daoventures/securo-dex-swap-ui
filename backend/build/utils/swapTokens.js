"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.swapTokens = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function swapTokens(network, tokenIn, tokenOut, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = (0, moment_1.default)().unix();
        const apiKey = process.env.API_KEY;
        const secretKey = process.env.SECRET_KEY;
        const userEmail = process.env.USER_EMAIL_ADDRESS;
        const url = 'https://sandbox.securo.dev/api/v1/sessions/swap';
        const method = 'POST';
        var data = JSON.stringify({
            "tokenIn": tokenIn,
            "tokenOut": tokenOut,
            "amount": amount,
            "chain": network,
            "isNative": false,
            "slippagePercentage": "5",
            "exactIn": true,
            "userEmail": userEmail,
            "successURL": "http://localhost:3000",
            "cancelURL": "http://localhost:3000"
        });
        var baseString = `${url}&method=${method}&timestamp=${timestamp}`;
        if (data)
            baseString += `&body=${JSON.stringify(JSON.parse(data))}`;
        const hash = crypto_1.default.createHmac('sha256', secretKey).update(baseString).digest('hex');
        var config = {
            method,
            url,
            headers: {
                'x-sec-key': apiKey,
                'x-sec-ts': timestamp,
                'x-sec-sign': hash,
                'Content-Type': 'application/json',
            },
            data
        };
        let returnResponseVal = {};
        let response = yield (0, axios_1.default)(config);
        returnResponseVal = {
            url: response.data.data.url
        };
        return returnResponseVal;
    });
}
exports.swapTokens = swapTokens;
