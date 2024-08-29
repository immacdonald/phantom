import { FC } from 'react';
import style from './Anchor.module.scss';

const AnchorController: FC = () => {
    return <div className={style.anchors} id="anchors" />;
};

export { AnchorController };
