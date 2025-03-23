import type { FC } from 'react';
import { createPortal } from 'react-dom';
import style from './Anchor.module.scss';

/** A portal container that provides a dedicated DOM node for anchoring components. */
const AnchorController: FC = () => {
    return createPortal(<div className={style.anchors} id="anchors" />, document.getElementById('root')!);
};

export { AnchorController };
