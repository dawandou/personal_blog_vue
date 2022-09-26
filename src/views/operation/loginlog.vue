<template>
 
  <el-card class="box-card">
    <!-- 设置标题登录日志 -->
    <div slot="header" class="clearfix">
      <span>登录日志</span>
    </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录账号">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录IP">
        <template slot-scope="scope">
          <span>{{ scope.row.ipAddress}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录地点">
        <template slot-scope="scope">
          <span>{{ scope.row.loginLocation}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="浏览器类型">
        <template slot-scope="scope">
          <span>{{ scope.row.browserType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作系统">
        <template slot-scope="scope">
          <span>{{ scope.row.os}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录状态">
        <template slot-scope="scope">
          <el-tag :type="tagType(scope.row.loginStatus)">
            {{ map[scope.row.loginStatus ] }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作系统">
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
import { fetchLoginLogList } from '@/api/operation'

export default {
  name: 'LoginOperationlog',
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
      },
      map: {
        0: '登录成功',
        1: '登录失败'
      }
    }
  },

  methods: {

    getList() {
      this.listLoading = true
      var body = this.listQuery;
      fetchLoginLogList({body}).then(response => {
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
          case 0:
            return "success";
          case 1:
            return "warning";
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
