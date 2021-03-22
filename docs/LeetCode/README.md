混合开发技术文档


### 1.切换用户身份
> bosszp://bosszhipin.app/openwith?type=openSwitchIdentify
### 2.boss跳到修改公司全称页面
>bosszp://bosszhipin.app/openwith?type=opencompanyname&sourceType=1&from=safe

| 参数 | 说明 |
| -------- | -------- |
| sourceType | 来源type 非必填 用于判断需不需要弹窗提示 |
### 3.跳过认证
>bosszp://bosszhipin.app/openwith?type=skipcertify&sourceType=1&from=safe
### 4.跳转隐私设置页面
>bosszp://bosszhipin.app/openwith?type=privacySettings
### 5.跳转至发布职位页
>bosszp://bosszhipin.app/openwith?type=publishjob
### 6.打开牛人详情
>bosszp://bosszhipin.app/openwith?type=single&securityId=xxx&uid=1&identify=1&expectId=10&jobId=111

| 参数 | 说明 |
| -------- | -------- |
| type | single 为打开指定用户详情页 |
| securityId | 包含业务逻辑的加密ID，在5.52加入|
| uid | 用户uid |
| identitify | 用户身份 |
| expectId | expectId 为牛人的期望id |
| jobId | jobId 为Boss的职位id，5.51新增 |
### 7.进入充值页面
>bosszp://bosszhipin.app/openwith?type=zdWallet&userCouponId=${userCouponId}&itemId=${itemId}&beanCount=${beanCount}

| 参数 | 说明 |
| -------- | -------- |
| itemId | 大于0时，IOS跳新的充值页面 |
| beanCount | itemId=0且beanCount>0，IOS跳默认的充值页面(置顶卡直豆充值) |
| activity | 等于0时且beanCount>0，IOS跳默认充值页面(三周岁充值推荐) |
### 8.返回首页
>bosszp://bosszhipin.app/openwith?type=openmain&tab=0

| 参数 | 说明 |
|-----|------|
|tab|牛人:0为F1，1为F2，2为F3，3为F4 <br>Boss:0为F1，2为F2，3为F3|
|jobId|跳转bossF1页面定位到对应职位|

### 9.进入道具购买详情页
>bosszp://bosszhipin.app/openwith?type=itemunite&itemtype=11&targetId=1233

| 参数 | 说明 |
| -------- | -------- |
| itemtype | 道具类型 11 竞争力分析器 17 五大类测试 20 简历群发 21 简历刷新 |
| targetId | 目标ID 选填 |

### 10.打开与指定用户聊天界面
>bosszp://bosszhipin.app/openwith?type=chatview&uid=123&jid=456&expectId=789&identify=0&from=xx&lid=xyz&securityId=xyzss

| 参数 | 说明 |
| -------- | -------- |
| type | chatview为聊天页 |
| uid | 用户uid |
| jid | 职位id |
| expectId | 期望id |
| identify | 打开链接的用户身份(就是当前用户身份) |
| from | 来源 |
| lid | lid |
| securityId | 包含业务逻辑的加密ID，目前只针对identify=1时才有用，在5.52加入|

### 11.打开指定职位页
>bosszp://bosszhipin.app/openwith?type=jobview&jid=123&uid=123&lid="lid.search"&sourceType=1

| 参数 | 说明 |
| -------- | -------- |
| type | jobview为职位页 |
| jid | 职位id |
| uid | boss的uid |
| lid | 来源 |
| sourceType | 来源类型 |

### 12.打开高级搜索
>bosszp://bosszhipin.app/openwith?type=supersearch&source=1&keyword=XXX

### 13.打开高级搜索牛人详情
>bosszp://bosszhipin.app/openwith?type=opengeekadvance&suid=xxx&expectId=xx1&advanceType=1&securityId=xxxyy

| 参数 | 说明 |
| -------- | -------- |
| suid | 加密牛人id，预计在5.46正式废弃suid |
| expectId | 期望id |
| advanceType | 默认为0,1:牛人排行榜 |
| securityId | 包含业务逻辑的加密ID，在6.02加入|

### 14.跳转隐私设置页面
>bosszp://bosszhipin.app/openwith?type=privacySettings

### 15.F1黄色引导条引导编辑微简历
>bosszp://bosszhipin.app/openwith?type=editresume

### 16.进入boss的职位管理页面
>bosszp://bosszhipin.app/openwith?type=manageJob

### 17.打开匿名牛人详情
>bosszp://bosszhipin.app/openwith?type=viewGeek&suid=xxx&expectId=xx1&&jobId=123&viewType=4&simpleEncrypt=1&securityId=xyzss

| 参数 | 说明 |
| -------- | -------- |
| suid | 加密牛人id |废弃
| expectId | 期望id |
| jobId | 火爆牛人要传的jobId |
| viewType | 查看类型：2 火爆牛人查看 3 高搜牛人查看 |
| simpleEncrypt | 简答的加密方式（为了区分高搜的入口） |废弃
| securityId | 包含业务逻辑的加密ID，在5.52加入|
| lid | 数据组埋点id，在６.16加入|

