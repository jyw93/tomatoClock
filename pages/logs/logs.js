//logs.js
import {formatTime} from '../utils/util'

Page({
  data: {
    logs: [],
    activeIndex:0,
    dayList:[],
    list:[],
    sum:[
      {
        title:'今日番茄次数',
        val:'0'
      },
      {
        title:'累计番茄次数',
        val:'0'
      },
      {
        title:'今日专注时长',
        val:'0分钟'
      },
      {
        title:'累计专注时长',
        val:'0分钟'
      }
    ],
    cateArr:[
      {
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: '学习'
      },
      {
        icon: 'think',
        text: '思考'
      },
      {
        icon: 'write',
        text: '写作'
      },
      {
        icon: 'sport',
        text: '运动'
      },
      {
        icon: 'read',
        text: '阅读'
      }
    ],
  },
  onShow: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    var logs = wx.getStorageSync('logs') || [];
    var day = 0;
    var total = logs.length;
    var dayTime = 0;
    var totalTime = 0;
    var dayList = [];
    
       if(logs.length > 0){
        for(var i = 0;i < logs.length;i++){
          let a = logs[i].date + ""
          let b = formatTime(new Date) + ""
          console.log(logs[i].date)
          console.log(formatTime(new Date))
            if(a.slice(0,10) == b.slice(0,10)){
             console.log(formatTime(new Date))
              day = day + 1;
              dayTime = dayTime + parseInt(logs[i].time);
              dayList.push(logs[i]);
              this.setData({
                dayList:dayList,
                list:dayList
              })
            }
          totalTime = totalTime + parseInt(logs[i].time);
        }
        this.setData({
          'sum[0].val':day,
          'sum[1].val':total,
          'sum[2].val':dayTime+'分钟',
          'sum[3].val':totalTime+'分钟'
        })
      }
    
     
  },
  changeType:function(e){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      this.setData({
        list:this.data.dayList
      })
    }else if(index == 1){
      var logs = wx.getStorageSync('logs') || [];
      this.setData({
        list:logs
      })
    }
    this.setData({
      activeIndex:index
    })
  }
})
