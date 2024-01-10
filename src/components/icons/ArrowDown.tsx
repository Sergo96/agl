import { IProps } from 'interfaces/props';

interface Props extends IProps {
  color?: string;
  width?: string;
  height?: string;
}
const ArrowDown: React.FC<Props> = ({ color = '#000000', width = '10', height = '5', ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path y="4" d="M0 0L5 5L10 0H0Z" fill={color} />
    </svg>
  );
};

export default ArrowDown;
