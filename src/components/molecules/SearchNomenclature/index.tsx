import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IAysAgroState } from 'store';
import { loadingProductsForBuySelector, loadingProductsForSellSelector } from 'selectors/auth';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { addNomenclature } from 'actions/auth';
import BaseSearchCheckbox from 'atoms/SearchCheckbox';
import { IBaseDTO } from 'interfaces/general';

const mapDispatchToProps = {
  addNomenclature: (data: IBaseDTO, type: TypeTab) => addNomenclature(data, type),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    currentTab: state.auth.tab,
    products_for_buy: loadingProductsForBuySelector(state),
    products_for_sell: loadingProductsForSellSelector(state),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  placeholder?: string;
  onSearch: (value: string) => void;
  size: 'large' | 'small';
  searchData: IGeneralNomenclatureItem[];
  currentTab: TypeTab;
}

const SearchNomenclature: React.FC<Props> = ({
  addNomenclature,
  products_for_buy,
  products_for_sell,
  currentTab,
  ...props
}) => {
  const [checkedItems, setCheckedItems] = useState<IBaseDTO[]>([]);
  useEffect(() => {
    if (currentTab === 0 && products_for_buy) {
      const data = products_for_buy.map((i) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setCheckedItems(data);
    } else if (currentTab === 1 && products_for_sell) {
      const data = products_for_sell.map((i) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setCheckedItems(data);
    }
  }, [products_for_buy, products_for_sell, currentTab]);

  const toggleCheckbox = (checkedItems: IBaseDTO) => {
    addNomenclature(checkedItems, currentTab);
  };

  return <BaseSearchCheckbox toggleCheckbox={toggleCheckbox} checkedItems={checkedItems} {...props} />;
};

export default connector(SearchNomenclature);
