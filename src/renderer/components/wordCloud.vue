<template>
    <div class="echart" :id="id"></div>
</template>
<script>
export default {
    name:'cloudChart',
    data(){
         return {
             chart:''
         }
    },
    props: {
        id:{
            type:String
        },
        dataArray: { 
            type: Array | Object
        }
    },
    mounted() {
        let that = this
        that.$nextTick(()=> {
            that.init();
        })
    },
    watch: {
        'dataArray': function (n, o) {
            this.init();
        }
    },
    methods: {
        cloudOption:function(){
            let _this = this;
            
            let option = {
                tooltip: {
                    show: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {},
                //     },
                //     right:_this.cuozu,
                // },
                
                series: [
                {
                    name: "",
                    type: "wordCloud",
                    size: ["100%", "100%"],
                    rotationRange: [0, 0],
                    sizeRange: [16, 36],
                    width: '100%',
                    height: '90%',
                    gridSize: 10,
                    autoSize: {
                        enable: true,
                        minSize: 16
                    },
                    textStyle: {
                        normal: {
                            color: function() {
                               let color = ["#ffd70f","#00bbff","#ff0000","#23d892","#cfdae5","#8000ff"];
                               let len = color.length;
                               return color[parseInt(Math.random()*len)];
                            // return (
                            //     "rgb(" +
                            //     Math.round(Math.random() * 195 + 60) +
                            //     ", " +
                            //     Math.round(Math.random() * 195 + 60) +
                            //     ", " +
                            //     Math.round(Math.random() * 195 + 60) +
                            //     ")"
                            // );
                            }
                        }
                    },
                    data: _this.dataArray
                }
                ]
            };
            return option;
        },
        init(){
            let _this = this;
            _this.$echarts.init(document.getElementById(_this.id)).dispose();
            _this.chart = _this.$echarts.init(document.getElementById(_this.id));
            _this.chart.setOption(_this.cloudOption());
        },
    },
}
</script>
<style scoped>
    .echart{width:100%;height:100%;margin:0% 0 0 0%}
</style>