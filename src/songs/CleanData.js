


 function convert(str) {
    const timeSplit = str.split(':')
    let minutes = 0
    let seconds = 0
    if(timeSplit.length > 1) {
      minutes = parseInt(timeSplit[0], 10)
      seconds = parseInt(timeSplit[1], 10)
    }else{
      seconds = parseInt(timeSplit[0], 10)
    }
    return minutes*60 + seconds
  }

  function convertItem(item) {
    return { ...item, seconds: convert(item.playAt)}
  }

  function convertList(list) {
    list = list.map((item) => {
      return convertItem(item)
    })
    return list
  }

export default convertList