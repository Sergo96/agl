import { Tabs } from 'antd';
import { IPanes } from 'interfaces/props';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

const { TabPane } = Tabs;

interface Props extends IProps {
  data: IPanes[];
  activeKey?: string;
  onChange?: (value: string) => void;
}

const BaseTabs: React.FC<Props> = ({ data, children, activeKey, onChange, ...props }) => {
  return (
    <Tabs onChange={onChange} activeKey={activeKey} {...props}>
      {data.map((i) => (
        <TabPane tab={i.title} key={i.key} className={styles.componentWrp}>
          {i.content.props.lotType !== 'archive' && children && children}
          {i.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default BaseTabs;
