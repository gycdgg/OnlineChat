const randomChar = (l) =>  {
  let x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let tmp = ''
  let timestamp = new Date().getTime()
  for(let  i = 0;i <  l;i++)  {
    tmp  +=  x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return  timestamp + tmp
}

export {
  randomChar
}