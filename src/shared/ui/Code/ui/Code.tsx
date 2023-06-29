import { memo, SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import cls from './Code.module.scss';
import { Icon } from '../../Icon';

interface CodeBaseProps {
    className?: string;
    text: string;
}

interface NonClickableCodeProps extends CodeBaseProps {
    contentEditable?: false;
}

interface ClickableCodeProps extends CodeBaseProps {
    contentEditable: true;
    onInput: (event: SyntheticEvent<HTMLElement>) => void;
}

type CodeProps = NonClickableCodeProps | ClickableCodeProps;

export const Code = memo((props: CodeProps) => {
    const { className, text, contentEditable, ...otherProps } = props;
    const textareaEl = useRef(text);
    const ref = useRef<HTMLElement>(null);

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    useEffect(() => {
        if (text === '' && contentEditable && ref.current) {
            ref.current.innerText = '';
        }
    }, [contentEditable, text]);

    if (contentEditable) {
        return (
            <pre className={classNames(cls.Code, {}, [className])}>
                <span
                    contentEditable
                    suppressContentEditableWarning
                    onInput={undefined}
                    ref={ref}
                    className={cls.contentEditable}
                    {...otherProps}
                >
                    {textareaEl.current}
                </span>
            </pre>
        );
    }

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <code>{text}</code>
            <Icon
                clickable
                onClick={onCopy}
                className={cls.copyBtn}
                Svg={CopyIcon}
            />
        </pre>
    );
});
