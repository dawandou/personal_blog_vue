<template>
  <el-card class="box-card">
    <el-button type="primary" size="small" icon="el-icon-plus" @click="transformation(null)">新增标签</el-button>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="标签名称">
        <template slot-scope="scope">
          <span>{{ scope.row.tagName}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="创建时间">

        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px" />
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right:5px" />
          <span>{{ scope.row.updateTime}}</span>
        </template>
      </el-table-column>

      
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="transformation(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTagById(scope.row.id)">删除</el-button>
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
     

    <!-- 添加或修改标签对话框 -->
    <el-dialog :visible.sync="addOrupdateDialogVisible" width="30%">
      <div class="dialog-title-container" slot="title" ref="tagTitle" />
      <el-form label-width="100px" size="medium" :model="tagForm">
        <el-form-item label="标签名称：">
          <el-input v-model="tagForm.tagName" style="width:220px" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrupdateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTag">
          确 定
        </el-button>
      </div>
    </el-dialog>
   
  </el-card>
</template>

<script>
  import { tagList, addTag, updateTag, deleteTag } from '@/api/tag'

export default {
  name: 'TagList',

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
      addOrupdateDialogVisible: false,
      tagForm: {
        id: null,
        tagName: ""
      },
    }
  },

  methods: {

    getList() {
      this.listLoading = true
      var body = this.listQuery;
      tagList({body}).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.listLoading = false
      })
    },

    transformation(tag) {
      if (tag != null) {
        this.tagForm = JSON.parse(JSON.stringify(tag));
        this.$refs.tagTitle.innerHTML = "修改标签";
      } else {
        this.tagForm.id = null;
        this.tagForm.tagName = "";
        this.$refs.tagTitle.innerHTML = "添加标签";
      }
      this.addOrupdateDialogVisible = true;
    },

    addTag() {
      if (this.tagForm.tagName.trim() == "") {
        this.$message.error("标签名不能为空");
        return false;
      }
      var body = this.tagForm;
      if(body.id == null){
        addTag(body).then(response => {
          this.$message({
            type: 'success',
            message: '添加标签成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      } else {
        updateTag(body).then(response => {
          this.$message({
            type: 'success',
            message: '修改标签成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }
      this.addOrupdateDialogVisible = false;
    },

    deleteTagById (id) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTag(id).then(response => {
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
            message: '你已经取消删除该标签！'
          })
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
