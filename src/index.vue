<template>


  <wxc-tab-bar :tab-titles="tabTitles"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <div class="item-container" :style="contentStyle">
      <text>{{firstPage}}</text>
      <wxc-button text="前往填写详情"
                  @wxcButtonClicked="toInput"></wxc-button>

    </div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle">
      <text>{{secondPage}}</text>
    </div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle">
      <text>{{thirdPage}}</text>
    </div>


  </wxc-tab-bar>

</template>

<script>
  import config from './config'
  import { WxcTabBar, Utils, WxcButton } from 'weex-ui';
  import HelloWorld from './components/HelloWorld.vue'
  import util from './util/util.js'
  const navigator = weex.requireModule('navigator');
  export default {
    name: 'App',
    components: {
      HelloWorld, WxcTabBar, WxcButton
    },
    data () {
      return {
        logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
        contentStyle: {},
        firstPage: '第一个页面内容',
        secondPage: '第二个页面内容',
        thirdPage: '第三个页面内容',
        tabStyles: config.tabStyles,
        tabTitles: [],

      }
    },
    created(){

      let isWeb = Utils.env.isWeb()
      let isIPhoneX = Utils.env.isIPhoneX()
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this;
      console.log('isWeb = ', isWeb);
      console.log('isIPhoneX = ', isIPhoneX);
      console.log('tabStyles = ', tabStyles);
      console.log('tabPageHeight = ', tabPageHeight);
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
      this.tabTitles = config.tabTitles
    },
    methods: {
      toInput(){
        let url = this.$getConfig().bundleUrl
        let bundleUrl = weex.config.bundleUrl
        console.log('url = ', url)
        console.log('bundleUrl = ', bundleUrl)
        let l = url.split('/').slice(0, -1).join('/') + '/components/HelloWorld.js'
        console.log('l = ', l)
        navigator.push({
          url: l
        }, rsp => {
          console.log('rsp = ', rsp)
        })
      },
      wxcTabBarCurrentTabSelected(){
      }
    }
  }
</script>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 424px;
    height: 200px;
  }

  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }

  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>
