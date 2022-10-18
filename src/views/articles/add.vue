<template>
    <el-card class="box-card">
    <!-- 设置文章管理 -->
    <div slot="header" class="clearfix">
      <span>添加文章</span>
    </div>

    <!-- 发布文章 -->
    <div class="article-title-container">
        <el-input size="medium"  v-model="article.title" placeholder="输入文章标题"/>
        <el-button type="warning" size="medium" 
          @click="saveDraft" 
          style="margin-left:10px" 
          v-if="article.id === '' || article.artStatus == 3"
        >保存草稿</el-button>
        
        <el-button type="danger" size="medium" @click="openDialog" style="margin-left:10px">发布文章</el-button>
    </div>
    <!-- 文章内容 -->
    <mavon-editor ref="md" v-model="article.content" style="height:calc(100vh - 260px)"/>

    <!-- 填写信息弹出框 -->
    <el-dialog :title="`发布文章：${article.title}`" :visible.sync="showDialog" width="30%">


      <el-form label-position="left" label-width="80px" :model="article" size="medium">

        <!-- ----------文章分类开始---------- -->
        <el-form-item label="文章分类">
          <el-tag type="success" v-show="article.categoryName" style="margin:0 1rem 0 0" :closable="true" @close="removeCategory">
            {{ article.categoryName }}
          </el-tag>
           <!-- 分类选项 -->
           <el-popover placement="bottom-start" width="460" trigger="click" v-if="!article.categoryName">
            <div class="popover-title">分类</div>
            <!-- 搜索框 -->
            <el-autocomplete
              style="width:100%"
              v-model="categoryName"
              :fetch-suggestions="findCategories"
              placeholder="请输入分类名搜索，如果自定义分类，输入完成之后直接回车即可！"
              :trigger-on-focus="false"
              @keyup.enter.native="saveCategory"
              @select="handleFindCategories"
            >
              <template slot-scope="{ item }">
                <div>{{ item.categoryName }}</div>
              </template>
            </el-autocomplete>

            <!-- 分类数据展示 -->
            <div class="popover-container">
              <div class="category-item" v-for="item of categoryList" :key="item.id" @click="addCategory(item)">
                {{ item.categoryName }}
              </div>
            </div>
            <el-button type="success" plain slot="reference" size="small"> 添加分类 </el-button>

           </el-popover>
        </el-form-item>
        <!-- ----------文章分类结束---------- -->

        <!-- ----------文章标签开始---------- -->
        <el-form-item label="文章标签">
          <el-tag
            v-for="(item, index) of article.tagNameList"
            :key="index"
            style="margin:0 1rem 0 0"
            :closable="true"
            @close="removeTag(item)"
          >
            {{ item }}
          </el-tag>
          <!-- 标签选项 -->
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            v-if="article.tagNameList.length < 3"
          >
            <div class="popover-title">标签</div>
            <!-- 标签搜索框 -->
            <el-autocomplete
              style="width:100%"
              v-model="tagName"
              :fetch-suggestions="findTags"
              placeholder="请输入标签名搜索，按回车可添加自定义标签"
              :trigger-on-focus="false"
              @keyup.enter.native="saveTag"
              @select="handleFindTag"
            >
              <template slot-scope="{ item }">
                <div>{{ item.tagName }}</div>
              </template>
            </el-autocomplete>

            <!-- 标签数据展示 -->
            <div class="popover-container">
              <div style="margin-bottom:1rem">添加标签</div>
              <el-tag
                v-for="(item, index) of tagList"
                :key="index"
                :class="tagClass(item)"
                @click.native="addTag(item)"
              >
                {{ item.tagName }}
              </el-tag>
            </div>
            <el-button type="primary" plain slot="reference" size="small">
              添加标签
            </el-button>
          </el-popover>
        </el-form-item>

        <!-- ----------文章标签结束---------- -->
        <el-form-item label="文章摘要">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="article.description" style="width:220px" />
        </el-form-item>

        <!-- ----------文章封面开始---------- -->
        <el-form-item label="上传封面">
          <el-upload
            class="upload-cover"
            drag
            action="null"
            :http-request="importFile"
            multiple
            :before-upload="handleUploadBefore"
          >
            <i class="el-icon-upload" v-if="article.imageUrl == ''" />
            <div class="el-upload__text" v-if="article.imageUrl == ''">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <img
              v-else
              :src="article.imageUrl"
              width="360px"
              height="180px"
            />
          </el-upload>
        </el-form-item>
        <!-- ----------文章封面结束---------- -->
        <el-form-item label="发布形式">
          <el-radio-group v-model="article.artStatus">
            <el-radio :label="1">全部可见</el-radio>
            <el-radio :label="2">仅我可见</el-radio>
          </el-radio-group>
        </el-form-item>
      
      </el-form>

       <span slot="footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">发布文章</el-button>
      </span>
    </el-dialog>


 </el-card>
</template>

<script>
import { addArticle, getArticleById, uploadImg } from '@/api/article'
import { getCategory } from '@/api/category'
import { getTag } from '@/api/tag'

