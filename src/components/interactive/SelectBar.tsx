import { FormControl, RadioGroup, FormControlLabel, Radio, Stack, Typography, Grid } from '@mui/material';
import * as React from 'react';

export interface SelectBarProps {
    setAlgorithm: (algorithm: string) => void;
};


export interface SelectBarState {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


class SelectBar extends React.Component<SelectBarProps, SelectBarState> {

    state: SelectBarState = {
        value: "LRU",
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState((state) => ({
                value: (event.target as HTMLInputElement).value
            }));

            this.props.setAlgorithm((event.target as HTMLInputElement).value);
        }
    };

    render() {

        return (
            <Grid container spacing={1}>
                <Grid item xs={2}></Grid>

                <Grid item xs={8}>

                    <Stack spacing={0}>
                        <Typography variant="body1" gutterBottom component="div" align='center'>
                            设置替换算法
                        </Typography>

                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={this.state.value}
                                onChange={this.state.handleChange}
                            >
                                <FormControlLabel value="LRU" control={<Radio />} label="LRU算法" />
                                <FormControlLabel value="FIFO" control={<Radio />} label="FIFO算法" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>



                </Grid>
                <Grid item xs={2}></Grid>

            </Grid>



        );
    }
}


export default SelectBar;