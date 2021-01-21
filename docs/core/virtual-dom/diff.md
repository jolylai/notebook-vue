---
title: diff
---

- 只比较同一级，不做跨级比较
- tag 不相同，直接删掉重建，不再深度比较
- tag 和 ken 两者都相同，则认为是相同节点，不再深度比较

以新的 VNode 为基准，改造旧的 oldVNode 使之成为跟新的 VNode 一样，这就是 patch 过程要干的事。

说了这么多，听起来感觉好像很复杂的样子，其实不然，我们仔细想想，整个 patch 无非就是干三件事：

- `创建节点`：新的 VNode 中有而旧的 oldVNode 中没有，就在旧的 oldVNode 中创建。
- `删除节点`：新的 VNode 中没有而旧的 oldVNode 中有，就从旧的 oldVNode 中删除。
- `更新节点`：新的 VNode 和旧的 oldVNode 中都有，就以新的 VNode 为准，更新旧的 oldVNode。
