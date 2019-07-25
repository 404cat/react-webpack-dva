/*eslint-disable*/
import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from 'components/common/Loading';
import { Router, Route, Switch } from 'dva/router';
import { dynamicLoader, registerModel } from './utils/loadable';
// 直接加载
// import HomePage from './routes/HomePage';

const routersTree = [
  {
    path: '/',
    component: () => import('./routes/HomePage'/* webpackChunkName: 'HomePage？？？' */)
  },
  {
    path: '/list',
    component: () => import('./routes/SecondPage' /* webpackChunkName: 'SecondPage???' */),
    models: () =>  import('./models/list')
  }
];


// 按需加载
// const HomePage = loadable(() =>
//   import('./routes/HomePage' /* webpackChunkName: 'HomePage' */));

// const SecondPage = loadable(() =>
//   import('./routes/SecondPage' /* webpackChunkName: 'SecondPage' */));


const HomePage = () => Loadable.Map({
  loader: {
    page: () => import('./routes/HomePage')
  },
  render(loaded, props) {
    console.log(loaded, props)
    const Page = loaded.page
    return <Page {...props}></Page>
  },
  loading: LoadingComponent
})

const SecondPage = (app) => Loadable.Map({
  loader: {
    page: () => import('./routes/SecondPage'),
    data: () => import('./models/list')
  },
  render(loaded, props) {
    console.log(loaded, props)
    const Page = loaded.page
    registerModel(app, loaded.data);
    return <Page {...props}></Page>
  },
  loading: LoadingComponent
})

function RouterConfig({ history, app }) {
  console.log(app);
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={HomePage()} />
        <Route path="/list" exact component={SecondPage(app)} /> */}
        {
          routersTree.map(({path, component, models}) => {
            return <Route key={path} path={path} exact component={dynamicLoader({app, component, models})} />;
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
