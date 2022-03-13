// index.js

const app = getApp()
import {formatTime} from '../utils/util'
Page({
    data: {
        clockShow: false,
        time: "5",
        mTime:300000,
        rate:"",
        timeStr:"05:00",
        timer:null,
        cateArr: [
            {
                icon:"gongzuo.png",
                text:"工作",
            },
            {
                icon:"xuexi.png",
                text:"学习",
            },
            {
                icon:"xiezuo.png",
                text:"写作",
            },
            {
                icon:"yuedu.png",
                text:"阅读",
            },
            {
                icon:"yule.png",
                text:"娱乐",
            }
        ],
        cateActive: "0",
        clockHeight: 0,
        indexHeight: 0,
        okShow:false,
        pauseShow:true,
        continueCancleShow:false
    },
    onLoad: function() {
        var res = wx.getSystemInfoSync();
        var rate = 750 / res.windowWidth;
        
        this.setData({
            rate:rate,
            clockHeight:rate*res.windowHeight,
        })
    },
    slideChange: function(e){
        this.setData({
            time:e.detail.value,
            
        })
    },

    start: function(){
          this.setData({
              clockShow:true,
              mTime:this.data.time*60*1000,
              timeStr:parseInt(this.data.time) >= 10 ? this.data.time+ ":00" :"0" +this.data.time + ":00"
          })
          this.drawBg();
          this.drawActive();
    },

    clickCate: function(e){
        console.log(e)
        this.setData({
            cateActive:e.currentTarget.dataset.index
        })
   
    },

    drawBg: function() {
        const lineWidth = 6 / this.data.rate;//px
        const query = wx.createSelectorQuery()
        query.select('#progress_bg')
            .fields({ node:true, size: true})
            .exec((res) => {
               const canvas = res[0].node
               const ctx = canvas.getContext('2d')
               const dpr = wx.getSystemInfoSync().pixelRatio
               canvas.width = res[0].width * dpr
               canvas.height = res[0].height * dpr
               ctx.scale(dpr, dpr)
               ctx.lineCap='round'
               ctx.lineWidth="lineWidth"
               ctx.beginPath()
               ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false)
               ctx.strokeStyle ="#000000"
               ctx.stroke()
            })
   },
   drawActive: function() {
       var _this = this;
       var timer = setInterval(function (){
           var angle = 1.5 + 2*(_this.data.time*60*1000 - _this.data.mTime)/(_this.data.time*60*1000);
           var currentTime = _this.data.mTime - 100
           _this.setData({
               mTime:currentTime
           });
           if(angle < 3.5){
               if(currentTime % 1000 == 0){
                   var timeStr1 = currentTime / 1000;//s
                   var timeStr2 = parseInt(timeStr1 / 60); //m
                   var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) :"0" +  (timeStr1 - timeStr2 * 60);
                   var timeStr2 = timeStr2 >= 10 ? timeStr2:"0" + timeStr2;
                   _this.setData({
                    timeStr:timeStr2 + ":" + timeStr3
                   })
                 };
                const lineWidth = 6 / _this.data.rate;//px
                const query = wx.createSelectorQuery()
                query.select('#progress_active')
                .fields({ node:true, size: true})
                .exec((res) => {
                    const canvas = res[0].node
                    const ctx = canvas.getContext('2d')

                    const dpr = wx.getSystemInfoSync().pixelRatio
                    canvas.width = res[0].width * dpr
                    canvas.height = res[0].height * dpr
                    ctx.scale(dpr, dpr)
                    ctx.lineCap='round'
                    ctx.lineWidth="lineWidth"
                    ctx.beginPath()
                    ctx.arc(400/ _this.data.rate/2,400/_this.data.rate/2,400/_this.data.rate/2-2*lineWidth,1.5*Math.PI,angle*Math.PI,false)
                    ctx.strokeStyle ="#ffffff"
                    ctx.stroke()
                    
               })
           } else {
               var logs = wx.getStorageSync("logs") || [];
               _this.setData({
                timeStr:"00:00",
                pauseShow: false,
                continueCancleShow: false,
                okShow: true,
             });
               logs.unshift({
                   date: formatTime(new Date),
                   cate: _this.data.cateActive,
                   time: _this.data.time
               });
               wx.setStorageSync('logs', logs);
               
            clearInterval(timer); 
           }  
       },100);
       _this.setData({
           timer :timer
       })
    },
    pause:function() {
        clearInterval(this.data.timer);
        this.setData({
            pauseShow: false,
            continueCancleShow: true,
            okShow: false
        }) 
    },

    continue:function() {
        this.drawActive();
        this.setData({
            pauseShow: true,
            continueCancleShow: false,
            okShow: false
        })
    },
    
    cancle:function() {
        clearInterval(this.data.timer);
        this.setData({
            clockShow:false,
            pauseShow: true,          
            continueCancleShow: false,
            okShow: false
        })
    },

    ok:function() {
        clearInterval(this.data.timer);
        this.setData({
            clockShow:false,
            pauseShow: true,
            continueCancleShow: false,
            okShow: false
        })
    }
})
