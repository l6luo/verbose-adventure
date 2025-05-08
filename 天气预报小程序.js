
Page({
  data:{
    city:'',
    weatherData:null
  },
  inputCity:function(e){
    this.setData({
      city:e.detail.value
    });
  },
  searchWeather:function(){
    const that = this;
    if (!this.data.city){
      wx.showToast({
        title: '请输入城市名称',
        icon:'none'
      });
      return;
    }

    wx.showLoading({
      title: '加载中',
    });

    setTimeout(() => {
      wx.hideLoading();
      that.setData({
        weatherData:{
          city:that.data.city,
          temp:Math.round(Math.random() * 30),
          weather:['晴','多云','阴','小雨','大雨'][Math.floor(Math.random()*5)]
        }
      });
    },1000);
  }
});
//  使用和风天气API示例
const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event) =>{
  const {city} = event
  const res=await axios.get(`https://api.qweather.com/v7/weather/now?location=${city}&key= `)
  return res.data
} 
// 小程序端调用
wx.cloud.callFunction({
  name:'weather',
  data:{city:'北京'}
})