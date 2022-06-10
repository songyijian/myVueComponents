import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import Table from "./Table.vue";
import InfoStyle from "./InfoStyle.vue";
import Pagination from "./Pagination.vue";
import Dialog from "./Dialog.vue";
import Btn from "./Btn.vue";
import Forms from "./Forms.vue";
import ButtonNormal from "./button-set/ButtonNormal.vue";
import ButtonLink from "./button-set/ButtonLink.vue";
import PagingTable from "./PagingTable.vue";
import NoData from "./NoData.vue";
import StatusStyle from "./StatusStyle.vue";

// 全局组件注册
export default function (app) {
  comps(app);
}

const componentMap = {
  Table,
  InfoStyle,
  Pagination,
  Dialog,
  Btn,
  Forms,
  ButtonNormal,
  ButtonLink,
  PagingTable,
  NoData,
  StatusStyle,
};

function comps(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  for (const key in componentMap) {
    if (Object.hasOwnProperty.call(componentMap, key)) {
      const element = componentMap[key];
      app.component(key, element);
    }
  }
}
