const storage = weex.requireModule('storage')
let modal = weex.requireModule('modal');

//设置本地缓存数据
function setItemFunc(key, name) {
  storage.setItem(key, name, event => {
  })

}
//获取本地缓存的数据
function getItemFunc(key, callBack) {
  storage.getItem(key, event => {
    callBack(event.data);
  });
}

//清理本地缓存数据方法
function removeItemFunc(key) {
  storage.removeItem(key, event => {

  })
}


export default {

  //设置下户列表跳转设置页面数据
  setXHPushDetailData (value) {
    setItemFunc('xhListKey', value);
  },
  //获取下户列表页面设置数据
  getXHPushDetailData (callback) {
    getItemFunc('xhListKey', retObj => {
      callback(JSON.parse(retObj));

    });

  },


  //设置下户任务执行时，传输的数据 根据设置的值  获取对应config中的数据
  setOpertionDetailData(value){
    setItemFunc('xhOperKey', value);
  },

  getOpertionDetailData(callback){
    getItemFunc('xhOperKey', retObj => {
      callback(retObj);
    })
  },


  //设置登录用户信息方法
  setLoginUserInfo(userInfo){
    setItemFunc('loginUser', JSON.stringify(userInfo));
  },
  //获取登录用户信息
  getLoginUserInfo(callback){
    getItemFunc('loginUser', userInfo => {
      let retObj = JSON.parse(userInfo);
      callback(retObj);
    });
  },


  //设置token方法
  setTokenInfoCallBack(tokenInfo){
    setItemFunc('tokenInfo', tokenInfo);
  },

  getTokenInfoCallBack(callBack){
    getItemFunc('tokenInfo', tokenInfo => {
      if (tokenInfo == "undefined") {
        callBack('');

      } else {
        callBack(tokenInfo);

      }


    });

  },

  //设置taskid 方法
  setTaskUidCallBack(uid){
    setItemFunc('uid', uid);
  },
  getTaskUidCallBack(callback){
    getItemFunc('uid', taskUid => {
      callback(taskUid);
    });
  },

  //设置任务详情信息
  setTaskDetailCallBack(detailInfo){
    console.log('设置任务详细信息:///////' + JSON.stringify(detailInfo));
    setItemFunc('taskDetailInfo', JSON.stringify(detailInfo));

  },
  getTaskDetailCallBack(callback) {
    getItemFunc('taskDetailInfo', detailInfo => {
      let retObj = JSON.parse(detailInfo);
      callback(retObj);
    })
  },


  //设置taskid 方法
  setTitleTypeCallBack(titletype) {
    setItemFunc('titletype', titletype);
  },
  getTitleTypeCallBack(callback){
    getItemFunc('titletype', titletype => {
      callback(titletype);
    });
  },


  // 获取图片在三端上不同的路径
  // e.g. 图片文件名是 test.jpg, 转换得到的图片地址为
  // - H5      : http: //localhost:1337/src/images/test.jpg
  // - Android : local:///test
  // - iOS     : ../images/test.jpg
  getImgPath(imgName) {
    // console.log('weex.config =', weex.config);
    let localhostIpRep = /(http[s]?):\/\/((\d{1,3}.){4}):(\d+)\//
    let r = localhostIpRep.exec(weex.config.bundleUrl)
    let urlBase = ''
    let platform = weex.config.env.platform
    let imgPath = ''
    if (r && r.length >= 4) {
      let protocol = r[1]
      let localhostIp = r[2]
      let port = r[3]
      urlBase = r[0]
    }


    if (platform === 'Web') {
      imgPath = `${urlBase}src/res/drawable-img/${imgName}.png`
      // console.log('web get path is ://////////////////////' + imgPath);

    } else if (platform === 'android') {
      // android 不需要后缀
      //  imgName = imgName.slice(0, imgName.length);
      console.log('anroid get file name is :////////////////////////////' + imgName);

      // imgPath = `local:///${imgName}.png`;
      // imgPath = `local:///${imgName}`;
      imgPath = `drawable:///${imgName}`;
      console.log('anroid get path is :////////////////////////////' + imgPath);

    } else {
      imgPath = `local:///images/${imgName}.png`;
      console.log('ios get path is ://///////////////////////' + imgPath);

    }

    return imgPath
  }


}