export default {
  name: 'Addarticle',

  created() {
    const id = this.$route.params.id;
    if(id) {
      getArticleById(id).then((res) => {
        this.article = res.data;
      });
    }
  },

   data() {
    return {
      showDialog: false,
      categoryName: "",
      categoryList: [],
      tagName: "",
      tagList: [],
      article: {
        id: "",
        title: "",
        categoryId: "",
        content: "",
        categoryName: null,
        tagNameList: [],
        description: "",
        imageUrl: "",
        artStatus: 1
      }
    }
  },

  methods: {

     // 打开文章信息填写框
    openDialog() {
      if (this.article.title.trim() == "") {
        this.$message.error("文章标题为空，请填写文章标题");
        return false;
      }
      if (this.article.content.trim() == "") {
        this.$message.error("文章内容为空，请填写文章内容");
        return false;
      }
      this.getCategoriesList();
      this.getTagsList();
      this.showDialog = true;
    },
    // ------- 保存草稿
    saveDraft() {
      this.article.artStatus = 3;
      if (this.article.title.trim() == "") {
        this.$message.error("文章标题不能为空");
        return false;
      }
      if (this.article.content.trim() == "") {
        this.$message.error("文章内容不能为空");
        return false;
      }
      var body = this.article;
      addArticle(body).then(res => {
        if(res.code === 200) {
          this.$message({
            type: 'success',
            message: '保存草稿成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '保存草稿失败!'
          });
        }
      })
    },

    //------ 图片上传功能
    importFile(param){
      let fd = new FormData();
      fd.append("file", param.file);  // 传文件
      uploadImg(fd).then(res => {
         if (res.data && res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '图片上传成功!'
          })
         }
         this.article.imageUrl = res.data;
      })
    },

    handleUploadBefore(file) {
      const isJPGORPNG = file.type === "image/jpeg" || file.type === "image/png";
	    const isLt10M = file.size / 1024 / 1024 < 10;

	    if (!isJPGORPNG) {
	      this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
	    }
	    if (!isLt10M) {
	      this.$message.error('上传图片大小不能超过 10MB!');
	    }
	    return isJPGORPNG && isLt10M;
    },

    //------分类的业务处理开始------
    getCategoriesList() {
      var categoryName = "";
      getCategory({categoryName}).then(response => {
         this.categoryList = response.data;
      })
    },
    removeCategory() {
      this.article.categoryName = null;
    },
    //搜索分类名称
    findCategories(categoryName, cb) {
       getCategory({categoryName}).then(response => {
         cb(response.data);
       })
    },
    saveCategory() {
      if (this.categoryName.trim() != "") {
        this.addCategory({
          categoryName: this.categoryName
        });
        this.categoryName = "";
      }
    },
    addCategory(item) {
      this.article.categoryName = item.categoryName;
    },
    handleFindCategories(item) {
      this.addCategory({
        categoryName: item.categoryName
      });
    },
  //------分类的业务处理结束------

  //------标签的业务处理------
    getTagsList() {
      var tagName = "";
      getTag({tagName}).then(response => {
         this.tagList = response.data;
      })
    },
   
    //搜索标签名称
    findTags(tagName, cb) {
       getTag({tagName}).then(response => {
         cb(response.data);
       })
    },
    handleFindTag(item) {
      this.addTag({
        tagName: item.tagName
      });
    },
    saveTag() {
      if (this.tagName.trim() != "") {
        this.addTag({
          tagName: this.tagName
        });
        this.tagName = "";
      }
    },
   
    addTag(item) {
      console.log("标签展示：",item);
      if (this.article.tagNameList.indexOf(item.tagName) == -1) {
        this.article.tagNameList.push(item.tagName);
      }
    },
    removeTag(item) {
      const index = this.article.tagNameList.indexOf(item);
      this.article.tagNameList.splice(index, 1);
    },
  //------标签的业务处理结束------
 
    handleSubmit() {
      this.showDialog = true;
      
      if (this.article.title.trim() == "") {
        this.$message.error("文章标题不能为空");
        return false;
      }
      if (this.article.content.trim() == "") {
        this.$message.error("文章内容不能为空");
        return false;
      }
      if (this.article.categoryName == null) {
        this.$message.error("文章分类不能为空");
        return false;
      }
       if (this.article.tagNameList.length == 0) {
        this.$message.error("文章标签不能为空");
        return false;
      }

      var body = this.article;
      addArticle(body).then(res => {
        if(res.code === 200) {
          this.$message({
            type: 'success',
            message: '文章发表成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '文章发表失败!'
          });
        }
      })
    },
    
    handleCancel() {
      this.showDialog = false;
    },
  },

  computed: {
    tagClass() {
      return function(item) {
        const index = this.article.tagNameList.indexOf(item.tagName);
        return index != -1 ? "tag-item-select" : "tag-item";
      };
    }
  }
 
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.article-title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 1.25rem;
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

  .popover-title {
    margin-bottom: 1rem;
    text-align: center;
  }
  .category-item {
    cursor: pointer;
    padding: 0.6rem 0.5rem;
  }
  .category-item:hover {
    background-color: #f0f9eb;
    color: #67c23a;
  }
  .tag-item {
    margin-right: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .tag-item-select {
    margin-right: 1rem;
    margin-bottom: 1rem;
    cursor: not-allowed;
    color: #ccccd8 !important;
  }
  .popover-container {
    margin-top: 1rem;
    height: 260px;
    overflow-y: auto;
  }
</style>
