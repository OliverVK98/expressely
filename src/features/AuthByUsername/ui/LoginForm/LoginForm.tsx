import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?:string
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                autofocus
                className={cls.input}
                placeholder={t('Username')}
                type="text"
            />
            <Input
                className={cls.input}
                type="text"
                placeholder={t('Password')}
            />
            <Button className={cls.loginBtn}>
                {
                    t('Sign In')
                }
            </Button>
        </div>
    );
};
