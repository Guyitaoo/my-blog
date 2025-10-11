# 分词

## 1. 中文分词原理

### 1.1. 概述

中文分词指的是将连续的中文汉字序列，按照一定的规范，切分成一个一个单独的、有意义的词语的过程。

### 1.2 中文分词方法

常用的分词方法可分为两大类：**基于词典（字符串匹配）的分词方法** 和 **基于基于统计的分词的方法**

#### 1.2.1 基于词典（字符串匹配）的分词方法

**原理**：建立一个包含尽可能多词语的词典。对待分词的文本，按照一定的扫描方向（正向或反向）和匹配规则（如最长匹配），逐个与词典中的词进行匹配。如果能在词典中找到对应的词，就将其切分出来。

**优点**：

 - 速度快效率高
 - 对于词典内已有的词效果很好

**缺点**：

 - 未登录词处理能力弱：完全依赖预设词典，无法识别新词、专有名词（如人名、地名）或领域术语
 - 歧义消解能力有限：仅能通过简单规则（如词数、单字数量）优化，难以处理复杂语义歧义
 - 词典维护成本高：需持续更新词典以覆盖新词汇，尤其在网络文本快速迭代的场景下

**常用算法**：

 - **正向最大匹配法(Forward Maximum Matching, FMM)**：从句子的最左边开始，尽可能多地匹配词典中最长的词。
 - **逆向最大匹配法(Backward Maximum Matching, BMM)**：从句子的最右边开始，尽可能多地匹配词典中最长的词。

    统计数据表明，逆向最大匹配算法切分的正确率高于正向最大匹配算法。

 - **双向最大匹配法**：分别使用正向最大匹配法和逆向最大匹配法对句子进行切分，结果遵循以下规则：
   
    1. 切分结果完全相同时，准确率最大
    2. 切分结果不同时，切分词数目小的作为将结果
    3. 切分结果不同，且切分词数目相同，取逆向最大匹配算法结果

#### 1.2.2 基于统计的分词方法

**原理**：在给定大规模语料库中已经分词的文本的前提下，利用字与字、词与词之间共同出现的统计规律，训练统计机器学习模型，学习词语切分的规律，来量化“词语”的成词可能性，并以此为依据，寻找全局最优的切分方案。

**主要模型**：

 - **n-gram语言模型**：
   
    将分词转化为选择概率最大的词序列问题，使用n-gram计算不同切分组合的流畅度（概率）。

    能较好地解决组合型歧义，但严重依赖候选切分集的质量，且存在数据稀疏问题。

 - **隐马尔科夫模型(Hidden Markov Model, HMM)**：
 
    通过“状态转移”和“观测发射”两种概率，计算哪个标签序列最可能生成当前的汉字序列。

    采用四个隐含状态，分别表示为单字成词，词组的开头，词组的中间，词组的结尾。通过标注好的分词训练集，可以得到 HMM 的各个参数，然后使用 Viterbi 算法来解释测试集，得到分词结果。

    是一种生成式模型，比词典法强大，但其“观测独立性”的强假设不符合语言事实，灵活性差。

 - **最大熵模型(maximum entropy model, MaxEnt)**：
 
    利用多种上下文特征（如前后字）进行概率估计的分类模型，遵循“在已知约束下选择最不确定分布”的原则。

    特征灵活，打破了HMM的独立性假设，但作为局部分类器，存在标记偏置问题，未能实现全局最优。

 - **条件随机场(Conditional Random Fields, CRF)**：

    一种判别式模型，能够定义并综合利用各种上下文特征，通过全局归一化寻找最优标签序列。

    克服了HMM的假设缺陷和最大熵的标记偏置问题，是经典统计方法的集大成者，效果优异。

<font color="#96999A">*具体原理此处不作详细说明，后续根据实际需求可分别单独撰写文档*</font>

## 2. 中文分词工具——jieba

### 2.1 介绍

jieba 分词是一个强大的、使用最广泛的中文分词库。

Github开源仓库：https://github.com/fxsjy/jieba

**基本原理**：

  1. **基于前缀词典（Trie 树）进行词图扫描**：

     jieba 内置了一个庞大的词典，包含了常见的词语及其词频。它利用这个词典构建一个前缀树，快速识别句子中所有可能出现的词。

  2.  **基于动态规划查找最大概率路径**：

      在识别出所有可能的词之后，会形成一个有向无环图（DAG）。然后使用 Viterbi 算法，找到一条基于词频（概率）的路径，使得整个句子的概率最大。这条路径就是最终的分词结果。

  3. **对于未登录词（OOV）**：

     未登录词是指不在词典中的新词，比如人名、技术名词、网络新词等。jieba 采用了基于汉字成词能力的HMM 模型来识别这些新词。

