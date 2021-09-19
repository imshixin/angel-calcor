<!--
 * @Author: imsixn
 * @Date: 2021-08-30 16:15:34
 * @LastEditors: imsixn
 * @LastEditTime: 2021-09-19 21:15:29
 * @Description: file content
-->
# 角度计算器
使用create-react-app创建
示例网站：[](https://ang.xinit.xyz)

## 角度书写说明

`1° 22′ 54″`用数字写为`1.2254`

- 度数为整数
- 分为小数点后二位
- 秒为小数点2-4位，5位以后的将自动四舍五入

注意，除法和乘法的第二位操作数会自动转换为整数，也就是说，只能角度乘或除整数

**输入错误的角度会有提示**

高级角度计算器支持添加括号，并会分别展示括号内的计算结果

## 更新
#### 2021-09-15

- 增加了清空按钮
- 结果标签序号更明显
- 更改为灰色背景