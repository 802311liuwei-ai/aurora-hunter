import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, CalendarBlank, Camera, Check, Clock, Compass,
  List, MapPin, Phone, ShieldCheck, Snowflake, Users, WechatLogo, X,
} from "@phosphor-icons/react";

const journeys = [
  {
    id: "full-immersion",
    title: "北方极光·沉浸式体验之旅",
    eyebrow: "冬季经典 · 4天3晚",
    image: "/images/hero-aurora.png",
    season: "9月至次年4月",
    focus: "极光、北冰洋与冰上漂浮",
    tags: ["多晚追光", "捷里别尔卡", "萨米文化", "冰上漂浮"],
    intro: "把摩尔曼斯克最具代表性的冬日体验放进一段完整旅程，在天气允许时多次寻找极光。",
    days: [
      ["第1天", "抵达摩尔曼斯克 · 初见极光", "抵达后由当地旅行社安排接机与入住。傍晚认识北极圈城市、品尝北境风味；夜间根据云量与道路情况启程追光，向导协助拍摄。"],
      ["第2天", "捷里别尔卡 · 抵达北冰洋", "穿越苔原前往北冰洋海岸，探访旧渔村、船舶墓地、冰瀑与海岸地貌。返程后如天气窗口合适，可再次安排追光。"],
      ["第3天", "摩尔曼斯克 · 萨米文化体验", "游览列宁号核动力破冰船外观、阿廖沙纪念碑等城市地标；前往民族文化园，与哈士奇和驯鹿互动，体验雪原活动。夜间继续等待极光窗口。"],
      ["第4天", "冰上漂浮 · 旅程收束", "在专业人员讲解和安全装备保护下体验冰水漂浮，结束后享用热饮。具体开放情况由冰况、风力与当地安全要求决定。"],
    ],
  },
  {
    id: "aurora-classic",
    title: "追光之旅·北境经典线",
    eyebrow: "冬季组合 · 4天3晚",
    image: "/images/aurora-village.png",
    season: "9月至次年4月",
    focus: "极光、希比内与北境文化",
    tags: ["希比内山脉", "民族体验", "捷里别尔卡", "城市漫游"],
    intro: "连续三晚留在极光带，把追光、雪山、民族文化与北冰洋海岸串成节奏舒展的北境旅程。",
    days: [
      ["第1天", "抵达与极光初体验", "当地团队接机并协助入住。夜间根据实时天气选择远离城市灯光的方向，进行第一次极光追寻。"],
      ["第2天", "希比内山脉 · 民族文化", "进入科拉半岛山地雪景，随后体验萨米文化、驯鹿和哈士奇互动。行程顺序会随道路与天气灵活调整。"],
      ["第3天", "捷里别尔卡 · 世界尽头", "前往巴伦支海沿岸，观看苔原、渔村与海岸景观。夜间保留追光窗口，并由向导提供基础摄影协助。"],
      ["第4天", "摩尔曼斯克城市漫游", "认识这座北极圈港城的历史与日常，走访海洋站、列宁号破冰船外观、纪念碑与科拉湾沿岸。"],
    ],
  },
  {
    id: "summer-teriberka",
    title: "寻鲸之旅·捷里别尔卡",
    eyebrow: "夏季海岸线",
    image: "/images/teriberka-coast.png",
    season: "5月至9月",
    focus: "巴伦支海、鲸类观察与渔村",
    tags: ["北冰洋出海", "海岸徒步", "渔村风景", "极昼体验"],
    intro: "在极昼季抵达巴伦支海，沿着捷里别尔卡海岸寻找鲸类活动的踪迹，也感受风、岩石与渔村的辽阔。",
    days: [
      ["行程一", "穿越苔原抵达海岸", "从摩尔曼斯克出发前往捷里别尔卡，沿途观察苔原、湖泊与极地公路景观。"],
      ["行程二", "巴伦支海观察", "根据风浪与港口安排乘船出海，寻找鲸类和海鸟。野生动物出现不受人为控制，安全条件优先。"],
      ["行程三", "旧渔村与海岸漫步", "探访船舶墓地、海滩与瀑布一带，在当地团队带领下认识北冰洋渔村的过去和今天。"],
    ],
  },
  {
    id: "rybachy",
    title: "地球尽头·雷巴奇半岛",
    eyebrow: "夏秋越野线",
    image: "/images/reindeer-winter.png",
    season: "夏秋限定",
    focus: "荒野公路、海岸地貌与营地",
    tags: ["雷巴奇半岛", "越野穿越", "海岸营地", "自然摄影"],
    intro: "离开常规公路，深入科拉半岛北端的荒野与海岸。适合愿意用更多时间换取辽阔风景的旅行者。",
    days: [
      ["第一段", "越野进入半岛", "由熟悉路况的当地车队带领穿越碎石路、河谷与苔原，沿途根据天气设置观景停靠点。"],
      ["第二段", "海岸地貌与北境营地", "观察海蚀崖、灯塔与辽阔海面，在合适区域安排营地体验，感受极昼或北境黄昏。"],
      ["第三段", "返回摩尔曼斯克", "根据道路和潮汐情况调整返程线路。越野线路的停靠点与时长以当地安全判断为准。"],
    ],
  },
  {
    id: "seidozero",
    title: "谢伊多泽罗湖·鲸鱼与山脉",
    eyebrow: "夏季深度线",
    image: "/images/husky-sled.png",
    season: "夏季限定",
    focus: "湖泊、山地与北冰洋组合",
    tags: ["谢伊多泽罗湖", "山地徒步", "北冰洋", "多日组合"],
    intro: "从静谧的山湖到开放的北冰洋，把科拉半岛截然不同的自然面貌放进一次更完整的夏季探索。",
    days: [
      ["山湖", "谢伊多泽罗湖自然探索", "在当地向导带领下进入山地与湖区，了解路线、天气和这片土地的文化故事。"],
      ["山脉", "希比内山地景观", "沿适合当日条件的路线观察峡谷、苔原植被与山地湖泊，徒步强度按团队情况安排。"],
      ["海洋", "捷里别尔卡与巴伦支海", "前往北冰洋海岸，并在安全条件允许时安排出海观察野生动物，为旅程收尾。"],
    ],
  },
];

