<template>
<!-- 省市区 -->
    <div class="modal" v-show="showMask" @mousemove="move">
        <div class="modal-bg"></div>
        <div class="modal-content" ref="monthPie" :style="type != 'normal' ? 'width:340px;height:'+height+'px;margin-left:-170px;' : widthStyle">
            <div class="modal-header">
                <span class="fl">{{title}}</span>
                <a class="close fs32 fr" v-if="closeBtn" heaf="javascript:void(0);" @click="closeMask">&times;</a>
            </div>
            <div class="modal-warp">
                <slot name="mdBox"></slot>
            </div>
            <!-- <div class="modal-footer ac" v-if="modalFoot">
                <div v-if="type == 'alert'">
                    <button class="btn btn-blue" @click="dangerBtn">{{btnText}}</button>
                </div>
                <div v-if="type != 'alert'">
                    <button class="btn btn-blue" @click="dangerBtn">{{btnText}}</button>
                    <button class="btn btn-none" id="closeModal" @click="closeMask" v-if="closeBtn">{{cancelText}}</button>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: "Dialog",
    props:{
        // dialogShow:{
        //     type:Boolean,
        //     default: true,
        // },
        title:{
            type:String,
            default:function(){
                return '提示';
            }, 
        },
        level:{
            type:String,
            default:function(){
                return '2';
            }, 
        },
        width:{
            type:String,
            default:function(){
                return '340';
            }, 
        },
        type:{
            type:String,
            default:function(){
                return 'normal';
            }, 
        },
        modalFoot:{
            type:Boolean,
            default: true
        },
        closeBtn:{
            type:Boolean,
            default: true
        },
        btnText:{
            type:String,
            default:function(){
                return '确定';
            }, 
        },
        callback:{
            type:Function
        }
    },
    data() {
        return {
            showMask: false,
            timer:'',
            loadText:'请稍后.',
            widthStyle:'',
            height:'',
            cancelText:'取消',
            diff:30000,//未操作触发间隔
            firstTime : new Date().getTime(),
            lastTime : new Date().getTime(),
            indulge : false,//阀门
            timer:null
        }
    },
    mounted() {
        // this.showMask = this.value;
        this.widthStyle = 'width:'+this.width+'px;margin-left:-'+this.width/2+'px';
        //this.mouseStop();
    },
    created() {
		
    },
    methods: {
        //打开弹框
        showMaskFun () {
            let that = this;
            that.showMask = true;
            setTimeout(() => {
                let h = that.$refs.monthPie.offsetHeight;
                if(h%2 != 0){
                    h++;
                    that.height = h;
                }
                that.widthStyle = 'width:'+that.width+'px;height:'+that.height+'px;margin-left:-'+that.width/2+'px';
                // that.$refs.monthPie.offsetHeight = that.height;
            }, 10);
            that.move();
            that.mouseStop();
        },
        closeMask(){
            let that = this
            that.$parent.$refs['cont'].scrollTo({
                y: '0'
            },0);
            that.$parent.$refs['cont1'].scrollTo({
                y: '0'
            },0);
            this.showMask = false;
            clearInterval(this.timer);
            // this.height = '';
            // $(".modal-content").height(this.height);
        },
        dangerBtn(){
            let that = this;
            // if(that.load == true){
            //     return;
            // }
            if(that.type === 'alert'){
                this.showMask = false;
                return;
            }
            let num = 0;
            this.callback();
            // setTimeout(() => {
            //     if(this.dialogShow == true){
            //         this.closeMask();
            //     }
            // }, 1);
        },
        //鼠标移时间
        move(){
            let that = this;
            that.indulge = true;
            that.firstTime = new Date().getTime();
        },
        mouseStop(){
            let that = this;
            that.timer = setInterval(function () {
                that.lastTime = new Date().getTime();
                if ((that.lastTime - that.firstTime) > that.diff && that.indulge) {
                    that.indulge = false;
                    that.closeMask();
                }
            }, 1000);
        }
    }
}
</script>
<style scoped>
    .modal{position:absolute;top:0;left:0;width:100%;height:100%;z-index:999;color: #333}
    .modal-bg{width:100%;height:100%;background:rgba(0,0,0,.5);}
    .modal-content{position:absolute;top:50%;left:50%;transform:translate(0,-50%);background:#fff;border-radius:4px;overflow: hidden;}
    .modal-header{height:45px;padding:0 16px;line-height:44px;}
    .modal-header .close{width:36px;height:36px;margin:11px 0;line-height: 32px;background-color: #ddd;border-radius: 50%;cursor: pointer;text-align: center}
    .modal-header .close img{margin:4px;}
    .modal-warp{padding:0 24px 24px;}
    .modal-footer{padding:8px 0 24px;}
    .modal-footer .btn{width:92px;margin:0 8px;}
</style>
