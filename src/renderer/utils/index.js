export default {
    data() {
        return {
            aletrTimer:''
        }
    },
    alertText (text,width,time) {
        $(".alertText").remove();
        clearTimeout(this.aletrTimer);
        let html = '<div class="alertText ac" style="width:'+width+'px;"><div class="in">'+text+'</div></div>';
        $("body").append(html);
        if(time == undefined){
            time = 2000;
        }
        this.aletrTimer = setTimeout(() => {
            $(".alertText").remove();
        }, time);
    },
    setScreen(){
        $(function(){
            var cx = window.innerWidth/1920;
            var cy = window.innerHeight/1080;
            $("html").css('transform','scale('+cx+','+cy+')');
            $(window).resize(function () {          //当浏览器大小变化时
                var cx = window.innerWidth/1920;
                var cy = window.innerHeight/1080;
                $("html").css('transform','scale('+cx+','+cy+')');
            });

        });
    }
}