const guides = [
  {
    id: "winter-checklist", title: "摩尔曼斯克冬季追光旅行完整清单", read: "18分钟", image: "/images/reindeer-winter.png",
    intro: "从证件、通讯、现金，到零下二三十度的穿衣、相机保暖和追光当天装备。第一次去北极圈，先按这份清单逐项准备。",
    sections: [
      ["出发前最后确认 Checklist", ["出发前 7 天确认：护照有效期 6 个月以上、俄罗斯签证、往返机票、酒店预订单、保险单，以及所有文件的电子版备份。", "电子版建议同时存放在微信收藏、手机相册和云盘里。北境旅行路程长、网络环境不稳定，资料多备一份永远不亏。", "通讯方面，提前开通国际漫游，或准备俄罗斯电话卡。常见选择包括 MTS、MegaFon。", "金融方面，建议携带 10000-20000 卢布现金，并准备银联卡和少量现金人民币作为备用。俄罗斯大部分 Visa、Master 国际支付已受限制，不要完全依赖银行卡。"]],
      ["摩尔曼斯克冬季气温", ["12 月通常约 -10℃ ~ -25℃。", "1 月通常约 -15℃ ~ -30℃。", "2 月通常约 -10℃ ~ -28℃。", "极端天气可能达到 -35℃，体感 -40℃ 在风大、等待时间长的夜晚非常常见。追光不是只下车拍 5 分钟，很多时候要在雪地里等待 2-4 小时。"]],
      ["穿衣原则：洋葱穿衣法", ["牢记一句话：不要只穿一件特别厚的衣服。", "正确顺序是：排汗层 → 保暖层 → 防风层。", "第一层贴身层负责排汗，推荐美利奴羊毛内衣、Heattech、户外速干保暖内衣。可参考优衣库 Heattech、Decathlon、Smartwool，建议准备 2 套。", "第二层保暖层推荐抓绒、羊毛衫、羽绒马甲。Polartec 抓绒很实用，建议准备 2 件。", "第三层外层最重要，要求防风、防雪、防泼水。推荐长款鹅绒羽绒服，充绒量 250g+，最好 350g+。可参考 Canada Goose、波司登极寒系列、The North Face、凯乐石。"]],
      ["裤子怎么穿", ["很多游客会忽略腿部保暖。实际上，长时间站在雪地里，腿往往比上半身更容易冷。", "推荐顺序：保暖秋裤 → 抓绒裤 → 冲锋裤或滑雪裤。", "不要穿牛仔裤。牛仔裤在低温和风雪中会冻透，湿了以后也很难恢复舒适。"]],
      ["鞋子和袜子", ["鞋子是最重要的装备之一。推荐雪地靴，并选择 -30℃ 以上防寒等级。可参考 Sorel、Columbia、UGG、Decathlon 极地系列。", "鞋码建议大半码，因为冬季需要穿厚袜子，脚趾还要留出一点活动空间。鞋太紧反而更容易冷。", "袜子推荐美利奴羊毛袜，建议 3-4 双。不要穿纯棉袜，棉袜吸汗后容易湿，湿了之后会非常冷。"]],
      ["手部和头部保暖", ["追光时最痛苦的部位往往是手，因为你需要操作手机、相机和三脚架。推荐双层手套：内层触屏手套，外层羽绒手套。可参考 Black Diamond、Outdoor Research。", "头部保暖也非常重要，人体有相当一部分热量会从头颈部散失。必备毛线帽、围脖、护耳，怕冷的人建议准备巴拉克拉法帽 Balaclava。"]],
      ["相机保暖指南：第一次追光最容易踩坑", ["问题 1：电池掉电飞快。相机电池在室温里可能显示 100%，到 -20℃ 的室外很快就会掉到 30% 甚至更低。建议至少准备 3 块电池，备用电池放在羽绒服内侧口袋，用体温保暖。", "问题 2：镜头起雾。千万不要把相机从 -25℃ 的室外直接带进 +25℃ 的室内后立刻打开。正确做法是先放进密封袋，等待约 30 分钟，再慢慢打开。", "问题 3：三脚架冻手。金属脚架在低温下非常冰，建议提前包海绵套或防寒把手，否则可能冻到手指。"]],
      ["追光摄影装备", ["相机入门选择可参考 Sony A6400、Canon R10。", "进阶机身可参考 Sony A7M4、Sony A7C2、Canon R6II、Nikon Z6II。", "镜头重点看大光圈。推荐焦段包括 20mm F1.8、24mm F1.4、35mm F1.4。广角更适合拍摄天空范围，较大光圈更利于在暗光环境下记录极光。"]],
      ["手机、充电宝和常用药", ["苹果手机在低温下掉电尤其明显。建议贴身放置，不要长期放在裤兜或外侧口袋。", "充电宝建议 20000mAh+，追光当天出发前确保充满电。", "药品清单建议准备：感冒药、退烧药、肠胃药、创可贴、晕车药、润唇膏、护手霜。特别重要的是润唇膏，北极圈冬季非常干燥。"]],
      ["追光当天必带", ["出发前检查：护照、手机、充电宝、相机、三脚架、备用电池、手套、帽子、围脖、保温杯。", "如果需要长时间等待，建议再带一点高热量小零食。低温环境下，体力消耗比城市散步大得多。"]],
      ["极光拍摄参数参考", ["弱极光：ISO 1600，F1.8，5-10 秒。", "中等极光：ISO 1600，F1.8，3-5 秒。", "强极光：ISO 800，F1.8，1-2 秒。", "这些参数只是起点。极光移动越快，曝光时间越要缩短；风越大，三脚架越要稳。先拍一张看效果，再根据亮度和拖影调整。"]],
      ["出发前最后 10 分钟检查", ["文件：护照、签证、保险。", "设备：手机、相机、三脚架、充电器。", "衣物：羽绒服、雪地靴、羊毛袜、手套。", "金融：卢布现金、银联卡。", "网络：国际漫游或俄罗斯 SIM 卡。"]],
      ["Aurora Hunter 特别提醒", ["追光最大的误区不是冷，而是穿太少，以及电池没保暖。", "在摩尔曼斯克，看到极光通常需要一点运气；而能够舒服地坚持在零下 20℃ 的雪地里等待 2-4 小时，则需要提前做好装备准备。", "极光不会因为你冷就提前出现。所以宁可穿多一层，也不要少带一件。", "对于第一次来到北极圈的旅行者来说，保暖装备的重要性远远超过相机设备。真正决定你体验好坏的，往往是一双干燥温暖的鞋，和一块还有电的备用电池。"]],
    ],
  },
  {
    id: "aurora-season", title: "什么时间最容易看到极光？", read: "8分钟", image: "/images/hero-aurora.png",
    intro: "摩尔曼斯克的追光季通常从初秋延续到次年春天，但月份只是基础，黑夜长度、云量和停留晚数更关键。",
    sections: [
      ["追光季怎么理解", ["9月下旬到次年3月底通常具备足够黑暗时段；深冬夜长，初秋和早春则兼有较温和的体感。", "极夜不等于每天都有极光，极光也不需要等到午夜才会出现。只要天空足够暗、云层打开，就可能看到。"]],
      ["不同月份的旅行感受", ["9月至10月可能遇到未完全封冻的湖面，适合拍摄倒影；12月至2月是雪原与极夜氛围最浓的阶段。", "3月夜间仍可追光，白天更长，也更适合同时安排海岸和雪地活动。"]],
      ["安排几晚更稳妥", ["建议至少连续停留三晚，把天气风险分散开。", "不要把追光只安排在离境前一晚；道路、云层和风雪都可能导致临时调整。"]],
    ],
  },
  {
    id: "aurora-probability", title: "摩尔曼斯克极光概率", read: "9分钟", image: "/images/aurora-village.png",
    intro: "概率不是一个固定百分比。停留晚数、云层、太阳活动和是否能够机动追云，都会改变最终结果。",
    sections: [
      ["为什么不能承诺百分之百", ["极光是自然现象，强度和出现时间无法人为控制；即使有太阳活动，厚云也会遮挡天空。", "可靠的服务应该解释风险和备选方案，而不是用单一数字保证结果。"]],
      ["怎样提高遇见机会", ["连续安排多个夜间窗口，比只参加一晚更有效。", "选择能够根据云图和道路情况移动的当地车队，避开城市光污染，并为等待留出足够时间。"]],
      ["如何看待预报", ["KP值反映地磁活动，不等于你所在位置一定能看到。摩尔曼斯克本身位于极光带内，中等活动也值得出发。", "优先看短时云量、降雪和道路情况，再结合当地团队的现场判断。"]],
    ],
  },
  {
    id: "choose-aurora-tour", title: "如何选择追光团", read: "10分钟", image: "/images/reindeer-winter.png",
    intro: "比团名更重要的，是车辆机动性、人数、等待策略、摄影支持，以及天气不理想时如何沟通。",
    sections: [
      ["先看执行方式", ["确认是否会根据实时云图调整方向，而不是固定停在一个营地等待。", "了解接送范围、最长等待时间、车辆保暖条件和恶劣天气下的处理方式。"]],
      ["小团与私人团", ["小团适合希望兼顾交流和效率的游客；私人团更适合家庭、摄影需求或希望节奏完全自主的人。", "无论哪种形式，都应确认实际接待方、车辆与向导安排。"]],
      ["摄影与中文沟通", ["询问是否提供三脚架、基础参数指导和人物补光，不要把‘免费拍照’当作唯一选择标准。", "Aurora Hunter 提供群内中文服务；现场路线、安全与活动决定由合作的俄罗斯当地旅行社负责。"]],
    ],
  },
  {
    id: "aurora-forecast", title: "极光预测怎么看？", read: "8分钟", image: "/images/hero-aurora.png",
    intro: "看极光不能只盯着一个KP值。真正决定当晚体验的，是云层、黑暗程度、太阳活动和机动范围的共同作用。",
    sections: [
      ["先看云，再看极光指数", ["厚云会挡住极光，即使太阳活动很强也可能看不到。当地团队会同时观察多个方向的云量和道路条件。", "摩尔曼斯克处在极光带内，中等强度活动也可能形成清晰极光，不必只等待很高的KP值。"]],
      ["为什么建议至少住三晚", ["极光是自然现象，连续停留能分散单晚天气风险。", "线路会把夜间追光窗口与白天海岸、城市或文化活动组合，避免整段旅程只剩等待。"]],
      ["看到与拍到是两件事", ["肉眼看到的颜色可能比相机成像柔和；眼睛适应黑暗后会更容易分辨结构。", "不要用闪光灯照向他人，听从向导选择安全停车和拍摄位置。"]],
    ],
  },
  {
    id: "aurora-photo", title: "极光摄影指南", read: "7分钟", image: "/images/aurora-village.png",
    intro: "手机可以记录，带手动模式的相机能获得更多细节。先保证自己安全和保暖，再谈参数。",
    sections: [
      ["相机起始设置", ["使用广角镜头、三脚架和手动对焦；可从大光圈、较高感光度与数秒曝光开始，再根据极光移动速度调整。", "强烈极光移动很快，应缩短曝光；较弱极光可适当延长，但星星可能出现拖影。"]],
      ["手机拍摄", ["打开夜景模式并固定手机，避免数码变焦。", "让人物保持静止，必要时由向导提供短暂柔光补光。"]],
      ["低温保护", ["备用电池贴身放置，尽量少在风口更换镜头。", "进入温暖室内前把设备装进密封袋，待温度缓慢恢复后再打开。"]],
    ],
  },
  {
    id: "teriberka", title: "捷里别尔卡怎么安排？", read: "9分钟", image: "/images/teriberka-coast.png",
    intro: "这不是普通海边一日游。冬季道路、风雪和海况都可能改变出发时间与停靠顺序。",
    sections: [
      ["主要风景", ["穿越苔原公路，抵达旧渔村、船舶墓地、海滩与瀑布一带。", "冬季是海岸冰雪和极夜色彩，夏季则适合极昼、海鸟与出海观察。"]],
      ["为什么路线需要弹性", ["公路可能因风雪临时关闭，出海也必须服从风浪和港口要求。", "当地旅行社会在安全优先的前提下调整顺序、替换停靠点或改期。"]],
      ["旅行礼仪", ["不攀爬危险岩石，不靠近未确认安全的冰面。", "尊重村落居民与私人区域，把垃圾带走，不采集苔原植物。"]],
    ],
  },
  {
    id: "family-safety", title: "多大的孩子适合去追极光？", read: "9分钟", image: "/images/husky-sled.png",
    intro: "如果以摩尔曼斯克冬季追极光为目的，更建议 7 岁以上儿童参加；8-15 岁亲子家庭通常体验感和满意度更高。",
    sections: [
      ["年龄建议", ["0-3 岁：不推荐。主要原因是极寒、作息不稳定，孩子也很难准确表达身体不适。", "4-6 岁：谨慎。不是完全不能去，但家长会非常累，需要接受孩子可能大部分时间在车里睡觉，甚至临时放弃追光。", "7-10 岁：可以。这个年龄段开始能理解极光、北极圈、驯鹿和哈士奇，也更容易形成完整体验。", "11-15 岁：非常推荐。体力、理解力和参与度都比较好，通常能体验追极光、哈士奇雪橇、驯鹿农场、北冰洋海岸等多数项目。", "16 岁以上：与成人体验基本相同。只要保暖装备到位，行程适应能力通常较好。"]],
      ["为什么不建议 3 岁以下参加冬季追光", ["摩尔曼斯克追光不是在酒店门口看。很多时候需要晚上 21:00 左右出发，凌晨 1:00-3:00 返回，并在零下 20℃ 左右的野外等待。", "遇到风时，-20℃ 的实际体感可能接近 -30℃ 以下。婴幼儿的保暖、睡眠和身体反应都更难把控。", "追光时间通常集中在 22:00-02:00，幼儿很容易因为睡眠被打乱而哭闹、发烧或情绪失控。", "部分白天路线也有较长车程，例如摩尔曼斯克前往捷里别尔卡，单程约 2.5 小时，很多低龄孩子会比较难受。"]],
      ["4-6 岁能去吗？", ["可以，但要看孩子体质、旅行经验和家庭承受能力。很多家庭最后会变成一位家长下车追光，另一位家长陪孩子在车里休息。", "如果孩子怕冷、容易晕车、作息非常固定，或者家长希望每天都完整参与夜间追光，不建议勉强安排。", "从实际接待角度，很多当地接待方看到 5 岁以下儿童，都会提前提醒夜间低温、等待时间和长途车程风险。"]],
      ["最推荐的亲子年龄", ["7 岁以上更适合参加冬季极光旅行。孩子能理解“极光、北极圈、驯鹿、哈士奇”这些体验，而不只是觉得冷、困、想回酒店。", "11 岁以上通常是最佳阶段：体力更好，能参与更多项目，也更容易把这次北境旅行变成长期记忆。", "对于计划亲子出行的家庭，8-15 岁通常是更舒适的年龄段。孩子既能参与夜间追光，也能享受驯鹿、哈士奇、北冰洋海岸等体验；家长在照顾作息和保暖方面的压力也会相对小一些。"]],
      ["给家长的实际建议", ["儿童追光不宜长时间站在户外，可以在车辆内等待，出现窗口后再短时间下车。", "提前提供儿童年龄、身高、体重和健康情况，方便当地旅行社确认车辆、儿童座椅和活动限制。", "准备常用药、旅行保险、保温杯、备用手套、备用袜子和高热量零食。", "孩子出现持续发抖、手脚麻木、精神状态异常或明显不适时，应立即回到温暖环境，并听从当地接待方安排。"]],
    ],
  },
  {
    id: "service-process", title: "行程由谁安排？中文服务如何进行？", read: "6分钟", image: "/images/service-process-visual.svg",
    intro: "Aurora Hunter 负责面向中国游客的信息咨询与群内中文沟通；具体旅游服务由合作的俄罗斯持牌旅行社执行。",
    sections: [
      ["出发前", ["中文顾问了解日期、人数、兴趣和身体情况，并协助整理沟通需求。", "合作的俄罗斯持牌旅行社根据季节、交通和接待能力提供具体方案。"]],
      ["确认阶段", ["具体旅游产品、合同签署和收款主体为合作的俄罗斯持牌旅行社。", "游客应仔细阅读合同、接待标准、取消安排与保险要求，并向合同主体确认疑问。"]],
      ["旅途中", ["当地旅行社负责车辆、向导、活动安排与现场接待。", "Aurora Hunter 提供群内中文服务，协助信息转达和日常沟通；突发情况以当地安全机构及接待方指令为准。"]],
    ],
  },
];

