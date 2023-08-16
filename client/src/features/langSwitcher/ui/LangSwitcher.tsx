import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    };

    return (
        <Button
            variant="clear"
            className={classNames('', {}, [className])}
            onClick={toggle}
        >
            {t(short ? 'ShortLang' : 'Language')}
        </Button>
    );
});
