class Tab {
  constructor(mode) {
    // 如果用户传了'xxx',那么默认是就是「fade」
    this.mode = mode == 'fade' || mode == 'slide' ? mode : 'fade'

    this.oPage = $('.J_page')
    this.oTab = $('.J_tab')
    // 只找儿子的所有匹配到的元素
    this.oPageWrap = this.oPage.children('.page-wrap')
    // 儿子、后代也要找
    this.oPageItems = this.oPage.find('.item')
    this.init()
  }

  init() {
    this.setMode()
    this.bindEvent()
  }
  setMode() {
    this.oPageWrap.addClass(this.mode)

  }
  bindEvent() {
    this.oTab.on('click', '.item', $.proxy(this.tabClick, this))

  }
  tabClick() {
    var e = e || window.event,
      tar = e.target || e.srcElement,
      curIdx = $(tar).index()
    if (tar.className === 'item') {
      $(tar).addClass('current').siblings('.item').removeClass('current')
      // 为啥要指定this？——因为我们需要用到Tab的_pageChange方法
      this._pageChange(curIdx)
    }
  }
  _pageChange(index) {
    switch (this.mode) {
      case 'fade':
        this._fadePage(index)
        break;
      case 'slide':
        this._slidePage(index)
        break;
      default:
        this._fadePage(index)
        break
    }

  }
  _fadePage(index) {
    this.oPageItems.eq(index).fadeIn(100).siblings('.item').fadeOut(100)

  }
  _slidePage(index) {
    this.oPageWrap.animate({
      left: (-index * 500) + 'px'
    })
  }
}

export { Tab }