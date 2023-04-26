import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from 'shared/ui/Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { TextSize, TextTheme } from 'shared/ui/Text/ui/Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Test Title',
    text: 'Test Text',
};

export const Error = Template.bind({});
Error.args = {
    title: 'Test Title',
    text: 'Test Text',
    theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Test Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Test Text',
};

export const PrimaryDark = Template.bind({});
Primary.args = {
    title: 'Test Title',
    text: 'Test Text',
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Test Title',
};

OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'Test Text',
};

OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Test Title',
    text: 'Test Text',
    size: TextSize.L,
};