const scenery = [
  { title: "追赶北极光", label: "核心体验", image: "/images/hero-aurora.png", text: "摩尔曼斯克位于北极光带内。真正的追光不是守在固定地点，而是结合实时云图、道路和光污染情况，向更清晰的天空移动。连续留出多个夜晚，才更有机会遇到从淡绿色弧线到漫天舞动的不同形态。", points: ["建议连续停留至少三晚", "远离城市灯光并保留机动时间", "相机与手机均可获得基础拍摄指导"] },
  { title: "萨米民族村", label: "重点推荐", image: "/images/reindeer-winter.png", text: "萨米文化体验让旅程从风景进入北境生活。游客可以认识驯鹿放牧传统、民族服饰与当地故事，并与驯鹿、哈士奇互动。它尤其适合家庭游客，也是理解科拉半岛文化的一站。", points: ["驯鹿与哈士奇互动", "民族文化与传统生活介绍", "冬季雪原活动，具体以现场开放为准"] },
  { title: "捷里别尔卡", label: "北冰洋海岸", image: "/images/teriberka-coast.png", text: "穿过苔原抵达巴伦支海，旧渔村、船舶墓地、海岸岩石与冰瀑共同构成‘世界尽头’的荒凉感。冬季公路可能受风雪影响，出发时间和停靠顺序需要服从当地安排。", points: ["旧渔村与船舶墓地", "北冰洋海岸和苔原公路", "夏季可视海况安排出海观察"] },
  { title: "列宁号破冰船", label: "城市地标", image: "https://commons.wikimedia.org/wiki/Special:FilePath/RUS-2016-Murmansk-Icebreaker_Lenin_01.jpg?width=1600", text: "停泊在摩尔曼斯克港的列宁号，是世界上第一艘核动力水面船。它连接着北极航运、港口城市与苏联工业史，是认识摩尔曼斯克不可忽略的城市坐标。", points: ["科拉湾港口景观", "北极航运历史", "内部参观需以开放时间为准"] },
  { title: "阿廖沙纪念碑", label: "城市视野", image: "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%90%D0%BB%D1%91%D1%88%D0%B0_%D0%B7%D0%B8%D0%BC%D0%BE%D0%B9.jpg?width=1280", text: "纪念碑位于城市高地，俯瞰科拉湾与摩尔曼斯克城区。这里既是重要历史纪念地，也是理解这座北极圈港城空间格局的好位置。", points: ["俯瞰城市与科拉湾", "了解二战时期北方战线历史", "冬季风大，需加强防风保暖"] },
  { title: "希比内山脉", label: "山地雪原", image: "/images/husky-sled.png", text: "希比内山脉拥有与海岸完全不同的北境轮廓：山谷、雪坡、苔原与湖泊随季节变化。冬季适合雪景体验，夏季则更适合山地徒步与自然观察。", points: ["雪山与山谷景观", "冬季和夏季各有不同路线", "活动强度按天气和团队情况安排"] },
];

