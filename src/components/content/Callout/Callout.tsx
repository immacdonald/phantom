import type { CommonComponentProps, VisualContext } from '@types';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './Callout.module.scss';

interface CalloutProps extends CommonComponentProps<HTMLDivElement> {
    /** The style context of the callout. */
    context?: VisualContext;

    /** The text or element to be highlighted. */
    children?: ReactNode;
}

/** A callout component that can be used for multiple contexts. */
const Callout = forwardRef<HTMLDivElement, CalloutProps>(({ context, children, ...props }, ref) => {
    return (
        <div className={styles.callout} data-context={context} ref={ref} {...props}>
            {children}
        </div>
    );
}) as ForwardRefExoticComponent<CalloutProps & RefAttributes<HTMLDivElement>>;

export { Callout };
