<template>
  <div class="OrderList">
    <el-form>
      <el-form-item>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <EchartsLine
      style="width:1200px;height:400px"
   
      :options="options"
    />
  </div>
</template>

<script>
import moment from "moment";
import { ListEcharts } from "@/api/apis.js";

import EchartsLine from "@/components/EchartsLine.vue";
export default {
  components: {
    EchartsLine
  },
  data() {
    return {
 
      date: "",
      options: {
        title: "Echarts订单页面标题",
        titleArr: ["订单时间"],
        Xarr: [],
        CenterContent: []
      }
    };
  },
  mounted() {
    console.log(this.date);
    ListEcharts(JSON.stringify(this.date)).then(res => {
      this.flag = false;
      console.log(res.data.data);
 

      this.options.CenterContent = [
        {
          name: "订单时间",
          type: "bar",
          data: res.data.data.map(v => v.orderAmount)
        }
      ];
      this.options.Xarr = res.data.data.map(v => moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss"));

     
    });
  },
  methods: {
    search() {
      console.log(
        moment(this.date[0]).format("YYYY-MM-DD HH:mm:ss"),
        moment(this.date[1]).format("YYYY-MM-DD HH:mm:ss")
      );
    }
  }
};
</script>

<style lang="less" scoped>
// .OrderList {
// }
</style>