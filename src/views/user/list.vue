<template>
  <el-card class="box-card">
    <el-button
      type="primary"
      size="small"
      icon="el-icon-plus"
      @click="openModel(null)"
    >
      新增
    </el-button>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上次登录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="openModel(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 添加编辑对话框 -->
    <el-dialog :visible.sync="addOrupdateDialogVisible" width="30%">
      <div class="dialog-title-container" slot="title" ref="userTitle" />
      <el-form label-width="80px" size="medium" :model="userForm">
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName" style="width:220px" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.passWord" style="width:220px" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" style="width:220px" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.phone" style="width:220px" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" style="width:220px" />
        </el-form-item>
        
      </el-form>
      <div slot="footer">
        <el-button @click="addOrupdateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditUser">
          确 定
        </el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  import { userList, deleteUser, addUser, updateUser } from '@/api/user'

export default {
  name: 'UserList',

  created() {
    this.getList()
  },

  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: { 
      },
      addOrupdateDialogVisible: false,
      userForm: {
        id: null,
        userName: "",
        email: "",
        phone: "",
        passWord: "",
        nickname: ""
      },
    }
  },

  methods: {
    getList() {
      this.listLoading = true
      var body = this.listQuery;
      userList({body}).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },

    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id).then(response => {
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
            message: '你已经取消删除该用户！'
          })
      })
    },

   
    openModel(user) {
      if (user != null) {
        this.userForm = JSON.parse(JSON.stringify(user));
        this.$refs.userTitle.innerHTML = "修改用户";
      } else {
        this.userForm.id = null;
        this.userForm.userName = "";
        this.userForm.passWord = "";
        this.userForm.email = "";
        this.userForm.phone = "";
        this.userForm.nickname = "";
        this.$refs.userTitle.innerHTML = "添加用户";
      }
      this.addOrupdateDialogVisible = true;
    },

    addOrEditUser() {
       var body = this.userForm;
       if(body.id == null){
        addUser(body).then(response => {
          this.$message({
            type: 'success',
            message: '添加分类成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      } else {
        updateUser(body).then(response => {
          this.$message({
            type: 'success',
            message: '修改分类成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }
      this.addOrupdateDialogVisible = false;
    }

  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
