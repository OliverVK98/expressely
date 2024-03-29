import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTypeDropdown.module.scss';
import { UserArticleType, ArticleTypeSelect } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import AddIcon from '@/shared/assets/icons/add.svg';
import { Button } from '@/shared/ui/Button';

interface ArticleTypeDropdownProps {
    className?: string;
    onTypeAddClick: () => void;
    onChangeType: (newType: UserArticleType, index: number) => void;
    types?: UserArticleType[];
    onRemoveType: (index: number) => void;
}

export const ArticleTypeDropdown = memo((props: ArticleTypeDropdownProps) => {
    const { className, types, onChangeType, onTypeAddClick, onRemoveType } =
        props;
    const { t } = useTranslation();

    return (
        <HStack max gap="8">
            {types?.map((type, index) => (
                <ArticleTypeSelect
                    key={index}
                    className={classNames(cls.ArticleTypeDropdown, {}, [
                        className,
                    ])}
                    value={type}
                    onChange={(value) => onChangeType(value, index)}
                    label={index === 0 ? t('Select Article Types') : ''}
                    onRemove={() => onRemoveType(index)}
                    showRemoveOption={index !== 0}
                />
            ))}
            {types && types.length < 3 && (
                <Button
                    onClick={onTypeAddClick}
                    addonLeft={
                        <Icon
                            Svg={AddIcon}
                            width={28}
                            height={28}
                            className={cls.icon}
                        />
                    }
                    size="m"
                >
                    {t('Add Type')}
                </Button>
            )}
        </HStack>
    );
});
