import { FC, HTMLAttributes, ReactNode } from 'react';
import style from './HoverMark.module.scss';

interface HoverMarkProps extends HTMLAttributes<HTMLElement> {
    text: string | ReactNode;
}

const HoverMark: FC<HoverMarkProps> = ({ text, ...rest }) => {
    return (
        <mark className={style.hoverMark} {...rest}>
            {text}
        </mark>
    );
};

export { HoverMark };
