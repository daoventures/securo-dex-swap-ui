import { InputLabel, Select, SelectChangeEvent, MenuItem, FormControl, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from 'axios';

import "./styles.scss";

export function Swappers() {
    const [network, setNetwork] = useState<string>('');
    const [tokens, setTokens] = useState<string[]>([]);
    const [tokenIn, setTokenIn] = useState<string>('');
    const [tokenOut, setTokenOut] = useState<string>('');
    const [tokenInAmount, setTokenInAmount] = useState<string>('');

    const handleChange = async (event: SelectChangeEvent) => {
        setNetwork(event.target.value);
        if (event.target.value !== "") {
            let response = await axios.get(`http://localhost:9000/getTokensForNetwork?network=${event.target.value}`);
            let networkTokens: string[] = [];
            if (response.data.data.length > 0) {
                networkTokens = response.data.data.map((d: any) => d.tokenName)
            }

            setTokens(networkTokens);
        }
    };

    const submit = async () => {
        if (network !== "" && tokenIn !== "" && tokenOut !== "") {
            const response = await axios.post(`http://localhost:9000/swap`, { tokenIn, tokenOut, network, tokenInAmount })
            window.location = response.data.data.url;
        }
    }

    return <div className="container">
        <Box>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
                <InputLabel id="demo-simple-select-label">Select Network</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={network}
                    label="Select Network"
                    onChange={handleChange}
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"goerli"}>Goerli</MenuItem>
                    <MenuItem value={"arbitrumTestnet"}>Arbitrum Testnet</MenuItem>
                    <MenuItem value={"bscTestnet"}>BSC Testnet</MenuItem>
                    <MenuItem value={"mumbai"}>Mumbai</MenuItem>
                    <MenuItem value={"fuji"}>Fuji</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box mt={2}>
            <FormControl variant="standard" sx={{ minWidth: 200, marginRight: "20px" }}>
                <InputLabel id="demo-simple-select-label">Token In</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tokenIn}
                    label="Token In"
                    onChange={(event) => setTokenIn(event.target.value)}
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {tokens.map((token: string) => {
                        if (token === tokenOut) return;
                        return <MenuItem value={token} key={token}>{token}</MenuItem>
                    }
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>

                <InputLabel id="demo-simple-select-label">Token Out</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tokenOut}
                    label="Token In"
                    onChange={(event) => setTokenOut(event.target.value)}
                    size="small"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {tokens.map((token: string) => {
                        if (token === tokenIn) return;
                        return <MenuItem value={token} key={token}>{token}</MenuItem>
                    }
                    )}
                </Select>
            </FormControl>
            <Box mt={3} sx={{ display: "flex", gap: "10px" }}>
                <TextField
                    id="outlined-basic"
                    label="Amount (Token In)"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={tokenInAmount}
                    onChange={(event) => setTokenInAmount(event.target.value)}
                    fullWidth
                    inputProps={{
                        step: "0.0001"
                    }}
                />
                <Button variant="contained" sx={{ boxShadow: "none" }} color="info" onClick={submit} disableRipple>SWAP!</Button>
            </Box>
        </Box>
    </div>
}