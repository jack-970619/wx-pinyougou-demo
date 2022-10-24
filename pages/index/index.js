// pages/index/index.js
import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [], //轮播图数据
        catesList: [], //导航栏数据
        floorList: [], //楼层数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSwiperList()
        this.getCatesList()
        this.getFloorList()
    },

    //获取轮播图数据
    async getSwiperList(){
        const swiperList = await request({url:'/home/swiperdata'})
        this.setData({
            swiperList
        })  
    },

    //获取分类导航数据
    async getCatesList(){
        const catesList = await request({url:'/home/catitems'})
        this.setData({
            catesList
        })
    },

    //获取楼层数据
    async getFloorList(){
        const floorList = await request({url:'/home/floordata'})
        this.setData({
            floorList
        })
    }
})