<template>
  <div class="mappage">
      <div class="section">
          <input type="text" placeholder="搜索" focus="true" v-model="keywords" @input="bindInput">
      </div>
      <scroll-view :scroll-y="true" class="addcont" style="height:500rpx;">
          <div class="result" @touchstart="bindSearch(item.name)" v-for="(item,index) in tips" :key="index">
              {{item.name}}
          </div>
      </scroll-view>
      <div class="map_container">
          <div class="title">显示当前位置：</div>
          <map class="map" id="map" scale="16" :longitude="longitude" :latitude="latitude"></map>
      </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapMutations} from 'vuex'
export default {
    data () {
        return {
            tips:[],
            // 经纬度
            longitude:0,
            latitude:0,
            markers:[],
            keywords:''
        }
    },
    mounted () {
      this.getMapadderss()  
    },
    methods: {
      ...mapMutations(['update']),
      getMapadderss(){
        let _this=this
        var myAmapFun=new amapFile.AMapWX({
            key:'15302eff518cb218059e63c4d5f731b7'
        })
        myAmapFun.getRegeo({
            iconPath:"/static/images/marker.png",
            iconWidth:22,
            iconHeight:32,
            success(data){
                console.log(data)
                var marker=[
                    {
                        id:data[0].id,
                        latitude:data[0].latitude,
                        longitude:data[0].longitude,
                        width:data[0].width,
                        height:data[0].height
                    }
                ]
                _this.markers=marker,
                _this.latitude=data[0].latitude,
                _this.longitude=data[0].longitude
            },
            fail(info){
                console.log(info)
            },
        })
      },
      bindInput(e){
        //   console.log(e)
        let _this=this
        let keywords=_this.keywords
        var myAmapFun=new amapFile.AMapWX({
            key:'15302eff518cb218059e63c4d5f731b7'
        })
        myAmapFun.getInputtips({
            keywords:keywords,
            location:'',
            success:(data)=>{
                console.log(data)
                if(data&&data.tips){
                    _this.tips=data.tips
                }
            },
            fail:(info)=>{
                console.log(info)
            }
        })
      },
      bindSearch(cityName){
          this.update({cityName:cityName})
          wx.navigateBack({
              delta:1
          });
      } 
    }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>