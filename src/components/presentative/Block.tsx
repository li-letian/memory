
import * as React from 'react';

import { Paper, Typography } from '@mui/material';

export interface BlockProps {
    text: string;
    color: string
};


const Block = ({ text, color }: BlockProps) => {
    return (
        <Paper sx={{ bgcolor: color, height: '100%' }}>
            <Typography variant="body1" gutterBottom component="div" align='center'>
                {text}
            </Typography>
        </Paper>
    );
}

export default Block;