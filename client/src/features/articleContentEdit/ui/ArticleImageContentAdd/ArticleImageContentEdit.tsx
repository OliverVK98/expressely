import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { ArticleImageBlock } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

interface ArticleImageContentAddProps {
    className?: string;
    block: ArticleImageBlock;
    onSaveClick: (block: ArticleImageBlock) => void;
}

export const ArticleImageContentEdit = memo(
    (props: ArticleImageContentAddProps) => {
        const { className, onSaveClick, block } = props;
        const { t } = useTranslation();
        const [imageBlock, setImageBlock] = useState(block);
        const [previewOpen, setPreviewOpen] = useState(false);
        const [error, setError] = useState(false);

        const onSrcInputChange = useCallback(
            (value: string) => {
                setImageBlock({ ...imageBlock, src: value });
            },
            [imageBlock],
        );

        const onTitleChange = useCallback(
            (value: string) => {
                setImageBlock({ ...imageBlock, title: value });
            },
            [imageBlock],
        );

        const onPreviewClick = useCallback(() => {
            setPreviewOpen(!previewOpen);
        }, [previewOpen]);

        const handleSubmit = useCallback(() => {
            if (!imageBlock.src) {
                setError(true);
                return;
            }
            setError(false);
            onSaveClick(imageBlock);
        }, [imageBlock, onSaveClick]);

        return (
            <Card max className={className}>
                <VStack gap="8" max>
                    <Input
                        label="Image Title:"
                        value={imageBlock.title}
                        onChange={onTitleChange}
                    />
                    <HStack max gap="4">
                        <Input
                            label="Image URL:"
                            value={imageBlock.src}
                            onChange={onSrcInputChange}
                        />
                        <Button onClick={onPreviewClick}>
                            {previewOpen ? t('Close') : t('Preview')}
                        </Button>
                    </HStack>
                    {error && (
                        <Text
                            align="center"
                            title={t('URL field cannot be empty')}
                            size="s"
                            variant="error"
                        />
                    )}
                    {previewOpen && (
                        <img
                            src={imageBlock.src}
                            alt={imageBlock.src}
                            className={cls.img}
                        />
                    )}
                    <HStack justify="end" max>
                        <Button
                            className={cls.btn}
                            color="success"
                            variant="outline"
                            onClick={handleSubmit}
                        >
                            <Text text={t('Save Changes')} />
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
