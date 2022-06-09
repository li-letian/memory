
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import SelectBar from '../components/interactive/SelectBar';
import SpeedSlider from '../components/interactive/SpeedSlider';

import Memory from '../components/presentative/Memory';
import WaitingList from '../components/presentative/WaitingList';
import Monitor from '../components/presentative/Monitor';

import { Button, Stack } from '@mui/material';

import Processor from '../controllers/Processor'

interface MainViewProps {
    message: string;
};

interface MainViewState {
    processor: Processor;
};



class MainView extends React.Component<MainViewProps, MainViewState> {

    state: MainViewState = {
        processor: new Processor(
            (newState: Processor) => {
                this.setState((state) => ({
                    processor: newState
                }));
            }
        )
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container disableGutters={true}>
                    <Grid container spacing={0}>
                        <Grid item xs={8}>

                            <Box sx={{ bgcolor: '#F5F5F5', height: "99vh" }}>

                                <Memory pageProps={this.state.processor.pages} />

                            </Box>

                        </Grid>

                        <Grid item xs={4}>

                            <Box sx={{ bgcolor: '#F5F5F5', height: "99vh" }}>

                                <Stack spacing={1}>

                                    <SpeedSlider setSpeed={(speed: Number) => {

                                        let newState = this.state.processor;

                                        newState.speed = speed.valueOf();

                                        this.setState((state) => ({
                                            processor: newState
                                        }));

                                    }} />

                                    <SelectBar setAlgorithm={(algorithm: string) => {

                                        let newState = this.state.processor;

                                        newState.selectedAlgorithm = algorithm;

                                        this.setState((state) => ({
                                            processor: newState
                                        }));

                                    }} />
                                    <Grid container spacing={0}>
                                        <Grid item xs={2.2}></Grid>

                                        <Grid item xs={4}>

                                            <Button variant="outlined" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

                                                this.state.processor.run();

                                            }}>开始模拟</Button>

                                        </Grid>

                                        <Grid item xs={1}></Grid>

                                        <Grid item xs={4}>

                                            <Button variant="outlined" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {

                                                this.state.processor.clear();

                                            }}>重置实验</Button>

                                        </Grid>

                                        <Grid item xs={1}></Grid>

                                    </Grid>


                                    <WaitingList instructions={this.state.processor.instructions} restCount={320 - this.state.processor.instructionCount} />

                                    <Monitor
                                        rateOfMiss={this.state.processor.monitor.rateOfMiss}
                                        instruction={this.state.processor.monitor.instruction}
                                        isContain={this.state.processor.monitor.isContain}
                                        removed={this.state.processor.monitor.removed}
                                        show={this.state.processor.monitor.show}
                                    />

                                </Stack>

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }

}

export default MainView;