<template>
  <div class="my">
    <div class="myinfo">
      <img :src="avator" alt="" />
      <div>
        <p>luck</p>
        <p v-if="userInfo.nickName">微信用户</p>
        <p v-else>点击登录</p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get, login, toLogin } from '../../utils'
export default {
  data() {
    return {
      listData: [
        {
          title: "我的订单",
          icon: "icon-icon-",
          url: ""
        },
        {
          title: "优惠券",
          icon: "icon-youhuiquan",
          url: ""
        },
        {
          title: "我的足迹",
          icon: "icon-wodezuji",
          url: ""
        },
        {
          title: "我的收藏",
          icon: "icon-shoucang",
          url: "/pages/collectlist/main"
        },
        {
          title: "地址管理",
          icon: "icon-dizhi",
          url: "/pages/address/main"
        },
        {
          title: "联系客服",
          icon: "icon-icon-test",
          url: ""
        },
        {
          title: "帮助中心",
          icon: "icon-bangzhu",
          url: ""
        },
        {
          title: "意见反馈",
          icon: "icon-fankui51",
          url: "/pages/feedback/main"
        }
      ],
      avator: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=322677660,3924712014&fm=26&gp=0.jpg',
      allcheck: false,
      userInfo: {},
      Listids: []
    };
  },
  onShow () {
    if (login()) {
      this.userInfo = login()
      console.log(this.userInfo)
      this.avator = this.userInfo.avatarUrl
    }
  },
  methods: {
    goTo (url) {
      console.log(123)
      wx.navigateTo({
        url: url
      });
        
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>