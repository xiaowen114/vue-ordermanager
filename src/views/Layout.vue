<template>
  <div class="layout">
    <div class="nav">
      <el-col>
        <h5 class="index_title">
          <i style="color:pink" class="iconfont icon-qian-copy-copy"></i
          >外卖商家中心
        </h5>
        <el-menu
          :default-active="routerName == '/orderlist' ? '/order' : routerName"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="white"
          router
          unique-opened
        >
          <template v-for="item in menuArr">
            <el-menu-item
              :index="item.path"
              :key="item.path"
              v-if="item.children.length > 1 ? false : true"
            >
              <i class="iconfont" :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>

            <el-submenu v-else :index="item.path" :key="item.path">
              <template slot="title">
                <i class="iconfont" :class="item.meta.icon"></i>
                <span>{{ item.meta.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="v.path"
                  v-for="v in item.children"
                  :key="v.path"
                  >{{ v.meta.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </div>
    <div class="rightbox">
      <!-- 面包屑 -->
      <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in arr1"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <p class="pdom">
          欢迎你, {{ account }}
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item
                ><span @click="LogoutBtn">退出登录</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span></span>

          <el-avatar :src="imgBaseUrl" icon="el-icon-user-solid"> </el-avatar>
        </p>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
 
                                                                             
<script>
import { GetPersonal, IsToken } from "@/api/apis.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      imgurl: "",
      menuArr: [],
      routerName: "",
      account: "",
      arr1: []
    };
  },
  created() {
    this.CountingCrumbs();
     

    let newArr = localStorage.getItem("menu");
    this.menuArr = JSON.parse(newArr);
    this.routerName = this.$route.path;
    //验证token是否过期
    IsToken(localStorage.getItem("token")).then(res => {
      if (res.data.code == 0) {
      } else {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.$router.push("/login");
      }
    });

    GetPersonal(Number(localStorage.getItem("id"))).then(res => {
      let data = res.data.accountInfo;
      this.account = data.account;
      this.$store.state.imgBaseUrl = data.imgUrl;
    });
  },
  computed: {
    ...mapState(["imgBaseUrl"])
  },
  methods: {
    LogoutBtn() {
      localStorage.clear();
      this.$router.push("/login");
      location.reload();
    },

    //计算面包屑的函数
    CountingCrumbs() {
      let arr = [{ title: "首页", path: "/" }];
      this.$route.matched.forEach((item, index) => {
        if (item.meta && item.meta.title) {
          arr.push({ title: item.meta.title, path: item.path });
        }
      });
      this.arr1 = arr;
    }
  },
  watch: {
    "$route.path"() {
      if (this.$route.path == "/home") {
        this.routerName = "/";
      } else {
        this.routerName = this.$route.path;
      }

      this.CountingCrumbs();
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  .nav {
    flex: 0 0 200px;
    height: 100%;
    background-color: #304156;
    border-right: none;
    .el-menu {
      height: 100%;
      border-right: none;
    }
  }
  //右侧主要内容区域
  .rightbox {
    flex: 1;
    display: flex;
    flex-direction: column;
    .box {
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pdom {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .main {
      flex: 1;
      background-color: #f0f2f5;
    }
  }

  .index_title {
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: white;
  }
  /deep/ .el-menu-item-group__title {
    padding: 0;
  }
  i {
    margin-right: 10px;
  }
}
</style>