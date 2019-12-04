import { HTTP } from '../utils/http'

console.log(HTTP)
// index页面需要用到的数据
class IndexModel extends HTTP {
  getGoodsList() {
    return new Promise((resolve, reject) => {
      console.log(this)
      console.log(this['Symbol(doAjax)'])
      console.log(this['xxx'])
      console.log(this.Symbol(doAjax))
      this.ajax({
        url: 'smzdm/tushuyinxiang',
        type: 'GET',
        dataType: 'JSON',
        success(data) {
          resolve(data)
        }
      })
    })
  }
}

export { IndexModel }