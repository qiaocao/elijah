<template>
  <div>
    <div class="ad-title">新增违法类型</div>
    <el-form ref="form" :model="addDataDictFrom" label-width="80px" :rules="rules">
      <el-form-item label="类型编码" prop="zxmbm">
        <el-input v-model="addDataDictFrom.zxmbm" placeholder="请输入类型编码" />
      </el-form-item>
      <el-form-item label="类型含义" prop="hy">
        <el-input v-model="addDataDictFrom.hy" placeholder="请输入类型" />
        <!-- <el-input v-model="addDataDictFrom.platetype" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddDataDict',
  data() {
    return {
      addDataDictFrom: {
        zxmbm: '',
        hy: ''
      },
      rules: {
        zxmbm: [{ required: true, message: '请输入类型编码', trigger: 'blur' }],
        hy: [{ required: true, message: '请输入类型含义', trigger: 'blur' }]
      }
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('DataDict/insert', this.addDataDictFrom).then(json => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            })
            this.close(true)
          })
        } else {
          return false
        }
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

