<template>
    <el-card class="box-card">

    <!-- 设置标题公告管理 -->
    <div slot="header" class="clearfix">
      <span>公告列表</span>
    </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.noticeId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="公告标题" >
        <template slot-scope="scope">
          <span>{{ scope.row.noticeTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="公告类型" >
        <template slot-scope="scope">
          <span>{{filterStatus( scope.row.noticeType )}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" >
        <template slot-scope="scope">
          <span>{{ noticeStatus(scope.row.noticeStatus) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建者" >
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" >
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="$router.push({name: 'AddNotice', params: { noticeId: scope.row.noticeId }})">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteNoticeById(scope.row.noticeId)" >删除</el-button>
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

import { noticeList, deleteNotice } from '@/api/notice'

export default {
  name: 'noticeList',

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
    }
  },

  methods: {

    getList() {
      this.listLoading = true
      var body = this.listQuery;
      noticeList({body}).then(response => {
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
    },

    filterStatus(val) {
      if (val == "0") {
        return "公告";
      } else if (val == "1") {
        return "通知";
      } else {
        return "提醒";
      }
    },
    noticeStatus(val) {
      if (val) {
        return "正常";
      } else {
        return "关闭";
      }
    },

    deleteNoticeById (id) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNotice(id).then(response => {
           this.$message({
            type: 'success',
            message: '删除成功!'
          })
           this.getList()
        }).catch(() => {
          console.log('error')
        })
      }).catch(() => {
         this.$message({
            type: 'error',
            message: '你已经取消删除该公告！'
          })
      })
    },

  },

 
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
