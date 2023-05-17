import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditableProfileCardHeader } from 'features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{
        id: string;
    }>();
    const { t } = useTranslation();

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCardHeader />
                <EditableProfileCard id={id!} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
