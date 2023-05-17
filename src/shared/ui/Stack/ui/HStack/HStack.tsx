import { Flex, FlexProps } from 'shared/ui/Stack/ui/Flex/Flex';
import React from 'react';

type HStackProps = Omit<FlexProps, 'direction'> & {
    ref?: React.RefObject<HTMLDivElement>;
};

export const HStack = (props: HStackProps) => (
    <Flex {...props} direction="row" />
);
