function globalCheck(s) {
  if(!s) {
    return false;
  }
  var globalTrue = false;
  if(s.indexOf('153;#')!== -1) {
    globalTrue = true;
  }

  return globalTrue;
}
