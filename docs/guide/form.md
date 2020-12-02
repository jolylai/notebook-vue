---
title: 表单
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
