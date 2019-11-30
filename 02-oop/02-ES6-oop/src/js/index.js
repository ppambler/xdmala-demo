import { People } from '../classes/People.js'
import { Tab } from '../classes/Tab.js'
import '../css/tab.css'

var xiaoming = new People('小明', 180, 130)
var xiaohong = new People('小红', 160, 40)

xiaoming.intro()
xiaoming.drink()

xiaohong.intro()
xiaohong.eat()

console.log(xiaoming)

new Tab('slide')