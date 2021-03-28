/*
 * @Author: 李文超
 * @Date: 2021-03-22 11:19:24
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-25 10:05:32
 * @Description: file content
 * @FilePath: \auto-html2css\lib\generate.js
 */
console.log('==========generate',)
const fs = require('fs')
// const data = fs.readFileSync('./template.html', "utf-8")
const cheerio = require('cheerio')
const parseCSS = require('./parseCss')
const getExtraClassList = require('./extraClassList')
// 是否在特殊名单内
const isInExtraClassList = (item, extraClassList) => {
    let res = false
    res = extraClassList.find((extraItem => {
        let isString = Object.prototype.toString.call(extraItem) == "[object String]"
        let isReg = Object.prototype.toString.call(extraItem) == "[object RegExp]"
        if (isString) {
            return extraItem === item
        }
        else if (isReg) {
            return extraItem.test(item)
        }
        else {
            throw new Error('名单只支持字符串和正则表达式')
        }

    }))

    return res
}
const getNodeClass = (node) => {
    if (node.attribs && node.attribs.class) {
        let classList = node.attribs.class.split(/\s+/)
        let filterList = classList.filter((item) => {
            if (!item) return false
            // 去除小程序中class变量,以及名单中的class
            if (/{{.*}}/.test(item)) {
                return false
            }
            // 名单内排除
            else if (isInExtraClassList(item, getExtraClassList())) {
                return false
            }
            else {
                return true
            }
        })
        if (filterList.length > 0) {
            let str = '.' + filterList.join('.')
            return str
        }
        else {
            return ''
        }
    }
    else {
        return ''
    }
}
const getParentLink = (node, link = []) => {
    let nodeClass = getNodeClass(node)
    link.push(nodeClass)
    if (node.parent) {
        getParentLink(node.parent, link)
        return link
    }
    else {
        return link
    }
}

// const classAst = htmlNodeList.map(() => {
//     // 如何做转化？
// })

// fs.writeFileSync('./res.scss', scssStr)
const generate = (htmlStr) => {
    const $ = cheerio.load(htmlStr)
    let scssStr = ''
    const htmlNodeList = $('*').toArray()
    htmlNodeList.forEach((node) => {
        let link = getParentLink(node, []).filter(item => item).reverse()
        if (link.length > 0) {
            let linkStr = '\n' + link.join(' ') + '{\n}\n'
            scssStr += linkStr
        }

    })
    scssStr = parseCSS(scssStr)
    return scssStr
}
module.exports = generate
