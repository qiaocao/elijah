<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col v-for="paramitem in paramsData" :key="paramitem.id" :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ paramitem.settingKey }}</span>
          <span
            v-if=" paramitem.settingKey == '警车异常停车设置'"
            style="font-size:12px;color:#ff7b7b"
          >(注：设置值为0时，关闭异常停车报警)</span>
        </div>
        <div style="margin-top: 15px;text-align:right">
          <el-input v-model="paramitem.settingValue" style="text-align: end;">
            <template slot="append">{{ paramitem.settingRemark }}</template>
          </el-input>
          <el-button type="primary" style="margin-top:20px" @click="setParam(paramitem)">保存设置</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      paramsData: []
    }
  },
  mounted() {
    this.getparams()
  },
  methods: {
    getparams() {
      this.$post('CSSZ/list').then(json => {
        this.paramsData = json.data
      })
    },
    setParam(pdata) {
      if (pdata.settingValue === '') {
        this.$notify.error({
          title: '错误',
          message: '请输入正确的参数值'
        })
        return false
      }
      this.$post('CSSZ/update', pdata).then(json => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
        this.getparams()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  text-align: right;
  text-align: end;
}
</style>
