import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { ArticleBlockType, ArticleImageBlock } from '@/entities/Article';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

interface ArticleImageContentAddProps {
    className?: string;
    typeTabs: TabItem[];
    onTabClick: (tab: TabItem) => void;
    currentTab: ArticleBlockType;
    onAddClick: (args: Omit<ArticleImageBlock, 'id'>) => void;
}

export const ArticleImageContentAdd = memo(
    (props: ArticleImageContentAddProps) => {
        const { className, typeTabs, onTabClick, currentTab, onAddClick } =
            props;
        const { t } = useTranslation();
        const [src, setSrc] = useState('');
        const [title, setTitle] = useState('');
        const [previewOpen, setPreviewOpen] = useState(false);
        const [error, setError] = useState(false);

        const onSrcInputChange = useCallback((value: string) => {
            setSrc(value);
        }, []);

        const onTitleChange = useCallback((value: string) => {
            setTitle(value);
        }, []);

        const onPreviewClick = useCallback(() => {
            setPreviewOpen(!previewOpen);
        }, [previewOpen]);

        const handleSubmit = useCallback(() => {
            if (!src) {
                setError(true);
                return;
            }
            setError(false);
            onAddClick({
                type: ArticleBlockType.IMAGE,
                src,
                title,
            });
            setSrc('');
            setTitle('');
        }, [src, onAddClick, title]);

        if (currentTab !== ArticleBlockType.IMAGE) {
            return null;
        }

        return (
            <Card max>
                <VStack gap="8" max>
                    <Input
                        label="Image Title:"
                        value={title}
                        onChange={onTitleChange}
                    />
                    <HStack max gap="4">
                        <Input
                            label="Image URL:"
                            value={src}
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
                        <img src={src} alt={src} className={cls.img} />
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
                            {t('Add Image Block')}
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        );
    },
);
