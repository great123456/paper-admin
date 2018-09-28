<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>后台论文监测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="80px" style="width: 600px;">
              <el-form-item label="论文标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="论文作者">
                <el-input v-model="form.author"></el-input>
              </el-form-item>
              <el-form-item label="监测类型">
                <el-select v-model="form.type" placeholder="请选择监测类型">
                  <el-option label="万方" value="1"></el-option>
                  <el-option label="知网" value="2"></el-option>
                  <el-option label="期刊" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="论文内容">
                <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
              </el-form-item>
            </el-form>
            <el-button class="editor-btn" type="primary" @click="submit">提交监测</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'editor',
        data: function(){
            return {
                form: {
                    title: '',
                    author: '',
                    type: '',
                    content: ''
                }
            }
        },
        methods: {
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
        margin-left: 20px;
        width: 100px;
    }
    .upload-demo{
        display: inline-block;
    }
</style>