function formatDatas(obj) {
  var str = '';
  for (var key in obj) {
    str += key + '=' + obj[key] + '&';
  }
  return str.replace(/&$/, '');
}

function randomNum() {
  var num = '';
  for (var i = 0; i < 20; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

const tools = { formatDatas, randomNum }
export default tools