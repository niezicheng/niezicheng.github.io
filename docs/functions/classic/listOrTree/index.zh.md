---
title: 防抖和节流
order: 1
group:
  title: 经典
nav:
  title: 方法
  order: 3
---

## list 与 tree 数据相互转化

### 基础结构

#### list 数据结构

```ts
type TListItem = {
  id: number;
  title: string;
  pid?: number;
  pTitle?: string;
};

type TListData = Array<TListItem>;
```

#### tree 数据结构

```ts
type TTreeItem = {
  id: number;
  title: string;
  children?: TTreeItem[];
};

type TTreeData = Array<TTreeItem>;
```

### list 转 tree

### 递归

### 双层循环

#### map 存储

```ts
type TOptions = {
  labelKey?: string;
  valueKey?: string;
  pLabelKey?: string;
  pValueKey?: string;
  // 是否提取父对象信息并入源数据中
  isFetchParent?: string;
};

const defaultOptions = {
  labelKey = 'title',
  valueKey = 'id',
  pLabelKey = 'pTitle',
  pValueKey = 'pid',
  isFetchParent = false,
};

/**
 * @param list 源数据
 * @param options 数据配置选项
 */
const list2tree = (list, options = defaultOptions) => {
  const { labelKey, valueKey, pLabelKey, pValueKey, isFetchParent } = options;
  const [map, treeData] = [{}, []];

  // 获取父元素对象并加入源数据 list
  if (isFetchParent) {
    const map2 = {};
    const length = list.length;
    for (let i = 0; i < length; i += 1) {
      if (!map2[list[i][pValueKey]]) {
        map2[list[i][pValueKey]] = true;
        const parentData = {
          value: list[i][pValueKey],
          label: list[i][pLabelKey],
        };
        parentData[valueKey] = list[i][pValueKey];
        parentData[labelKey] = list[i][pLabelKey];
        list.push(parentData);
      }
    }
  }

  // 循环 list 项加入 map 对象并添加 children【map 存储为当前元素索引】
  for (let i = 0; i < list.length; i += 1) {
    map[list[i][valueKey]] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    const node = list[i];
    // 存在父元素【pValueKey 存在】，并且在父对象在 list 中【存在 map】
    if (node[pValueKey] && list[map[node[pValueKey]]]) {
      // 将当前元素加入父元素 children 中
      list[map[node[pValueKey]]].children.push({
        ...node,
        label: node[labelKey],
        value: node[valueKey],
      });
    } else {
      // 不存在父元素【即根元素】加入输出数组中
      treeData.push(node);
    }
  }
  return treeData;
};

// 示例
const listData = [
  {
    cateId: 'p1-1',
    parentId: 'p1',
    pTitle: 'P广州',
    title: '广州',
  },
  {
    cateId: 'p1-2',
    parentId: 'p1',
    pTitle: 'P深圳',
    title: '深圳',
  },
  {
    cateId: 'p2-1',
    parentId: 'p2',
    title: '成都',
    pTitle: 'P成都',
  },
  {
    cateId: 'p2-2',
    parentId: 'p2',
    title: '德阳',
    pTitle: 'P',
  },
];

const options = {
  labelKey: 'title',
  valueKey: 'cateId',
  pLabelKey: 'pTitle',
  pValueKey: 'parentId',
  isFetchParent: true,
};

console.log(list2tree(listData, options));
```

### tree 转 list