### 18.跳转至道具商城页面
>bosszp://bosszhipin.app/openwith?type=opentoolsmall&tab=0

| 参数 | 说明 |
| --------|--------|
| tab |默认跳转到商城;tab=1时,跳转我的道具|

### 19.确认支付
>bosszp://bosszhipin.app/openwith?type=bzbconfirm&bzbParam=jlaselkg

### 20.进入道具购买详情页
>bosszp://bosszhipin.app/openwith?type=itembzb&itemId=11&paramsJson=json

| 参数 | 说明 |
| -------- | -------- |
| itemId | 道具ID 需要购买的道具ID |
| params | 购买道具需要的参数 json 串, 需要 encode |

### 21.跳转至管理求职意向的页面
>bosszp://bosszhipin.app/openwith?type=openexpectmanager

### 22.跳转至上传附件简历页面
>bosszp://bosszhipin.app/openwith?type=openattachmentresume

### 23.打开钱包
>bosszp://bosszhipin.app/openwith?type=openbzbag

### 24.vip权益详情页
>bosszp://bosszhipin.app/openwith?type=vipprivilegedetail&params=json&ba=json

| 参数 | 说明 |
| -------- | -------- |
| params | 参数的json串|
| ba | bgaction的json串|
| vipType | VIP类型 type=1时，对应VIP2，IOS兼容使用|

### 25.跳转至钱包页面
>bosszp://bosszhipin.app/openwith?type=openwallet

### 26.打开app并进入相应webview页
>bosszp://bosszhipin.app/openwith?type=webview&url=http%3a%2f%2fm.bosszhipin.com%2fboss%2f1003%3ffrom%3dsms

| 参数 | 说明 |
| -------- | -------- |
| type | webview为跳到webview |
| url | 访问的页面 |

### 27.牛人进入编辑求职意向页面
>bosszp://bosszhipin.app/openwith?type=expectedit&pid=123

### 28.进入公司专题详情页面
>bosszp://bosszhipin.app/openwith?type=openBrandTopic&topicId=****

| 参数 | 说明 |
| -------- | -------- |
| topicId| 职位专题ID |

### 29.打开群聊
>bosszp://bosszhipin.app/openwith?type=groupView&groupId=

### 30.品牌福利填写
>bosszp://bosszhipin.app/openwith?type=brandWelfare&brandId=xxx

| 参数 | 说明 |
| -------- | -------- |
| brandId | 品牌id|

### 31.进入动态创建页
>bosszp://bosszhipin.app/openwith?type=createfeed?topic=xxxx&title=xxxxx&linkIcon=xxxx&linkTitle=&link=xx&feedType=0

| 参数 | 说明 |
| -------- | -------- |
| topic | 话题名 |
| title | 话题title |
| linkIcon | 动态url图片 |
| linkTitle | 动态title |
| link | 动态url |
| feedType | 动态类型，0牛人1BOSS |

### 32.发送action
>bosszp://bosszhipin.app/openwith?type=sendaction&uid=123&aid=100&extends={"agree":true}

| 参数 | 说明 |
| -------- | -------- |
| type | sendaction为发送action |
| uid | 发送给谁 |
| aid | action id |
| extends | 扩展内容， extends是urlencode过的json, 使用时需要urldecode |

### 33.打开此boss的所有职位
>bosszp://bosszhipin.app/openwith?type=joblist&uid=123

| 参数 | 说明 |
| -------- | -------- |
| type | joblist |
| uid | 打开此boss的所有职位 |

### 34.调到认证页面
>bosszp://bosszhipin.app/openwith?type=certify&certifyType=0

| 参数 | 说明 |
| -------- | -------- |
| type | certify为跳到认证页面 |
| certifyType | 认证方式0获取没有该参数　原来的认证页面，１代表默认名片选项，２默认工牌选项，３默认在职证明选项，４默认营业执照选项，5邮箱认证 界面|

### 35.检查更新
>bosszp://bosszhipin.app/openwith?type=update

| 参数 | 说明 |
| -------- | -------- |
| type | update为检查更新 |

### 36.分享
>bosszp://bosszhipin.app/openwith?type=share&p2=bzpshare&p3=xx&p4=xx2&info=json

| 参数 | 说明 |
| -------- | -------- |
| type | share为调用分享 |
|p2,p3,p4|分享统计|
| info | info为需要分享的内容 包含微信，朋友圈，微博，短信内容 example:{"wbShareTitle":"#招聘##求职# 看准网 技术负责人 刘军正在@Boss直聘 招人，需要技术、技术、技术人才，工资25K，点此应聘：http://m.bosszhipin.com/download?from=weibo","wxShareTitle":"【Boss直聘】看准网正在直聘技术经理等3个职位。来Boss直聘试试用聊天的方式找工作~","wxShareDesc":"如果一份简历写不尽你的才华，来Boss直聘，我们直接聊！","smsShareTitle":"看准网 技术负责人 刘军正在@Boss直聘 招人，需要技术、技术、技术人才，工资25K，快去看看：http://m.bosszhipin.com/boss/1003","imgUrl":"http://img.kanzhun.com/mcs/useravatar/20150818/1fb5f27c23c90025db7c8a113ba0d38f8c7dd922ad47494fc02c388e12c00eac_s.jpg","shareUrl":"http://m.bosszhipin.com/boss/56b5aedd5f90546b1nR62A~~?ab=1"} |

