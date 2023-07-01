import React from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'> & {
    ref?: React.RefObject<HTMLDivElement>;
};

export const HStack = (props: HStackProps) => (
    <Flex {...props} direction="row" />
);
