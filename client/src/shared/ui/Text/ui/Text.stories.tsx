import { ComponentMeta } from '@storybook/react';
import { Text } from '../index';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof Text>;