### 37.关闭全屏阻断对话框
>bosszp://bosszhipin.app/openwith?type=closeDialog

| 参数 | 说明 |
| -------- | -------- |
| type | closeDialog为关闭对话框 |

### 38.F1黄色引导条引导添加教育经历
>bosszp://bosszhipin.app/openwith?type=eduAdd

| 参数 | 说明 |
| -------- | -------- |
| type | eduAdd为添加教育经历页面 |

### 39.F1黄色引导条引导添加工作经历
>bosszp://bosszhipin.app/openwith?type=workAdd

| 参数 | 说明 |
| -------- | -------- |
| type | workAdd为添加工作经历页面 |

### 40.登陆网页版
>bosszp://bosszhipin.app/openwith?type=qraction&value=4

| 参数 | 说明 |
| -------- | -------- |
|value|value : 0 edit resume;1 manager job, 2 publish job , 3 upload resume ,4 chat web， 5 edit brand|

### 41.跳到指定任务页面
>bosszp://bosszhipin.app/openwith?type=opentask&taskid=2&tab=1

| 参数 | 说明 |
| -------- | -------- |
|taski|如果没有taskid参数 那么跳到任务列表,taskid=4 代表新职位/新牛人 （现在没有，如果需要客户端实现）； taskid=5 代表速配|
|tab|如果tab=0 代表默认选择积分任务，tab=1代表默认选择积分兑换|

### 42.面试详情页
>bosszp://bosszhipin.app/openwith?type=interviewdetail&interviewid=2&securityId=xxxx

| 参数 | 说明 |
| -------- | -------- |
| interviewid | 面试Id |
| securityId | 包含业务含义的加密ID，hetype=single的协议是一样的含义，在6.02加入 |

### 43.跳到个人信息页面
>bosszp://bosszhipin.app/openwith?type=userInfo&warnfield=1

| 参数 | 说明 |
| -------- | -------- |
| type | userInfo为个人信息页面，当前什么身份就跳对应身份的页面 |
| warnfield | 标记哪些字段为不合法的，1姓名，2boss职务，4简称， 8全称， 这些值可以通过或得到多个标记字段，客户端通过与来判断是哪个字段 |

### 44.跳到个人优惠券页面
>bosszp://bosszhipin.app/openwith?type=opencouponpage

### 45.跳到F2联系人
>bosszp://bosszhipin.app/openwith?type=opencontact


### 46.跳到面试列表页面
>bosszp://bosszhipin.app/openwith?type=interviewlist&status=2

| 参数 | 说明 |
| -------- | -------- |
| status |-1 全部 0待处理 1待面试 2 拒绝 3 取消 4 结束”|

### 47.跳到拨号页面
>bosszp://bosszhipin.app/openwith?type=telecall&phone=13133331113

| 参数 | 说明 |
| -------- | -------- |
| phone |要拨打的电话号码|

### 48.跳到boss指定职位编辑页面
>bosszp://bosszhipin.app/openwith?type=jobedit&jid=111

| 参数 | 说明 |
| -------- | -------- |
| jid |需要编辑职位的id|

### 49.跳到面试评价列表
>bosszp://bosszhipin.app/openwith?type=interviewfeedback&interviewid=123&securityId=yyyxx

| 参数 | 说明 |
| -------- | -------- |
| interviewid | 待评价面试的id |
| securityId | 包含业务含义的加密ID，hetype=single的协议是一样的含义 ，在6.02加入 |

### 50.跳转至沟通过的页面
>bosszp://bosszhipin.app/openwith?type=opencontacting

### 51.跳转至收藏过的职位页面
>bosszp://bosszhipin.app/openwith?type=openinterest

### 52.跳转至公司信息页面
>bosszp://bosszhipin.app/openwith?type=opencompanyinfo

### 53.跳转至facetime页面
>bosszp://bosszhipin.app/openwith?type=openfacetimecall

### 54.上线提醒
>bosszp://bosszhipin.app/openwith?type=openonlinesub

### 55.进入装修公司
>bosszp://bosszhipin.app/openwith?type=openeditcompany&brandid

| 参数 | 说明 |
| -------- | -------- |
| brandid |品牌id |

### 56.弹起facetime选择对话框
>bosszp://bosszhipin.app/openwith?type=openfacetimedialog

### 57.F1黄色引导条引导前往最新列表页
>bosszp://bosszhipin.app/openwith?type=openNewestList

### 58.跳到看过我列表页面
>bosszp://bosszhipin.app/openwith?type=openviewed

