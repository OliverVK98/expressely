import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { LoginFormAsync as LoginForm } from 'features/authByUsername/ui/LoginForm/LoginForm.async';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader';

interface LoginModalProps {
    className?:string;
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
