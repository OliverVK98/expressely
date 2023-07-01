import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import {
    EditableProfileCard,
    EditableProfileCardHeader,
} from '@/features/editableProfileCard';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{
        id: string;
    }>();
    const { t } = useTranslation();

    return (
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <VStack max gap="16">
                <EditableProfileCardHeader />
                <EditableProfileCard id={id!} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
