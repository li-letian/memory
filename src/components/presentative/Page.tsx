import * as React from 'react';


import Typography from '@mui/material/Typography';

import { BlockProps } from './Block';
import Block from './Block';
import { Card, Stack } from '@mui/material';

export interface PageProps {
    physical: number;
    logical: number;
    blockProps: Array<BlockProps>;
};


const Page = ({ physical, logical, blockProps }: PageProps) => {
    return (
        <Stack spacing={1}>

            <Typography variant="h5" gutterBottom component="div" align='center'>
                物理{physical}页
            </Typography>

            <Stack spacing={1}>

                {
                    blockProps.map((block: BlockProps, index: number) => {
                        return (
                            <Block text={block.text} color={block.color} />
                        );
                    })
                }

            </Stack>

            <Typography variant="h5" gutterBottom component="div" align='center'>
                {(logical !== -1) && ('逻辑' + logical.toString() + '页')}
            </Typography>

        </Stack>

    );
}


export default Page;