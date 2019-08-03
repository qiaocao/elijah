<template>
  <div class="addlayout">
    <el-card class="box-card">
      <div class="ad-title">修改部门</div>
      <el-form ref="form" :rules="rules" :model="addData" label-width="100px">
        <el-form-item label="部门编号" prop="departmentCode">
          <el-input v-model="addData.departmentCode" :disabled="true" />
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
  name: 'EditDept',
  props: {
    deptfrom: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    const pl = this.deptfrom.departmentParmentCode.length
    return {
      addData: {
        departmentParent: this.deptfrom.departmentParmentCode,
        departmentCode: '',
        departmentName: '',
        flag: '',
        ...this.deptfrom
      },
      rules: {
        departmentCode: [
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          {
            min: pl + 2,
            max: pl + 2,
            message: `请输入${pl + 2}位部门编号`,
            trigger: 'blur'
          }
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('Department/update', this.addData).then(json => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            })
            this.close(true)
          })
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

