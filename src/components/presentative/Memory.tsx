import * as React from 'react';


import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import { PageProps } from './Page';
import Page from './Page';
import { Stack } from '@mui/material';

export interface MemoryProps {
    pageProps: Array<PageProps>;
};


const Memory = ({ pageProps }: MemoryProps) => {
    return (

        <Stack spacing={1}>

            <Typography variant="h4" gutterBottom component="div" align='center'>
                模拟内存
            </Typography>

            <Grid container spacing={4}>
                {
                    pageProps.map((page: PageProps, index: number) => {
                        return (
                            <Grid item xs={2.6}>
                                <Page physical={page.physical} logical={page.logical} blockProps={page.blockProps} />
                            </Grid>
                        );
                    })
                }
            </Grid>

        </Stack>

    );
}


export default Memory;