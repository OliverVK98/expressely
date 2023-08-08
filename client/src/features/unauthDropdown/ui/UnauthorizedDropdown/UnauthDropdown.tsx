import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { Icon } from '@/shared/ui/Icon';
import ProfileIcon from '@/shared/assets/icons/profile.svg';

interface UnauthorizedDropdownProps {
    className?: string;
    onToggleAuthModal: () => void;
    onToggleSignUpModal: () => void;
}

export const UnauthorizedDropdown = memo((props: UnauthorizedDropdownProps) => {
    const { className, onToggleAuthModal, onToggleSignUpModal } = props;
    const { t } = useTranslation();

    const items = [
        {
            content: t('Sign In'),
            onClick: onToggleAuthModal,
        },
        {
            content: t('Sign Up'),
            onClick: onToggleSignUpModal,
        },
    ];

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottomLeft"
            items={items}
            trigger={<Icon height={25} width={25} Svg={ProfileIcon} />}
        />
    );
});
