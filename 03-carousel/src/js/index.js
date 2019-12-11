import '../scss/index.scss';
import { Carousel } from './carousel'

$(function () {
  new Carousel(jQuery, {
    dom: '.j-carousel',
    speed: 3000
  })
})