<font color="#96999A">*具体原理此处不作详细说明，后续根据实际需求可分别单独撰写文档*</font>

### 2.2 分词

#### 2.2.1 默认分词

目前支持3种分词模式

| 模式      | 特点 | 适用场景 |
| :----:    |    ----   |          -------- |
| 精确模式     | 将句子最精确地切开，不存在冗余词汇，结果准确。      | 文本分析   |
| 全模式       | 扫描出句子中所有可以成词的词语，速度非常快。但会产生大量的冗余词汇。       | 快速分词     |
| 搜索引擎模式 | 在精确模式的基础上，对长词再次切分，提高召回率。既兼顾了准确性，又能找到更细粒度的词语。     | 搜索引擎场景     |

代码实现


```python
import jieba
text = "我来到北京清华大学"
```

1 . 精确模式


```python
seg_list = jieba.cut(text, cut_all=False)
print("精确模式: " + "/ ".join(seg_list))
```
```
    精确模式: 我/ 来到/ 北京/ 清华大学
```  

2 . 全模式


```python
seg_list_all = jieba.cut(text, cut_all=True)
print("全模式: " + "/".join(seg_list_all))
```
```
    全模式: 我/来到/北京/清华/清华大学/华大/大学
```   

3 . 搜索引擎模式


```python
seg_list_search = jieba.cut_for_search(text)
print("全模式: " + "/".join(seg_list_search))
```
```
    全模式: 我/来到/北京/清华/华大/大学/清华大学
```    

**使用 隐马尔可夫(HMM) 模型：**

HMM在jieba分词中主要用于解决未登录词（OOV）的识别问题。

以句子"他来到了网易杭研大厦"为例，HMM模型可以识别出“杭研”这个新的词


```python
# 未启用 HMM
seg_list = jieba.cut("他来到了网易杭研大厦", HMM=False) #默认精确模式和不启用 HMM
print("未启用 HMM：" + "/ ".join(seg_list))
```

    未启用 HMM：他/ 来到/ 了/ 网易/ 杭/ 研/ 大厦
    


```python
# 启用 HMM
# 可识别到新词
seg_list = jieba.cut("他来到了网易杭研大厦") #默认精确模式和启用 HMM
print("启用 HMM：" + "/ ".join(seg_list)) 
```

    启用 HMM：他/ 来到/ 了/ 网易/ 杭研/ 大厦
    

**返回值说明：**

 - `jieba.cut() / jieba.cut_for_search()` ：返回生成器（generator）对象，需要遍历或转换为列表使用。

 -  `jieba.lcut() / jieba.lcut_for_search()` ：直接返回列表（list），方便直接使用。

下面是`jieba.lcut()`在精确模式下的使用效果：


```python
seg_list = jieba.lcut(text, cut_all=False)
print(seg_list)
```

    ['我', '来到', '北京', '清华大学']
    

#### 2.2.2 添加自定义词典
**作用：** 添加自定义词典后，jieba能够准确识别词典中出现的词汇，避免将专业术语、专有名词等拆分成单个字或无关词汇。

**格式要求：** 每一行包含三部分，用空格分隔，顺序不可颠倒

   - 词语（必填）：需要识别的词汇
   - 词频（可选）：词汇出现的频率，不填则由jieba自动计算
   - 词性（可选）：词汇的词性标注，不填则由jieba自动判断
     
   - 示例：
```python
黑马程序员 5 n
传智教育 6 n
人工智能 7 nz
学习 3      # 省略词性
上市        # 省略词频和词性
```

**使用效果：**


```python
import jieba
text1 = "传智教育是一家上市公司，旗下有黑马程序员品牌。我是在黑马这里学习人工智能"
```

1 . 不使用自定义词典

```python
# 未加载词典
jieba.initialize()
seg_list1 = jieba.cut(text1, cut_all=False)
print("未使用自定义词典：" + '/ '.join(seg_list1))
```
```
未使用自定义词典：传智/教育/是/一家/上市公司/，/旗下/有/黑马/程序员/品牌/。/我/是/在/黑马/这里/学习/人工智能
```

2 . 使用自定义词典

```python
# 载入词典
jieba.load_userdict("userdict.txt")
seg_list2 = jieba.cut(text1, cut_all=False)
print("未使用自定义词典：" + '/ '.join(seg_list2))
```
```
未使用自定义词典：传智教育/是/一家/上市公司/，/旗下/有/黑马程序员/品牌/。/我/是/在/黑马/这里/学习/人工智能
```   

