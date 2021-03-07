import vueRouter from 'vue-router'
import Vue from 'vue'
import Layout from '@/views/Layout.vue'
import Login from '../Login.vue'
import { IsToken } from "@/api/apis.js"
Vue.use(vueRouter)

var router = new vueRouter({
    routes: [
        //大布局
        {
            visible: true,
            path: '/',
            name: 'layout',
            redirect: './home',
            component: Layout,
            meta: { icon: "icon-index", title: "后台首页" },
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/Home.vue')
    
                }
            ]
        },
        //登录界面
        {
            path: '/login',
            name: 'login',
            component: Login
        },


    ]
})

var dynamicRouter = [
    //大布局
    {
        visible: true,
        path: '/',
        name: 'layout',
        redirect: './home',
        component: Layout,
        meta: { icon: "icon-index", title: "后台首页" },
        children: [
            {
                path: '/home',
                component: () => import('@/views/Home.vue')

            }
        ]
    },
    //订单管理
    {
        path: '/order',
        name: "order",
        component: Layout,
        redirect: '/orderlist',
        
        visible: true,
        meta: { title: "订单管理", icon: "icon-dd" },
        children: [
            { 
                meta:{title:"订单列表"},
                path: '/orderlist',
                component: () => import('@/views/Order')
            },

        ]
    },
    //商品管理
    {
        path: '/shop',
        component: Layout,
        redirect: '/shop/shoplist',

        visible: true,
        meta: { role: ['super'], title: "商品管理", icon: "icon-shangpin" },
        children: [
            { path: "/shop/shoplist", component: () => import('@/views/Shopmanage/Shoplist.vue'), meta: { title: "商品列表" } },
            { path: "/shop/shopadd", component: () => import('@/views/Shopmanage/Shopadd.vue'), meta: { title: "商品添加" } },
            { path: "/shop/shopclass", component: () => import('@/views/Shopmanage/Shopclass.vue'), meta: { title: "商品分类" } }
        ]
    },
    //店铺管理
    {
        path: "/store",
        visible: true,
        meta: {
            role: ["super"], title: "店铺管理", icon: "icon-dianpu"
        },
        component: Layout,
        children: [
            {
                path: '/store',
                component: () => import("@/views/Storemanage")
            }
        ]
    },
    //账号管理
    {
        path: '/account',
        visible: true,
        redirect: '/account/accountlist',

        meta: { role: ["super", "normal"], title: "账号管理", icon: "icon-yonghu" },
        component: Layout,
        children: [
            { path: '/account/accountlist', component: () => import("@/views/Accountmanage/Accountlist"), meta: { role: ["super"], title: "账号列表" }, },
            { path: '/account/accountadd', component: () => import("@/views/Accountmanage/Accountadd"), meta: { role: ["super"], title: "账号添加" }, },
            { path: '/account/Passwordset', component: () => import("@/views/Accountmanage/Passwordset"), meta: { title: "密码修改" } },
            { path: '/account/personcenter', component: () => import("@/views/Accountmanage/Personcenter"), meta: { title: "个人中心" } }
        ]
    },
    //销售统计
    {
        path: '/shopbox',
        meta: { title: "销售统计", icon: "icon-tongji" },
        component: Layout,
        visible: true,
        children: [
            { path: '/shopbox/shopone', component: () => import("@/views/Shopbox/Shopone"), meta: { title: "订单统计" } },
            { path: '/shopbox/shoptwo', component: () => import("@/views/Shopbox/Shoptwo"), meta: { title: "商品统计" } },

        ]
    },

]
//第一层过滤 是否含有 role这个数组 含有就表示配置了权限 需要过滤 不含有表示都有权限进行访问
function IsRolesArr(v, role) {
    if (v.meta && v.meta.role) {
        return v.meta.role.includes(role)
    } else {
        return true
    }
}
//用filter方法对路由进行过滤
function FilterRoutesArr(dynamicRouter, role) {
    let filterArr = dynamicRouter.filter(v => {
        if (IsRolesArr(v, role)) {
            if (v.children && v.children.length) {
                return v.children = FilterRoutesArr(v.children, role)
            }
            return true

        } else {
            return false
        }




    })

    return filterArr
}
// 通过过滤这个方法返回含有字段的对象
function FilterMenuList(newArr, role) {
    let menuList = newArr.filter(v => {
        if (v.visible) {
            return true
        } else {
            return false
        }

    })
    return menuList

}


//计算菜单中是否含有visible这个字段
function menuCaleGod(newArr, role) {
    let menus = FilterMenuList(newArr, role)


    return menus
}
//计算路由的函数
export function CalculateRoute() {
    let role = localStorage.getItem("role")
    let newArr = FilterRoutesArr(dynamicRouter, role)
    router.addRoutes(newArr)
    //把计算出来的路由再进行计算菜单
    let menu = menuCaleGod(newArr, role)
    localStorage.setItem("menu", JSON.stringify(menu))
}



CalculateRoute()





//路由前置守卫
router.beforeEach((to, from, next) => {
    if (to.path != "/login") {
        IsToken(localStorage.getItem('token')).then(res => {
            if (res.data.code == 0) {
                next()
            } else {
                next("/login")
            }
        })
    } else {
        next()
    }


})
export default router