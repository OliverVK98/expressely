import React, { SVGProps } from 'react';
import CheckIcon from '@/shared/assets/icons/check.svg';
import PictureIcon from '@/shared/assets/icons/picture.svg';
import TipsIcon from '@/shared/assets/icons/tips.svg';

type SidebarMemoItem = {
    icon: React.FC<SVGProps<SVGSVGElement>>;
    text: string;
    size: number;
};

export const sidebarMemoItems: SidebarMemoItem[] = [
    {
        icon: CheckIcon,
        text: 'Follow the site rules',
        size: 25,
    },
    {
        icon: TipsIcon,
        text: 'Use tips & tricks to write an easy-to-read publication',
        size: 41.7,
    },
    {
        icon: PictureIcon,
        text: 'Upload pictures less than 8MB for the publication body and less than 1MB for the publication cover',
        size: 70,
    },
];

export const sidebarPublicationRules: string[] = [
    'advertising;',
    'questions;',
    'vacancies;',
    'articles, that were previously published on other websites;',
    'articles without correct punctuation, containing emojis and plenty of exclamation marks, ' +
        'unnecessary highlighting of words and sentences, and other inappropriate text formatting;',
    'complaints about companies and services;',
    'low-quality translations;',
    'pieces of code without explanation;',
    'one-word articles;',
    'articles that are weakly related to IT or not related at all.',
];