const arcticFoods = [
  ["帝王蟹", "King Crab", "来摩尔曼斯克最值得优先尝试的海鲜之一。清蒸、水煮或黄油烤制即可，过度调味反而会盖住蟹肉鲜甜。"],
  ["北极扇贝", "Arctic Scallop", "甜度高、腥味低、肉质厚实。很多当地餐厅会提供现开现吃或简单烹调。"],
  ["海胆", "Sea Urchin", "第一次尝试可以选择海胆配柠檬汁，是巴伦支海海鲜里很有记忆点的一口。"],
  ["北极鳕鱼", "Cod", "科拉半岛代表性鱼类，煎、烤、奶油做法都常见，口感干净。"],
  ["大比目鱼", "Halibut", "油脂更丰富，口感细嫩，适合作为一顿北境晚餐里的主菜。"],
  ["驯鹿肉", "Reindeer", "萨米传统饮食的一部分，常见做法包括炖肉、驯鹿排、香肠和饺子。"],
  ["驯鹿心", "Reindeer Heart", "更猎奇的北方风味，常搭配越橘或根茎类泥，适合愿意尝试特色菜的客人。"],
  ["俄式饺子", "Pelmeni", "俄罗斯国民美食，北方版本常见牛肉或驯鹿肉馅，适合不想太冒险的游客。"],
  ["北极浆果", "Arctic Berries", "越橘、云莓、蓝莓常做成果酱、果汁和甜点，是北极圈风味里清爽的一面。"],
  ["北方熏鱼拼盘", "Smoked Fish", "如果只想点一次海鲜拼盘，可以选择熏鱼组合，常见三文鱼、鳕鱼、比目鱼或鳟鱼。"],
];

const restaurants = [
  {
    name: "Tsarskaya Okhota",
    cn: "皇家狩猎餐厅",
    tag: "北极木屋 · 驯鹿与鱼类",
    address: "Kolskiy Ave. 86, Murmansk",
    map: "https://www.google.com/maps/search/?api=1&query=Tsarskaya%20Okhota%20Kolskiy%20Ave%2086%20Murmansk",
    text: "如果只能选一家传统北方风味餐厅，可以优先考虑这里。猎人小屋式氛围强，适合尝试驯鹿炖肉、驯鹿心、熏鱼拼盘、北极鳕鱼和俄式饺子。",
  },
  {
    name: "Tundra Grill & Bar",
    cn: "苔原烧烤酒吧",
    tag: "现代北方风味 · 年轻氛围",
    address: "Ulitsa Polyarnye Zori 49/2, Murmansk",
    map: "https://www.google.com/maps/search/?api=1&query=Tundra%20Grill%20Bar%20Polyarnye%20Zori%2049%202%20Murmansk",
    text: "更现代的北方餐厅，适合年轻游客或朋友聚餐。可以关注帝王蟹、扇贝、驯鹿排、北极鱼类和烤制菜品。",
  },
  {
    name: "Terrasa Lounge-Cafe",
    cn: "Terrasa 景观餐厅",
    tag: "城市景观 · 拍照友好",
    address: "Lenina Ave. 69, Murmansk",
    map: "https://www.google.com/maps/search/?api=1&query=Terrasa%20Lounge%20Cafe%20Lenina%2069%20Murmansk",
    text: "位置和景观较受游客欢迎，适合约会、家庭聚餐和想拍照的客人。可作为城市日或追光前后的舒适晚餐选择。",
  },
  {
    name: "7 Nebo",
    cn: "七重天全景餐厅",
    tag: "高层视野 · 夜景",
    address: "Lenina Ave. 82, Murmansk",
    map: "https://www.google.com/maps/search/?api=1&query=7%20Nebo%20Lenina%2082%20Murmansk",
    text: "位于高层，重点是俯瞰摩尔曼斯克城市夜景。适合想把晚餐和城市视野结合起来的游客。",
  },
];

