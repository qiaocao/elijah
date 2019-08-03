<template>
  <div>
    <div class="ad-title">导入黑名单</div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="选择文件">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :action="uploadUrl"
          :multiple="false"
          :on-exceed="exceed"
          :http-request="handleHttpRequest"
          :auto-upload="false"
          :limit="1"
          name="file"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">开始导入</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddBlackList',
  props: [],
  data() {
    return {
      uploadUrl: 'BlackList/Import'
    }
  },

  methods: {
    exceed(files, fileList) {
      this.$notify({
        title: '警告',
        message: '每次只能上传一个文件！',
        type: 'warning'
      })
    },
    save() {
      this.$refs.upload.submit()
    },
    handleHttpRequest(a) {
      var formdata = new FormData()
      formdata.append('file', a.file)
      formdata.append(
        'operatorId',
        JSON.parse(sessionStorage.getItem('userInfo')).data.operatorID
      )
      this.$post(this.uploadUrl, formdata)
        .then(json => {
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          return false
        })
    },
    close(istrue) {
      this.$emit('closeFrom', istrue)
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-title {
  width: 100%;
  text-align: center;
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
}
</style>