### 59.跳到新职位/新牛人列表页面
>bosszp://bosszhipin.app/openwith?type=opennew

### 60.跳到推荐职位/推荐牛人列表页面
>bosszp://bosszhipin.app/openwith?type=openCommendList

### 61.弹出举报对话框
>bosszp://bosszhipin.app/openwith?type=openreportdialog

### 62.打开关注列表页面
>bosszp://bosszhipin.app/openwith?type=openattentionlist

### 63.进入牛人个人优势编辑页面
>bosszp://bosszhipin.app/openwith?type=editUserDesc

### 64.进入互动中感兴趣通知列表页
>bosszp://bosszhipin.app/openwith?type=opennotifyinterest

### 65.进入BossF2简历直通车列表页
>bosszp://bosszhipin.app/openwith?type=resumeDirectList

### 66.动态打开简历直通车开关
>bosszp://bosszhipin.app/openwith?type=openresumedirectswitch

### 67.进入开聊引导语设置页面
>bosszp://bosszhipin.app/openwith?type=openchatguidesetting

### 68.进入牛人关注公司列表页面
>bosszp://bosszhipin.app/openwith?type=openfollowcompany&tab=0

| 参数 | 说明 |
| -------- | -------- |
| tab |tab=0（默认着陆公司列表），tab=1（默认着陆职位列表） |

### 69.由微信下单结果调起微信支付
>bosszp://bosszhipin.app/openwith?type=weixinpay&data=

| 参数 | 说明 |
| -------- | -------- |
| data |data微信下单返回值(6个参数)拼成JSON字符串URLEncoder的结果 |

### 70.调起设置自动收红包页面
>bosszp://bosszhipin.app/openwith?type=autoreceiveredenvelope

### 71.进入我的公司页面
>bosszp://bosszhipin.app/openwith?type=myBrandCom

### 72.跳转价格列表页面
>bosszp://bosszhipin.app/openwith?type=blockpricelist&jid=22222&sourceType=1&params=json&ba=json

| 参数 | 说明 |
| -------- | -------- |
| jid | 展示职位id |
| sourceType | 来源, 1发布火爆职位，2延长火爆职位 |
| params | 请求接口的键值对json,在用户购买的时候需要额外的增加priceId参数上来,请求接口block.priceList。该页面中有购买所以需要将参数传递到购买接口中 |

### 73.提现页面
>bosszp://bosszhipin.app/openwith?type=withdraw&balance=510&totalBalance=510&password=1&bindWx=0&edit=0

| 参数 | 说明 |
| -------- | -------- |
| balance | int值 退款金额(单位分)|
| totalBalance | int值 总金额(单位分)，没有时，取balance，全额退|
| password | 0否1是 是否设置密码|
| bindWx | 0否1是 是否绑定微信|
| edit | 0否1是 是否可逻辑|

### 74.打开指定用户与牛人的聊天记录
>bosszp://bosszhipin.app/openwith?type=chatMsg&bossId=123&geekId=456&shareId=789&naviTitle="a和b的聊天记录"

| 参数 | 说明 |
| -------- | -------- |
| type | chatMsg为聊天记录页 |
| bossId | 转发的bossId |
| geekId | 被转发的牛人ID |
| shareId | 转发牛人的记录id |
| naviTitle | 导航title |

### 75.同事推荐列表
bosszp://bosszhipin.app/openwith?type=mateShareList

| 参数 | 说明 |
| -------- | -------- |
| type | mateShareList为同事推荐列表 |

### 76.牛电购买协议
>bosszp://bosszhipin.app/openwith?type=zpPay&params=json

