<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品"/>
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item,index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 导航栏 -->
    <div class="channel">
      <div v-for="(item,index) in channel" :key="index" @click="categoryList(item.id)">
        <image class="slide-image1" :src="item.icon_url"/>
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商直供
      </div>
      <div class="content">
        <div v-for="(item,index) in brand" :key="index" @click="brandDetail(item.id)">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.floor_price}}元</p>
          </div>
          <img :src="item.pic_url" alt="">
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <!-- 存在什么轴上滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥ {{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <!-- 存在什么轴上滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥ {{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 专题精选 -->
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <!-- 存在什么轴上滚动 -->
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in topicList" :key="index" @click="topicdetail(item.id)">
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>{{item.price_info}}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item,index) in newCategoryList" :key="index" >
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div v-for="(subitem,subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>¥{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import {get} from '../../utils/index'
export default {
data () {
  return {
    banner:[],
    channel:[],
    brand:[],
    newGoods:[],
    hotGoods:[],
    topicList:[],
    newCategoryList:[]
  }
},
computed: {
  ...mapState(['cityName'])
},
mounted () {
  this.getData()
  this.getCityName()
},
methods: {
  ...mapMutations(['update']),
  toMappage(){
    // 通过wx.getSetting 先查询用户是否授权 "scoped.record"
    let _this=this
    wx.getSetting({
      success:(res)=>{
        // 如果没有同意授权，打开设置
        // console.log(res)
        if(res.authSetting['scope.userLocation']){
          wx.openSetting({
            success:res=>{
              // 获取授权位置信息
              _this.getCityName()
            }
          })
        }else{
          wx.navigateTo({
            url:'/pages/mappage/main'
          })
          // _this.getCityName()
        }
      },
      fail:(err)=>{
        console.log(err)
      },
      complete:()=>{

      }
    })
  },
  getCityName(){
    let _this=this
    var myAmapFun=new amapFile.AMapWX({
            key:'15302eff518cb218059e63c4d5f731b7'
        })
    myAmapFun.getRegeo({
      success:(data)=>{
        // 成功回调
        console.log(data)
      },
      fail:(info)=>{
        // 失败回调
        console.log(info)
        // _this.cityName='北京'
        _this.update({cityName:'北京'})
      }
    })
  },
  async getData(){
    const data=await get('/index/index')
    // console.log(data)
    this.banner=data.banner
    this.channel=data.channel
    this.brand=data.brand
    this.newGoods=data.newGoods
    this.hotGoods=data.hotGoods
    this.topicList=data.topicList
    this.newCategoryList=data.newCategoryList
  },
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/main'
    })
  },
  categoryList(id){
    wx.navigateTo({
      url:'/pages/categorylist/main?id='+id
    })
  },
  brandDetail(id){
    wx.navigateTo({
      url:'/pages/branddetail/main?id='+id
    })
  },
  tobrandList(){
    wx.navigateTo({
      url:'/pages/brandlist/main'
    })
  },
  goodsList(info){
    if(info=='hot'){wx.navigateTo({url:'/pages/newgoods/main?isHot='+1})}
    else{
     wx.navigateTo({url:'/pages/newgoods/main?isNew='+1}) 
    }
  },
  topicdetail(id){
    wx.navigateTo({
      url:'/pages/topicdetail/main?id='+id
    })
  }
}
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>