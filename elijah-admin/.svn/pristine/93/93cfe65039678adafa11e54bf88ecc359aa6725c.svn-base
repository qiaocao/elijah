<template>
  <div>
    <div class="ad-title">新增设备</div>
    <el-form ref="form" :model="addDeviceFrom" label-width="80px" :rules="rules">
      <el-form-item label="设备代码" prop="code">
        <el-input v-model="addDeviceFrom.code" placeholder="请输入设备代码"/>
      </el-form-item>
      <el-form-item label="所属部门" prop="department_code">
        <el-cascader
          v-model="department_codeArr"
          style="width:100%"
          :options="depttreedata"
          :props="{value:'departmentCode',checkStrictly: true }"
          clearable
        />
      </el-form-item>
      <el-form-item label="所属警员" prop="police_code">
        <el-select v-model="addDeviceFrom.police_code" placeholder="选择警员" style="width:100%">
          <el-option
            v-for="item in policeList"
            :key="item.policecode"
            :label="item.policename"
            :value="item.policecode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电子围栏" prop="Enclosureclient">
        <el-select v-model="Enclosureclient" multiple placeholder="电子围栏" style="width:100%">
          <el-option v-for="item in fencelist" :key="item.id" :label="item.Name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号码" prop="police_car_number">
        <el-input v-model="addDeviceFrom.police_car_number" placeholder="车牌号码"/>
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
  name: 'AddDevice',
  props: ['depttreedata', 'fencelist'],
  data() {
    return {
      addDeviceFrom: {
        code: '',
        department_code: '',
        police_code: '',
        police_car_number: '',
        Enclosureclient: '',
        operator_id: JSON.parse(sessionStorage.getItem('userInfo')).data
          .operatorID
      },
      rules: {
        code: [{ required: true, message: '请输入设备代码', trigger: 'blur' }],
        department_code: [
          {
            required: true,
            message: '请选择部门',
            trigger: 'blur'
          }
        ],
        police_code: [
          { required: true, message: '请选择警员', trigger: 'blur' }
        ],
        Enclosureclient: [
          {
            required: true,
            message: '请选择电子围栏',
            trigger: 'blur'
          }
        ],
        police_car_number: [
          { required: true, message: '请输入车牌', trigger: 'blur' }
        ]
      },
      policeList: [],
      department_codeArr: '',
      Enclosureclient: []
    }
  },
  watch: {
    department_codeArr(val) {
      if (val.length === 0) {
        this.addDeviceFrom.department_code = ''
        this.policeList = []
        return false
      }
      this.addDeviceFrom.department_code = val[val.length - 1]
      this.getPoliceList()
    },
    Enclosureclient(val) {
      this.addDeviceFrom.Enclosureclient = val.join(',')
    }
  },
  methods: {
    save() {
      // console.log(this.addDeviceFrom)

      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('Client/insert', this.addDeviceFrom).then(json => {
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
    getPoliceList() {
      this.addDeviceFrom.police_code = ''
      this.$post('Department/dptList', {
        dptcode: this.addDeviceFrom.department_code
      }).then(json => {
        if (json.data.length === 0) {
          this.policeList = []
        } else {
          this.policeList = json.data[0].policeList
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

