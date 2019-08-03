<template>
  <div>
    <div class="fltitle">
      <el-row>
        <el-col :offset="4" :span="16" style="text-align:center">
          <span class="fltitle-text">电子围栏</span>
        </el-col>
        <el-col :span="4" style="text-align:center">
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            style="padding:5px"
            @click="addFence"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="filter" clearable placeholder="电子围栏名称">
            <el-button slot="append" @click="onSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="body">
      <span v-if="items.length == 0">无围栏信息！</span>
      <el-card
        v-for="fenceitem of items"
        :key="fenceitem.id"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <div style="padding: 14px;">
          <span>{{ fenceitem.Name }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ fenceitem.Comment }}</time>
            <el-button type="primary" class="button" @click="showEdit(fenceitem)">
              <i class="el-icon-edit" /> 查看
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ["fencelist"],
  data() {
    return {
      filter: "",
      items: []
    };
  },
  watch: {
    fencelist() {
      this.search();
    }
  },
  methods: {
    search() {
      this.items = [];
      this.fencelist &&
        this.fencelist.forEach(p => {
          if (!this.filter || p.Name.indexOf(this.filter) > -1) {
            this.items.push(p);
          }
        });
    },
    showEdit(fenceitem) {
      this.$emit("showEdit", fenceitem);
    },
    showDetails(fenceitem) {
      this.$emit("showDetails", fenceitem);
    },
    addFence() {
      this.$emit("addFence");
    },
    onSearch() {
      this.search();
    }
  }
};
</script>
<style lang="scss" scoped>
.fltitle {
  padding: 12px 0;
  & .el-row + .el-row {
    margin-top: 8px;
  }
  &-text {
    font-size: 20px;
  }
}
.body {
  overflow-y: auto;
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 3px;
  float: right;
  font-size: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-card {
  margin-bottom: 10px;
  background-color: #f8fffdd9;
}
</style>
