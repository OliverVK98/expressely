import { Suspense } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/_deprecated/Loader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, onClose, isOpen }: LoginModalProps) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={classNames('', {}, [className])}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <LoginForm onSuccess={onClose} />
        </Suspense>
    </Modal>
);
