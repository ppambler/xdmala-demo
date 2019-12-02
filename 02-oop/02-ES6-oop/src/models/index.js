import { HTTP } from '../utils/http'

// index页面需要用到的数据
class IndexModel extends HTTP {
  getGoodsList() {
    return new Promise((resolve, reject) => {
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