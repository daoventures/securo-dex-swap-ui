import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';

import * as dotenv from 'dotenv';
dotenv.config();

interface ISwapReturn {
    url: string
}

export async function swapTokens(network: string, tokenIn: string, tokenOut: string, amount: string): Promise<ISwapReturn> {
    const timestamp: number = moment().unix();
    const apiKey: string = process.env.API_KEY!;
    const secretKey: string = process.env.SECRET_KEY!;
    const userEmail: string = process.env.USER_EMAIL_ADDRESS!;
    const url: string = 'https://sandbox.securo.dev/api/v1/sessions/swap';
    const method: string = 'POST';

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
    if (data) baseString += `&body=${JSON.stringify(JSON.parse(data))}`

    const hash = crypto.createHmac('sha256', secretKey).update(baseString).digest('hex');

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

    let returnResponseVal: any = {}

    let response = await axios(config);

    returnResponseVal = {
        url: response.data.data.url
    }

    return returnResponseVal;
}
