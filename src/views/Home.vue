<template>
  <div>
    <div class="cardbox">
      <Card v-for="(item, index) in arr" :key="index" :item="item" />
    </div>
    <div ref="box" class="boxa" style="height:450px;width:800px"></div>
  </div>
</template>

<script>
import { IndexEcharts } from "@/api/apis.js";
import echarts from "echarts";
import Card from "@/components/Card.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
      arr: [
        { icon: "iconfont icon-order", name: "总订单", number: 102400 },
        { icon: "iconfont icon-xiaoshoue", name: "总销售额", number: 102400 },
        { icon: "iconfont icon-icon-", name: "今日订单数", number: 102400 },
        {
          icon: "iconfont icon-qian-copy-copy",
          name: "今日销售额",
          number: 102400
        }
      ]
    };
  },
  methods: {
    Setcharts(options) {
      let myCharts = echarts.init(this.$refs.box);
      let option = {
        title: {
          text: options.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单", "销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: options.dataArr
        },
        yAxis: {
          type: "value"
        },
        series: options.series
        // {
        //   name: "订单",
        //   type: "line",
        //   stack: "总量",
        //   data: options.orderData
        // },
        // {
        //   name: "销售额",
        //   type: "line",
        //   stack: "总量",
        //   data: options.amountData
        //
      };
      myCharts.setOption(option);
    }
  },
  mounted() {
    IndexEcharts().then(res => {
      console.log(res.data);
      let { amountData, orderData, xData } = res.data;
      let options = {};
      options.dataArr = xData
      options.title = "Echarts 订单",
        options.series = [
          {
            name: "订单",
            type: "line",
            data: orderData
          },
          {
            name: "销售额",
            type: "line",
            data: amountData
          }
        ];
      this.Setcharts(options);
    });
  }
};
</script>

<style lang="less" scoped>
.cardbox {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.boxa {
  margin-top: 40px;
  margin-left: 40px;
}
</style>