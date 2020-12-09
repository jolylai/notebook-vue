---
title: Form
---

## 思考

- 优雅格式化表单中的时间
- 表单中的子组件

## 布局

layout 布局 适合用于填写字段比较多的表单中

```html
<el-form ref="formRef" :model="form" :rules="rules">
  <el-card>
    <!-- header -->
    <div slot="header">
      <span>基础信息</span>
      <el-button style="float: right; padding: 3px 0" type="text"
        >操作按钮</el-button
      >
    </div>
    <!-- card body -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :md="8">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.startTime"
            style="width: 100%"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-card>
</el-form>
```

## 效验

表单页用于向用户收集或验证信息

## 基础表单

基础表单常见于数据项较少的表单场景。

```vue
<template>
  <a-form>
    <a-form-item label="Input">
      <a-input v-model:value="form.region" placeholder="please input!" />
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({})

    return {
      form
    }
  }
}
</script>
```

### 表单初始化

```vue
<template>
  <a-form>
    <a-form-item label="Input">
      <a-input v-model:value="form.region" placeholder="please input!" />
    </a-form-item>
  </a-form>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const data = reactive({
      form: {}
    })

    return {
      form
    }
  }
}
</script>
```

### 表单效验

[async-validator](https://github.com/yiminghe/async-validator)

## 分步表单

## 高级表单

### 表单初始化 ？？？
