<template>
  <div ref="box"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["options"],
  methods: {
    CreateEchartsLine(options) {
      let mycharts = echarts.init(this.$refs.box);

      let option = {
        title: {
          text: options.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: options.titleArr
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
          boundaryGap: true,
          data: options.Xarr
        },
        yAxis: {
          type: "value"
        },
        series: options.CenterContent
      };

      mycharts.setOption(option);
    }
  },
  mounted() {
      
   this.CreateEchartsLine(this.options);
        
              
      
      
    
  },
  watch:{
       options:{
           handler(newName,oldName){
              this.CreateEchartsLine(newName);
           },
           deep:true
       }

  }
};
</script>

<style lang="less" scoped>
</style>