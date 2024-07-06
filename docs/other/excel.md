|              |                                                              |
| ------------ | ------------------------------------------------------------ |
| 单元格换行   | alt+回车                                                     |
| 冻结窗格     | 选中要冻结的行或列-视图-冻结窗格                             |
| 两列互换     | 选中某列-按住shift--鼠标移动到左侧或者右侧边框线处按住鼠标左键拖动即可 |
| 数据下拉     | 选中需要设置下拉的-数据-数据有效性-设置-允许【序列】-来源【英文逗号分隔或者选择某些数据作为下拉】 |
| 二维级联下拉 | 设置数据：第一行是第一级数据，对应的列是其二级数据<br />指定名称：将这些数据全选中-公式-指定-勾选首行<br />对需要设置一级下拉的设置下拉：按照“数据下拉”选中刚刚的首行那些数据<br />对需要设置二级下拉的设置下拉：先一级下拉第一格（M1）选中一个数据-选中要设置下拉的单元格-数据-数据有效性-允许【序列】-来源【=INDIRECT($M1)】 |

# 实践

## A列中有中文和英文，在 excel 如何将A拆分为两列

1. 插入辅助列： 在B列和C列分别插入两个新的列，用于存放拆分后的中文和英文。

2. 使用公式拆分中文和英文：

​	提取中文： 在B2单元格输入以下公式，并向下填充：

```
=TEXTJOIN("", TRUE, IF(ISNUMBER(SEARCH(MID(A2, ROW(INDIRECT("1:" & LEN(A2))), 1), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")), "", MID(A2, ROW(INDIRECT("1:" & LEN(A2))), 1)))这个公式会提取A列中的中文字符。
```

​	提取英文： 在C2单元格输入以下公式，并向下填充：

```
=TEXTJOIN("", TRUE, IF(ISNUMBER(SEARCH(MID(A2, ROW(INDIRECT("1:" & LEN(A2))), 1), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")), MID(A2, ROW(INDIRECT("1:" & LEN(A2))), 1), ""))
这个公式会提取A列中的英文字符。
```

## excel 中删掉空格

```
=SUBSTITUTE(D4," ","")
```

## excel我想删除G列值为See below的行

