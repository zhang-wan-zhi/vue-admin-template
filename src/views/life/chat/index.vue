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
              <div class="user-item" @click="handleFriendList(scope.row)">
                <!-- <el-avatar :src="scope.row.imgPath"></el-avatar> -->
                <div class="user-item-name">{{ scope.row.name }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>{{ selectFriend.name }}</el-header>
      <el-main id="scoolID">
        <div class="chat-list">
          <div
            class="chat-list-item"
            v-for="(item, index) in chatList"
            :key="index"
            :style="{
              alignSelf: item.type === 'other' ? '' : 'end',
              background: item.type === 'other' ? '#fff' : '#0ed13f',
            }"
          >
            {{ item.message }}
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-input
          :disabled="this.selectFriend.name ? false : true"
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
import { postApi } from "@/api/list";
import store from "@/store";

export default {
  data() {
    return {
      input: "",
      keyword: "",
      userInfo: {},
      tableData: [],
      websocket: null,
      selectFriend: {},
      chatList: [],
    };
  },
  mounted() {
    this.init();
    this.getFriendList();
  },
  beforeDestroy() {
    this.websocket.close();
  },
  methods: {
    send() {
      /* 发送消息 */
      console.log(this.input);
      var model = {
        message: this.input,
        fromId: store.getters.id,
        toId: this.selectFriend.id,
      };
      this.websocket.send(JSON.stringify(model));

      this.chatList.push({
        message: this.input,
        type: "me",
      });
      this.$nextTick(() => {
        var ele = document.getElementById("scoolID");
        //判断元素是否出现了滚动条
        if (ele.scrollHeight > ele.clientHeight) {
          //设置滚动条到最底部
          ele.scrollTop = ele.scrollHeight;
        }
      });

      /* 清空输入框 */
      this.input = "";
    },
    init() {
      const _this = this;
      console.log("store.getters.id", store.getters.id);
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          process.env.VUE_APP_BASE_WEBSOCKET + store.getters.id
        );
      } else {
        alert("当前浏览器 Not support websocket");
      }
      //连接成功建立回调方法
      this.websocket.onopen = function () {
        console.log("WebSocket连接成功");
      };
      this.websocket.onmessage = function (event) {
        console.log(
          "eventevent",
          JSON.parse(event.data),
          _this.selectFriend.id
        );
        const data = JSON.parse(event.data);
        data.type = "other";
        if (_this.selectFriend.id === data.fromId) {
          _this.chatList.push(data);
        }
      };
    },
    // 获取好友列表
    getFriendList() {
      postApi("/chat/user-list").then((res) => {
        console.log("res", res);
        this.tableData = res.data;
      });
    },
    // 选择好友
    handleFriendList(data) {
      this.selectFriend = data;
      this.getChatHistoryList();
    },
    // 获取聊天历史
    getChatHistoryList() {
      const data = {
        fromId: store.getters.id,
        toId: this.selectFriend.id,
      };
      postApi("/chat/history", data).then((res) => {
        const ls = res.data.map((item) => {
          if (item.fromId === store.getters.id) {
            return {
              ...item,
              type: "me",
              message: item.content,
            };
          } else {
            return {
              ...item,
              type: "other",
              message: item.content,
            };
          }
        });
        this.chatList = ls;
      });
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
  overflow: hidden;
  overflow-y: scroll;
  height: 200px;
  /* margin: 0;
  padding: 0; */
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
.user-item {
  cursor: pointer;
}
.chat-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: start;
}
.chat-list-item {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  /* position: absolute; */
}
</style>
