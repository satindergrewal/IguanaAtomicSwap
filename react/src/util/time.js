export function secondsToString(seconds, skipMultiply) {
  var a = new Date(seconds * (skipMultiply ? 1 : 1000)),
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      year = a.getFullYear(),
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds(),
      time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min; // + ':' + sec;

  return time;
}

export function checkTimestamp(dateToCheck) {
  var currentEpochTime = new Date(Date.now()) / 1000,
      secondsElapsed = Number(currentEpochTime) - Number(dateToCheck / 1000);

  return Math.floor(secondsElapsed);
}

export function secondsElapsedToString(timestamp) {
  const secondsElapsed = checkTimestamp(timestamp);

  let secNum = timestamp; // don't forget the second param
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  let returnTimeVal = (hours > 0 ? hours + ' hour(s) ' : '') + (hours > 0 ? minutes + ' minute(s) ' : '') + (seconds > 0 ? seconds + ' second(s) ' : '');
  
  return returnTimeVal;
}