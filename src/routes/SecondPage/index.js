import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ListCom from 'components/list';
import hoc from 'components/common/LoadingHoc';

const SecondPage = ({dispatch, location, listmodel}) => {
  const { listData } = listmodel;
  const listProps = {
    listData,
    onRefresh() {
      dispatch({
        type: 'home/getList',
      });
    },
    onBack() {
      dispatch(routerRedux.push('/'));
    }
  };
  return (
    <div>
      <h2>SecondPage</h2>
      <h4>path: {location.pathname}</h4>
      {/* <h4>state: {home.msg}</h4> */}
      <ListCom {...listProps} />
    </div>
  );
};
export default connect(({listmodel}) => ({listmodel, loading: listmodel.loading}))(hoc(SecondPage));
