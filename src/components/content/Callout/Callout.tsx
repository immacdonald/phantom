import { CommonComponentProps, VisualContext } from '@types';
import { FC, forwardRef, ReactNode } from 'react';
import styles from './Callout.module.scss';

interface CalloutProps extends CommonComponentProps<HTMLDivElement> {
    /** The style context of the callout. */
    context?: VisualContext;

    /** The text or element to be highlighted. */
    children?: ReactNode;
}

/** A component that highlights text when hovered. */
const Callout: FC<CalloutProps> = forwardRef<HTMLDivElement, CalloutProps>(({ context, children, ...props }, ref) => {
    return (
        <div className={styles.callout} data-context={context} ref={ref} {...props}>
            {children}
        </div>
    );
});

export { Callout };
