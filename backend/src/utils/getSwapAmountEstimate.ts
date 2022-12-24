import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';

import * as dotenv from 'dotenv';
dotenv.config();

export function getSwapAmountEstimate(network: string, tokenIn: string, tokenOut: string, tokenInAmount: number) {
    const timestamp: number = moment().unix();
    const apiKey: string = process.env.API_KEY!;
    const secretKey: string = process.env.SECRET_KEY!;
    const url: string = `https://sandbox.securo.dev/api/v1/web3/dex/swap/estimate?tokenOut=${tokenOut}&tokenIn=${tokenIn}&enteredAmount=${tokenInAmount}&exactIn=true&chain=${network}`;
    const method: string = 'GET';

    const baseString: string = `${url}&method=${method}&timestamp=${timestamp}`;
    const hash: string = crypto.createHmac('sha256', secretKey).update(baseString).digest('hex');

    axios.get(url, {
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