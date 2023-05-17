<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px" @click="handleAdd"
      >添加</el-button
    >
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="id" label="id" />
      <el-table-column prop="serial" label="题号" />
      <el-table-column prop="type" label="题目类型">
        <template slot-scope="scope">
          <p>{{ scope.row.type === "single" ? "单选" : "多选" }}</p>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDetail(scope)"
            >详情</el-button
          >
          <el-button type="text" size="small" @click="handleChange(scope)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog
      :title="isEidt ? '修改题目' : '添加题目'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="题号" prop="serial">
          <el-input
            v-model="form.serial"
            autocomplete="off"
            style="width: 300px"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="题目"
          prop="title"
          :rules="{
            required: true,
            message: '题目不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="form.title"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="题目类型"
          prop="type"
          :rules="{
            required: true,
            message: '题目类型不能为空',
            trigger: 'blur',
          }"
        >
          <el-radio v-model="form.type" label="single">单选</el-radio>
          <el-radio v-model="form.type" label="multiple">多选</el-radio>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in form.domains"
          :label="'选项' + index"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '选项不能为空',
            trigger: 'blur',
          }"
          :key="domain.key"
        >
          <el-input
            v-model="domain.value"
            style="width: 300px; margin-right: 10px"
          ></el-input
          ><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>

        <!-- <el-form-item label="选项" prop="optionList">
          <div v-for="(item, index) in optionList" :key="index">
            <el-input
              autocomplete="off"
              style="width: 300px; margin-bottom: 10px"
              @change="changeOption(value, index)"
            ></el-input>
          </div>
          <el-button @click="handleAddItem">添加选项</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!isDetail" @click="addDomain">添加选项</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!isDetail" type="primary" @click="beforeSubmitForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMixin } from "@/utils/listMixin.js";
import { getNewQuestionnaireId } from "@/api/table";
import { postApi } from "@/api/list";
export default {
  mixins: [listMixin],
  data() {
    return {
      baseUrl: "/questionnaire",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        domains: [
          {
            value: "",
          },
        ],
      },
    };
  },
  methods: {
    handleAdd() {
      getNewQuestionnaireId().then((res) => {
        this.form = {
          serial: res.data,
          domains: [
            {
              value: "",
            },
          ],
        };
        this.dialogFormVisible = true;
        this.isEidt = false;
      });
    },
    // 删除选项
    removeDomain(item) {
      var index = this.form.domains.indexOf(item);
      if (index !== -1) {
        this.form.domains.splice(index, 1);
      }
    },
    addDomain() {
      console.log("addDomain", this.form);
      this.form.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    // 提交前数据处理
    beforeSubmitForm() {
      let str = [];
      this.form.domains.forEach((item) => {
        str.push(item.value);
      });
      this.form.optionList = str.join(",");
      this.submitForm();
    },
    // 点击修改
    handleChange(scope) {
      this.isEidt = true;
      postApi(this.baseUrl + "/info", { id: scope.row.id }).then((res) => {
        let ds = res.data.optionList.split(",").map((item, index) => {
          return {
            key: index,
            value: item,
          };
        });
        this.dialogFormVisible = true;
        this.form = {
          ...res.data,
          domains: ds,
        };

        console.log("this.form.domains", this.form);
        // this.list = res.data.records;
      });
    },
    // 点击详情
    handleDetail(scope) {
      // 获取详情
      this.isDetail = true;
      postApi(this.baseUrl + "/info", { id: scope.row.id }).then((res) => {
        let ds = res.data.optionList.split(",").map((item, index) => {
          return {
            key: index,
            value: item,
          };
        });
        this.dialogFormVisible = true;
        this.form = res.data;
        this.form.domains = ds;
        // this.list = res.data.records;
      });
    },
  },
};
</script>
