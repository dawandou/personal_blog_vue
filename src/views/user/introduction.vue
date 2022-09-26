<template>
  <el-card class="box-card1">

 
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>个人简介</span>
      </div>
      <div class="text item">
        本人是一个学习Java的小菜鸟，会一些前端和后端。。。。。。
      </div>
    </el-card>
 
 </el-card>
</template>

<script>
export default {

}
</script>


<style>

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 70%;
    float: left;
    margin: 2% 6%;
  }
  .box-card1 {
    width: 98%;
    height: 90vh;
    margin: 1%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .clearfix span {
    font-weight: 600;
  }

</style>