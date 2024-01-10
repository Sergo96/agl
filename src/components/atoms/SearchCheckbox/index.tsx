import { Select } from 'antd';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import { useDebounced } from 'hooks/debounce';
import { IProps } from 'interfaces/props';
import BaseCheckbox from 'atoms/Checkbox';
import styles from './index.module.scss';
import { IBaseDTO } from 'interfaces/general';

const { Option } = Select;

interface Props extends IProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  size: 'large' | 'small';
  searchData: IBaseDTO[];
  toggleCheckbox: (data: IBaseDTO) => void;
  checkedItems: IBaseDTO[];
}

const BaseSearchCheckbox: React.FC<Props> = ({
  searchData,
  onSearch,
  placeholder,
  toggleCheckbox,
  checkedItems,
  ...props
}) => {
  const [data, setData] = useState<IBaseDTO[]>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IBaseDTO[] | undefined>([]);
  const [activeIcon, setActiveIcon] = useState('search');
  const [value, setValue] = useState([]);
  const debouncedValue = useDebounced(searchValue);
  useEffect(() => {
    setData(searchData);
    setSearchResult(searchData);
  }, [searchData]);
  useEffect(() => {
    onSearch('');
  }, []);

  useEffect(() => {
    if (searchValue) {
      setActiveIcon('clear');
    } else {
      setActiveIcon('search');
    }
  }, [searchValue]);

  useEffect(() => {
    handleDebouncedSearch(debouncedValue);
  }, [debouncedValue]);
  const handleChange = (data: IBaseDTO) => {
    toggleCheckbox(data);
    handleSearch('');
  };

  const onClear = () => {
    setSearchValue('');
    setValue([]);
    setSearchResult(searchData);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDebouncedSearch = useCallback(
    (debouncedValue: string) => {
      if (debouncedValue) {
        const result =
          data &&
          data
            .filter((i) => i.name.toLowerCase().includes(debouncedValue.toLowerCase()))
            .map((item) => {
              const newBody = item.name.replace(
                new RegExp(debouncedValue, 'gi'),
                (match) => `<span style="background: transparent; color: #1890ff">${match}</span>`
              );
              return {
                ...item,
                name: newBody,
                value: item.name,
              };
            });

        setSearchResult(result);
      } else {
        const result =
          data &&
          data.map((item) => {
            return {
              ...item,
              value: item.name,
            };
          });
        setSearchResult(result);
      }
    },
    [data, setSearchResult]
  );

  const options = useMemo(
    () =>
      searchResult &&
      searchResult.map((i) => {
        const createMarkup = (html: string) => {
          return { __html: html };
        };

        return (
          <Option key={i.id} value={i.name}>
            <BaseCheckbox
              label={<div dangerouslySetInnerHTML={createMarkup(i.name)}></div>}
              onChange={() => handleChange(i)}
              checked={checkedItems && checkedItems.some((item: IBaseDTO) => item.id === i.id)}
            />
          </Option>
        );
      }),
    [searchResult, checkedItems]
  );

  return (
    <Select
      suffixIcon={
        activeIcon === 'search' ? (
          <SearchOutlined className={styles.searchIcon} />
        ) : (
          <CloseCircleFilled className={styles.closeIcon} onClick={onClear} />
        )
      }
      mode="multiple"
      showArrow
      value={value}
      searchValue={searchValue}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={null}
      {...props}
    >
      {options}
    </Select>
  );
};

export default BaseSearchCheckbox;
