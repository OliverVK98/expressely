import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BlockPositionSwitchers } from './BlockPositionSwitchers';

export default {
    title: 'shared/BlockPositionSwitchers',
    component: BlockPositionSwitchers,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BlockPositionSwitchers>;

const Template: ComponentStory<typeof BlockPositionSwitchers> = (args) => (
    <BlockPositionSwitchers {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
