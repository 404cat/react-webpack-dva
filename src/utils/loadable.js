/*eslint-disable*/
import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from 'components/common/Loading';

const Loading = (props) => {
  if (props.error || props.timedOut) {
    console && console.error('props.error || props.timedOut', props.error || props.timedOut);
    // window.location.reload();
  }
  return <div className="ui-loading" >加载ing</div>
};

const loadable = (component) => {
  return Loadable({
    loader: component,
    loading: LoadingComponent
  });
};

function registerModel(app, model) {
  model = model || model.default;
  if (!app._models.some(val => val.namespace === model.namespace)) { // 已经注册过的modal不需要再注册
    app.model(model);
  }
}

const dynamicLoader = ({
  app, models, component
}) => {
  
  const loader = {}; // 需要加载对象集

  const componentName = 'component';
  const modelName = 'model'


  loader[componentName] = component;
  if(models) {
    loader[modelName] = models
  }
  console.log('loader =====>', loader);

  return Loadable.Map({
    //The items in the loader object need to be functions
    loader,
    render(loaded, props) {
      // 已经执行过的函数返回的集合
      // console.log('loaded===>',loaded, props);
      console.log(loaded, props)
      const Component = loaded[componentName];
      if(loaded[modelName]) {
        registerModel(app, loaded[modelName]);
      }
      return <Component {...props} />;
    },
    loading: LoadingComponent
  });
};

export {
  dynamicLoader,
  loadable,
  registerModel,
};


/**
 * 传入APP 用来注册model
 * component &  model=[]
 */
