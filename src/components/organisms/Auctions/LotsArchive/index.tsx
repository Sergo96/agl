import moment from 'moment';
import { Popover } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useState, ReactText } from 'react';
import { TableRowSelection } from 'antd/lib/table/interface';
import { ColumnsType } from 'antd/lib/table';
import { getCurrencySymbol } from 'helpers/currency';
import { JustifyContent, FlexDirection } from 'interfaces/flex';
import { ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { IBaseDTO } from 'interfaces/general';
import BaseTable from 'molecules/Table';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import Dots from 'icons/Dots';
import styles from './index.module.scss';

interface Props extends IProps {
  data: ILotsResult[];
  lotType?: string;
  deleteLotsArchiveArray: (data: ReactText[]) => void;
}

const LotsArchive: React.FC<Props> = ({ data, deleteLotsArchiveArray, lotType }) => {
  const [t] = useTranslation('common');
  const router = useRouter();
  const currency = localStorage.getItem('currency');
  const tableData: ILotsResult[] = data.map((obj) => ({ ...obj, key: obj.id }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);

  const onDetails = (data: ILotsResult) => {
    const { key } = data;
    router.push({
      pathname: `/auctions/${lotType}/${key}`,
      query: { lotType: lotType , id: data.id},
    });
  };
  const onDelete = (data: ILotsResult) => {
    const selectedRowKey = [];
    selectedRowKey.push(data.id);
    deleteLotsArchiveArray(selectedRowKey);
  };

  const onDeleteArray = () => {
    selectedRowKeys.length && deleteLotsArchiveArray(selectedRowKeys);
  };

  const onSelectChange = (selectedRowKeys: ReactText[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection: TableRowSelection<ILotsResult> | undefined = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const currencySymbol = getCurrencySymbol(currency);

  const modal = (record: ILotsResult) => {
    return (
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.modal}>
        <BaseFlex onClick={() => onDetails(record)} className={styles.actionsBtn}>
          {t('auctions.details')}
        </BaseFlex>
        <BaseFlex onClick={() => onDelete(record)} className={styles.actionsBtn}>
          {t('auctions.delete')}
        </BaseFlex>
      </BaseFlex>
    );
  };
  const columns: ColumnsType<ILotsResult> = [
    {
      title: '',
      dataIndex: 'checkbox',
      width: 32,
    },
    {
      title: t('auctions.product'),
      dataIndex: 'nomenclature',
      render: (nomenclature: IBaseDTO) => {
        return <BaseFlex>{nomenclature.name}</BaseFlex>;
      },
    },
    {
      title: t('auctions.company'),
      dataIndex: 'company',
      render: (company: IBaseDTO) => {
        return <BaseFlex>&#171;{company.name}&#187;</BaseFlex>;
      },
    },
    {
      title: t('auctions.price'),
      dataIndex: 'price',
      render: (price: number) => {
        return (
          <BaseFlex>
            {price && (
              <>
                <span>{currencySymbol}</span> <span>{price}</span>{' '}
              </>
            )}
          </BaseFlex>
        );
      },
    },
    {
      title: t('auctions.type'),
      dataIndex: 'type',
    },
    {
      title: t('auctions.finished'),
      dataIndex: 'updated_at',
      render: (text: number) => <p>{moment.unix(text).format('DD.MM.YYYY')}</p>,
    },
    {
      title: t('auctions.status'),
      dataIndex: 'status',
      render: (status: string) => {
        let color;
        if (status === 'Finished') {
          color = styles.finished;
        } else if (status === 'Refused') {
          color = styles.refused;
        } else if (status === 'Succeeded') {
          color = styles.succeeded;
        }
        return <BaseTypography as="p" className={classNames(styles.btn, color)} value={status} />;
      },
      width: 170,
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: ILotsResult) => {
        return tableData.length >= 1 ? (
          <Popover className={styles.actionsBtn} content={() => modal(record)} trigger="click" placement="left">
            <Dots />
          </Popover>
        ) : null;
      },

      width: 26,
    },
  ];

  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
      <BaseFlex className={styles.wrp}>
        {data.length ? (
          <BaseFlex className={styles.tableWrp}>
            <BaseTable data={tableData} columns={columns} rowSelection={rowSelection} />
            {selectedRowKeys.length > 0 && (
              <BaseButton
                className={styles.deleteBtn}
                value={t<string>('auctions.deleteSelected')}
                onClick={onDeleteArray}
              />
            )}
          </BaseFlex>
        ) : null}
      </BaseFlex>
    </BaseFlex>
  );
};

export default LotsArchive;
