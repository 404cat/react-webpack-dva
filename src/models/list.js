// import { message } from 'antd';
// import { getUser, getList } from 'services/home';

export default {
  namespace: 'listmodel',
  state: {
    msg: 'init state 123...',
    listData: ['一段文字'],
    loading: false,
    tableData: [{
      key: '1',
      name: '胡彦斌22',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/list') {
          dispatch({
            type: 'change',
            // payload: state
          });
        }
      });
    }
  },
  effects: {
  },
  reducers: {
    change(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
