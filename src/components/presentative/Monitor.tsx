import { Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface MonitorProps {
    rateOfMiss: number;
    instruction: number;
    isContain: boolean;
    removed: number;
    show: boolean;
};


const Monitor = ({ instruction, rateOfMiss = 0, isContain = true, removed = 0, show = false }: MonitorProps) => {
    return (

        <Stack spacing={1}>

            <Typography variant="body1" gutterBottom component="div" align='center'>
                实时信息
            </Typography>
            {
                (show) &&
                <Typography variant="body1" gutterBottom component="div" align='center'>
                    实时缺页率{rateOfMiss}%
                </Typography>
            }
            {
                (show && isContain) &&
                <Typography variant="body1" gutterBottom component="div" align='center'>
                    {instruction}在内存中，不需要调度
                </Typography>
            }
            {
                (show && !isContain) &&
                <Typography variant="body1" gutterBottom component="div" align='center'>
                    {(removed !== -1) && ("调出第" + removed.toString() + "页，")}调入第{instruction}页
                </Typography>
            }

        </Stack>
    );
}


export default Monitor;