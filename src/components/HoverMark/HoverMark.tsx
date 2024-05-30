import style from './HoverMark.module.scss';

interface HoverMarkProps extends React.HTMLAttributes<HTMLElement> {
	text: string | React.ReactNode;
}

const HoverMark: React.FC<HoverMarkProps> = ({ text, ...rest }) => {
	return (
		<mark className={style.hoverMark} {...rest}>
			{text}
		</mark>
	);
}

export { HoverMark };
