import axios from "axios"
import qs from 'qs'
import store from "../../store/store";
import apiConfig from '../../../config/api.config'
import ElementUI from 'element-ui';
import { Loading } from 'element-ui';
console.log("网络请求的基地址："+apiConfig.baseUrl)
console.log("是否打印网络请求细节："+apiConfig.isDebug)
axios.defaults.baseURL = apiConfig.baseUrl  //关键代码
axios.defaults.withCredentials=true;
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {

  if(store.state.token&&apiConfig.isJwt) {
    config.headers.common['token'] = store.state.token;
  }

  if(apiConfig.isDebug){
    console.info("网络请求信息: ");
    console.dir(config);
  }


  return config;

}, function (error) {

  if(apiConfig.isDebug){

    console.info("网络请求错误信息: ");
    console.info(error);

  }


  return Promise.reject(error);
});

var httpUtil={

  get:(requestParam)=>new Promise(((resolve, reject) => {
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'Transparent'
    });
    axios.get(requestParam.url,
      {params:requestParam.data}
    ).then(response => {
       loading.close()
      if(apiConfig.isDebug){

        console.info("网络请求响应: ");
        console.info(response);

      }

      let res = response.data;
      if(requestParam.isDone==undefined||requestParam.isDone){
        if(res.status){
          resolve(res.data)
        }else {
              //错误处理
           if(requestParam.showError||requestParam.showError==undefined){
             ElementUI.Message({
               message: res.error,
               type: 'error'
             });
           }
          reject(res.error)
        }
      }else {
        resolve(res)
      }
    }).catch(error => {
      if(requestParam.showError||requestParam.showError==undefined){
        ElementUI.Message({
          message: error,
          type: 'error'
        });
      }
      if(apiConfig.isDebug){
        console.info("网络请求错误: ");
        console.info(error);
      }
      loading.close()
      reject(error)
    })
   })),
  //json请求
  postJson:(requestParam)=> new Promise((resolve,reject)=>{

    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'Transparent'
    });
    axios.post(requestParam.url,requestParam.data
    ).then(response => {
      loading.close();
      if(apiConfig.isDebug){
        console.info("网络请求响应: ");
        console.info(response);
      }
      let res = response.data;
      if(requestParam.isDone==undefined||requestParam.isDone){
        if(res.status){
          resolve(res.data)
        }else {
          //错误处理
          if(requestParam.showError||requestParam.showError==undefined){
            ElementUI.Message({
              message: res.error,
              type: 'error'
            });
          }
          reject(res.error)
        }
      }else {
        resolve(res)
      }
    }).catch(error => {
      if(requestParam.showError||requestParam.showError==undefined){

        ElementUI.Message({
          message: error,
          type: 'error'
        });
      }
      if(apiConfig.isDebug){
        console.info("网络请求错误: ");
        console.info(error);

      }
      loading.close();
      reject(error)
    })

  })
  ,
  //x-w-from请求
  postXWFrom:(requestParam)=> new Promise((resolve,reject)=>{
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'Transparent'
    });
     axios.post(requestParam.url,qs.stringify (requestParam.data)
     ).then(response => {
       loading.close()
       if(apiConfig.isDebug){
         console.info("网络请求响应: ");
         console.info(response);

       }
       let res = response.data;
       if(requestParam.isDone==undefined||requestParam.isDone){

         if(res.status){

           resolve(res.data)

         }else {
           //错误处理
           if(requestParam.showError||requestParam.showError==undefined){

             ElementUI.Message({
               message: res.error,
               type: 'error'
             });

           }
           reject(res.error)

         }


       }else {

         resolve(res)

       }

  }).catch(error => {

       if(requestParam.showError||requestParam.showError==undefined){

         ElementUI.Message({
           message: error,
           type: 'error'
         });

       }
       if(apiConfig.isDebug){
         console.info("网络请求错误: ");
         console.info(error);

       }
       loading.close()
       reject(error)


  });


  }),
  post:(requestParam)=>  new Promise((resolve,reject)=>{
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'Transparent'
    });
    axios({
      // 默认请求方式为get
      method: requestParam.method?requestParam.method:'post',
      url: requestParam.url,
      // 传递参数
      params: requestParam.data,
      // 设置请求头信息
      headers:{...requestParam.headers}
      //responseType: 'json'
    }).then(response => {
      // 请求成功
      loading.close()
      if(apiConfig.isDebug){
        console.info("网络请求响应: ");
        console.info(response);

      }
      let res = response.data;
      if(requestParam.isDone==undefined||requestParam.isDone){

        if(res.status){

          resolve(res.data)

        }else {
          //错误处理
          if(requestParam.showError||requestParam.showError==undefined){

            ElementUI.Message({
              message: res.error,
              type: 'error'
            });

          }
          reject(res.error)

        }


      }else {

        resolve(res)

      }

    }).catch(error => {

      if(requestParam.showError||requestParam.showError==undefined){

        ElementUI.Message({
          message: error,
          type: 'error'
        });

      }
      if(apiConfig.isDebug){
        console.info("网络请求错误: ");
        console.info(error);

      }
      loading.close()
      reject(error)


    })


  })

}
export default httpUtil
