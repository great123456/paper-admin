<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>后台论文检测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" style="width: 600px;">
              <el-form-item label="论文标题" prop="paperTitle">
                <el-input v-model="form.paperTitle" clearable placeholder="论文标题 (5~30字以内)"></el-input>
              </el-form-item>
              <el-form-item label="论文作者" prop="paperAuthor">
                <el-input v-model="form.paperAuthor" clearable placeholder="论文作者 (15字以内)"></el-input>
              </el-form-item>
              <el-form-item label="检测类型" prop="paperTypeCode">
                <el-select v-model="form.paperTypeCode" placeholder="请选择检测类型" @change="handleCheckTypeChange">
                  <el-option
                    v-for="item in typeList"
                    :key="item.paperTypeCode"
                    :label="item.paperTypeName"
                    :value="item.paperTypeCode">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="label" prop="paperContent">
                <p class="remark-text" v-show="cnki == 0">论文内容 (至少200字,至多30万字,当前已输入{{form.paperContent.length}}字,总金额为{{amount}}元)</p>
                <el-upload
                  v-show="cnki == 1"
                  class="upload-demo"
                  ref="upload"
                  :auto-upload="false"
                  name="file"
                  :data="form"
                  :file-list="fileList"
                  action="/admin/order/submitPaperCheck"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :on-change="handleFileChange">
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
                <el-input type="textarea" v-model="form.paperContent" :autosize="{ minRows: 15, maxRows: 25}" @input="handleContentChange" v-show="cnki == 0"></el-input>
              </el-form-item>
            </el-form>
            <el-button class="editor-btn" type="primary" @click="submit">提交检测</el-button>
        </div>
    </div>
</template>

<script>
    import { apiPaperTypeList,apiSubmitCheck, apiPriceList } from '@/service/index'
    import axios from 'axios'
    export default {
        name: 'editor',
        data: function(){
            return {
                typeList: [],
                form: {
                    paperTitle: '',
                    paperAuthor: '',
                    paperTypeCode: '',
                    paperContent: ''
                },
                amount: 0,
                paperTypeName: '',
                cnki: 0,
                priceList: [],
                file: '',
                fileList: [],
                rules: {
                  paperTitle: [
                    { required: true, message: '请输入论文标题' },
                    { min: 5, max: 30, message: '长度在 5 到 30 个字符' }
                  ],
                  paperAuthor: [
                    { required: true, message: '请输入论文作者' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符' }
                  ],
                  paperTypeCode: [
                    { required: true, message: '请选择检测类型' }
                  ]
                }
            }
        },
        computed: {
          label() {
            if(this.cnki == 0){
              return '论文内容'
            }else{
              return '上传文件'
            }
          }
        },
        created(){
          this.getTypeList()
          this.getPriceList()
        },
        methods: {
          handleFileChange(file) {
            this.file = file
            this.handleContentChange()
          },
          handleRemove(file) {
            this.file = ''
            if(this.cnki == 1){
              this.amount = 0
            }
          },
          handleSuccess(response) {
            if(response.code == 200){
              this.fileList = []
              this.$message.success('提交成功')
              this.form.paperContent = ''
            }else{
              this.$message.error(res.message)
            }
          },
          getPriceList() {
            apiPriceList({
              pageNum: 1,
              pageSize: 50
            })
            .then((res) => {
               if(res.code == 200){
                 this.priceList = res.data.list
               }
            })
          },
          handleCheckTypeChange(value) {
            this.typeList.forEach((item) => {
              if(item.paperTypeCode == value){
                this.cnki = item.cnki
                this.paperTypeName = item.paperTypeName
              }
            })
            this.handleContentChange()
          },
          handleContentChange() {
            const length = this.form.paperContent.length
            if(this.form.paperTypeCode == ''){
              return
            }
            this.priceList.forEach((item) => {
              if(this.paperTypeName == item.paperTypeName){
                let price = item.supplyPrice
                if(this.cnki == 0){
                  const numInt = Math.ceil(length/item.unitNum)
                  this.amount = parseInt(price * numInt*100)/100
                }else{
                  if(this.file == ''){
                    return
                  }
                  this.amount = parseInt(price*100)/100
                }
              }
            })
          },
          getTypeList() {
            apiPaperTypeList()
            .then((res) => {
              if(res.code == 200){
                this.typeList = res.data
              }
            })
          },
          submit(){
            if(this.cnki == 0 && this.form.paperContent == ''){
              this.$message('请输入论文内容')
              return
            }
            if(this.cnki == 0 && this.form.paperContent.length <200){
              this.$message('论文字数不能少于200')
              return
            }
            if(this.cnki == 1){
              this.$refs.upload.submit()
              return
            }
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                axios({
                  url: '/admin/order/submitPaperCheck',
                  method: 'post',
                  data: this.form,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then((res) => {
                  if(res.data.code == 200){
                    this.$message.success('提交成功！')
                    this.form.paperContent = ''
                  }else{
                    this.$message.error(res.message)
                  }
                })
              }else{
                return false
              }
            });
          }
        }
    }
</script>
<style>
  .el-upload--text{
    width: 100px !important;
    height: 50px !important;
    border: none !important;
  }
</style>
<style scoped>
    .editor-btn{
        margin-top: 20px;
        margin-left: 20px;
        width: 100px;
    }
    .upload-demo{
        display: inline-block;
    }
    .remark-text{
      color: #999999;
    }
</style>