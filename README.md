<!--
 * @Author: 李文超
 * @Date: 2021-03-24 17:57:44
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-25 09:55:16
 * @Description: file content
 * 
 * @FilePath: \auto-html2css\README.md
-->
# auto-html2css README

## 功能

1 自动转换html结构中的class，生成嵌套层级的scss代码

## 使用

> 大前提，需要在编辑器中，选中一段代码

1. 命令，ctrl+shift+p,输入指令html2css,并执行
2. 快捷键,ctrl+alt+z,执行

当提示转换完成后，转换后的内容将会在剪切板上

## 配置

> open workspace settings - extensions - AutoHtml2Css ,编辑json文件

| 字段名         | 含义              | 可选值                                                     |
| -------------- | ----------------- | ---------------------------------------------------------- |
| extraClassList | 要排除的class名单 | 字符串类型，使用逗号隔开，会进行切分并转换成正则表达式匹配 |