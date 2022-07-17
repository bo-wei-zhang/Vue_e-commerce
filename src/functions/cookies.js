function getCookie(cookieName) {
  let name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const allCookies = decodedCookie.split(';')
  for (let i = 0; i < allCookies.length; i++) {
    let cookie = allCookies[i]
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substr(1)
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substr(name.length, cookie.length)
    }
  }
  return ''
}
function setCookie(cookieName, cookieValue, expireDays) {
  console.log('setCookie')
  let date = new Date()
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + date.toUTCString()

  document.cookie = `${cookieName}=${cookieValue};${expires};secure=true;path=/`
  //cookieName + '=' + cookieValue + ';' + expires + ';path=/'
}

// function delCookie(name){
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval != null)
//     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
// }
export { getCookie, setCookie }
