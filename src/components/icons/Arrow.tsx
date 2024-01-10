import { IProps } from 'interfaces/props';

interface Props extends IProps {
}
const Arrow : React.FC<Props> = ({ ...props }) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.166016 9.20833V11.7917H15.666L8.56185 18.8958L10.396 20.73L20.626 10.5L10.396 0.27L8.56185 2.10417L15.666 9.20833H0.166016Z" fill="#1890FF"/>
  </svg>

  );
};

export default Arrow;
