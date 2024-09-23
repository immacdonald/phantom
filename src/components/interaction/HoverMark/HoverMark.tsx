import { FC, HTMLAttributes, ReactNode } from 'react';
import style from './HoverMark.module.scss';

interface HoverMarkProps extends HTMLAttributes<HTMLElement> {
    text: string | ReactNode;
}

const HoverMark: FC<HoverMarkProps> = ({ text, ...props }) => {
    return (
        <mark className={style.hoverMark} {...props}>
            {text}
        </mark>
    );
};

export { HoverMark };
