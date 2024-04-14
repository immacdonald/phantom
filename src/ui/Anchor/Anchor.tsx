import classNames from 'classnames';
import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResponsiveContext } from '../../contexts/ResponsiveContext';
import style from './Anchor.module.scss';

type XYWH = { x: number; y: number; width: number; height: number };
type TRBL = { top: number; right: number; bottom: number; left: number };

type Position = {
    x: number;
    y: number;
};

interface AnchorProps {
    component: ReactElement;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    padding?: number;
    pollingInterval?: number;
    visible?: boolean;
    update?: boolean;
    innerRef?: React.MutableRefObject<HTMLDivElement>;
    children: ReactNode;
    anchorProps?: React.HTMLAttributes<HTMLDivElement>;
    componentClassName?: string;
}

interface ComputedAnchor extends Position {
    padding: TRBL;
    offsetX: number;
    offsetY: number;
    computed: boolean;
}

const edgeSafety = 8;

const Anchor: React.FC<AnchorProps> = ({
    component,
    direction = 'top',
    padding = 8,
    pollingInterval = 33,
    visible = true,
    update = true,
    innerRef,
    children,
    anchorProps,
    componentClassName
}) => {
    const anchorRef = innerRef ?? useRef<HTMLDivElement | null>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const [anchorBounds, setAnchorBounds] = useState<XYWH>({ x: 0, y: 0, width: 0, height: 0 });
    const [componentAnchoring, setComponentAnchoring] = useState<ComputedAnchor>({
        x: 0,
        y: 0,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        offsetX: 0,
        offsetY: 0,
        computed: false
    });

    const { getWindowSizeInstant } = useResponsiveContext();

    // Update polling
    const lastBoundingBox = useRef<DOMRect | null>(null);
    const windowSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

    const pollBounds = () => {
        const boundingBox = anchorRef.current!.getBoundingClientRect();
        const currentWindowSize = getWindowSizeInstant();

        if (
            boundingBox.x != lastBoundingBox.current?.x ||
            boundingBox.y != lastBoundingBox.current?.y ||
            currentWindowSize.width != windowSize.current.width ||
            currentWindowSize.height != windowSize.current.height
        ) {
            lastBoundingBox.current = boundingBox;
            windowSize.current = { width: currentWindowSize.width, height: currentWindowSize.height };
            const bounds = { x: boundingBox.x, y: boundingBox.y, width: boundingBox.width, height: boundingBox.height };
            setAnchorBounds(bounds);
            computeOffsetValues(bounds);
        }
    };

    useEffect(() => {
        let intervalId: any | null = null;

        if (visible && update && anchorRef.current && componentRef.current) {
            intervalId = setInterval(pollBounds, pollingInterval);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [visible, update]);

    const computeOffsetValues = (bounds: XYWH) => {
        const halfAnchor = { width: bounds.width / 2, height: bounds.height / 2 };
        const componentStyle = window.getComputedStyle(componentRef.current!);
        const paddingSide = parseFloat(componentStyle.paddingLeft) + parseFloat(componentStyle.paddingRight);
        const paddingVertical = parseFloat(componentStyle.paddingTop) + parseFloat(componentStyle.paddingBottom);
        const width = componentRef.current!.clientWidth - paddingSide;
        const height = componentRef.current!.clientHeight - paddingVertical;
        const halfComponent = { width: width / 2, height: height / 2 };
        // Padding is top right bottom left
        const directionalPadding = { top: 0, right: 0, bottom: 0, left: 0 };

        // Calculate the desired position
        let desiredPosition: Position = { x: 0, y: 0 };
        if (direction == 'top') {
            desiredPosition = { x: 0, y: -(halfAnchor.height + halfComponent.height + padding / 2) };
            directionalPadding.bottom = padding;
        } else if (direction == 'bottom') {
            desiredPosition = { x: 0, y: halfAnchor.height + halfComponent.height + padding / 2 };
            directionalPadding.top = padding;
        } else if (direction == 'left') {
            desiredPosition = { x: -(halfAnchor.width + halfComponent.width + padding / 2), y: 0 };
            directionalPadding.right = padding;
        } else if (direction == 'right') {
            desiredPosition = { x: halfAnchor.width + halfComponent.width + padding / 2, y: 0 };
            directionalPadding.left = padding;
        }

        // Calculate offset for edge guarding
        const offset = { x: 0, y: 0 };

        const left = bounds.x + halfAnchor.width + desiredPosition.x - directionalPadding.left / 2 - halfComponent.width;
        if (left < edgeSafety) {
            offset.x = edgeSafety - left;
        }

        const right = bounds.x + halfAnchor.width + desiredPosition.x - directionalPadding.right / 2 + halfComponent.width;
        if (right > windowSize.current!.width - edgeSafety) {
            offset.x = windowSize.current!.width - edgeSafety - right;
        }

        const top = bounds.y + halfAnchor.height + desiredPosition.y - directionalPadding.bottom / 2 - halfComponent.height;
        if (top < edgeSafety) {
            offset.y = edgeSafety - top;
        }

        const bottom = bounds.y + halfAnchor.height + desiredPosition.y - directionalPadding.top / 2 + halfComponent.height;
        if (bottom > windowSize.current!.height - edgeSafety) {
            offset.y = windowSize.current!.height - edgeSafety - bottom;
        }

        setComponentAnchoring({ ...componentAnchoring, ...desiredPosition, padding: directionalPadding, offsetX: offset.x, offsetY: offset.y, computed: true });
    };

    const componentClasses = classNames(style.component, componentClassName);
    const offsetValues = {
        '--v-anchor-x': `${componentAnchoring.x}px`,
        '--v-anchor-y': `${componentAnchoring.y}px`,
        '--v-padding': `${componentAnchoring.padding.top}px ${componentAnchoring.padding.right}px ${componentAnchoring.padding.bottom}px ${componentAnchoring.padding.left}px`,
        '--v-offset-x': `${componentAnchoring.offsetX}px`,
        '--v-offset-y': `${componentAnchoring.offsetY}px`
    } as React.CSSProperties;

    return (
        <div className={style.anchor} ref={anchorRef} {...anchorProps}>
            {children}
            {visible &&
                createPortal(
                    <div
                        className={style.anchorPortal}
                        style={{
                            left: `${anchorBounds.x}px`,
                            top: `${anchorBounds.y}px`,
                            width: `${anchorBounds.width}px`,
                            height: `${anchorBounds.height}px`,
                            visibility: componentAnchoring.computed ? 'visible' : 'hidden'
                        }}
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.stopPropagation();
                        }}
                    >
                        <div className={componentClasses} ref={componentRef} style={offsetValues} data-direction={direction} data-portal-visible="true">
                            {component}
                        </div>
                    </div>,
                    document.getElementById('anchors')!
                )}
        </div>
    );
};

export { Anchor };
