let stream = weex.requireModule('stream');
import util from './util.js'

let baseUrl = 'http://172.16.101.35:8080/v1';//本机调试地址
//let baseUrl = 'https://dev-blade-api.fangfintech.com/blade/v1';//测试服务器调试地址

let tokenInfo = '';

//post提交方法
function postTrans(postData, path, sucCallBack, failCallBack) {

  console.log('请求发起的数据:' + JSON.stringify(postData));
  util.getTokenInfoCallBack(tokenInfo => {
    console.log('本次请求使用的token ///////////', tokenInfo);
    console.log('交易请求地址是：////////////', baseUrl + path);
    stream.fetch({
      method: 'post',
      type: 'json',
      url: baseUrl + path,
      headers: { 'Content-Type': 'application/json', 'hp-token': tokenInfo },
      body: JSON.stringify(postData)
    }, function(ret) {
      if (!ret.ok) {
        failCallBack(ret);
        console.error('网络请求错误:///////' + JSON.stringify(ret));

      } else {
        console.info('请求成功获取到的信息:' + JSON.stringify(ret.data));
        sucCallBack(ret);
      }
    }, function(progress) {

    })

  });


}

function commonTransCallBack(transType, params, path, sucCallBack, failCallBack) {

  console.log('请求发起的数据:' + JSON.stringify(params));
  util.getTokenInfoCallBack(tokenInfo => {
    console.log('本次请求使用的token//////////' + tokenInfo);
    console.log('交易请求地址是：////////////' + baseUrl + path);

    stream.fetch({
      method: transType,
      type: 'json',
      url: baseUrl + path,
      headers: { 'Content-Type': 'application/json', 'hp-token': tokenInfo },
      body: JSON.stringify(params)
    }, function(ret) {
      if (!ret.ok) {
        console.error('网络请求返回错误信息:///////' + JSON.stringify(ret));
        failCallBack(ret);
      } else {
        console.info('请求成功获取到的信息:' + JSON.stringify(ret.data));
        sucCallBack(ret);
      }
    }, function(progress) {

    })

  });

}

export default {

  post: function(params, path, success, failure) {
    return postTrans(params, path, success, failure);

  },

  //获取任务列表
  getTaskList: function(params, success, failure) {
    let path = '/app/house/task-list2?type=' + params.type;
    console.log('任务列表请求的地址是:' + baseUrl + path);
    return commonTransCallBack('post', params, path, success, failure);

  },
  // 获取任务详情
  getTaskDetailCallBack(params, success, failure){
    let path = '/app/house/task-detail?taskUid=' + params.taskUid;
    console.log('任务详情请求的地址是:' + baseUrl + path);
    return commonTransCallBack('get', params, path, success, failure);

  },
  //任务认领
  claimTaskCallBack(params, success, failure){
    let path = '/app/house/task-claim?taskUid=' + params.taskUid;
    return commonTransCallBack('post', params, path, success, failure);

  },
  //任务驳回
  rejectTaskCallBack(params, success, failure){
    let path = '/app/house/task-reject?taskUid=' + params.taskUid + '&rejectRemark=' + params.rejectRemark;
    console.log('任务驳回请求的地址是:' + baseUrl + path);

    return commonTransCallBack('post', params, path, success, failure);

  },

  //测试接口
  testLoginTransFunc(params, success, failure){
    let path = '/app/house/task-list';
    return commonTransCallBack('get', params, path, success, failure);
  },


  testPostTransFunc(params, success, failure){
    let path = '/app/house/task-list2';
    return commonTransCallBack('post', params, path, success, failure);
  }


}