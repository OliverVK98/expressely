import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import AddIcon from '@/shared/assets/icons/add.svg';
import { Text } from '@/shared/ui/Text';
import { Card } from '@/shared/ui/Card';
import { ArticleTextBlock } from '@/entities/Article';

interface ArticleTextContentEditProps {
    className?: string;
    block: ArticleTextBlock;
    onSaveClick: (block: ArticleTextBlock) => void;
}

export const ArticleTextContentEdit = memo(
    (props: ArticleTextContentEditProps) => {
        const { className, block, onSaveClick } = props;
        const [textBlock, setTextBlock] = useState(block);
        const [error, setError] = useState(false);
        const { t } = useTranslation();

        const onTitleChange = useCallback(
            (value: string) => {
                setTextBlock({ ...textBlock, title: value });
            },
            [textBlock],
        );

        const onSubtitleChange = useCallback(
            (value: string) => {
                setTextBlock({ ...textBlock, subtitle: value });
            },
            [textBlock],
        );

        const onParagraphsChange = useCallback(
            (value: string, index: number) => {
                const updatedParagraphs = [...textBlock.paragraphs];
                updatedParagraphs[index] = value;
                setTextBlock({
                    ...textBlock,
                    paragraphs: [...updatedParagraphs],
                });
            },
            [textBlock],
        );

        const onAddParagraph = useCallback(() => {
            setTextBlock({
                ...textBlock,
                paragraphs: [...textBlock.paragraphs, ''],
            });
        }, [textBlock]);

        const onRemoveParagraph = useCallback(() => {
            if (textBlock.paragraphs.length > 1) {
                const newArr = [...textBlock.paragraphs];
                newArr.pop();
                setTextBlock({
                    ...textBlock,
                    paragraphs: newArr,
                });
            }
        }, [textBlock]);

        const handleUpdate = useCallback(() => {
            if (textBlock.paragraphs[0] === '') {
                setError(true);
                return;
            }
            setError(false);
            onSaveClick(textBlock);
        }, [onSaveClick, textBlock]);

        return (
            <Card max className={className}>
                <VStack gap="8" max>
                    <Input
                        label="Paragraph Title:"
                        value={textBlock.title}
                        onChange={onTitleChange}
                    />
                    <Input
                        label="Paragraph Subtitle:"
                        value={textBlock.subtitle}
                        onChange={onSubtitleChange}
                    />
                    {textBlock.paragraphs.map((paragraph, index) => (
                        <Input
                            label="Text"
                            key={index}
                            value={paragraph}
                            onChange={(value) =>
                                onParagraphsChange(value, index)
                            }
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
                                addonLeft={
                                    <Icon Svg={AddIcon} className={cls.icon} />
                                }
                                size="m"
                                onClick={onAddParagraph}
                            >
                                {t('Add Paragraph')}
                            </Button>
                            {textBlock.paragraphs.length > 1 && (
                                <Button
                                    addonLeft={
                                        <Icon
                                            Svg={AddIcon}
                                            className={cls.icon}
                                        />
                                    }
                                    size="m"
                                >
                                    <Text
                                        text={t('Remove Paragraph')}
                                        onClick={onRemoveParagraph}
                                    />
                                </Button>
                            )}
                        </HStack>
                        <Button
                            className={cls.btn}
                            color="success"
                            variant="outline"
                            onClick={handleUpdate}
                        >
                            <Text text={t('Save Changes')} />
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
