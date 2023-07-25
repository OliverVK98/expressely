import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/Modal';
import { SignUpFormAsync as SignUpForm } from '../SignUpForm/SignUpForm.async';

interface SignUpModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const SignUpModal = memo((props: SignUpModalProps) => {
    const { className, onClose, isOpen } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
            lazy
        >
            <SignUpForm onSuccess={onClose} />
        </Modal>
    );
});