const guideCategories = [
  {
    id: "aurora-basics",
    title: "极光观测指南",
    label: "看懂极光",
    intro: "适合第一次计划北极光旅游的游客：先理解极光出现条件、观测时间、肉眼效果和天气影响。",
    topics: ["极光形成原理", "极光最佳观测时间", "肉眼看到和照片的区别", "云层与月光影响"],
    sections: [
      ["极光不是固定演出", ["极光由太阳活动与地球磁场共同作用形成，出现时间、强度和形态都无法人工控制。", "摩尔曼斯克位于北极光带内，具备观测优势，但真正能否看到，还要同时看云量、降雪、光污染和道路条件。"]],
      ["什么时候更容易看到", ["通常 9 月下旬至次年 3 月底具备足够黑暗时段。12 月至 2 月夜长、雪景强，9 月至 10 月和 3 月体感更温和。", "连续停留三晚以上更稳妥，因为追光最大的变量不是地点，而是当晚天空是否打开。"]],
      ["肉眼与照片的差异", ["肉眼看到的极光常比相机照片柔和，弱极光可能像淡灰绿色云带；强极光会有明显绿色、紫色或快速舞动。", "相机通过长曝光能记录更多颜色和细节，所以看到现场和照片不同是正常现象。"]],
    ],
  },
  {
    id: "murmansk-city",
    title: "摩尔曼斯克旅行基础",
    label: "城市与交通",
    intro: "了解摩尔曼斯克在哪里、怎么抵达、住哪里、机场接送和不懂俄语时如何沟通。",
    topics: ["城市位置", "中国出发交通", "机场与接送", "住宿区域"],
    sections: [
      ["摩尔曼斯克在哪里", ["摩尔曼斯克位于俄罗斯西北部科拉半岛，是北极圈内重要港口城市，也是中国游客常选择的俄罗斯极光目的地。", "这里靠近巴伦支海，冬季有极夜氛围和雪原景观，夏季则适合北冰洋海岸和极昼旅行。"]],
      ["中国游客怎么抵达", ["中国出发通常需要经莫斯科或圣彼得堡中转，再飞往摩尔曼斯克。具体航班会随季节和航空公司调整。", "抵达后建议安排机场接送，尤其冬季夜间到达时，带着大件行李临时找车并不方便。"]],
      ["住在哪里更方便", ["首次到访更建议住市区或交通便利区域，方便餐厅、补给、接送和白天城市参观。", "如果以追光为主，夜间会由当地车辆带到更适合观测的区域，不一定需要住在偏远地区。"]],
    ],
  },
  {
    id: "aurora-tour",
    title: "追光团与当地团",
    label: "怎么选择",
    intro: "比较当地团、包车、中文沟通和追光执行方式，帮助游客判断适合自己的出行方式。",
    topics: ["追光团怎么选", "当地团与国内团区别", "包车适合谁", "中文服务边界"],
    sections: [
      ["先看追光方式", ["真正的追光不是固定在一个点等，而是结合云图、道路、风雪和光污染情况移动。", "选择时可以重点询问车辆保暖、接送范围、等待时间、是否根据天气调整路线，以及恶劣天气下如何处理。"]],
      ["当地团与中文服务", ["当地旅行社更熟悉道路、安全要求和现场执行；中文服务则帮助游客理解安排、沟通需求和减少语言压力。", "Aurora Hunter 提供群内中文服务，具体车辆、向导、合同、收款和接待由合作的俄罗斯持牌旅行社负责。"]],
      ["什么情况适合包车", ["亲子家庭、摄影需求强、同行人数较多或作息要求明确的游客，更适合考虑包车或私人安排。", "如果预算有限、希望轻松参与，小团也可以满足基础追光需求。"]],
    ],
  },
  {
    id: "teriberka-guide",
    title: "捷里别尔卡与北冰洋",
    label: "世界尽头",
    intro: "了解捷里别尔卡、巴伦支海、船舶墓地、龙蛋海滩和冬季道路弹性。",
    topics: ["捷里别尔卡一日游", "巴伦支海", "龙蛋海滩", "冬季路况"],
    sections: [
      ["为什么值得去", ["捷里别尔卡靠近巴伦支海，拥有苔原公路、旧渔村、海岸岩石、船舶墓地和极地海岸氛围。", "它不是普通海边景点，真正吸引人的是荒凉、辽阔和“世界尽头”的空间感。"]],
      ["冬季行程要有弹性", ["冬季道路可能因风雪关闭，海岸风力也会影响停靠顺序和户外时间。", "当地旅行社会根据道路、风力和安全情况调整出发时间、停靠点或替代安排。"]],
      ["适合怎样的游客", ["喜欢自然景观、摄影、海岸线和荒野感的游客非常适合。", "如果带低龄儿童或老人，需要提前评估车程、风寒和户外停留时间。"]],
    ],
  },
  {
    id: "winter-gear",
    title: "冬季装备与穿衣",
    label: "保暖准备",
    intro: "从零下二三十度穿衣、雪地靴、手套、暖宝宝到相机防冻，解决追光舒适度问题。",
    topics: ["洋葱穿衣法", "雪地靴", "手套与帽子", "设备保暖"],
    sections: [
      ["穿衣核心原则", ["不要只穿一件很厚的衣服。更推荐排汗层、保暖层、防风层叠穿。", "外层要防风、防雪、防泼水；鞋子要预留厚袜空间，太紧反而更冷。"]],
      ["最容易忽略的部位", ["脚、手、头颈部是追光时最容易先冷的地方。雪地靴、羊毛袜、双层手套、围脖和帽子都很重要。", "追光等待时间可能达到 2-4 小时，装备舒适度会直接影响旅行体验。"]],
      ["电子设备保暖", ["手机和相机电池在低温下会快速掉电，备用电池应贴身存放。", "从室外进入温暖室内前，建议把相机放入密封袋，等待温度缓慢回升后再打开。"]],
    ],
  },
  {
    id: "aurora-photo-category",
    title: "极光摄影",
    label: "手机与相机",
    intro: "讲清手机拍极光、相机参数、三脚架、人物补光和低温拍摄注意事项。",
    topics: ["手机拍极光", "相机参数", "三脚架", "人物合影"],
    sections: [
      ["手机可以拍吗", ["现在很多手机夜景模式都能记录极光，但要尽量固定手机，避免手持抖动和数码变焦。", "拍人物时需要短暂柔光补光，人物保持不动，效果会更自然。"]],
      ["相机基础参数", ["可从大光圈、ISO 800-1600、1-10 秒曝光开始试拍，再根据极光强弱和移动速度调整。", "极光越强、移动越快，曝光时间越要缩短，否则天空纹理会糊成一片。"]],
      ["先保暖再拍照", ["拍摄时手很容易冷，建议触屏内手套加外层保暖手套。", "不要为了拍照站到道路、冰面边缘或不确定安全的位置，听从当地向导安排。"]],
    ],
  },
  {
    id: "family-travel-category",
    title: "亲子追光",
    label: "带孩子去",
    intro: "判断孩子年龄、夜间作息、保暖、车程和亲子项目是否适合摩尔曼斯克冬季旅行。",
    topics: ["适合年龄", "低龄儿童风险", "亲子项目", "家长准备"],
    sections: [
      ["更推荐的年龄", ["冬季追光更建议 7 岁以上儿童参加，8-15 岁通常体验感更好。", "孩子能理解极光、北极圈、驯鹿和哈士奇时，旅行记忆会更完整。"]],
      ["为什么低龄儿童要谨慎", ["追光通常夜间出发、凌晨返回，还可能在零下二十度左右等待。", "3 岁以下儿童很难表达身体不适，作息也更容易被打乱；4-6 岁可根据体质和家庭承受能力谨慎决定。"]],
      ["家长需要准备什么", ["准备儿童保暖装备、常用药、旅行保险、热水和高热量小零食。", "夜间追光不建议孩子长时间站在户外，可在车内等待，出现窗口后短时间下车观看。"]],
    ],
  },
  {
    id: "russia-prep",
    title: "俄罗斯出行准备",
    label: "签证与现金",
    intro: "整理俄罗斯签证、入境、电话卡、eSIM、卢布现金、银行卡和旅行安全提醒。",
    topics: ["签证", "电话卡", "卢布现金", "支付方式"],
    sections: [
      ["证件与入境", ["出发前确认护照有效期、签证、机票、酒店订单和保险，并保存电子备份。", "入境流程和政策可能变化，出发前应以官方信息和承运航空公司要求为准。"]],
      ["网络与通讯", ["可以提前开通国际漫游，或抵达后使用俄罗斯电话卡。常见运营商包括 MTS、MegaFon。", "如果使用 eSIM，需要确认手机型号、网络支持和覆盖情况。"]],
      ["现金与支付", ["建议准备一定数量卢布现金，并保留少量人民币作为备用。", "俄罗斯大部分 Visa、Master 国际支付受限制，不要完全依赖银行卡；银联可作为备用，但可用范围需以现场为准。"]],
    ],
  },
  {
    id: "arctic-experiences",
    title: "北极特色体验",
    label: "项目选择",
    intro: "了解萨米村、驯鹿、哈士奇、冰上漂浮、冰钓和俄罗斯班雅等体验适合谁。",
    topics: ["萨米民族村", "哈士奇雪橇", "驯鹿农场", "冰上漂浮"],
    sections: [
      ["萨米村与驯鹿", ["萨米民族村适合第一次来北极圈的游客，尤其适合亲子家庭。", "这里能了解驯鹿文化、民族服饰、北方生活方式，并进行适度互动。"]],
      ["哈士奇与雪地项目", ["哈士奇雪橇、雪地摩托等项目受天气、安全和开放情况影响。", "参加前应确认年龄、身高、身体状态和保险要求。"]],
      ["冰上漂浮与冰钓", ["冰上漂浮需要专业装备和现场安全人员，不适合自行尝试。", "冰钓、桑拿等体验更适合希望慢节奏感受北方生活的游客。"]],
    ],
  },
];

const faqItems = [
  ["摩尔曼斯克追极光一般要安排几晚？", "更建议至少连续三晚。极光受云层、太阳活动和道路条件影响，多留几个夜间窗口更稳妥。"],
  ["看到极光能保证吗？", "不能保证。极光是自然现象，可靠的服务应说明风险，并根据天气与道路情况尽量提高遇见机会。"],
  ["不会俄语可以去吗？", "可以。行前准备好证件、酒店和联系方式，旅途中由合作当地旅行社接待，Aurora Hunter 提供群内中文服务。"],
  ["冬天会不会太冷？", "冬季常见 -10℃ 到 -30℃，遇风体感更低。只要按洋葱穿衣法准备装备，大多数成人可以适应。"],
  ["需要带多少现金？", "建议携带一定数量卢布现金作为日常备用，不要完全依赖银行卡。具体金额可根据停留天数、用餐和个人消费习惯调整。"],
  ["Visa 和 Master 还能用吗？", "俄罗斯大部分国际 Visa、Master 支付受限制。银联可作为备用，但可用范围以现场为准。"],
  ["带孩子参加安全吗？", "7 岁以上更适合冬季追光。低龄儿童需要谨慎评估夜间作息、低温、车程和家长照看压力。"],
  ["老人适合去吗？", "要看身体情况和耐寒能力。冬季夜间追光时间长，若有心脑血管、呼吸系统或行动不便问题，应提前咨询医生并告知接待方。"],
  ["手机能拍到极光吗？", "多数带夜景模式的手机可以记录极光，但效果取决于极光强度、稳定性和补光。相机与三脚架能获得更稳定画质。"],
  ["如果天气不好怎么办？", "当地旅行社会根据云量、风雪、道路和安全情况调整追光方向或行程顺序。自然条件不佳时，安全优先。"],
  ["捷里别尔卡冬天一定能去吗？", "不一定。冬季公路可能因风雪临时关闭，是否出发要以当地道路和安全判断为准。"],
  ["页面可以直接付款吗？", "不提供在线交易。本网站用于旅行信息展示和咨询需求提交，具体合同、收款和接待由合作的俄罗斯持牌旅行社提供。"],
];

