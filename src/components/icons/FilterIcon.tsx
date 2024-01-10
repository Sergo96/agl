import { IProps } from 'interfaces/props';

interface Props extends IProps {}
const FilterIcon: React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.0702 19.6406H8.92954V15.7969H15.0702V19.6406ZM3.37752 4.35938H20.6238C20.6244 4.36057 20.6248 4.36159 20.6251 4.36237L15.6609 12.7969H8.34353L3.37752 4.35938Z"
        stroke="#1890FF"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default FilterIcon;
