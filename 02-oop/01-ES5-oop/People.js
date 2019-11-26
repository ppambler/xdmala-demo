// 你怎么解释的那就怎么写
function People(name, height, weight) { //构造含糊 = 类 ES6才出现的特性
  // 对象属性，name、height、weight
  this.name = name
  this.height = height
  this.weight = weight
}

// 对象方法

People.prototype.intro = function () {
  console.log('我叫 ' + this.name + ', 身高 ' + this.height + ' cm, 体重 ' + this.weight + ' kg')
}

People.prototype.eat = function () {
  console.log('我正在吃东西')
}

People.prototype.sleep = function () {
  console.log('我正在睡觉')
}

People.prototype.drink = function () {
  console.log('我正在喝水')
}

var xiaoming = new People('小明', 180, 130)
var xiaohong = new People('小红', 160, 40)

xiaoming.intro()
xiaoming.drink()

xiaohong.intro()
xiaohong.eat()