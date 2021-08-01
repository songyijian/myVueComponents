// var routes

function loadDeom (path) {
  return (view) =>
    import(
      /* webpackChunkName: "demoPage-[request]" */ `@views/demoPage/${view}.vue`
    );
}

let components = {
  path: "/components",
  name: "components",
  redirect: "/components/install",
  component: () => import("@views/Layout/demoLayout.vue"),
  children: [
    {
      path: "/components/install",
      name: "安装",
      component: () => import("@views/demoPage/install.vue"),
    },
    {
      path: "/components/paymentPin",
      name: "paymentPin 支付验证",
      component: () => import("@views/demoPage/paymentPin.vue"),
    },
    {
      path: "/components/weekMolecule",
      name: "WeekMolecule 周小时粒度管理控件",
      component: () => import("@views/demoPage/weekMolecule.vue"),
    },
    {
      path: "/components/decayLodingBar",
      name: "DecayLodingBar 周小时粒度管理控件",
      component: () => import("@views/demoPage/decayLodingBar.vue"),
    },
  ],
};

export default components;
