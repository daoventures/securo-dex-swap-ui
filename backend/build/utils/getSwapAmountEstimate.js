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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwapAmountEstimate = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function getSwapAmountEstimate(network, tokenIn, tokenOut, tokenInAmount) {
    const timestamp = (0, moment_1.default)().unix();
    const apiKey = process.env.API_KEY;
    const secretKey = process.env.SECRET_KEY;
    const url = `https://sandbox.securo.dev/api/v1/web3/dex/swap/estimate?tokenOut=${tokenOut}&tokenIn=${tokenIn}&enteredAmount=${tokenInAmount}&exactIn=true&chain=${network}`;
    const method = 'GET';
    const baseString = `${url}&method=${method}&timestamp=${timestamp}`;
    const hash = crypto_1.default.createHmac('sha256', secretKey).update(baseString).digest('hex');
    axios_1.default.get(url, {
        headers: {
            'x-sec-key': apiKey,
            'x-sec-ts': timestamp,
            'x-sec-sign': hash,
            'Content-Type': 'application/json',
            "Accept-Encoding": "gzip,deflate,compress"
        }
    })
        .then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
        console.log(error.message);
    });
}
exports.getSwapAmountEstimate = getSwapAmountEstimate;
