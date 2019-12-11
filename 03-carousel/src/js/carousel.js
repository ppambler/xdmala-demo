class Carousel {
  constructor($, options) {
    this.$dom = $(options.dom)
    // 尽量不要用类名，因为这是一个插件，那么你用其它标签同样也是可以的
    this.oCarItems = this.$dom.find('li')
    this.speed = options.speed
    this.timer = null
    this.curIdx = 0
    this.init()
  }

  init() {
    this.autoPlay()
    this.bindEvent()
  }
  bindEvent() {

  }
  autoPlay() {
    // console.log($) //把全局的$变成Carousel实例的$属性是否会比较好点呢？或者我可以用bind哈！
    this.timer = setInterval($.proxy(this.run, this), this.speed)
    //this.timer = setInterval(this.run.bind(this), this.speed)

  }
  run() {
    // 自动轮播，显然是下一张图片，而不是上一张
    this._setIndex('next')
    this._pageChange(this.curIdx)
  }
  _setIndex(dir) {
    switch (dir) {
      case 'next':
        this.curIdx === (this.oCarItems.length - 1)
          ? this.curIdx = 0
          : this.curIdx++
        break;
      case 'prev':
        this.curIdx === 0
          ? this.curIdx = (this.oCarItems.length - 1)
          : this.curIdx--
        break;
    }
  }

  _pageChange(index) {
    this.oCarItems.eq(index).addClass('active')
      .siblings('li').removeClass('active')
  }
}

export { Carousel } 