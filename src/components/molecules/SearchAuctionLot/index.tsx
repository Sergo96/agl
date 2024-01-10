import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useRouter } from 'next/router';
import { IAysAgroState } from 'store';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { IOption } from 'interfaces/options';
import { IProps } from 'interfaces/props';
import { lotsAutocompleteSelector } from 'selectors/auctions';
import { searchLotsAutocomplete, searchLots } from 'actions/auctions';
import BaseSelect from 'atoms/Select';
import styles from './index.module.scss';

const mapDispatchToProps = {
  searchLotsAutocomplete: (value: string) => searchLotsAutocomplete(value),
  searchLots: (value: string) => searchLots(value),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    searchedAutocompleteLots: lotsAutocompleteSelector(state),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  placeholder?: string;
}

const SearchAuctionLot: React.FC<Props> = ({ searchLotsAutocomplete, searchLots, searchedAutocompleteLots }) => {
  const [t] = useTranslation('common');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [activeIcon] = useState('search');
  const router = useRouter();
  const options: IOption[] = data.map((i) => ({ value: i, label: i }));

  const handleSearch = (value: string) => {
    if (value) {
      searchLotsAutocomplete(value);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    searchedAutocompleteLots && setData(searchedAutocompleteLots);
  }, [searchedAutocompleteLots]);

  const handleChange = (value: string | number) => {
    if (value) {
      searchLots(value.toString());

      router.push({
        pathname: `/auctions/search`,
        query: { q: value },
      });
    }
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <BaseSelect
      suffixIcon={
        activeIcon === 'search' ? (
          <SearchOutlined className={styles.searchIcon} />
        ) : (
          <CloseCircleFilled className={styles.closeIcon} onClick={onClear} />
        )
      }
      showSearch
      value={value}
      placeholder={t('auctions.searchLots')}
      className={styles.search}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={options}
    ></BaseSelect>
  );
};

export default connector(SearchAuctionLot);
