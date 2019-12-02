import { People } from '../classes/People.js'
import { Tab } from '../classes/Tab.js'
import { Student } from '../classes/Student'
import { IndexModel } from '../models/index'
import '../css/tab.css'

var xiaoming = new People('小明', 180, 130)
var xiaohong = new People('小红', 160, 40)

xiaoming.intro()
xiaoming.drink()

xiaohong.intro()
xiaohong.eat()

console.log(xiaoming)

new Tab('slide')

var xiao = new Student('小老弟', 175, 70, 23, '数学')
xiao.study()
xiao.intro()

console.log(xiao)

const indexModel = new IndexModel()

indexModel.getGoodsList().then((res) => {
  console.log(res)
})