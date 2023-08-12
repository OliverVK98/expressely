import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { ArticleCodeBlock } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeContentAddProps {
    className?: string;
    block: ArticleCodeBlock;
    onSaveClick: (block: ArticleCodeBlock) => void;
}

export const ArticleCodeContentEdit = memo(
    (props: ArticleCodeContentAddProps) => {
        const { className, onSaveClick, block } = props;
        const { t } = useTranslation();
        const [codeBlock, setCodeBlock] = useState(block);
        const [error, setError] = useState(false);

        const handleInput = useCallback(
            (event: React.SyntheticEvent<HTMLElement>) => {
                setCodeBlock({
                    ...codeBlock,
                    code: event.currentTarget.textContent || '',
                });
            },
            [codeBlock],
        );

        const handleSubmit = useCallback(() => {
            if (!codeBlock.code) {
                setError(true);
                return;
            }
            setError(false);
            onSaveClick(codeBlock);
        }, [codeBlock, onSaveClick]);

        return (
            <Card max padding="8" className={className}>
                <VStack gap="8" max>
                    <Code
                        text={block.code}
                        contentEditable
                        onInput={handleInput}
                    />
                    {error && (
                        <Text
                            align="center"
                            title={t('Code field cannot be empty')}
                            size="s"
                            variant="error"
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
