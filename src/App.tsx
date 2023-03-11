import { Box, Button, InputLabel, StepLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";


export default function App(){
    const [currTime, setCurrTime] = useState<string>('');
    const [currUnixTime, setCurrUnixTime] = useState<number>(0);

    const [unix, setUnix] = useState<number>(0);
    const [unixTimeConverted, setUnixTimeConverted] = useState<string>('');

    async function curr_time() {
        setCurrTime(await invoke("curr_time"));
    }

    async function curr_time_unix() {
        setCurrUnixTime(await invoke("curr_time_unix"));
    }

    async function timestamp_convert() {
        setUnixTimeConverted(await invoke("timestamp_convert", {unix}));
    }

    useEffect(() => {
        let timer = setInterval(() => {
            curr_time();
            curr_time_unix();
        },1000)

        return () => {
            clearInterval(timer);
        }
    },[])
    
    return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyItems: 'center',
            // alignItems:'center'
        }}
    >
        <Typography
            sx={{
                textAlign: 'center',
            }}
         variant="h4">Time Converter</Typography>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt:2
            }}
        >
            <InputLabel>System Time：</InputLabel>
            <Typography variant="h6">{currTime}</Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt:2
            }}
        >
            <InputLabel>Unix TimeStamp：</InputLabel>
            <Typography variant="h6">{currUnixTime}</Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt:2
            }}
        >
            <InputLabel>TimeStamp Converter (Millis) </InputLabel>
            <TextField 
                type={"number"}
                onChange={(e) => setUnix(Number(e.target.value))}
                />
                <Typography
                sx={{
                    mt:2
                }}
             variant="subtitle1">{unixTimeConverted}</Typography>
            <Button
                variant="outlined"
                sx={{
                    mt:2
                }}
                onClick={() => {
                    if (unix<0){
                        console.log("time error");
                    }else{
                        timestamp_convert();
                    }

                    // timestamp_convert();
                }}
            >Convert</Button>
            
        </Box>
        
    </Box>)
}