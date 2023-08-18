import React from 'react';
import { Flex, FlexProps } from '../Flex/Flex';
import { TestProps } from '@/shared/types/tests';

type VStackProps = Omit<FlexProps, 'direction'> & {
    ref?: React.RefObject<HTMLDivElement>;
};

export const VStack = (props: VStackProps & TestProps) => {
    const { align = 'start' } = props;

    return <Flex {...props} direction="column" align={align} />;
};
