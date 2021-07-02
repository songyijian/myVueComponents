// var routes
module.exports = routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@views/Home.vue"),
  },
  // {
  //   path: "/DemoSUpload",
  //   name: "DemoSUpload",
  //   component: () => import("@views/DemoSUpload.vue"),
  // },
  // {
  //   path: "/DemoSchedule", //小时周期控件
  //   name: "DemoSUpload",
  //   component: () => import("@views/DemoSchedule.vue"),
  // },
  // {
  //   path: "/DemoScheduleOnly", //小时周期控件
  //   name: "DemoScheduleOnly",
  //   component: () => import("@views/DemoScheduleOnly.vue"),
  // },
  // {
  //   path: "/DemoFolding",
  //   name: "DemoSUpload",
  //   component: () => import("@views/DemoFolding.vue"),
  // },
  {
    path: "/learn",
    name: "learn",
    redirect: "/learn/event",
    component: () => import("@views/LearnBox.vue"),
    children: [
      {
        path: "/learn/event",
        name: "event",
        component: () => import("@views/learn/event.vue"),
      },
      {
        path: "/learn/arrat",
        name: "arrat",
        component: () => import("@views/learn/arrat.vue"),
      },
    ],
  },
];
