# Python与人工智能 课程笔记


## Chap.3 程序流程控制
### 海伦公式
1 . 计算半周长

$$s = \frac{a + b + c}{2}$$

2 . 计算面积

$$A = \sqrt{s(s-a)(s-b)(s-c)}$$

### 布尔值
```
x = print(1,2,3)
print(x)
```
输出结果：
```
1 2 3
None
```
将输出函数赋值给变量x没有任何意义，但是依然执行输出。而x本身因为被赋值，就有数值，该数值为None。
### 选择结构
#### 三目条件表达式
语法格式：
```
value1 if 条件表达式 else value2
```
语法说明：
1. 三目是指value1、value2和条件表达式三个数据对象，三目必须写在同一行中。
2. 条件表达式为True时，返回结果为value1；为False时，返回value2。
3. 三目条件表达式中的value值可以是单一的数据值，也可以是一个表达式。

例如：
```
if x<y:
    print(x)
else:
    print(y)
```
使用三目表达式：
```
print(x if x<y else y)
或
print(x) if x<y else print(y)
```
注意：除了上述两种格式之外
```
small = x if x<y else y         # 正确写法
small = x if x<y else samll = y # 错误，赋值语句不能作为三目条件表达式的value
```

#### pass语句
pass表示一个空操作，通常在没有想好某一段程序功能时，先用pass占位置，这样可以在程序未写完代码功能的同时又能保证程序的逻辑完整性和语法正确性。是一个很好的调试语句。
例如：
```
if grade >= 60:
    pass  # 还没有想好成绩及格后的操作，先占位
else:
    print('不及格')
```

### 循环结构
#### range() 函数生成迭代序列
含数值型元素的可迭代对象可以直接使用求和函数：
```
# 求100以内的偶数和
print(sum(range(2,101,2)))
```
#### i 变化对循环的影响
for 循环执行的是对迭代器中数据对象的遍历此操作，循环体中用于绑定数据的变量值发生变化对for循环的下一次遍历是没有影响的。
```
for i in range(1,10,2):  #迭代器已经生成，i的值固定遍历1、3、5、7、9，不会改变
    print(i,end="")
    i=i+3                # 这句话对循环遍历没有任何影响
print(i)                 #唯一影响的是最后一次循环结束后，退出循环的变量值
```
输出结果是12

#### while循环求最大公约数和最小公倍数
```
# 求最小公倍数
a,b = eval(input("请输入两个整数a,b"))
if a>b:
    a,b = b,a # 提高算法效率，保证a大于b
gbs = a
while gbs%b != 0:
    gbs += a
print("%d和%d的最小公倍数为%d" % (a,b,gbs))

# 求最大公约数
gys = b
while a % gys != 0 or b % gys !=0:
    gys -= 1
print("%d和%d的最大公约数为%d" % (a,b,gys))
```
#### break语句
强行退出break语句所在的在内层循环

#### continue语句
当循环体执行到continue语句时，结束本次循环，即不再向下执行后续的循环体内容，并开始下一次循环。

continue语句不能放在循环体的最后一行，否则没有意义。

#### else子句
格式如下：
```
for 变量 in 迭代器:
    循环体
else:
    else子句代码块
```

**语法说明：**

1. else部分代码最多执行一次，属于退出循环前执行的最后一段代码
2. 当for循环遍历结束，或while循环条件表达式为False时执行else子句，即使for循环和while循环的循环体一次都不执行，也要执行else子句
3. else子句只有在循环体中遇到break语句强行退出循环时才不会被执行

**例题：** 输入一个大于1的正整数n，判断其是否为素数。

```
n = eval(input("请输入一个大于1的整数："))
k = int(pow(n,0.5)) # 能被整除的区间只需要从2到根号下n（包含）即可  
for i in range(2,k+1):
    if n % i == 0:
        print("%d不是素数" %n)
        break       # 不是素数强行退出整个循环
else:               # 进入else说明for循环全部结束，没有遇到break语句
    print("%d是素数" %n)  
```