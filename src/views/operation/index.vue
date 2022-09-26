<template>
 <el-card class="box-card">
    
    <!-- 设置标题操作日志 -->
    <div slot="header" class="clearfix">
      <span>操作日志</span>
    </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作IP">
        <template slot-scope="scope">
          <span>{{ scope.row.operationIp}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作IP地址">
        <template slot-scope="scope">
          <span>{{ scope.row.operaLocation}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="方法名">
        <template slot-scope="scope">
          <span>{{ scope.row.methods}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="请求参数">
        <template slot-scope="scope">
          <span>{{ scope.row.args}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人员">
        <template slot-scope="scope">
          <span>{{ scope.row.operationName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="请求方式">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.operationType)">
            {{ scope.row.operationType }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="返回结果">
        <template slot-scope="scope">
          <span>{{ scope.row.returnValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>

    </el-table>
 <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.listQuery.pageNum"
      :page-size="this.listQuery.pageSize"
      :total="count"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
    />

  </el-card>
</template>

<script>
import { fetchLogList } from '@/api/operation'

export default {
  name: 'operationLogList',
  created() {
    this.getList()
  },
 
  data() {
    return {
      list: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },

  methods: {

    getList() {
      this.listLoading = true
      var body = this.listQuery;
      fetchLogList({body}).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.listLoading = false
      })
    },

    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.listQuery.pageNum = pageNum
      this.getList()
    }

  },

  computed: {
    tagType() {
      return function(type) {
        switch (type) {
          case "SYSTEM":
            return "";
          case "LOGIN":
            return "success";
          case "INSERT":
            return "warning";
          case "SELECT":
            return "warning";
          case "UPDATE":
            return "warning";
          case "DELETE":
            return "danger";
        }
      };
    }
  }
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .pagination-container {
    float: right;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
 }
  .box-card {
    width: 98%;
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
