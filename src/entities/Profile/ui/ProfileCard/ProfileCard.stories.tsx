import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        age: 22,
        country: Country.USA,
        firstname: 'Oliver',
        lastname: 'Kezik',
        currency: Currency.USD,
        avatar: 'https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person7-512.png',
        username: 'admin',
        city: 'Miami',
    },
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};
