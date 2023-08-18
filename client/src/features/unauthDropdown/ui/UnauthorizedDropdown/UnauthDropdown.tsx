import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown, DropdownItem } from '@/shared/ui/Popups';
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

    const items: DropdownItem[] = [
        {
            content: t('Sign In'),
            onClick: onToggleAuthModal,
            'data-testid': 'signInButton',
        },
        {
            content: t('Sign Up'),
            onClick: onToggleSignUpModal,
            'data-testid': 'signUpButton',
        },
    ];

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottomLeft"
            items={items}
            trigger={
                <Icon
                    data-testid="loginDropdown"
                    height={25}
                    width={25}
                    Svg={ProfileIcon}
                />
            }
        />
    );
});
