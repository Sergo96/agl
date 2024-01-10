import { IProps } from 'interfaces/props';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection } from 'antd/lib/table/interface';
import styles from './index.module.scss';

interface Props extends IProps {
  data: any[];
  columns: ColumnsType<any>;
  rowSelection?: TableRowSelection<any>;
}

const BaseTable: React.FC<Props> = ({ data, columns, rowSelection }) => {

  return (
    <Table
      className={styles.table}
      columns={columns}
      rowSelection={rowSelection}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default BaseTable;
