import { FC } from 'react';
import { createPortal } from 'react-dom';
import style from './Anchor.module.scss';

const AnchorController: FC = () => {
    return createPortal(<div className={style.anchors} id="anchors" />, document.getElementById('root')!);
};

export { AnchorController };
