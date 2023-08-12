import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { Card } from '@/shared/ui/Card';
import { ArticleBlockType, ArticleTextBlock } from '@/entities/Article';

interface ArticleContentAddProps {
    className?: string;
    typeTabs: TabItem[];
    onTabClick: (tab: TabItem) => void;
    currentTab: ArticleBlockType;
    onAddClick: (args: Omit<ArticleTextBlock, 'id'>) => void;
}

export const ArticleTextContentAdd = memo((props: ArticleContentAddProps) => {
    const { className, typeTabs, onTabClick, currentTab, onAddClick } = props;
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [paragraphs, setParagraphs] = useState<string[]>(['']);
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    const onTitleChange = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onSubtitleChange = useCallback((value: string) => {
        setSubtitle(value);
    }, []);

    const onParagraphsChange = useCallback((value: string, index: number) => {
        setParagraphs((prevParagraphs) => {
            const updatedParagraphs = [...prevParagraphs];
            updatedParagraphs[index] = value;
            return updatedParagraphs;
        });
    }, []);

    const onAddParagraph = useCallback(() => {
        setParagraphs((prevState) => [...prevState, '']);
    }, []);

    const onRemoveParagraph = useCallback(() => {
        if (paragraphs.length > 1) {
            const newArr = [...paragraphs];
            newArr.pop();
            setParagraphs(newArr);
        }
    }, [paragraphs]);

    const handleSubmit = useCallback(() => {
        if (paragraphs[0] === '') {
            setError(true);
            return;
        }
        setError(false);
        onAddClick({
            type: ArticleBlockType.TEXT,
            subtitle,
            title,
            paragraphs,
        });
        setParagraphs(['']);
        setTitle('');
        setSubtitle('');
    }, [onAddClick, title, paragraphs, subtitle]);

    if (currentTab !== ArticleBlockType.TEXT) {
        return null;
    }

    return (
        <Card max>
            <VStack gap="8" max>
                <Input
                    label="Paragraph Title:"
                    value={title}
                    onChange={onTitleChange}
                />
                <Input
                    label="Paragraph Subtitle:"
                    value={subtitle}
                    onChange={onSubtitleChange}
                />
                {paragraphs.map((paragraph, index) => (
                    <Input
                        label="Text"
                        key={index}
                        value={paragraph}
                        onChange={(value) => onParagraphsChange(value, index)}
                    />
                ))}
                {error && (
                    <Text
                        align="center"
                        title={t('Text field cannot be empty')}
                        size="s"
                        variant="error"
                    />
                )}
                <HStack justify="between" max>
                    <HStack gap="4">
                        <Button
                            size="m"
                            color="success"
                            onClick={onAddParagraph}
                        >
                            {t('Add Paragraph')}
                        </Button>
                        {paragraphs.length > 1 && (
                            <Button size="m" color="error">
                                <Text
                                    text={t('Remove Paragraph')}
                                    onClick={onRemoveParagraph}
                                />
                            </Button>
                        )}
                        <Tabs
                            direction="row"
                            tabs={typeTabs}
                            value={currentTab}
                            onTabClick={onTabClick}
                            className={classNames('', {}, [className])}
                        />
                    </HStack>
                    <Button
                        color="success"
                        variant="outline"
                        onClick={handleSubmit}
                    >
                        {t('Add Text Block')}
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});