| 参数 | 说明 |
| -------- | -------- |
| params | 牛电购买参数 {"method":"boss.geekInfoRight","userId":"afcb6531eeec89d6ZcSKsdFBMQ~~", "jobId":143,"sourceType":0 |
| params | 牛电购买参数 {"method":"boss.hotGeekPay","suid":"afcb6531eeec89d6ZcSKsdFBMQ~~", "jobId":143,"sourceType":0,"expectId":2341,"lid":"89d6ZcSKsdFBMQ~~"}|

### 77.进入商品详情页面
>bosszp://bosszhipin.app/openwith?type=payInfo&categoryId=1&category=1&url=&extraData=

| 参数 | 说明 |
| -------- | -------- |
| categoryId | 加密牛人id |
| category | 期望id |
| url | 购买协议 |
| extraData | 阻断额外参数json串|

### 77.跳转隐私设置-屏蔽公司
>bosszp://bosszhipin.app/openwith?type=privacyMaskCompany

### 78.进入创建指定求职期望页面，各项值不许修改
>bosszp://bosszhipin.app/openwith?type=addSpecifyExpect?position=1&positionName=xzy&industryCodes=2,3,4&location=3&locationName=def&lowSalary=10&highSalary=20

| 参数 | 说明 |
| -------- | -------- |
| position | 职位类别code |
| positionName | 职位类别名称 |
| industryCodes | 行业codes，每个code之间用英文逗号分割 |
| location | 城市code |
| locationName | 城市名称 |
| lowSalary | 期望最低薪资|
| highSalary | 期望最高薪资 |

### 79.进入聊天列表页系统信息流通知
>bosszp://bosszhipin.app/openwith?type=openNotifications

### 80.进入商城聊天加油包购买页面
>bosszp://bosszhipin.app/openwith?type=blockChatBag&params=json&ba=json

### 81.放开职位协议
>bosszp://bosszhipin.app/openwith?type=updateJobStatus&jobId=0&jobStatus=1

| 参数 | 说明 |
| -------- | -------- |
| jobId | 职位id |
| jobStatus | 职位状态 |

### 82.延长职位协议
>bosszp://bosszhipin.app/openwith?type=prolongJob&jobId=0

| 参数 | 说明 |
| -------- | -------- |
| jobId | 职位id |

### 83.跳转至修改密码
>bosszp://bosszhipin.app/openwith?type=updatePassword

### 84.跳转允许猎头联系我设置
>bosszp://bosszhipin.app/openwith?type=hunterChatSetting

### 85.跳转用户邀请页
>bosszp://bosszhipin.app/openwith?type=groupInvite&groupId=123456

### 86.跳转到用户信息页
>bosszp://bosszhipin.app/openwith?type=groupUserInfo&groupId=123456&userId=654321

### 87.F3 新增BOSS个人主页
>bosszp://bosszhipin.app/openwith?type=bossprofile


### 88.跳转联系人聊天设置页面
>bosszp://bosszhipin.app/openwith?type=friendChatSetting&friendId=%d&from=1

| 参数 | 说明 |
| -------- | -------- |
| from | 1 从查看详情的灰调消息点入 |

### 89.阻断购买动作(废弃IOS审核敏感词)
>bosszp://bosszhipin.app/openwith?type=blockbzb&beanCount=30&params=json&ba=json&experience=1

| 参数 | 说明 |
| -------- | -------- |
| beanCount | 直豆数|
| params | 请求接口的键值对,请求block.pay接口 |
| experience | 为1时，体验不走支付页面 |


### 90.打开钱包
>bosszp://bosszhipin.app/openwith?type=zdbzbag

### 91.圈子页面
>bosszp://bosszhipin.app/openwith?type=openquan&url=encodedUrl
url为可选参数，如果有url打开圈子后跳转相应url

### 92.进入直豆详情
>bosszp://bosszhipin.app/openwith?type=beandetail

### 93.牛人进入编辑求职意向页面
>bosszp://bosszhipin.app/openwith?type=expectedit&pid=123

| 参数 | 说明 |
| -------- | -------- |
| pid | 期望id |

### 94.进入话题页
>bosszp://bosszhipin.app/openwith?type=opentopic&topicId=话题ID&topicType=0

| 参数 | 说明 |
| -------- | -------- |
| topicId| 话题 ID |
| topicType| 话题类型，0牛人1BOSS |

### 95.进入动态页
>bosszp://bosszhipin.app/openwith?type=openfeed&feedId=动态Id&feedtype=0&commentId=评论ID

| 参数 | 说明 |
| -------- | -------- |
| feedId | 动态 ID |
| feedType| 动态类型，0牛人1BOSS |
| commentId | 可选参数，评论ID，表示锚点到哪条评论 |

### 96.进入招聘管理
>bosszp://bosszhipin.app/openwith?type=openpersonal

### 97.阻断预下单
>bosszp://bosszhipin.app/openwith?type=blockbzbpo&params=json&ba=json

| 参数 | 说明 |
| -------- | -------- |
| beanCount | 直豆数|
| params | 请求接口的键值对,请求block.preOrder接口 |
| experience | 为1时，体验不走支付页面 |

### 98.进入微信通知设置页
>bosszp://bosszhipin.app/openwith?type=openWeixinNotifySetting

### 99.打开 设置-提醒设置
>bosszp://bosszhipin.app/openwith?type=notifySetting

### 100.进入品牌完善页面
>bosszp://bosszhipin.app/openwith?type=completeBrand

### 101.跳转短信通知
>bosszp://bosszhipin.app/openwith?type=smsNotice&securityId=

| 参数 | 说明 |
| -------- | -------- |
| securityId | 加密参数id|

### 102.添加志愿者经历
>bosszp://bosszhipin.app/openwith?type=volunteerAddGuide

| 参数 | 说明 |
| -------- | -------- |
| type | volunteerAddGuide志愿者经历添加引导页|

### 103.跳转到预约视频面试
>bosszp://bosszhipin.app/openwith?type=arrangeVideoInterview&geekId=

---------------------------------------------------

### 1.获取设备信息
>window.wst.getDeviceInfo();
### 2.关闭当前webview
>window.wst.closeView();
```js
function closeView() {
try {
window.wst.closeView();
} catch (e) {
window.location.href = location.href.indexOf('#closeview') > 0 ? location.href : location.href + '#closeview';
}
}
```
### 3.改变webview导航条颜色
>window.wst.modifyNavbgColor("ff0000");
```js
try{
window.wst.modifyNavbgColor("ff0000");
}catch(e){
    console.log(e)
}
```
### 4.调用客户端分享
>window.wst.startFunction(result);

| 参数 | 说明 |
|-----|------|
|wxShareTitle|分享微信标题|
|wxShareDesc|分享微信描述文字|
|wbShareTitle|分享微博标题|
|smsShareTitle|分享短信标题|
|imgUrl|分享图片url|
|shareUrl|分享点击url|
|subtype||
|p||
```js
window.getShareMessage=function(){
var shareMessage = {};
shareMessage['wxShareTitle'] = _self.wxShareTitle
shareMessage['wxShareDesc'] = _self.wxShareDesc
shareMessage['wbShareTitle'] = getSubShareContent(139, _self.wxShareTitle + "戳这里：", _self.shortUrl);
shareMessage['smsShareTitle'] = _self.wxShareTitle + "戳这里：" + " " + _self.shortUrl;
shareMessage['imgUrl'] = _self.imgUrl;
shareMessage['shareUrl'] = _self.shareUrl;
shareMessage['subtype'] = 99;
shareMessage['p'] = 0;

var result = JSON.stringify(shareMessage);
try {
window.wst.startFunction(result);
return
} catch (err) {}
return result;
}

function getSubShareContent(charNum, content, url) {
var left = charNum - url.length;
return content.substring(0, left) + " " + url;
}

//分享成功回调函数
//type 标识分享到哪里成功了，1、微博；2、微信好友；3、微信朋友圈；4、短信；
function onShareComplete(type) {}
```

### 5.刷新当前页
>window.wst.refresh();

### 6.refreshSafeStatus [刷新安全框架]

|系统|调用方式|支持版本|
|-----|-----|------|
|ios|#refreshSafeStatus|>=V5.46|
|android|window.wst.refreshSafeStatus()|>=V5.46|
```js
function refreshSafeStatus(opt){
try {
window.wst.refreshSafeStatus()
} catch(e) {
window.location.href = location.href.indexOf('#refreshSafeStatus')>0?location.href:location.href+'#refreshSafeStatus'; // 兼容ios客户端<=5.47版本
}
}
```

### 7.sharepic [分享图片到朋友圈]
|系统|调用方式|支持版本|
|------|------|------|
|ios|`<a href="?#sharepic">`|>v1.0|
|配套方法|ios回调前端sharepic() return json 值给ios|--|
|android|`<a href="?#sharePic">`|>v1.0|
|配套方法|android回调sharePic() 前端把值传入startSharePic()传值给android|--|
```js
var sharepicJson = {
shid: 'medal'
};

function sharePic() {

var result = JSON.stringify(sharepicJson);

try {
window.wst.startSharePic(result);
return;
}
catch (err) {
}
return result;
}
```

### 8.locationJudge [请求是否开启定位]
|系统|调用方式|支持版本|
|----|-----|-----|
|ios|window.wst.locationJudge()|>=V5.49|
|ios|#locationJudge|<=V5.48|
|android|window.wst.locationJudge()|>=V5.47|
```js
function locationJudge(cb) {
var u = navigator.userAgent,
isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
isIphone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
try {
isAndroid && (window.wst.locationJudge() == 1) ? cb() : "";
window.wst.locationJudge();
} catch (e) {
window.location.href = location.href.indexOf('#locationJudge') > 0 ? location.href : location.href + '#locationJudge'; // 兼容ios客户端<=5.47版本
}
}
```
### 9.getCurrentPosition [请求经纬度]
|系统|调用方式|支持版本|
|-----|------|------|
|ios|window.wst.getCurrentPosition()|>=V5.49|
|android|window.wst.getCurrentPosition()|>=V5.49|
```js
try {
window.wst.getCurrentPosition();
}catch() { }
```
### 10.currentPositionInfo [回调返回经纬度信息]
客户端回调方法，应该写成全局函数
|系统|回调方式|支持版本|
|------|------|-----|
|ios|currentPositionInfo(longitude, latitude)|>=V5.49|
|android|currentPositionInfo(longitude, latitude)|>=V5.49|
```js
window.currentPositionInfo = function(longitude, latitude) {
console.log(longitude, latitude);
}
```

### 11.cropphoto [上传图片]

|属性|类型|描述|
| ------|---------|-------|
|cropscale|number|裁切框高宽比,例如：1为正方形，0.5为矩形|
|maxscale |number|最小图片宽高，上传的图片尺寸如果小于给定的值将报错|
|album |number|0 : 相机&相册； 1 : 相机； 2 : 相册|
|pri |number|0 : 不是私密图【default】；1 : 是私密图，<br/>要求客户端提交图片内容时，同时将此参数提交到服务端|

|系统|调用方式|支持版本|
|---------|---------|--------|
|ios|`<a href="?cropscale=0.7&maxscale=100_100&album=0#cropphoto">`|>v1.0|
|android|`<a href="?cropscale=0.7&maxscale=100_100&album=0#cropphoto">`|>v1.0|
|ios|`<a href="?cropscale=0.7&maxscale=100_100&album=0&pri=1#cropphoto">`|>=v5.51|
|android|`<a href="?cropscale=0.7&maxscale=100_100&album=0&pri=1#cropphoto">`|>=v5.51|

### 12.uploadPhoto[上传图片]
```js
try{
window.wst.uploadPhoto(0,640,640,1,0,'')
}catch(e){
window.location.href = '?cropscale=0&maxscale=520_320&source=certify&album=1#cropphoto'
}
```

### 13.是否安装支付宝
```js
try {
result = window.wst.getIsAliPayInstall()
} catch(e) {
console.log(e);
}
```
### 14.获取摄像头授权
```js
try {
window.wst.requestPermission(JSON.stringify(permType), reason);
} catch (err){
console.log('客户端版本小于6.20,可以先获取客服后请求语音摄像头权限')
}
```
### 15.canShare [在客户端右上角显示分享icon]

|系统|调用方式|支持版本|
|--|--|--|
|ios|ios直接调用window.wst.needShowShare(true/false)显示/隐藏分享icon|>=v6.02|
|android|window.wst.needShowShare(true)|>v1.0|
> window.wst.needShowShare(true);

### 16.download [下载图片]

|系统|调用方式|支持版本|
|--|--|--|
|ios|`<a href="?#download">`|>v1.0|
|配套方法|ios回调前端downloadPhoto() return json 值给ios|--|
|android|`<a href="?#download">`|>v1.0|
|配套方法|android回调downloadPhoto() 前端把值传入startDownload()传值给android|--|
```js
function downloadPhoto(downloadPhotoJson) {
var result = JSON.stringify(downloadPhotoJson);
try{
window.wst.startDownload(JSON.stringify(downloadPhotoJson)); // 安卓
return;
} catch ( err ) {
console.log(err) // iOS
}

return result;
}
```

### 17.getZFBPay [android zhifubao pay]

|系统|调用方式|支持版本|
|--|--|--|
|android|window.wst.getZFBPay(data.orderStr)|>=V5.45|

### 18.getPay [android wechat pay]

|系统|调用方式|支持版本|
|--|--|--|
|android|window.wst.getPay(JSON.stringify(data.payData))|>=V5.45|
备注：`data.payData`是服务端返回的数据

### 19.startBzbEvent[苹果支付]
|系统|调用方式|支持版本
|--|--|--|
|ios|window.wst.startBzbEvent(data.rechargeid);|>=608|
```js
try {
window.wst.startBzbEvent(data.rechargeid);
}catch (err){
console.log(err);
}
```

### 20.startInAppPurchase[苹果支付]
|系统|调用方式|支持版本
|--|--|--|
|ios|window.wst.startInAppPurchase(data.rechargeid);|>=549|
```js
try {
window.wst.startInAppPurchase(data.rechargeid);
}catch (err){
console.log(err);
}
```

### 21.uploadPhoto [上传图片]

|属性|类型|描述|
|--|--|--|
|cropscale|number|裁切框高宽比,例如：1为正方形，0.5为矩形|
|minwidth|number|最小图片宽，上传的图片尺寸如果小于给定的值将报错|
|minheight|number|最小图片高，上传的图片尺寸如果小于给定的值将报错|
|album|number|0 : 相机&相册； 1 : 相机； 2 : 相册|
|pri|number| 0 : 不是私密图【default】；1 : 是私密图，<br/>要求客户端提交图片内容时，同时将此参数提交到服务端|
|source|string|certify【default】图片来源|
|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.uploadPhoto(cropscale,minwidth,minheight,album,pri,source) |>=v6.10|
|android|window.wst.uploadPhoto(cropscale,minwidth,minheight,album,pri,source)|>=v6.10|
|上传完成后回调uploadPhotoComplete(json)|json.url 大图url,json.tinyUrl 小图url|--|
```js
try{
window.wst.uploadPhoto(0,500,500,0,0,'');//客户端version>=6.10
}catch(e){
add_pic.attr('href','#cropphoto');
}

function uploadPhotoComplete(json) {
console.log(json);
}

```

### 22.getIsConnectInfo[获取网络状态]
```js
try {
window.wst.getIsConnectInfo(url)
} catch (ex) {}
```

### 23.share[分享]
```js
function callShare(share) {
var href = "http://pre-www.zhipin.com";
if (href.indexOf("?") == -1) {
href += "?p=1";
}
href += "&stype=3#share";
if (window.wst && window.wst.share) {
window.wst.share(3)
} else {
window.location.href = href;
}
}
```

### 24.调用TWL视频认证
> window.wst.openTWLFacetime(auditorAccid, url);

| 参数 | 说明 |
| --- | ---- |
|auditorAccid|服务端接口返回|
|url|认证成功跳转的url|

### 25.调用facetime视频认证
> window.wst.openFacetime(accid, token, auditorAccid, url);

| 参数 | 说明 |
| --- | ---- |
|accid|服务端接口返回|
|token|服务端接口返回|
|auditorAccid|服务端接口返回|
|url|认证成功跳转的url|

### 26.请求摄像头录音权限
|系统|调用方式|支持版本
|--|--|--|
|android|window.wst.requestPermission(JSON.stringify(permType), reason)|>=620|
```js
function requestPermission(type, reason) {
type = type || 3;
let permType = [];
reason = reason || '请求您的录音、摄像头权限';
switch (type) {
case 1:
permType = ['android.permission.RECORD_AUDIO'];
break;
case 2:
permType = ['android.permission.CAMERA'];
break;
case 3:
permType = ['android.permission.RECORD_AUDIO', 'android.permission.CAMERA'];
break;
case 4:
permType = ['android.permission.ALBUMS'];
break;
default:
console.log('permission values must be numeric!');
}
if (deviceInfo.isAndroid) {
try {
window.wst.requestPermission(JSON.stringify(permType), reason);
} catch (err) {
console.log('客户端版本小于6.20,可以先获取客服后请求语音摄像头权限');
}
}
}
```

### 27.退出登陆
```js
function logout() {
try {
window.wst.logout();
} catch (e) {
window.location.href = window.location.href.indexOf('#logout') > 0 ? window.location.href : `${window.location.href}#logout`; // 兼容ios客户端<=5.47版本
}
}
```

### 28.分享小程序
```js
function shareMicroApp(type, data) {
try {
const str = JSON.stringify(data);
window.wst.shareAppMessage(type, encodeURI(str));
} catch (e) {}
}

