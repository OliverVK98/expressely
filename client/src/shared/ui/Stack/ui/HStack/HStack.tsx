import React from 'react';
import { Flex, FlexProps } from '../Flex/Flex';
import { TestProps } from '@/shared/types/tests';

type HStackProps = Omit<FlexProps, 'direction'> & {
    ref?: React.RefObject<HTMLDivElement>;
};

export const HStack = (props: HStackProps & TestProps) => (
    <Flex {...props} direction="row" />
);
