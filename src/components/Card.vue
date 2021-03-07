<template>
  <div class="card">
    <span class="span1" :class="item.icon"></span>
    <p>
      <span class="one">{{ item.name }}</span>
      <span>{{ item.number }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="less" scoped>
.card {
  width: 200px;
  height: 100px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  .span1 {
    font-size: 40px;
    align-self: center;
  }
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .one {
      color: #dedede;
    }
  }
}
</style>