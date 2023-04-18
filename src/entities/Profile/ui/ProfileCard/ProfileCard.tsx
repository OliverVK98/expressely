import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text';
import { Input } from 'shared/ui/Input';
import { Profile } from 'entities/Profile';
import { Loader } from 'shared/ui/Loader';
import { TextAlign } from 'shared/ui/Text/ui/Text';
import { Avatar } from 'shared/ui/Avatar';
import { Select } from 'shared/ui/Select';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?:string,
    data?: Profile,
    error?: string,
    isLoading?: boolean,
    onChangeLastName?: (value?: string) => void,
    onChangeFirstName?: (value?: string) => void,
    onChangeAge?: (value?: string) => void,
    onChangeCity?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeAvatar?: (value?: string) => void,
    onChangeCurrency?: (value?: Currency) => void,
    onChangeCountry?: (country?: Country) => void,
    readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        data,
        error,
        isLoading,
        className,
        onChangeLastName,
        onChangeFirstName,
        onChangeAge,
        onChangeCity,
        readonly,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Error occurred while loading profile')}
                    text={t('Try refreshing the page')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar
                    && (
                        <div className={cls.avatarWrapper}>
                            <Avatar src={data?.avatar} />
                        </div>
                    )}
                <Input
                    value={data?.firstname}
                    placeholder={t('Your Name')}
                    className={cls.input}
                    onChange={onChangeFirstName}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Your Last Name')}
                    className={cls.input}
                    onChange={onChangeLastName}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Your Age')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('City')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Avatar URL link')}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    onChange={onChangeCurrency}
                    value={data?.currency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    onChange={onChangeCountry}
                    value={data?.country}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
