<template>
  <div>
    <div class="ad-title">新增警员</div>
    <el-form ref="form" :model="addPoliceFrom" label-width="120px" :rules="rules">
      <el-form-item label="警员编号" prop="police_code">
        <el-input v-model="addPoliceFrom.police_code" />
      </el-form-item>
      <el-form-item label="警员名称" prop="police_name">
        <el-input v-model="addPoliceFrom.police_name" />
      </el-form-item>
      <el-form-item label="身份证号" prop="id_number">
        <el-input v-model="addPoliceFrom.id_number" />
      </el-form-item>
      <el-form-item label="IP地址" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="警员标识" prop="police_flag">
        <el-switch
          v-model="addPoliceFrom.police_flag"
          active-text="警员"
          inactive-text="非警员"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="是否锁定" prop="islock">
        <el-switch
        v-model="addPoliceFrom.islock"
        active-text="锁定"
        active-value="1"
        inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="用户有效" prop="user_effective_flag">
        <el-switch
          v-model="addPoliceFrom.user_effective_flag"
          active-text="永久有效"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="用户有效期" prop="user_effective">
        <el-date-picker
          v-model="addPoliceFrom.user_effective"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="密码有效" prop="pwd_effective_flag">
        <el-switch
          v-model="addPoliceFrom.pwd_effective_flag"
          active-text="永久有效"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="密码有效期" prop="pwd_effective">
        <el-date-picker
          v-model="addPoliceFrom.pwd_effective"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="允许登录时间" prop="startTime">
        <el-time-select
          v-model="addPoliceFrom.startTime"
          placeholder="起始时间"
          style="width:160px"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }"
        />
        <el-time-select
          v-model="addPoliceFrom.endTime"
          placeholder="结束时间"
          style="width:160px"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: addPoliceFrom.startTime
          }"
        />
      </el-form-item>
      <el-form-item label="角色权限" prop="roleid">
        <el-select v-model="addPoliceFrom.roleid" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in rolelist"
            :key="item.RoleID"
            :label="item.RoleName"
            :value="item.RoleID"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="警员电话" prop="police_tel">
        <el-input v-model="addPoliceFrom.police_tel" />
      </el-form-item>
      <el-form-item label="警员部门" prop="department_codeArr">
        <el-cascader
          v-model="addPoliceFrom.department_codeArr"
          style="width:100%"
          :options="depttreedata"
          :props="{value:'departmentCode',checkStrictly: true }"
          clearable
        />
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
  name: 'AddPolice',
  props: ['depttreedata', 'rolelist'],
  data() {
    var checkAllowLogTime = (rule, value, callback) => {
      if (!this.addPoliceFrom.startTime) {
        return callback(new Error('请填写开始时间'))
      }
      if (!this.addPoliceFrom.endTime) {
        return callback(new Error('请填写结束时间'))
      }
      if (this.addPoliceFrom.startTime && this.addPoliceFrom.endTime) {
         callback()
      }
    }
    var checkUserEffective = (rule, value, callback) => {
      if (this.addPoliceFrom.user_effective_flag == '0' && !value) {
        return callback(new Error('请填写用户有效期'))
      } else {
        callback()
      }
    }
    var checkPwdEffective = (rule, value, callback) => {
      if (this.addPoliceFrom.pwd_effective_flag == '0' && !value) {
        return callback(new Error('请填写密码有效期'))
      } else {
        callback()
      }
    }
    return {
      addPoliceFrom: {
        police_code: '',
        police_name: '',
        police_tel: '',
        roleid: '',
        department_code: '',
        department_codeArr: [],
        id_number: '',
        police_flag: '',
        IP: '',
        islock: '',
        user_effective: '',
        pwd_effective: '',
        user_effective_flag: '',
        pwd_effective_flag: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        police_code: [
          { required: true, message: '请输入警员编号', trigger: 'blur' }
        ],
        police_name: [
          { required: true, message: '请输入警员姓名', trigger: 'blur' }
        ],
        id_number: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur' }
        ],
        IP: [{ required: true, message: '请输入IP', trigger: 'blur' }],
        department_codeArr: [
          {
            type: 'array',
            required: true,
            message: '请选择警员部门',
            trigger: 'blur'
          }
        ],
        user_effective: [{ validator: checkUserEffective, trigger: 'change' }],
        pwd_effective: [{ validator: checkPwdEffective, trigger: 'change' }],
        // startTime: [{ validator: checkAllowLogTime, trigger: 'blur' }]
      }
    }
  },
  mounted() {},
  methods: {
    save() {
      this.addPoliceFrom.department_code = this.addPoliceFrom.department_codeArr[
        this.addPoliceFrom.department_codeArr.length - 1
      ]
      debugger
      this.$refs.form.validate(valid => {
      console.log("TCL: save -> valid", valid)
        if (valid) {
          this.$post('Police/insert', this.addPoliceFrom).then(json => {
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

