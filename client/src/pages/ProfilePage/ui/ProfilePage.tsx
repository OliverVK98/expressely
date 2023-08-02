import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import {
    EditableProfileCard,
    EditableProfileCardHeader,
} from '@/features/editableProfileCard';

interface ProfilePageProps {
    className?: string;
    isAuthUserProfile: boolean;
}

const ProfilePage = ({ className, isAuthUserProfile }: ProfilePageProps) => {
    // TODO: test if id is string "asdasdasd"
    const { id } = useParams<{
        id: string;
    }>();

    // TODO: COME BACK TO THIS CHECK
    // if (isNaN(Number(id))) {
    //     throw new Error();
    // }

    return (
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <VStack max gap="16">
                <EditableProfileCardHeader
                    isAuthUserProfile={isAuthUserProfile}
                />
                <EditableProfileCard
                    isAuthUserProfile={isAuthUserProfile}
                    id={Number(id!)}
                />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
