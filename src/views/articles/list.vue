<template>
    <el-card class="box-card">

    <!-- 设置标题文章管理 -->
    <div slot="header" class="clearfix">
      <span>文章列表</span>
    </div>

    <!-- 文章按条件查找 -->
     <div style="margin-left:auto">
       <!-- 文章分类 -->
        <el-select
          clearable
          size="small"
          v-model="categoryId"
          filterable
          placeholder="请选择分类"
          style="margin-right:1rem"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.categoryId"
          />
        </el-select>
        <!-- 文章类型 -->
        <el-select
          clearable
          v-model="artStatus"
          placeholder="请选择文章类型"
          size="small"
          style="margin-right:1rem"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 文章名 -->
        <el-input
          clearable
          v-model="title"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="请输入文章名"
          style="width:200px"
          @keyup.enter.native="searchArticles"
        />

        <el-button
          type="primary"
          size="small"
          icon="el-icon-search"
          style="margin-left:1rem"
          @click="searchArticles"
        >
          搜索
        </el-button>
     </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 98%; margin-top:30px;">
      <el-table-column align="center" label="ID" >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="文章封面" width="180" align="center">
        <template slot-scope="scope">
          <img
            class="article-cover"
            :src=" scope.row.imageUrl" />
        </template>
      </el-table-column>

      <!-- 文章标题 -->
      <el-table-column prop="title" label="标题" align="center" />

      <!-- 文章分类 -->
      <el-table-column prop="categoryName" label="分类" width="110" align="center"/>

      <!-- 文章标签 -->
      <el-table-column prop="tagList" label="标签" width="170" align="center">
        <template slot-scope="scope">
          <el-tag
            v-for="item of scope.row.tagList"
            :key="item.id"
            style="margin-right:0.2rem;margin-top:0.2rem"
          >
            {{ item.tagName }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 文章浏览量 -->
      <el-table-column
        prop="views"
        label="浏览量"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.views">
            {{ scope.row.views }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 文章总字数 -->
      <el-table-column
        prop="totalWords"
        label="总字数"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.totalWords">
            {{ scope.row.totalWords }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>

      <!-- 文章描述 -->
      <el-table-column prop="description" label="描述" align="center" />

      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editArticle(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteArticleById(scope.row.id)" >删除</el-button>
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

import { articleList, deleteArticle } from '@/api/article'
import { getCategory } from '@/api/category'
import { getTag } from '@/api/tag'

export default {
  name: 'articleList',

  created() {
    this.getList();
    this.getCategoriesList();
    this.getTagsList();
  },

  data() {
    return {
      list: null,
      listLoading: true,
      count: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        artStatus: null,
        title: null
      },
      categoryId: null,
      categoryList: [],
      tagId: null,
      tagList: [],
      title: null,
      typeList: [
        {
          value: 1,
          label: "发布"
        },
        {
          value: 2,
          label: "仅我可见"
        },
        {
          value: 3,
          label: "草稿"
        }
      ],
      artStatus: null,
      views: null,
      totalWords: null,
      description: null
    }
  },

  methods: {

    getList() {
      this.listLoading = true
      this.listQuery.categoryId = this.categoryId;
      this.listQuery.title = this.title;
      this.listQuery.artStatus = this.artStatus;

      var body = this.listQuery;
      articleList({body}).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.listLoading = false
      })
    },

    editArticle(id) {
      this.$router.push({ name: 'Addrticles', params: { id: id }});
    },

    getCategoriesList() {
      var categoryName = "";
      getCategory({categoryName}).then(response => {
         this.categoryList = response.data;
      })
    },

    getTagsList() {
      var tagName = "";
      getTag({tagName}).then(response => {
         this.tagList = response.data;
      })
    },

    searchArticles() {
      this.getList();
    },

    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.listQuery.pageNum = pageNum
      this.getList()
    },


    deleteArticleById (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id).then(response => {
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
            message: '你已经取消删除该文章！'
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
  .article-cover {
    position: relative;
    width: 100%;
    height: 90px;
    border-radius: 4px;
  }
  .article-cover::after {
    content: "";
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