shareMicroApp(5, {
forwardId: shareInfo.forwardId,
wxShareImg: shareInfo.wxShareImg,
});
```

### 29.locationStatus [回调返回定位开启状态]

|系统|回调方式|支持版本|
|--|--|--|
|ios|locationStatus(statusCode)|>=V5.49|
|android|locationStatus(statusCode)|>=V5.50|
|--|--|--|
|android|locationStatus(statusCode)|<V5.50|

返回值 与 回调混合使用

### 30.proxy_request [icp 客户端代理请求]

|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.proxy_request(codeId, url, method, header, body)|>=V5.47|
|ios|proxy_request(codeId, url, method, header, body)|=V5.46|
|android|window.wst.proxy_request(codeId, url, method, header, body)|>=V5.47|

### 31.proxy_result [icp 客户端截获返回数据]

|系统|回调方式|支持版本|
|--|--|--|
|ios|window.wst.proxy_result(rid, status, header, cookie, body, base64)|>=V5.47|
|ios|proxy_result(rid, status, header, cookie, body, base64)|=V5.46|
|android|window.wst.proxy_result(rid, status, header, cookie, body, base64)|>=V5.46|

### 32.refreshsource [刷新上个界面数据]

|系统|调用方式|支持版本|
|--|--|--|
|ios|`<a href="?#refreshsource">`|>v1.0|

### 33.aliface [芝麻人脸认证]
|属性|类型|描述|
|--|--|--|
|bizNo|string|芝麻人脸的订单号|
|productId|string|商务号|

|系统|调用方式|支持版本|
|--|--|--|
|ios|`<a href="?bizNo=xxxx&productId=yyyyy#aliface">`|>v1.0|
|配套方法|ios回调前端refreshAuditResult(bizNo,code,type, cbUrl) 把ali认证结果给到前端 |--|

### 34.postAliyunToken [阿里云实名认证]
|属性|类型|描述|
|--|--|--|
|token|string|aliyun 需要的token|

|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.postAliyunToken(tk)|>v6.0|
|android|window.wst.postAliyunToken(tk)|>v6.0|
|配套方法|客户端（i&a）回调前端responseAliyunResult(int) 把认证结果（int）给到前端并在页面显示 |--|

### 35.isInterceptColseEvent [劫持客户端关闭]

|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.isInterceptColseEvent() return 0：劫持，1：不劫持|>v5.X|
|android|window.wst.isInterceptColseEvent() return 0/1|>v5.X|

### 36.postfaceplus [客户端上传人脸图片]

|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.postfaceplus() |>=v6.06|
|android|window.wst.postfaceplus()|>=v6.06|

客户端回调responsefaceplusResult(bestImgUrl,envImgUrl,delta)返回图片url

### 37.postTencent[腾讯云人脸认证]

|系统|调用方式|支持版本|
|--|--|--|
|ios|window.wst.postTencent(userName,idNo,agreementNo,Nonce,UserId,Sign) |>=v6.07|
|android|window.wst.postTencent(userName,idNo,agreementNo,Nonce,UserId,Sign)|>=v6.07|

### 38.zfbPayResult，wxPayResult [返回支付状态]

|系统|调用方式|支持版本|
|--|--|--|
|zhifubao|zfbPayResult(resultCode),resultCode: 0 成功 -1失败 -2返回|>=v6.17|
|weixin|wxPayResult(resultCode),resultCode: 0 成功 -1失败 -2返回|>=6.17|