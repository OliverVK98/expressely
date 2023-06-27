import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { ArticleBlockType, ArticleCodeBlock } from '@/entities/Article';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeContentAddProps {
    className?: string;
    typeTabs: TabItem[];
    onTabClick: (tab: TabItem) => void;
    currentTab: ArticleBlockType;
    onAddClick: (args: Omit<ArticleCodeBlock, 'id'>) => void;
}

export const ArticleCodeContentAdd = memo(
    (props: ArticleCodeContentAddProps) => {
        const { className, typeTabs, onTabClick, currentTab, onAddClick } =
            props;
        const { t } = useTranslation();
        const [input, setInput] = useState('');

        const [error, setError] = useState(false);

        const handleInput = useCallback(
            (event: React.SyntheticEvent<HTMLElement>) => {
                setInput(event.currentTarget.textContent || '');
            },
            [],
        );

        const handleSubmit = useCallback(() => {
            if (!input) {
                setError(true);
                return;
            }
            setError(false);
            onAddClick({
                type: ArticleBlockType.CODE,
                code: input,
            });
            setInput('');
        }, [input, onAddClick]);

        if (currentTab !== ArticleBlockType.CODE) {
            return null;
        }

        return (
            <Card max padding="8">
                <VStack gap="8" max>
                    <Code text={input} contentEditable onInput={handleInput} />
                    {error && (
                        <Text
                            align="center"
                            title={t('Code field cannot be empty')}
                            size="s"
                            variant="error"
                        />
                    )}
                    <HStack justify="between" max>
                        <HStack gap="4">
                            <Tabs
                                direction="row"
                                tabs={typeTabs}
                                value={currentTab}
                                onTabClick={onTabClick}
                                className={classNames('', {}, [className])}
                            />
                        </HStack>
                        <Button
                            className={cls.btn}
                            color="success"
                            variant="outline"
                            onClick={handleSubmit}
                        >
                            <Text text={t('Add Code Block')} />
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
