import { useTranslation } from 'react-i18next';
import React from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { appTechStack } from '../../model/textContent/textContent';
import cls from './AppTechStack.module.scss';

interface AppTechStackProps {
    className?: string;
}

export const AppTechStack = (props: AppTechStackProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const githubUrl = 'https://github.com/OliverVK98/expressely';

    return (
        <Card max padding="24">
            <VStack max gap="32">
                <HStack max justify="center" gap="32">
                    {/* eslint-disable max-len */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                        width={220}
                        alt="react"
                        height={200}
                    />
                    <img
                        src="https://www.codewithvlad.com/assets/svg/nest-logo.svg"
                        width={200}
                        alt="nest"
                        height={200}
                    />
                </HStack>
                {appTechStack.map((stack, index) => (
                    <VStack className={className} max gap="8" key={index}>
                        <Text text={t(stack.title)} bold size="l" />
                        {stack.paragraphs.map((paragraph, index) => (
                            <div className={cls.font} key={index}>
                                <span className={cls.bold}>
                                    {paragraph.bold}
                                </span>
                                {paragraph.normal}
                            </div>
                        ))}
                    </VStack>
                ))}
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <p className={cls.font}>
                    Github Link:{' '}
                    <a href={githubUrl} target="_blank" rel="noreferrer">
                        {githubUrl}
                    </a>
                </p>
            </VStack>
        </Card>
    );
};
