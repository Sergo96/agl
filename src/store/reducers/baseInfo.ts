import { BaseInfoTypes, ICurrenciesAction } from 'actions/baseInfo';
import { IGetBaseInfo } from 'interfaces/baseInfo';

export interface IBaseInfoState {
  isLoading: boolean;
  baseInfo: IGetBaseInfo;
}

export const initState: IBaseInfoState = {
  isLoading: false,
  baseInfo: {
    header: undefined,
    footer: undefined,
  },
};

function baseInfoReducer(state = initState, action: ICurrenciesAction): IBaseInfoState {
  switch (action.type) {
    case BaseInfoTypes.LOADING_BASEINFO_REQUEST:
      return { ...state, isLoading: true };
    case BaseInfoTypes.LOADING_BASEINFO_SUCCESS:
      if (action?.baseInfo) {
        return {
          ...state,
          isLoading: false,
          baseInfo: {
            ...state.baseInfo,
            ...action.baseInfo,
          },
        };
      } else return { ...state };
  }
  return state;
}

export default baseInfoReducer;
