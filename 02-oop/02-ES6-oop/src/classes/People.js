class People { //声明一个类

  // 成员属性,一般定义在构造函数上

  constructor(name, height, weight) {  //类的构造函数
    this.name = name
    this.height = height
    this.weight = weight
  }

  // 成员方法

  intro() {
    console.log(this.tpl())
  }

  eat() {
    console.log('我正在吃东西')
  }
  sleep() {
    console.log('我正在睡觉')

  }
  drink() {
    console.log('我正在喝水')
  }
  tpl() {
    return `我叫 ${this.name}, 身高 ${this.height} cm, 体重 ${this.weight} kg`
  }

}

// 导出列表
export { People }