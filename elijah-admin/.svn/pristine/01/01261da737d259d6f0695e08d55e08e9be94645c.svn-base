<template>
  <div class="addlayout">
    <el-card class="box-card">
      <div class="ad-title">添加部门</div>
      <el-form ref="form" :rules="rules" :model="addData" label-width="100px">
        <el-form-item label="上级部门" prop="departmentParentName">
          <el-input v-model="addData.departmentParentName" :disabled="true" />
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="addData.departmentName" />
        </el-form-item>
        <el-form-item label="是否统计" prop="flag">
          <el-switch
            v-model="addData.flag"
            active-text="参与统计"
            inactive-text="不参与统计"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button @click="close(false)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'AddDept',
  props: {
    deptfrom: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    const pl = this.deptfrom.departmentCode.length
    return {
      addData: {
        departmentParentName: '',
        departmentParent: '',
        departmentName: '',
        flag: '0'
      },
      rules: {
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.addData.departmentParent = this.deptfrom.departmentCode
    this.addData.departmentParentName = this.deptfrom.departmentName
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('Department/insert', this.addData).then(json => {
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
.addlayout {
  padding: 10px;
  background: #fff;
  height: 100%;
}
</style>

