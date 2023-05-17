import { Flex, FlexProps } from 'shared/ui/Stack/ui/Flex/Flex';
import React from 'react';

type VStackProps = Omit<FlexProps, 'direction'> & {
    ref?: React.RefObject<HTMLDivElement>;
};

export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return <Flex {...props} direction="column" align={align} />;
};
