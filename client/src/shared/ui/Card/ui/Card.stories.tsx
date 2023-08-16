import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from '../../Text';

import { Card } from './Card';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    // eslint-disable-next-line i18next/no-literal-string
    children: <Text text="test" title="test" />,
};

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];
Dark.args = {
    // eslint-disable-next-line i18next/no-literal-string
    children: <Text text="test" title="test" />,
};
