let num = 0
export const request = (params) => {
    // 定义公共的URL
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject)=>{
        num+=1;
        wx.showLoading({
          title: '加载中...',
          mask: true,
        })
        wx.request({
            ...params,
            url: baseUrl+params.url,
            success: (result)=>{
                resolve(result.data.message)
                num-=1
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{
                if (num == 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}