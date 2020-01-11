<template>
    <div class="mWrap">
        <div class="header">
            <h1 class="title ">清华大学融媒大屏</h1>
            <div class="spot-block">
                <p class="spot spl1"><img src="static/images/spot1.png"></p>
                <p class="spot spl2"><img src="static/images/spot1.png"></p>
                <p class="spot spl3"><img src="static/images/spot1.png"></p>
                <p class="spot spl4"><img src="static/images/spot1.png"></p>
            </div>
            <div class="spot-block2">
                <p class="spot spr1"><img src="static/images/spot.png"></p>
                <p class="spot spr2"><img src="static/images/spot.png"></p>
                <p class="spot spr3"><img src="static/images/spot.png"></p>
                <p class="spot spr4"><img src="static/images/spot.png"></p>
            </div>
        </div>
        <div class="continer">
            <div class="clearfix">
                <!-- 左边 -->
                <div class="left-warp por w423 fl">
                    <!-- 清华大学微信公众号 -->
                    <div class="plane plane-green">
                        <div class="plane-title fs18 cr0f">清华大学微信公众号<i class="icons icon-arrow1 fr"></i></div>
                        <div class="plane-body">
                            <div class="echart-warp clearfix news-gre" @click="handleClick($event,2)">
                                <vue-seamless-scroll :data="wxList" :class-option="optionSetting" class="news-warp h148 ">
                                    <ul class="news">
                                        <li class="news-li" v-for="(item,index) in wxList" :key="index" >
                                            <div class="in clearfix">
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)<100000" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)">{{item.news_title}}</p>
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)>=100000" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)"><i class="icons icon-hot"></i><strong>{{item.news_title}}</strong></p>
                                                <p class="crb8">
                                                    <span>{{item.news_posttime}}</span>
                                                    <span class="ml20">阅读数：{{item.read_num}}</span>
                                                </p>
                                            </div>
                                        </li> 
                                    </ul>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>
                    <!-- 清华大学微博 -->
                    <div class="plane plane-yel mt50">
                        <div class="plane-title fs18 crfd">清华大学微博<i class="icons icon-arrow2 fr"></i></div>
                        <div class="plane-body">
                            <div class="title1 clearfix">
                                <div class="fensi ovhidden">
                                    <div class="img fl"><img src="static/images/t-ico.png" /></div>
                                    {{wbAcount.name}}
                                </div>
                                <div class="fensi ar">
                                    <i class="icons icon-fs"></i>粉丝：{{wbAcount.fans_count}}
                                </div>
                                <div class="fensi ar">
                                    <i class="icons icon-wb"></i>发文：{{wbAcount.publish_count}}
                                </div>
                            </div>
                            <div class="echart-warp clearfix news-yel" @click="handleClick($event,2)">
                                <vue-seamless-scroll :data="wbList" :class-option="optionSetting1" class="news-warp h148 ">
                                    <ul class="news newscro1">
                                        <li class="news-li" v-for="(item,index) in wbList" :key="index" ref="rollul" :class="{anim:animate.anim1==true}">
                                            <div class="in">
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)<100000" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)">{{item.news_title}}</p>
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)>=100000" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)"><i class="icons icon-hot"></i><strong>{{item.news_title}}</strong></p>
                                                <p class="crb8 clearfix">
                                                    <span class="name fl">转发数：{{item.repost_num}}</span>
                                                    <span class="name ac fl">评论数：{{item.comment_num}}</span>
                                                    <span class="name ar fr">点赞数：{{item.like_num}}</span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>
                    <!-- 清华新闻网 -->
                    <div class="plane plane-blue mt50">
                        <div class="plane-title fs18 cr0b mb5">清华新闻网<i class="icons icon-arrow3 fr"></i></div>
                        <div class="plane-body">
                            <div class="echart-warp newsNet clearfix" @click="handleClick($event,1)">
                                <vue-seamless-scroll :data="newsList" :class-option="optionSetting5" class="news-warp h350">
                                    <ul class="news pt0">
                                        <li class="news-li" v-for="(item,index) in newsList" :key="index">
                                            <div class="in clearfix">
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)<100000" :data-cont="item.news_content" @click="showDetail('',item.news_content,'','')">{{item.news_title}}</p>
                                                <p class="title fs16 crff ovhidden" v-if="parseInt(item.read_num)>=100000" :data-cont="item.news_content" @click="showDetail('',item.news_content,'','')"><i class="icons icon-hot"></i><strong>{{item.news_title}}</strong></p>
                                                <p class="crb8">
                                                    <span>{{item.news_posttime}}</span>
                                                    <span class="ml20">阅读数：{{item.read_num}}</span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>
                </div>
            
                <!-- 中间 -->
                <div class="mid-warp w838 mt38 fl por">
                    <!-- 本地视频 -->
                    <div class="plane por h486">
                        <i class="icons icon-turn1"></i>
                        <i class="icons icon-turn2"></i>
                        <i class="icons icon-turn3"></i>
                        <i class="icons icon-turn4"></i>
                        <div class="plane-body por videoWrap h486">
                            <video class="video1" id="video_id" :src="videoSrc"  width="" height="" :autoplay="videoSet==0" muted></video>
                        </div>
                    </div>
                    <div class="clearfix mt27">
                        <!-- 词云图 -->
                        <div class="plane plane-blue w400 fl">
                            <div class="plane-title fs18 cr0b mb5">词云图<i class="icons icon-arrow3 fr"></i></div>
                            <div class="plane-body pt0">
                                <div class="echart-warp mt0 h144 mb5">
                                    <cloudChart id="wordCloud" ref="cloudChart" :dataArray="defaultWords" v-if="defaultWords!= ''"></cloudChart>
                                </div>
                            </div>
                            <div class="plane-title fs18 cr0b afNone"><i class="icons icon-arrow3 fr"></i></div>
                            <div id="myCarousel" class="carousel slide " data-ride="carousel">
                                <!-- 轮播（Carousel）指标 -->
                                <ol class="carousel-indicators tab_menu big fs16 clearfix" style="">
                                    <li data-slide-to="0" :class="{'active':bkCurNav==0}" @click="bkNavTab(0)"><span>校报展示</span></li>
                                    <li data-slide-to="1" :class="{'active':bkCurNav==1}" @click="bkNavTab(1)"><span>党建动态</span></li>
                                </ol>
                                <!-- 轮播（Carousel）项目 -->
                                <div class="carousel-inner h155">
                                    <div class="item slide-item1" :class="bkCarouse0">
                                        <div class="plane-body pt0">
                                            <div class="echart-warp mt0 h155">
                                                <swiper :options="swiperOption" class="reportLi" v-if="reportList!=''">
                                                    <swiper-slide class="item" v-for="(item,index) in reportList" :key="index" >
                                                        <p  @click="showReport(item.img_url)"><img :src="item.img_url" @error="findLocalImg(item.img_url)" alt=""></p>
                                                    </swiper-slide>
                                                    <div class="swiper-pagination "  slot="pagination"></div>	
                                                </swiper>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item slide-item2" :class="bkCarouse1">
                                        <div class="plane-body pt0">
                                            <div class="echart-warp mt0 news-blue" @click="handleClick($event,2)">
                                                <vue-seamless-scroll :data="buildList" :class-option="optionSetting4" class="news-warp buildNews h155" v-if="buildList!=''&& isShowReport">
                                                    <ul class="news pt0">
                                                        <li class="news-li" v-for="(item,index) in buildList" :key="index">
                                                            <div class="in clearfix">
                                                                <p class="title fs16 crff ovhidden" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)">{{item.news_title}}</p>
                                                                <p class="crb8">
                                                                    <span>{{item.news_posttime}}</span>
                                                                </p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </vue-seamless-scroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="plane w379 h393 mt12 fr">
                            <div class="plane-body douyin-l pt0 por">
                                <!-- <div id="poster_img2"></div> -->
                                <video class="video1" id="video_id2" :src="dyVideoSrc"  width="" height="" :autoplay="douyinSet==0" muted></video>
                            </div>
                            <div class="douyin-r fr">
                                <div class="plane-title1">清华大学</div>
                                <div class="ewm">
                                    <p class="fs16">扫码观看</p>
                                    <div class="ewm-div" id="qrcode">
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <!-- 右边 -->
                <div class="right-warp w423 fl por">
                    <!-- 热点新闻 -->
                    <div class="plane plane-green">
                        <div class="plane-title fs18 cr0f">热点新闻<i class="icons icon-arrow1 fr"></i></div>
                        <div class="plane-body">
                            <div class="echart-warp clearfix " @click="handleClick($event,2)">
                                <vue-seamless-scroll :data="hotList" :class-option="optionSetting3" class="news-warp h206">
                                    <ul class="news">
                                        <li class="news-li hotNew clearfix" v-for="(item,index) in hotList" :key="index" >
                                            <div class="pro fs16 ovhidden" :class="'newTit'+item.ind"  :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)">
                                                <p class="fr" v-if="item.ind<=3">
                                                    <span v-for="i of (4-item.ind)" :key="i"><img class="" src="static/images/fire.png"></span>
                                                </p>
                                                <i class="num ac" :class="'num'+item.ind">{{item.ind}}</i>{{item.news_title}}
                                            </div>
                                        </li> 
                                    </ul>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>
                    <!-- 全球传播 -->
                    <div class="plane plane-yel mt40">
                        <div class="plane-body">
                            <div class="plane-title fs18 crfd mb5">全球传播Global Communication</div>
                            <div id="myCarousel" class="carousel slide " data-ride="carousel">
                                <!-- 轮播（Carousel）指标 -->
                                <ol class="carousel-indicators tab_menu tab-yel clearfix" style="">
                                    <li data-slide-to="0" :class="{'active':yqCurNav==0}" @click="yqNavTab(0)"><span>英文网</span></li>
                                    <li data-slide-to="1" :class="{'active':yqCurNav==1}" @click="yqNavTab(1)"><span>新媒体</span></li>
                                </ol>
                                <!-- 轮播（Carousel）项目 -->
                                <div class="carousel-inner h148">
                                    <div class="item slide-item2" :class="yqCarouse0">
                                        <div class="echart-warp newsNet clearfix" @click="handleClick($event,1)">
                                            <vue-seamless-scroll :data="communiList" :class-option="optionSetting2" class="news-warp h148">
                                                <ul class="news pt0">
                                                    <li class="news-li" v-for="(item,index) in communiList" :key="index">
                                                        <div class="in clearfix">
                                                            <p class="title fs16 crff ovhidden" :data-cont="item.news_content" @click="showDetail('',item.news_content,'','')">{{item.news_title}}</p>
                                                            <p class="crb8">
                                                                <span>{{item.news_posttime}}</span>
                                                                <span class="ml20">from:Tslnghua universlty news</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </vue-seamless-scroll>
                                        </div>
                                    </div>
                                    <div class="item slide-item2" :class="yqCarouse1">
                                        <div class="echart-warp newsNet clearfix" @click="handleClick($event,2)">
                                            <vue-seamless-scroll :data="mediaList" :class-option="optionSetting2" class="news-warp h148" v-if="mediaList!=''&& isShowTran">
                                                <ul class="news pt0">
                                                    <li class="news-li" v-for="(item,index) in mediaList" :key="index">
                                                        <div class="in clearfix">
                                                            <p class="title fs16 crff ovhidden" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)">{{item.news_title}}</p>
                                                            <p class="crb8">
                                                                <span>{{item.news_posttime}}</span>
                                                                <span class="ml20">from:{{item.news_from}}</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </vue-seamless-scroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 融媒体联盟榜单 -->
                    <div class="plane plane-blue h550 mt58">
                        <div class="plane-body pt0 o-hidden por" id="demo1">
                            <div class="plane-title fs18 cr0b mb5">融媒体联盟矩阵</div>
                            <div id="myCarousel" class="carousel slide " data-ride="carousel">
                                <!-- 轮播（Carousel）指标 -->
                                <ol class="carousel-indicators tab_menu clearfix" style="">
                                    <li data-target="#myCarousel" data-slide-to="0" :class="{'active':curNav==0}" @click="navTab(0)"><span>日榜</span></li>
                                    <li data-target="#myCarousel" data-slide-to="1" :class="{'active':curNav==1}" @click="navTab(1)"><span>周榜</span></li>
                                    <li data-target="#myCarousel" data-slide-to="2" :class="{'active':curNav==2}" @click="navTab(2)"><span>热文</span></li>
                                </ol>
                                <!-- 轮播（Carousel）项目 -->
                                <div class="carousel-inner h350">
                                    <div class="item slide-item2" :class="carouse0">
                                        <div class="table-warp">
                                            <div class="rank mb5 fs16 fw7 clearfix">
                                                <div class="fl rk1">排名</div>
                                                <div class="fl rk2">账号</div>
                                                <div class="fl rk3">WCI</div>
                                            </div>
                                            <ul class="rank bd por">
                                                <li class="clearfix" v-for="(item,index) in rankList.day" :key="index">
                                                    <div class="fl rk1 ac mt6">
                                                        <i class="num" :class="'num'+(index+1)">{{index+1}}</i>
                                                    </div>
                                                    <div class="fl rk2">
                                                        <!-- <div class="img fl" v-if="item.url!=underfined"><img :src="item.url"></div> -->
                                                        <div class="fem fl">
                                                            <span class="ovhidden ">{{item.nickname}}</span>
                                                            <span class="ovhidden crb8">{{item.wx_name}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="fl rk3 mt6">{{filterNum(item.ci)}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="item slide-item1" :class="carouse1">
                                        <div class="table-warp">
                                            <div class="rank mb5 fs16 fw7 clearfix">
                                                <div class="fl rk1">排名</div>
                                                <div class="fl rk2">账号</div>
                                                <div class="fl rk3">WCI</div>
                                            </div>
                                            <ul class="rank bd por">
                                                <li class="clearfix" v-for="(item,index) in rankList.week" :key="index">
                                                    <div class="fl rk1 ac mt6">
                                                        <i class="num" :class="'num'+(index+1)">{{index+1}}</i>
                                                    </div>
                                                    <div class="fl rk2">
                                                        <!-- <div class="img fl" v-if="item.url!=underfined"><img :src="item.url"></div> -->
                                                        <div class="fem fl">
                                                            <span class="ovhidden ">{{item.nickname}}</span>
                                                            <span class="ovhidden crb8">{{item.wx_name}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="fl rk3 mt6">{{filterNum(item.ci)}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="item slide-item1" :class="carouse2">
                                        <div class="table-warp">
                                            <div class="rank mb5 fs16 fw7 clearfix">近七天热文</div>
                                            <ul class="rank bd por" @click="handleClick($event,2)">
                                                <li class="news-li clearfix" v-for="(item,index) in rankList.news" :key="index">
                                                   <div class="">
                                                        <p class="ovhidden fs16" :data-title="item.news_title" :data-cont="item.news_content" :data-time="item.news_posttime" :data-auth="item.news_author" @click="showDetail(item.news_title,item.news_content,item.news_posttime,item.news_author)"><i class="num ac" :class="'num'+(index+1)">{{index+1}}</i>{{item.news_title}}</p>
                                                        <span class="ovhidden crb8 mt6"><span>作者：{{item.news_author}}</span><span class="ml20">{{item.news_posttime}}</span></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
           
        </div>
        <Dialog ref="aticleDialog" width="1280" title="">
            <div slot="mdBox">
                <h4 class="atiTit ac fs28 mb28">{{artTitle}}</h4>
                <p class="atiTit mt27"><span>{{artAuth}}</span><span class="ml20">{{artTime}}</span></p>
                <vue-scroll class="mt27" :ops="ops" :style="'width:100%;height:'+opsHeight+'px'">
                    <div class="atiCont" v-html="artContent" ref="cont">{{artContent}}</div>
                </vue-scroll>
            </div>
        </Dialog>
        <Dialog ref="reportDialog" width="1280" title="">
            <div slot="mdBox">
                <vue-scroll class="mt27" :ops="ops" :style="'width:100%;height:'+opsHeight+'px'">
                    <div class="atiCont" v-if="artImg!=''"><img :src="artImg" alt=""></div>
                </vue-scroll>
            </div>
        </Dialog>
	</div>
</template>
<script>
 import cloudChart from '../components/wordCloud.vue';
 import vueSeamlessScroll from 'vue-seamless-scroll';
 import QRCode from "qrcodejs2";
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import Dialog from '../components/dialog.vue';

 const ipcRenderer = require('electron').ipcRenderer;
 const crypto = require('crypto');
 const storage = require('electron-localstorage');
 const fs = require('fs');

export default {
    components:{
        cloudChart,vueSeamlessScroll,QRCode,swiper,swiperSlide,Dialog
    },
    data() {
        const vm = this
        return {
            animate:{
                anim1:true,
                anim2:true,
                anim3:true,
            },
            wxList:[],//清华大学微信公众号列表
            wbAcount:[],//官方微博账号列表
            wbList:[],//清华大学微博列表
            newsList:[],//清华新闻网列表
            reportList:[],//校报展示
            buildList:[],//党建动态
            hotList:[],//热点新闻列表
            communiList:[],//全球传播列表
            mediaList:[],//全球传播列表新媒体
            defaultWords:[],//热门词云
            scrollList:[],
            rankList:{},//融媒体联盟榜单
            hotList:[],//矩阵热文
            curNav:0,
            carouse0:'active',
            carouse1:'',
            carouse2:'',
            timer:null,
            timeOut:null,
            yqCurNav:0,    //全球传播列表切换
            yqCarouse0:'active',
            yqCarouse1:'',
            yqTimer:null,
            yqTimeOut:null,
            isShowTran:false,
            bkCurNav:0,    //校报展示切换
            bkCarouse0:'active',
            bkCarouse1:'',
            bkTimer:null,
            bkTimeOut:null,
            isShowReport:false,
            firstTime:true,
            firstTime2:true,
            videoList:[],//视频列表
            dyVideoList:[],//抖音视频列表
            vLen:0,//视频列表个数
            vLen2:0,//抖音视频列表个数
            currVideo:0,  //当前播放的视频个数
            dyCurr:0,  //当前播放的抖音视频个数
            lvId:'',
            videoSrc:'',//当前播放视频
            dyVideoSrc:'',//当前播放抖音视频
            firstTime2:true,
            swiperOption:{
                slidesPerView: 4,
                slidesPerGroup: 4,
                loop:true,
                loopFillGroupWithBlank: true,
                autoplay: {
                    delay: 30000,
                    disableOnInteraction: false,
                },
                speed:600, //config参数同swiper4,与官网一致
                pagination :{
                    el: '.swiper-pagination',
                    clickable :true,
                },
                on:{
                    click: function(e){
                        if(e.srcElement.currentSrc!=undefined){
                            vm.showReport(e.srcElement.currentSrc)   //要执行函数
                        }
                    }
                  },
            },
            artTitle:'',//文章标题
            artAuth:'',//文章作者
            artTime:'',//文章时间
            artContent:'',//文章内容
            artImg:'',//文章内容
            ops: {
                vuescroll: {},
                scrollPanel: {
                    scrollingX: false,
                },
                rail: {
                    keepShow:true
                },
                bar: {
                    hoverStyle: true,
                    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                    background: '#c4c4cc',
                }
            },
            opsHeight:'700',
            videoSet:0,  //视频设置 0.默认播放 1.默认暂停
            douyinSet:0,  //抖音设置 0.默认播放 1.默认暂停
        }
    },
    created() {
        let that = this;
        that.configAjax();
        // that.allAjax();
        // that.overseaAjax();
    },
    mounted() {
		let that = this;
        that.$nextTick(()=> {
            that.allAjax();
            that.reportAjax();
            that.overseaAjax();
            that.rankAjax();//融媒体联盟榜单
            that.wordCloudAjax();//热门词云
            that.videoAjax();
            setInterval(() => {
                that.$refs.cloudChart.init();
            }, 10000);
            setInterval(that.haveChange,60000)

            var myVideo=document.getElementById("video_id");
            myVideo.addEventListener('error',function(){
                if(that.videoSrc){
                    var fileId = crypto.createHash('md5').update(that.videoSrc).digest("hex");
                    var filepath = storage.getItem(fileId);
                    try{
                        fs.accessSync(filepath,fs.constants.F_OK)
                        that.videoSrc = 'file://' + filepath
                    }catch(err){

                    }
                }
            });
            var myVideo2=document.getElementById("video_id2");
            myVideo2.addEventListener('error',function(){
                if(that.dyVideoSrc){
                    var fileId = crypto.createHash('md5').update(that.dyVideoSrc).digest("hex");
                    var filepath = storage.getItem(fileId);
                    console.log('dyVideoSrc:'+filepath)
                    try{
                        fs.accessSync(filepath,fs.constants.F_OK)
                        that.dyVideoSrc = 'file://' + filepath
                    }catch(err){

                    }
                }
            });
        }) 
    },
    computed: {
        optionSetting () {
            return {
                step: 4, // 数值越大速度滚动越快
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight: 74, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime: 3000 // 单步运动停止的时间(默认值1000ms)
            }
        },
        optionSetting1() {
            return {
                step: 4, // 数值越大速度滚动越快
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight: 74, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime: 4000 // 单步运动停止的时间(默认值1000ms)
            }
        },
        optionSetting2() {
            return {
                step:4, // 数值越大速度滚动越快
                openWatch: true,
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight: 72, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime: 3600 // 单步运动停止的时间(默认值1000ms)
            }
        },
        optionSetting4() {
            return {
                step:4, // 数值越大速度滚动越快
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight: 82, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime: 3800 // 单步运动停止的时间(默认值1000ms)
            }
        },
        optionSetting3() {
            return {
                step:4, // 数值越大速度滚动越快
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight:40, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime:4200 // 单步运动停止的时间(默认值1000ms)
            }
        },
        optionSetting5() {
            return {
                step:4, // 数值越大速度滚动越快
                openWatch: true,
                direction: 1, // 0向下 1向上 2向左 3向右
                singleHeight: 72, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                waitTime: 4490 // 单步运动停止的时间(默认值1000ms)
            }
        },
    },

    methods: {
        time(t){
            let tm = t.split(' ')[0];
            return tm.split('-').join('/');
        },
        filterNum(val){
            return parseFloat(val).toFixed(2)
        },
        haveChange(){
            let that = this;
            that.configAjax()
            that.wordCloudAjax();
            that.videoAjax();
        },
        configAjax(){
            let that = this;
             that.$api.get('config',null,r =>{
                that.$parent.returnCode(r,function(){
                    let data = r.data;
                    // that.videoSet = data.video_setting;
                    let video = document.getElementById("video_id");
                    if(that.videoSet==0){
                        video.play();
                    }else{
                        video.pause();
                    }
                    // that.douyinSet = data.douyin_status;
                    let video2 = document.getElementById("video_id2");
                    if(that.douyinSet==0){
                        video2.play();
                    }else{
                        video2.pause();
                    }
                })
            });
        },
        //微信，微博，新闻网，热文
        allAjax () {
            let that = this;
            that.$api.get('index',null,r =>{
                that.$parent.returnCode(r,function(){
                    let data = r.data;
                    let wxLen = parseInt(data.wx_data.length/2)*2;
                    that.wxList = data.wx_data.slice(0,wxLen);
                    that.wbAcount = data.weibo_account;
                    let wbLen = parseInt(data.weibo_data.length/2)*2;
                    that.wbList = data.weibo_data.slice(0,wbLen);
                    that.newsList = data.web_data;
                    data.hot_data.forEach((item,index)=>{
                        item.ind = index+1;
                    })
                    that.hotList = data.hot_data;

                    localStorage.setItem('wxList',JSON.stringify(that.wxList))
                    localStorage.setItem('wbAcount',JSON.stringify(that.wbAcount))
                    localStorage.setItem('wbList',JSON.stringify(that.wbList))
                    localStorage.setItem('newsList',JSON.stringify(that.newsList))
                    localStorage.setItem('hotList',JSON.stringify(that.hotList))
                })
            },null,e => {
                let that = this;
                let wxList = JSON.parse(localStorage.getItem('wxList'))
                let wbAcount = JSON.parse(localStorage.getItem('wbAcount'))
                let wbList = JSON.parse(localStorage.getItem('wbList'))
                let newsList = JSON.parse(localStorage.getItem('newsList'))
                let hotList = JSON.parse(localStorage.getItem('hotList'))

                if(wxList) that.wxList = wxList
                if(wbAcount) that.wbAcount = wbAcount
                if(wbList) that.wbList = wbList
                if(newsList) that.newsList = newsList
                if(hotList) that.hotList = hotList
            });
        },
        reportAjax(){
            let that = this;
            that.$api.get('get-xiaobao',null,r =>{
                that.$parent.returnCode(r,function(){
                    let data = r.data
                    that.reportList = data.img_data;
                    that.buildList = data.news_data;
                    that.bkTimer = setTimeout(that.bkScroll,38000,1)

                    that.reportList.forEach(element => {
                        console.log(element)
                        ipcRenderer.send('download', element.img_url)
                    });

                    localStorage.setItem('reportList',JSON.stringify(that.reportList))
                    localStorage.setItem('buildList',JSON.stringify(that.buildList))
                })
            },null,e => {
                let that = this;
                let reportList = JSON.parse(localStorage.getItem('reportList'))
                let buildList = JSON.parse(localStorage.getItem('buildList'))

                if(reportList) that.reportList = reportList
                if(buildList) that.buildList = buildList
                that.bkTimer = setTimeout(that.bkScroll,38000,1)
            });
        },
        //全球传播Global Communication
        overseaAjax(){
            let that = this;
            that.$api.get('oversea',null,r =>{
                that.$parent.returnCode(r,function(){
                    let data = r.data
                    that.communiList = data.news;
                    that.mediaList = data.media;
                    that.yqTimer = setTimeout(that.yqScroll,36000,1)

                    localStorage.setItem('communiList',JSON.stringify(that.communiList))
                    localStorage.setItem('mediaList',JSON.stringify(that.mediaList))
                })
            },null,e => {
                let that = this;
                let communiList = JSON.parse(localStorage.getItem('communiList'))
                let mediaList = JSON.parse(localStorage.getItem('mediaList'))

                if(communiList) that.communiList = communiList
                if(mediaList) that.mediaList = mediaList
                that.yqTimer = setTimeout(that.yqScroll,36000,1)
            });
        },
        //融媒体联盟榜单
        rankAjax(){
            let that = this;
            that.$api.get('get-rank',null,r =>{
                that.$parent.returnCode(r,function(){
                    if(r.data != null){
                        that.rankList.day = r.data.day.slice(0,5);
                        that.rankList.week = r.data.week.slice(0,5);
                        that.rankList.news = r.data.news.slice(0,5);
                        that.timer = setTimeout(that.scroll,20000,1)

                        console.log(that.rankList)
                        localStorage.setItem('rankList',JSON.stringify(that.rankList))
                    }
                })
            },null,e => {
                let that = this;
                let rankList = JSON.parse(localStorage.getItem('rankList'))
                if(rankList) that.rankList = rankList
            })
        },
        wordCloudAjax(){
            let that = this;
            that.$api.get('get-word',null,r =>{
                that.$parent.returnCode(r,function(){
                    if(that.defaultWords.length<=0){
                        that.defaultWords = r.data
                    }else{
                        if(JSON.stringify(that.defaultWords)!=JSON.stringify(r.data)){
                            that.defaultWords = r.data
                        }
                    }
                    localStorage.setItem('defaultWords',JSON.stringify(that.defaultWords))
                })
            },null,e => {
                let that = this;
                let defaultWords = JSON.parse(localStorage.getItem('defaultWords'))
                if(defaultWords) that.defaultWords = defaultWords
            })
        },
        //本地视频
        play(id){
            let that = this;
            if(that.firstTime){
                that.firstTime=false;
                that.currVideo = 1;
            }
            let video = document.getElementById(id);
            that.videoSrc = that.videoList[that.currVideo].video_url;
            video.load(); 
            video.play();
            that.currVideo++;
            if(that.currVideo >= that.vLen){
                that.currVideo = 0; // 播放完了，重新播放 
            }
        },
        videoAjax(){
            let that = this;
            that.$api.get('get-video',null,r =>{
                that.$parent.returnCode(r,function(){
                    if(that.videoList.length<=0){
                        that.videoList = r.data.video;
                    }else{
                        if(JSON.stringify(that.videoList)!=JSON.stringify(r.data.video)){
                            that.videoList = r.data.video;
                        }else{
                            return
                        }
                    }
                    localStorage.setItem('videoList',JSON.stringify(that.videoList))
                    that.videoList.forEach(element => {
                        console.log(element)
                        ipcRenderer.send('download', element.video_url)
                    });


                    that.dyVideoList = r.data.douyin;
                    // that.dyVideoList.shift()
                    that.dyVideoList.forEach(element => {
                        console.log(element)
                        ipcRenderer.send('download', element.local_url)
                    });
                    localStorage.setItem('dyVideoList',JSON.stringify(that.dyVideoList))
                    
                    that.vLen = that.videoList.length;//播放列表的长度
                    let video = document.getElementById("video_id");
                    that.videoSrc = that.videoList[0].video_url;
                    video.load();
                    video.play();
                    that.lvId = that.videoList[0].id;
                    video.addEventListener('ended', function(){
                        that.play('video_id');
                    });
                    that.dyVideoAjax();
                })
             },null,e => {
                let that = this
                let videoList = JSON.parse(localStorage.getItem('videoList'))
                let dyVideoList = JSON.parse(localStorage.getItem('dyVideoList'))

                if(videoList) that.videoList = videoList
                if(dyVideoList) that.dyVideoList = dyVideoList

                that.vLen = that.videoList.length;//播放列表的长度
                let video = document.getElementById("video_id");
                if(!that.videoSrc){
                    that.videoSrc = that.videoList[0].video_url;
                    video.load();
                    video.play();
                }
                that.lvId = that.videoList[0].id;
                video.addEventListener('ended', function(){
                    that.play('video_id');
                });
                if(!that.dyVideoSrc){
                    that.dyVideoAjax();
                }
            })
        },
        play2(id){
            let that = this;
            if(that.firstTime2){
                that.firstTime2=false;
                that.dyCurr = 1;
            }
            document.getElementById("qrcode").innerHTML='';
            that.qrcode();
            let video = document.getElementById(id);
            that.dyVideoSrc = that.dyVideoList[that.dyCurr].local_url;
            video.load(); 
            video.play();
            that.dyCurr++;
            if(that.dyCurr >= that.vLen2){
                that.dyCurr = 0; // 播放完了，重新播放 
             }
         },
        qrcode() {
            let that = this;
            let qrcode = new QRCode('qrcode', {
                width: 126,
                height: 126,        // 高度
                text: that.dyVideoList[that.dyCurr].short_url,   // 二维码内容
            })
        },   
        dyVideoAjax(){
            let that = this;
            //that.dyVideoList =[ 'static/images/i/movie.ogg','static/images/i/movie.mp4', 'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300fcc0000bldqfe1q8b1hnh4kjrg0&amp;line=0'];
            that.vLen2 = that.dyVideoList.length;//播放列表的长度
            let video = document.getElementById("video_id2");
            that.qrcode();
            that.dyVideoSrc = that.dyVideoList[0].local_url;
            video.load();
            video.play();
            // video.addEventListener("play",function(){
            //     $("#poster_img2").hide();
            // });
            video.addEventListener('ended', function(){
                that.play2('video_id2');
            });
        },
        bkScroll(type){
            let that = this;
            let prevNav = that.bkCurNav;
            that.isShowReport = true;
            that.bkCurNav = type;
            clearTimeout(that.bkTimeOut);
            that['bkCarouse'+prevNav] = 'active left';
            that['bkCarouse'+type] = 'next';
            setTimeout(function(){
                that['bkCarouse'+type] = 'next left';
            },50);
            that.bkTimeEnd(type,prevNav);
        },
        bkNavTab(type){
            let that = this;
            that.isShowReport = true;
            if(that.bkCurNav===type){
                return
            }
            let prevNav = that.bkCurNav;
            that.bkCurNav = type;
            clearTimeout(that.bkTimeOut);
            clearTimeout(that.bkTimer);
            for(let i=0;i<2;i++){
                that['bkCarouse'+i] = '';
            }
            if(prevNav<type){
                that['bkCarouse'+prevNav] = 'active left';
                that['bkCarouse'+type] = 'next';
            }else if(prevNav>type){
                that['bkCarouse'+type] = 'prev';
                that['bkCarouse'+prevNav] = 'active right';
            }
            setTimeout(function(){
                if(prevNav<type){
                    that['bkCarouse'+type] = 'next left';
                }else if(prevNav>type){
                    that['bkCarouse'+type] = 'prev right';
                }
            },1);
            that.bkTimeEnd(type,prevNav);
        },
        bkTimeEnd(type,prevNav){
            let that = this;
            that.bkTimeOut = setTimeout(function(){
                that['bkCarouse'+prevNav] = '';
                that['bkCarouse'+type] = 'active';
    
                clearTimeout(that.bkTimer);
                type++;
                let tempType = (type>1)?0:type;
                that.bkTimer = setTimeout(that.bkScroll,38000,tempType)
            },1000);
        },
        yqScroll(type){
            let that = this;
            let prevNav = that.yqCurNav;
            that.isShowTran = true;
            that.yqCurNav = type;
            clearTimeout(that.yqTimeOut);
            that['yqCarouse'+prevNav] = 'active left';
            that['yqCarouse'+type] = 'next';
            setTimeout(function(){
                that['yqCarouse'+type] = 'next left';
            },50);
            that.yqTimeEnd(type,prevNav);
        },
        yqNavTab(type){
            let that = this;
            that.isShowTran = true;
            if(that.yqCurNav===type){
                return
            }
            let prevNav = that.yqCurNav;
            that.yqCurNav = type;
            clearTimeout(that.yqTimeOut);
            clearTimeout(that.yqTimer);
            for(let i=0;i<2;i++){
                that['yqCarouse'+i] = '';
            }
            if(prevNav<type){
                that['yqCarouse'+prevNav] = 'active left';
                that['yqCarouse'+type] = 'next';
            }else if(prevNav>type){
                that['yqCarouse'+type] = 'prev';
                that['yqCarouse'+prevNav] = 'active right';
            }
            setTimeout(function(){
                if(prevNav<type){
                    that['yqCarouse'+type] = 'next left';
                }else if(prevNav>type){
                    that['yqCarouse'+type] = 'prev right';
                }
            },1);
            that.yqTimeEnd(type,prevNav);
        },
        yqTimeEnd(type,prevNav){
            let that = this;
            that.yqTimeOut = setTimeout(function(){
                that['yqCarouse'+prevNav] = '';
                that['yqCarouse'+type] = 'active';
    
                clearTimeout(that.yqTimer);
                type++;
                let tempType = (type>1)?0:type;
                that.yqTimer = setTimeout(that.yqScroll,36000,tempType)
            },1000);
        },
        scroll(type){
            let that = this;
            let prevNav = that.curNav;
            that.curNav = type;
            clearTimeout(that.timeOut);
            that['carouse'+prevNav] = 'active left';
            that['carouse'+type] = 'next';
            setTimeout(function(){
                that['carouse'+type] = 'next left';
            },50);
            that.timeEnd(type,prevNav);
        },
        navTab(type){
            let that = this;
            if(that.curNav===type){
                return
            }
            let prevNav = that.curNav;
            that.curNav = type;
            clearTimeout(that.timeOut);
            clearTimeout(that.timer);
            for(let i=0;i<3;i++){
                that['carouse'+i] = '';
            }
            if(prevNav<type){
                that['carouse'+prevNav] = 'active left';
                that['carouse'+type] = 'next';
            }else if(prevNav>type){
                that['carouse'+type] = 'prev';
                that['carouse'+prevNav] = 'active right';
            }
            setTimeout(function(){
                if(prevNav<type){
                    that['carouse'+type] = 'next left';
                }else if(prevNav>type){
                    that['carouse'+type] = 'prev right';
                }
            },1);
            that.timeEnd(type,prevNav);
            
        },
        timeEnd(type,prevNav){
            let that = this;
            that.timeOut = setTimeout(function(){
                that['carouse'+prevNav] = '';
                that['carouse'+type] = 'active';
    
                clearTimeout(that.timer);
                type++;
                let tempType = (type>2)?0:type;
                that.timer = setTimeout(that.scroll,30000,tempType)
            },1000);
        },
        showDetail(title,content,time,auth){
            let that = this;
            that.artTitle = title;
            that.artContent = content;
            that.artAuth= auth;
            that.artTime = time;
            //that.opsHeight = that.$refs.cont.offsetHeight;
            that.$refs.aticleDialog.showMaskFun();  
        },
        showReport(img){
            let that = this;
            that.artImg = img;
            that.$refs.reportDialog.showMaskFun();  
        },
        findLocalImg(src){
            var fileId = crypto.createHash('md5').update(src).digest("hex");
            var filepath = storage.getItem(fileId);
            console.log(filepath)
            try{
                fs.accessSync(filepath,fs.constants.F_OK)
                event.target.src =  'file://'+filepath
            }catch(err){

            }
        },
        handleClick(event,num){
            let that = this;
            let content = event.target.dataset.cont;
            
            if(content==undefined){return}
            if(num==1){
                that.showDetail('',content,'','')
            }else{
                let title = event.target.dataset.title;
                let time = event.target.dataset.time;
                let auth = event.target.dataset.auth;
                that.showDetail(title,content,time,auth)
            }
            
        }
	}
}
</script>
