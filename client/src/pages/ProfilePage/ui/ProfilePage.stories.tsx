import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ProfilePage from './ProfilePage';
import { Country } from '../../../entities/Country';
import { Currency } from '../../../entities/Currency';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof ProfilePage>;

// @ts-ignore
const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 22,
                country: Country.USA,
                firstname: 'Oliver',
                lastname: 'Kezik',
                currency: Currency.USD,
                avatar: 'https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person7-512.png',
                username: 'admin',
                city: 'Miami',
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                age: 22,
                country: Country.USA,
                firstname: 'Oliver',
                lastname: 'Kezik',
                currency: Currency.USD,
                avatar: 'https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person7-512.png',
                username: 'admin',
                city: 'Miami',
            },
        },
    }),
];
