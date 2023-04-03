import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from 'features/AuthByUsername/ui/LoginForm/LoginForm';

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
        <LoginForm />
    </Modal>
);
