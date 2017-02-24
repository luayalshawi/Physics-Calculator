module.exports = function(d,e) {
  var result;

  if(e< 0)
  {
    result = (1/d);
  }else {
    result = d;
  }

  for(var i = 0; i < e;i++)
  {
    result *= d;
  }
  return result;
}
