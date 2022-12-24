import express, { NextFunction, Request, Response } from 'express';
import { getTokensForNetwork } from './utils/getTokens';
import { swapTokens } from './utils/swapTokens';

const app = express();

app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "*" //"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS")
    next()
})

app.get("/getTokensForNetwork", async (req: Request, res) => {

    try {
        let responseVal: any = {}

        if (req.query.network) {
            responseVal = await getTokensForNetwork(req.query.network as string)
        } else {
            throw new Error("Network not provided")
        }

        res.json(responseVal);

    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }

})

app.post("/swap", async (req: Request, res: Response) => {
    try {
        let responseVal: any = { url: "" }

        let { network, tokenIn, tokenOut, tokenInAmount } = req.body;

        responseVal = await swapTokens(network, tokenIn, tokenOut, tokenInAmount.toString())

        res.json({ data: responseVal });
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

app.listen(9000, () => {
    console.log("started listening on port 9000")
})