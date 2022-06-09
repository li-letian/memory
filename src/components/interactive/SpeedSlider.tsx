import SpeedIcon from '@mui/icons-material/Speed';

import { Slider, Stack, Typography, Grid } from '@mui/material';
import * as React from 'react';

export interface SpeedSliderProps {
    setSpeed: (speed: number) => void;
};


export interface SpeedSliderState {
    value: number;
    handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
};


class SpeedSlider extends React.Component<SpeedSliderProps, SpeedSliderState> {

    state: SpeedSliderState = {
        value: 50,
        handleChange: (event: Event, newValue: number | number[], activeThumb: number) => {

            this.setState((state) => ({
                value: newValue as number
            }));

            this.props.setSpeed((newValue as number) * 10);
        }
    };

    render() {

        return (

            <Grid container spacing={1}>
                <Grid item xs={1}></Grid>

                <Grid item xs={10}>

                    <Stack spacing={0}>
                        <Typography variant="body1" gutterBottom component="div" align='center'>
                            调整运行速度
                        </Typography>

                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <SpeedIcon />
                            <Slider aria-label="Volume" value={this.state.value} onChange={this.state.handleChange} />
                            <SpeedIcon />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={1}></Grid>

            </Grid>

        );
    }
}


export default SpeedSlider;