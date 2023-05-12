<template>
  <el-container>
    <el-aside width="200px">
      <div style="height: 60px">
        <div class="myinfo">
          <el-avatar :src="userInfo.avatar"></el-avatar>
          <span>{{ userInfo.name }}</span>
        </div>
      </div>
      <div style="height: 50px">
        <el-input v-model="keyword" placeholder="搜索好友">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-row style="height: 390px">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column label="日期">
            <template slot-scope="scope">
              <div class="user-item">
                <el-avatar :src="scope.row.img"></el-avatar>
                <div class="user-item-name">{{ scope.row.name }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>
        <el-input
          placeholder="请输入内容"
          v-model="input"
          @keyup.enter.native="send"
        >
        </el-input>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { getList } from "@/api/table";

export default {
  data() {
    return {
      input: "",
      keyword: "",
      userInfo: {},
      tableData: [
        {
          name: "王小虎",
          img: "https://p0.ssl.qhimgs1.com/sdr/400__/t0197ad9742a3e63410.jpg",
        },
        {
          name: "郑泷",
          img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          name: "小蛮",
          img: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/30adcbef76094b36ba49777aa5cc7cd98c109d49.jpg",
        },
        {
          name: "张云",
          img: "http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    send() {
      /* 发送消息 */
      console.log(this.input);
      /* 清空输入框 */
      this.input = "";
    },
    init() {
      console.log(this.$store.state.user);
      this.userInfo = this.$store.state.user;
      const ws = new WebSocket("ws://localhost:3005" + this.userInfo.token);
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: calc(100vh - 50px);
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.myinfo {
  text-align: left;
  vertical-align: middle;
  margin-top: 10px;
  margin-left: 10px;
}
.myinfo span {
  text-align: left;
  vertical-align: middle;
  margin-left: 10px;
}
.user-item {
  display: flex;
  align-items: center;
}
.user-item-name {
  margin-left: 10px;
}
</style>
