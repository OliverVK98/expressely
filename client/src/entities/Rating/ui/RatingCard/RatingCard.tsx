import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { StarRating } from '@/shared/ui/StarRating';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { Modal } from '@/shared/ui/Modal';
import { Drawer } from '@/shared/ui/Drawer';
import { Button } from '@/shared/ui/Button';
import { BrowserView } from '@/shared/ui/BrowserView';
import { HStack, VStack } from '@/shared/ui/Stack';
import { MobileView } from '@/shared/ui/MobileView';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onCancel,
        onAccept,
        feedbackTitle,
        title,
        hasFeedback,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStarts = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Please leave your feedback')}
            />
        </>
    );

    return (
        <Card
            data-testid="RatingCard"
            max
            padding="24"
            border="default"
            className={classNames(cls.RatingCard, {}, [className])}
        >
            <VStack align="center" gap="8">
                <Text
                    title={
                        starsCount ? t('We appreciate your feedback') : title
                    }
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStarts}
                />
                <BrowserView>
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack max gap="32">
                            {modalContent}
                            <HStack max gap="16" justify="end">
                                <Button
                                    data-testid="RatingCard.Close"
                                    onClick={cancelHandler}
                                >
                                    {t('Close')}
                                </Button>
                                <Button
                                    data-testid="RatingCard.Send"
                                    onClick={acceptHandler}
                                >
                                    {t('Send')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
                        <VStack gap="32">
                            {modalContent}
                            <Button fullWidth onClick={acceptHandler}>
                                {t('Send')}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>
            </VStack>
        </Card>
    );
});
