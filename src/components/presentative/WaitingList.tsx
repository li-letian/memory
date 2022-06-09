import { Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';
import Block from './Block';



export interface WaitingListProps {
    instructions: Array<number>,
    restCount: number
};


const WaitingList = ({ instructions, restCount }: WaitingListProps) => {
    return (
        <Stack spacing={1}>

            <Typography variant="body1" gutterBottom component="div" align='center'>
                等待执行的指令队列
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={2}></Grid>

                <Grid item xs={8}>

                    <Stack spacing={1}>

                        {
                            instructions.map((instruction: number, index: number) => {
                                if (instruction === -1) {
                                    return (<Block text={"empty"} color={'#37caaa'} />);
                                }
                                if (index === 0) {
                                    return (<Block text={instruction.toString()} color={'#2a93d5'} />);
                                }
                                else {
                                    return (<Block text={instruction.toString()} color={'#37caaa'} />);
                                }
                            })
                        }

                    </Stack>

                </Grid>
                <Grid item xs={2}></Grid>

            </Grid>

            <Typography variant="h5" gutterBottom component="div" align='center'>
                ...
                {(restCount > 0) && ('剩余' + restCount.toString() + '条')}
                ...
            </Typography>


        </Stack>
    );
}

export default WaitingList;