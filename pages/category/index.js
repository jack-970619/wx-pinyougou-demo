// pages/category/index.js
import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        leftMemuList:[], //左侧的菜单数据
        rightContent:[], //右侧的商品数据
        currentIndex: 0, //被点击的左侧的菜单
        scrollTop: 0, //右侧内容的滚动条距离顶部的距离
    },
    //接口的返回数据
    cates:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取本地存储中的数据 (小程序中也是存在本地存储技术)
        const Cates = wx.getStorageSync('cates');
        if (!Cates) {
            // 如果不存在 则发起请求获取数据
            this.getCates()
        }else{
            // 有旧的数据 定义过期时间 10s
            if (Date.now() - Cates.time > 1000*10) {
                this.getCates()
            } else{
                // 可以使用旧的数据
                this.cates = Cates.data
                // 构造左侧的大菜单数据
                let leftMemuList = this.cates.map(v=>v.cat_name)
                //构造右侧的商品数据 默认第一个
                let rightContent = this.cates[0].children
                this.setData({
                    leftMemuList,
                    rightContent
                })
            }
        }
    },

    // 获取分类数据
    async getCates() {
        const data = await request({url:"/categories"})
        console.log(data)
        this.cates = data
        console.log(this.cates)

        // 把接口的数据存入到本地存储中
        wx.setStorageSync('cates', {time:Date.now(),data:this.cates});

        // 构造左侧的大菜单数据
        let leftMemuList = this.cates.map(v=>v.cat_name)
        //构造右侧的商品数据 默认第一个
        let rightContent = this.cates[0].children
        this.setData({
            leftMemuList,
            rightContent
        })
    },

    //获取选中商品的索引
    handleItemTap(options) {
        let currentIndex = options.currentTarget.dataset.index
        //构造右侧的商品数据 默认第一个
        let rightContent = this.cates[currentIndex].children
        this.setData({
            currentIndex,
            rightContent,
            scrollTop: 0
        })
    }
})