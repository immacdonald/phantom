import React, { useEffect, useRef } from 'react';
import style from './Anchor.module.scss';

interface AnchorControllerProps {
    influenceOverscroll?: boolean;
    defaultOverscrollBehavior?: 'auto' | 'contain' | 'none' | 'unset';
}

const AnchorController: React.FC<AnchorControllerProps> = ({ influenceOverscroll = true, defaultOverscrollBehavior = 'unset' }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (influenceOverscroll && ref.current) {
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type == 'childList') {
                        if (ref.current?.children.length || 0 > 0) {
                            // Lock the overscroll-y
                            document.body.style.overscrollBehaviorY = 'none';
                        } else {
                            // Unlock to the default behavior
                            document.body.style.overscrollBehaviorY = defaultOverscrollBehavior;
                        }
                    }
                }
            });

            observer.observe(ref.current, { childList: true });

            return () => {
                observer.disconnect();
                document.body.style.overscrollBehaviorY = defaultOverscrollBehavior;
            };
        }
    }, [influenceOverscroll]);

    return <div className={style.anchors} id="anchors" ref={ref} />;
};

export { AnchorController };
