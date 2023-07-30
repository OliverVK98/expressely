import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { Card } from '@/shared/ui/Card';

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = (props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card padding="24" border="default" max>
                <HStack
                    data-testid="AddCommentForm"
                    justify="between"
                    max
                    gap="16"
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <Input
                        value={text}
                        placeholder={t('Add your comment')}
                        onChange={onCommentTextChange}
                        className={cls.input}
                        data-testid="AddCommentForm.Input"
                    />
                    <Button
                        data-testid="AddCommentForm.Button"
                        onClick={onSendHandler}
                    >
                        {t('Send')}
                    </Button>
                </HStack>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(AddCommentForm);