使用词典前后对比：
| 场景      | 结果差异 |
| :----:    |    ----   |
| 未使用自定义词典     | 传智、教育、黑马、程序员 |
| 使用自定义词典      | 传智教育、黑马程序员 |

#### 2.2.3 jieba词典增加、删除词
可以通过添加或删除单个词来改变分词结果。增加或删除词只能比原来切分的长度要长才起效果


```python
import jieba
sentence="我来到杭州浙江工业大学"
seg_list=jieba.cut(sentence, cut_all = False)   
print("默认效果：" + "/".join(seg_list))
```

```
    默认效果：我/来到/杭州/浙江工业大学
``` 

1 . 增加更长的词


```python
jieba.add_word("我来到")
seg_list=jieba.cut(sentence, cut_all = False)   
print("加入“我来到”：" + "/".join(seg_list))
```
```
    加入“我来到”：我来到/杭州/浙江工业大学
```  

2 . 增加比原来分的更短的词


```python
jieba.add_word("浙")
seg_list=jieba.cut(sentence, cut_all = False)   
print("加入“浙”：" + "/".join(seg_list))
```

    加入“浙”：我来到/杭州/浙江工业大学
    

可以看到增加比原来切分的长度短的词不起效果

3 . 删除词


```python
jieba.del_word("浙江工业大学")
seg_list=jieba.cut(sentence, cut_all = False)   
print("删除“浙江工业大学”：" + "/".join(seg_list))
```

    删除“浙江工业大学”：我来到/杭州/浙江/工业/大学
    

## 3.补充内容

### 3.1 基于词典的分词方法简单实现


```python
Dictionary = ["我","来到","杭州","浙江","工业","大学","选工","大有","底气","工大","有底气","业大"] 
Sentence = "我来到杭州浙江工业大学,选工大有底气"
```

1 . 正向最大匹配法(Forward Maximum Matching, FMM)


```python
def FMM(sentence, dic):
    result = []
    #获取字典中最长的词语长度
    max_word_length = len(max(dic, key=len))
    while sentence:
        # 当前匹配窗口大小
        match_size = min(len(sentence), max_word_length)
        matched = False
        # 尝试从最大长度开始匹配
        for length in range(match_size, 0, -1):
            word = sentence[:length]
            if word in dic:
                result.append(word)
                sentence = sentence[length:]
                matched = True
                break
        # 如果没有匹配到任何词，则切分单个字符
        if not matched:
            result.append(sentence[0])
            sentence = sentence[1:]
    return result

FFM_result = FMM(Sentence, Dictionary)
print("FMM切分结果：", FFM_result)
```

    FMM切分结果： ['我', '来到', '杭州', '浙江', '工业', '大学', ',', '选工', '大有', '底气']
    

2 . 逆向最大匹配法(Backward Maximum Matching, BMM)


```python
def BMM(sentence, dic):
    result = []
    #获取字典中最长的词语长度
    max_word_length = len(max(dic, key=len))
    while sentence:
        # 当前匹配长度大小
        match_size = min(len(sentence), max_word_length)
        matched = False
        # 尝试从最大长度开始匹配
        for length in range(match_size, 0, -1):
            word = sentence[-length:]
            if word in dic:
                result.insert(0, word) #在开头插入
                sentence = sentence[:-length]
                matched = True
                break
        # 如果没有匹配到任何词，则切分单个字符
        if not matched:
            result.insert(0, sentence[-1])
            sentence = sentence[:-1]
    return result

BMM_result = BMM(Sentence, Dictionary)
print("BMM切分结果：", BMM_result)
```

    BMM切分结果： ['我', '来到', '杭州', '浙江', '工业', '大学', ',', '选', '工大', '有底气']
    

把上面两个结果放在一起，可以看出区别


```python
print("字典：", Dictionary)
print("句子：", Sentence)
FFM_result = FMM(Sentence, Dictionary)
print("FMM切分结果：", FFM_result)
BMM_result = BMM(Sentence, Dictionary)
print("BMM切分结果：", BMM_result)
```

    字典： ['我', '来到', '杭州', '浙江', '工业', '大学', '选工', '大有', '底气', '工大', '有底气', '业大']
    句子： 我来到杭州浙江工业大学,选工大有底气
    FMM切分结果： ['我', '来到', '杭州', '浙江', '工业', '大学', ',', '选工', '大有', '底气']
    BMM切分结果： ['我', '来到', '杭州', '浙江', '工业', '大学', ',', '选', '工大', '有底气']
    