const nav = [["首页", "/"], ["完整行程", "/#journeys"], ["北境风景", "/experiences"], ["获取方案", "/custom"], ["旅行攻略", "/guides"], ["关于我们", "/about"]];

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function useRoute() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));
  useEffect(() => { const onPop = () => setPath(normalizePath(window.location.pathname)); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  const go = (to) => { const url = new URL(to, window.location.origin); window.history.pushState({}, "", `${url.pathname}${url.hash}`); setPath(normalizePath(url.pathname)); requestAnimationFrame(() => url.hash ? document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" }) : window.scrollTo({ top: 0, behavior: "smooth" })); };
  return [path, go];
}

function Brand({ compact = false }) {
  return <button className={`brand ${compact ? "brand--compact" : ""}`} data-link="/" aria-label="Aurora Hunter 极光猎人首页"><img className="brand__logo" src="/images/aurora-hunter-logo-nav-transparent.png" alt="Aurora Hunter 极光猎人" /></button>;
}

function Header({ go, onWechat }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="header__inner"><div onClick={(e) => e.target.closest("[data-link]") && go("/")}><Brand /></div><nav className="nav">{nav.map(([label, to]) => <button key={to} onClick={() => go(to)}>{label}</button>)}</nav><div className="header__actions"><button className="icon-button" onClick={onWechat} aria-label="微信咨询"><WechatLogo /></button><button className="button button--light" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button><button className="menu-button" onClick={() => setOpen(!open)} aria-label="打开菜单">{open ? <X /> : <List />}</button></div></div>{open && <div className="mobile-nav">{nav.map(([label, to]) => <button key={to} onClick={() => { go(to); setOpen(false); }}>{label}<ArrowRight /></button>)}</div>}</header>;
}

function SocialContact({ type, label, href, icon, onClick, disabled = false }) {
  const content = <><span className="social-contact__icon" aria-hidden="true">{typeof icon === "string" ? <img src={icon} alt="" /> : icon}</span><span>{label}</span></>;
  if (href && !disabled) return <a className={`social-contact social-contact--${type}`} href={href}>{content}</a>;
  return <button className={`social-contact social-contact--${type}`} type="button" onClick={onClick} disabled={disabled} aria-label={disabled ? label : label}>{content}</button>;
}

function Footer({ go, onWechat }) {
  return <footer className="footer"><div className="footer__top"><div><span>目的地</span><b>俄罗斯 · 摩尔曼斯克</b></div><div><span>中文咨询</span><b>157 5465 1899</b></div><button className="button button--accent" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></div><div className="compliance"><ShieldCheck /><div><b>服务与接待说明</b><p>Aurora Hunter 极光猎人提供俄罗斯北极圈旅行信息咨询服务。具体旅游产品、合同签署、收款及接待服务由合作的俄罗斯持牌旅行社提供。</p><small>本网站用于风景与行程信息展示，不提供在线交易。旅途中提供群内中文服务，具体安排以当地旅行社最终确认为准。</small></div></div><div className="footer__grid footer__grid--compact"><div><h4>探索</h4>{nav.slice(1, 5).map(([l, p]) => <button key={p} onClick={() => go(p)}>{l}</button>)}</div><div><h4>服务方式</h4><span>俄罗斯当地旅行社接待</span><span>群内中文服务</span><span>天气与道路弹性安排</span></div><div className="footer-contact"><h4>联系</h4><div className="social-contact-list"><SocialContact type="phone" label="电话" href="tel:15754651899" icon={<Phone weight="fill" />} /><SocialContact type="wechat" label="微信" onClick={onWechat} icon="/icons/wechat.svg" /><SocialContact type="redbook" label="小红书" disabled icon="/icons/xiaohongshu.svg" /><SocialContact type="weibo" label="微博" disabled icon="/icons/weibo.svg" /><SocialContact type="douyin" label="抖音" disabled icon="/icons/douyin.svg" /></div><button onClick={() => go("/custom")}>提交出行需求</button></div></div><div className="footer__bottom"><span>© 2026 AURORA HUNTER · 极光猎人</span><span>图片许可与署名见 CREDITS.md</span></div></footer>;
}

function PageHero({ kicker, title, text }) { return <section className="page-hero"><p className="kicker"><span /> {kicker}</p><h1>{title}</h1><p>{text}</p></section>; }

function InquiryStrip({ go }) {
  return <div className="booking-strip inquiry-strip"><label><span>旅行季节</span><b><CalendarBlank /> 冬季追光 / 夏季极昼</b></label><label><span>服务语言</span><b><WechatLogo /> 群内中文服务</b></label><label><span>当地接待</span><b><ShieldCheck /> 俄罗斯持牌旅行社</b></label><button className="button button--accent" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></div>;
}

function HomePage({ go }) {
  return <>
    <section className="hero hero--animated" id="top">
      <div className="hero__slides" aria-hidden="true"><img src="/images/hero-aurora.png" alt="" /><img src="/images/aurora-village.png" alt="" /><img src="/images/hero-aurora.png" alt="" /></div>
      <div className="hero__aurora-wash" /><div className="hero__veil" />
      <div className="hero__content"><p className="kicker"><span /> 北纬69° · 摩尔曼斯克</p><h1>去世界尽头，<br />等一场<span>极光</span>。</h1><p className="hero__intro">面向中国游客的摩尔曼斯克极光旅游信息、俄罗斯极光线路说明与群内中文服务。了解北极光旅游、摩尔曼斯克追极光、北极圈风景与冬季装备，再从容出发。</p><div className="hero__buttons"><button className="button button--accent" onClick={() => go("/#journeys")}>查看完整行程 <ArrowRight /></button><button className="text-button" onClick={() => go("/experiences")}><Compass /> 北境风景与美食</button></div></div>
      <div className="hero__facts"><div><b>3晚+</b><span>建议追光停留</span></div><div><b>四季</b><span>北境风景</span></div><div><b>中文</b><span>群内沟通服务</span></div></div>
    </section>
    <section className="section wrap" id="journeys"><div className="section-heading"><div><p className="kicker kicker--dark"><span /> 完整行程</p><h2>不是单独景点，<br />是一段完整北境旅程</h2></div><p className="section-note">以下为冬季核心线路参考，具体顺序由当地旅行社结合天气、道路和活动开放情况安排。</p></div><div className="home-itineraries">{journeys.slice(0, 2).map((journey, index) => <HomeItinerary key={journey.id} journey={journey} index={index} go={go} />)}</div></section>
  </>;
}

function HomeItinerary({ journey, index, go }) {
  return <article className="home-itinerary"><div className="home-itinerary__visual"><img src={journey.image} alt={journey.title} /><span>0{index + 1}</span><b>{journey.eyebrow}</b></div><div className="home-itinerary__content"><p className="kicker kicker--dark"><span /> {journey.season}</p><h3>{journey.title}</h3><p>{journey.intro}</p><div className="home-itinerary__days">{journey.days.map(([day, title, text]) => <div key={day}><b>{day}</b><section><h4>{title}</h4><p>{text}</p></section></div>)}</div><button className="button button--dark" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></div></article>;
}

function ToursPage({ go, mode = "all" }) {
  if (mode !== "experience") return <HomePage go={go} />;
  return <><PageHero kicker="北境风景" title="摩尔曼斯克，值得看的不只极光" text="从极光带到萨米文化，从北冰洋海岸到北极圈港城。每一处风景都按旅行体验说明，不拆分售卖，也不按景点单独计费。" /><section className="section wrap scenery-intro"><div><p className="kicker kicker--dark"><span /> 必看清单</p><h2>两项核心体验，<br />四处北境地标</h2></div><p>追赶极光和萨米民族村是第一次到摩尔曼斯克最值得优先保留的体验。其余风景、美食与城市体验，可以根据季节、道路与停留时间，由当地旅行社组合进整体行程。</p></section><section className="scenery-list wrap">{scenery.map((spot, index) => <article className={`scenery-card ${index < 2 ? "scenery-card--featured" : ""}`} key={spot.title}><div className="scenery-card__image"><img src={spot.image} alt={spot.title} /><span>0{index + 1}</span><b>{spot.label}</b></div><div className="scenery-card__copy"><h2>{spot.title}</h2><p>{spot.text}</p><ul>{spot.points.map((point) => <li key={point}><Check /> {point}</li>)}</ul></div></article>)}<article className="scenery-card scenery-card--food" onClick={() => go("/food")}><div className="scenery-card__image"><img src="/images/king-crab.png" alt="北极美食" /><span>07</span><b>北极风味</b></div><div className="scenery-card__copy"><h2>第一次来北极圈，一定要吃什么？</h2><p>巴伦支海海鲜、萨米驯鹿传统和北极浆果，共同构成摩尔曼斯克最典型的北极圈风味。</p><ul><li><Check /> 帝王蟹、北极扇贝、海胆与鳕鱼</li><li><Check /> 驯鹿肉、俄式饺子与北极浆果</li><li><Check /> 餐厅推荐与 Google Maps 定位</li></ul><button className="text-button text-button--dark">阅读美食指南 <ArrowRight /></button></div></article></section><section className="cta-section wrap"><div><p className="kicker"><span /> 由当地团队组合</p><h2>喜欢哪些风景，<br />告诉我们就好。</h2></div><button className="button button--accent" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></section></>;
}

function FoodSection({ sectionId }) {
  return <section className="food-section" id={sectionId}><div className="wrap food-hero"><div><p className="kicker"><span /> 北极风味</p><h2>第一次来北极圈，<br />一定要吃什么？</h2><p>很多人来摩尔曼斯克是为了看极光，但真正到过的人会记住另一件事：巴伦支海海鲜、萨米驯鹿传统和北极浆果，共同构成了最典型的北极圈风味。</p></div><div className="food-hero__image"><img src="/images/king-crab.png" alt="巴伦支海帝王蟹" /><span>Seafood · Reindeer · Arctic Berries</span></div></div><div className="wrap food-layout"><div className="food-top"><div className="food-top__heading"><span>TOP 10</span><h3>必吃美食清单</h3></div>{arcticFoods.map(([name, en, text], index) => <article key={name}><b>{String(index + 1).padStart(2, "0")}</b><div><h4>{name}<small>{en}</small></h4><p>{text}</p></div></article>)}</div><div className="restaurant-panel"><div className="restaurant-panel__heading"><span>Restaurants</span><h3>值得收藏的餐厅</h3><p>餐厅营业时间、菜单和座位情况会变化，出发前建议再次确认。Google Maps 链接用于真实定位和导航参考。</p></div>{restaurants.map((restaurant, index) => <article key={restaurant.name} className="restaurant-card"><div><span>0{index + 1} · {restaurant.tag}</span><h4>{restaurant.name}</h4><b>{restaurant.cn}</b><p>{restaurant.text}</p><small><MapPin /> {restaurant.address}</small></div><a href={restaurant.map} target="_blank" rel="noreferrer">Google Maps <ArrowRight /></a></article>)}<div className="order-combo"><h4>Aurora Hunter 点餐思路</h4><p>第一次来可以按“北极扇贝 / 驯鹿炖肉 / 帝王蟹腿 / 云莓甜点 / 越橘果汁”组合体验。建议不要天天吃中餐，摩尔曼斯克真正有记忆点的是当地新鲜海鲜、驯鹿和浆果。</p></div></div></div></section>;
}

function FoodPage({ go }) {
  return <><PageHero kicker="北极美食" title="第一次来北极圈，一定要吃什么？" text="摩尔曼斯克不仅有极光，也有巴伦支海海鲜、萨米驯鹿传统和北极浆果。必吃美食、餐厅特色与地图定位都整理在本页，方便出发前收藏。" /><FoodSection sectionId="food-detail" /><section className="guide-more wrap"><button className="text-button text-button--dark" onClick={() => go("/experiences")}><ArrowLeft /> 返回北境风景</button></section></>;
}

function TourDetail({ id, go }) {
  const journey = journeys.find((item) => item.id === id) || journeys[0];
  return <><section className="detail-hero"><img src={journey.image} alt={journey.title} /><div className="detail-hero__veil" /><div className="detail-hero__copy"><p className="kicker"><span /> {journey.eyebrow}</p><h1>{journey.title}</h1><p>{journey.intro}</p><div>{journey.tags.map((tag) => <span key={tag}><Check /> {tag}</span>)}</div></div></section><section className="detail-layout wrap"><main><div className="detail-tabs"><button className="active">逐日安排</button><button onClick={() => go("/guide/service-process")}>服务说明</button><button onClick={() => go("/guides")}>出行指南</button></div><Timeline journey={journey} /></main><aside className="booking-card service-card"><span>当地旅行社安排</span><h2>先了解风景，<br />再获得具体方案</h2><p>合作的俄罗斯持牌旅行社负责具体旅游产品、合同签署、收款、车辆、向导及现场接待。</p><ul><li><WechatLogo /> 行前与旅途中提供群内中文服务</li><li><ShieldCheck /> 具体顺序随天气、道路与安全要求调整</li><li><Clock /> 自然现象与野生动物无法保证出现</li></ul><button className="button button--accent" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></aside></section></>;
}

function Timeline({ journey }) { return <div className="timeline"><h2>{journey.focus}</h2>{journey.days.map(([day, title, text]) => <div key={`${day}-${title}`}><b>{day}</b><span /><section><h3>{title}</h3><p>{text}</p></section></div>)}</div>; }

function CustomPage({ go }) {
  const [done, setDone] = useState(false);
  return <><PageHero kicker="获取行程方案" title="先告诉我们，你想怎样抵达北境" text="提交的是旅行咨询需求，不会产生在线交易。合作的俄罗斯持牌旅行社将提供具体旅游方案与合同，Aurora Hunter 提供群内中文服务。" /><section className="custom-layout wrap"><div className="custom-visual"><img src="/images/aurora-village.png" alt="极光下的摩尔曼斯克村落" /><div><b>中文</b><span>群内沟通服务</span></div><div><b>当地</b><span>旅行社接待</span></div></div><form className="custom-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}><h2>告诉我们你的计划</h2><div className="form-grid"><label>称呼<input required placeholder="怎么称呼你" /></label><label>联系电话或微信<input required placeholder="方便中文顾问联系" /></label><label>预计出发日期<input type="date" /></label><label>出行人数<select><option>1–2人</option><option>3–5人</option><option>6–10人</option><option>10人以上</option></select></label></div><label>感兴趣的方向<select><option>冬季极光沉浸之旅</option><option>追光与北境经典线</option><option>夏季捷里别尔卡与寻鲸</option><option>雷巴奇半岛越野</option><option>还不确定，希望获得建议</option></select></label><label>补充需求<textarea placeholder="例如：带孩子、希望慢节奏、想安排摄影、饮食或健康注意事项……" /></label><button className="button button--accent" type="submit">获取行程方案 <ArrowRight /></button>{done && <p className="success"><Check /> 已收到你的咨询需求。中文顾问会根据所留联系方式与你沟通；本页面不会进行在线交易。</p>}<button type="button" className="text-button text-button--dark" onClick={() => go("/tours")}><ArrowLeft /> 返回查看完整行程</button></form></section></>;
}

function GuidesPage({ go }) {
  return <><PageHero kicker="摩尔曼斯克旅行攻略" title="出发前，把重要问题先看清楚" text="这里整理摩尔曼斯克极光旅游、俄罗斯极光、北极圈旅行、冬季装备、摄影、亲子和当地接待相关信息。内容面向第一次前往摩尔曼斯克的中国游客。" /><section className="section wrap guide-hub"><div className="guide-feature guide-feature--checklist"><img src={guides[0].image} alt={guides[0].title} /><div><span>01 · 旅行完整清单 · {guides[0].read}</span><h2>{guides[0].title}</h2><p>{guides[0].intro}</p><button className="button button--dark" onClick={() => go(`/guide/${guides[0].id}`)}>阅读完整清单 <ArrowRight /></button></div></div><div className="guide-module-head"><p className="kicker kicker--dark"><span /> 02 · 攻略栏目</p><h2>按旅行问题查找答案</h2><p>每个栏目都可以点进阅读。先从自己最关心的问题开始：看极光、怎么去、怎么选团、带孩子、摄影或装备。</p></div><div className="guide-module-grid">{guideCategories.map((module, index) => <button className="guide-module-card" key={module.id} onClick={() => go(`/guide-topic/${module.id}`)}><div><span>{String(index + 1).padStart(2, "0")}</span><b>{module.label}</b></div><h3>{module.title}</h3><p>{module.intro}</p><ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><em>阅读栏目 <ArrowRight /></em></button>)}</div><section className="faq-bank"><div><p className="kicker"><span /> 03 · FAQ</p><h2>出发前常见问题</h2><p>这里保留与上方攻略栏目不重复的快速问答，适合在提交行程需求前先扫一遍。</p></div><div className="faq-bank__list">{faqItems.map(([question, answer], index) => <article key={question}><button type="button"><span>{String(index + 1).padStart(2, "0")}</span>{question}</button><p>{answer}</p></article>)}</div></section></section></>;
}

function GuideTopicDetail({ id, go }) {
  const topic = guideCategories.find((item) => item.id === id) || guideCategories[0];
  return <><section className="guide-detail-hero"><img src="/images/hero-aurora.png" alt={topic.title} /><div className="detail-hero__veil" /><div><p className="kicker"><span /> 摩尔曼斯克旅行攻略 · {topic.label}</p><h1>{topic.title}</h1><p>{topic.intro}</p></div></section><section className="guide-article wrap"><main>{topic.sections.map(([heading, points], index) => <section key={heading}><span>0{index + 1}</span><div><h2>{heading}</h2>{points.map((point) => <p key={point}>{point}</p>)}</div></section>)}</main><aside><ShieldCheck /><h3>需要具体行程？</h3><p>如果已经确定出发月份、人数或同行人情况，可以提交需求，由中文顾问协助沟通，并由合作的俄罗斯持牌旅行社确认具体接待安排。</p><button className="button button--dark" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></aside></section><section className="guide-more wrap"><button className="text-button text-button--dark" onClick={() => go("/guides")}><ArrowLeft /> 返回旅行攻略</button></section></>;
}

function GuideDetail({ id, go }) {
  const guide = guides.find((item) => item.id === id) || guides[0];
  return <><section className="guide-detail-hero"><img src={guide.image} alt={guide.title} /><div className="detail-hero__veil" /><div><p className="kicker"><span /> 北境实用指南 · {guide.read}</p><h1>{guide.title}</h1><p>{guide.intro}</p></div></section><section className="guide-article wrap"><main>{guide.sections.map(([heading, points], index) => <section key={heading}><span>0{index + 1}</span><div><h2>{heading}</h2>{points.map((point) => <p key={point}>{point}</p>)}</div></section>)}</main><aside><ShieldCheck /><h3>请以当地安排为准</h3><p>北境天气、道路和活动开放情况变化较快。具体行程由合作的俄罗斯持牌旅行社确认，旅途中提供群内中文服务。</p><button className="button button--dark" onClick={() => go("/custom")}>获取行程方案 <ArrowRight /></button></aside></section><section className="guide-more wrap"><button className="text-button text-button--dark" onClick={() => go("/guides")}><ArrowLeft /> 返回全部指南</button></section></>;
}

function AboutPage({ go }) {
  return <><PageHero kicker="关于 Aurora Hunter" title="连接中国游客与俄罗斯北境" text="我们专注于摩尔曼斯克极光旅游信息咨询、中文沟通与行前内容；实际旅游服务由合作的俄罗斯持牌旅行社提供。" /><section className="about-grid wrap"><div><p className="kicker kicker--dark"><span /> 我们做什么</p><h2>把陌生的北境，讲得清楚一些。</h2><p>Aurora Hunter 了解中国游客在语言、装备、饮食和信息确认方面的真实需求。我们帮助梳理旅行方向、解释当地情况，并在旅途中提供群内中文服务。</p></div><div className="stats"><div><b>69°N</b><span>北极圈目的地</span></div><div><b>四季</b><span>风景与线路信息</span></div><div><b>中文</b><span>群内沟通服务</span></div><div><b>当地</b><span>持牌旅行社接待</span></div></div></section><section className="why-section wrap"><div><p className="kicker kicker--dark"><span /> 为什么选择 Aurora Hunter</p><h2>懂中文游客，也尊重当地执行。</h2></div><div className="why-grid"><article><b>01</b><h3>信息更清楚</h3><p>把摩尔曼斯克极光、北冰洋海岸、萨米文化、装备和天气风险讲清楚，减少出发前的信息差。</p></article><article><b>02</b><h3>服务边界清晰</h3><p>Aurora Hunter 提供咨询与群内中文服务，具体旅游产品、合同、收款和接待由合作的俄罗斯持牌旅行社负责。</p></article><article><b>03</b><h3>面向中国游客</h3><p>更关注中文沟通、饮食习惯、亲子出行、现金支付、签证和装备准备等中国游客常见问题。</p></article><article><b>04</b><h3>价格更加优惠</h3><p>我们与俄罗斯当地旅行社直接合作，减少中间沟通环节，让方案更透明、价格更友好；由当地人带领，也更能感受摩尔曼斯克真实的异国风情。</p></article></div></section><section className="story-section story-section--about"><div className="story-section__image"><img src="/images/husky-sled.png" alt="摩尔曼斯克雪原体验" /></div><div className="story-section__copy"><p className="kicker"><span /> 角色清晰，旅程更安心</p><h2>咨询在中国，<br />接待在俄罗斯。</h2><p>Aurora Hunter 提供俄罗斯北极圈旅行信息咨询服务。具体旅游产品、合同签署、收款及接待服务由合作的俄罗斯持牌旅行社提供。</p><button className="button button--light" onClick={() => go("/guide/service-process")}>了解服务流程 <ArrowRight /></button></div></section></>;
}

function WechatPanel({ onClose }) { return <div className="wechat-panel"><button onClick={onClose}><X /></button><img className="wechat-panel__qr" src="/images/wechat-qr.jpg" alt="Aurora Hunter 微信二维码" /><h3>添加中文顾问</h3><p>sweety · 俄罗斯圣彼得堡</p><b>电话：157 5465 1899</b><small>扫码添加微信，获取行程方案与北境出行信息</small></div>; }

const seoPages = {
  "/": ["摩尔曼斯克极光旅游攻略 | Aurora Hunter极光猎人", "Aurora Hunter极光猎人面向中国游客提供摩尔曼斯克极光旅游、俄罗斯极光、北极光旅游、追极光行程信息与群内中文服务。"],
  "/guides": ["摩尔曼斯克极光攻略_俄罗斯极光旅游指南 | Aurora Hunter极光猎人", "摩尔曼斯克极光最佳时间、极光概率、追光团、当地团、包车、接机、装备、摄影、亲子和俄罗斯签证攻略。"],
  "/experiences": ["摩尔曼斯克北境风景与北极美食 | Aurora Hunter极光猎人", "了解摩尔曼斯克极光、萨米民族村、捷里别尔卡、列宁号破冰船、阿廖沙纪念碑、北极美食与餐厅推荐。"],
  "/food": ["摩尔曼斯克美食指南_帝王蟹与北极餐厅推荐 | Aurora Hunter极光猎人", "第一次来摩尔曼斯克北极圈必吃帝王蟹、北极扇贝、海胆、鳕鱼、驯鹿肉、北极浆果与当地餐厅定位。"],
  "/about": ["关于Aurora Hunter极光猎人_摩尔曼斯克极光中文服务", "Aurora Hunter极光猎人提供摩尔曼斯克极光旅游信息咨询与群内中文服务，接待由合作俄罗斯持牌旅行社执行。"],
  "/custom": ["获取摩尔曼斯克极光行程方案 | Aurora Hunter极光猎人", "提交摩尔曼斯克极光旅游咨询需求，了解俄罗斯极光、北极光旅游、追光团和当地旅行社接待安排。"],
};

export function App() {
  const [path, go] = useRoute();
  const [wechat, setWechat] = useState(false);
  useEffect(() => {
    const [title, description] = seoPages[path] || (path.startsWith("/guide/") || path.startsWith("/guide-topic/") ? ["摩尔曼斯克极光旅行攻略 | Aurora Hunter极光猎人", "阅读摩尔曼斯克极光旅游、俄罗斯极光、北极圈旅行、装备、摄影、亲子与服务流程相关攻略。"] : seoPages["/"]);
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [path]);
  const content = useMemo(() => {
    if (path === "/") return <HomePage go={go} />;
    if (path === "/tours") return <ToursPage go={go} />;
    if (path === "/experiences") return <ToursPage go={go} mode="experience" />;
    if (path === "/food") return <FoodPage go={go} />;
    if (path.startsWith("/tour/")) return <HomePage go={go} />;
    if (path === "/custom" || path === "/booking" || path === "/orders" || path.startsWith("/admin")) return <CustomPage go={go} />;
    if (path === "/guides") return <GuidesPage go={go} />;
    if (path.startsWith("/guide-topic/")) return <GuideTopicDetail id={path.split("/")[2]} go={go} />;
    if (path.startsWith("/guide/")) return <GuideDetail id={path.split("/")[2]} go={go} />;
    if (path === "/about") return <AboutPage go={go} />;
    return <HomePage go={go} />;
  }, [path]);
  return <div className="site-shell"><Header go={go} onWechat={() => setWechat(true)} /><main>{content}</main><Footer go={go} onWechat={() => setWechat(true)} /><button className="floating-wechat" onClick={() => setWechat(true)} aria-label="打开微信咨询"><WechatLogo weight="fill" /></button>{wechat && <WechatPanel onClose={() => setWechat(false)} />}</div>;
}
