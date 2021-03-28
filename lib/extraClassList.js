/*
 * @Author: 李文超
 * @Date: 2021-03-22 17:27:20
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-25 10:06:12
 * @Description: 去除在外，不进行转化的class名称,支持字符串和正则
 * @FilePath: \auto-html2css\lib\extraClassList.js
 */
const vscode = require('vscode');
const getExtraClassList = () => {
    let configuration = vscode.workspace.getConfiguration('AutoHtml2Css')
    let extraStr = configuration.get('extraClassList')
    if (extraStr) {
        let list = extraStr.split(',')
        list = list.map(item => new RegExp(item, 'g'))
        return list
    }
    else {
        return []
    }
}



module.exports = getExtraClassList