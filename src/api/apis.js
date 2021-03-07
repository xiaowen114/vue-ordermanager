import axios from 'axios';
// 服务器IP
const IP = 'http://127.0.0.1:5000'
// 请求基本路径 
axios.defaults.baseURL = IP
//订单管理

export var orderlist = (params) => axios.get('/order/list', { params })

//获取订单详情
export var OrderListDetails = (params) => axios.get("/order/detail", { params })

//修改订单
export var OrderListSet = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post("/order/edit", { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

//商品列表

//添加分类
export var ShopListAdd = (cateName,state) => axios.post('/goods/addcate',{cateName,state})

//获取分类
export var ShopListGet = (currentPage,pageSize) => axios.get("/goods/catelist", {params:{currentPage,pageSize}})

//删除分类
export var ShopListDel = (id) =>axios.get("/goods/delcate",{params:{id}})

//修改分类
export var ShopListSet = (id, cateName, state) =>axios.post("/goods/editcate",{id, cateName, state})

//查询所有分类名称
export var ShopListSearch = () =>axios.get("/goods/categories")

//商品图片上传接口
export var ShopImg = () =>axios.post("/goods/goods_img_upload")

//添加商品
export var AddShop = (name,category,price,imgUrl,goodsDesc) =>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})

//获取商品列表
export var GetShopList = (params) => axios.get("/goods/list",{params})

//删除商品
export var DelShop = (params) =>axios.get("/goods/del",{params})

//修改商品
export var SetShop = (params) => axios.post("/goods/edit",{params})

//登录
export var Login = (params) => axios.post("/users/checkLogin",params)

//获取账号列表
export var GetAcconutList = (currentPage,pageSize) => axios.get("/users/list",{params:{currentPage,pageSize}})

//删除账号
export var DelAccount = (id) => axios.get('/users/del',{params:{id}}) 

//批量删除  
export var BatchDeleteA = (ids) =>axios.get("/users/batchdel",{params:{ids}})

//检查旧密码是否正确
export var PwdIsRight = (oldPwd,id) => axios.get("/users/checkoldpwd",{params:{oldPwd,id}})

//修改密码
export var SetPassword = (newPwd,id) => axios.post("/users/editpwd",{newPwd,id})

//添加账号
export var AddAccount = (account,password,userGroup) => axios.post("/users/add",{account,password,userGroup})

//获取个人信息
export var GetPersonal = (id) => axios.get("/users/accountinfo",{params:{id}})

//验证token是否过期
export var IsToken = (token) =>axios.get("/users/checktoken",{params:{token}})

//头像上传
export var PictureUpload = (params) =>axios.post("/users/avatar_upload",{params})

//获取店铺数据
export var GetShop = () =>axios.get("/shop/info",{})

//修改店铺数据
export var SetShopDate = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics) =>axios.post("/shop/edit",{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})

//首页报表获取数据
export var IndexEcharts = () => axios.get("/order/totaldata",{params:{}})

//订单报表接口
export var ListEcharts = (date) => axios.get("/order/ordertotal",{params:{date}})