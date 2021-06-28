# PaymentPin 支付验证输入框


## 安装

```js

// 全局安装
import PaymentPin from "@components/PaymentPin"
Vue.use(PaymentPin)

// 局部注册
import PaymentPin from "@components/PaymentPin/PaymentPin.vue"
exprot {
  components:{PaymentPin}
}

```


```vue
<template>
  <div>
  <span>Reset payment PIN:</span>
  <PaymentPin v-model="paymentPin" @input="chage" />
  </div>
</template>

<script>
exprot {
  data(){
    paymentPin:"" // 支持双向绑定
  },
  methods:{
    chage(){
      // 变化监听
    }
  }
}
</script>
```

