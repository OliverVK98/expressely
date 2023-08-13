import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/Stack';
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
                {appTechStack.map((stack) => (
                    <VStack className={className} max gap="8">
                        <Text text={t(stack.title)} bold size="l" />
                        {stack.paragraphs.map((paragraph) => (
                            <div className={cls.font}>
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
