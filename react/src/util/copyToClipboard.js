export function copyToClipboard(value) {
  var result;
  var copyTextarea = document.querySelector('#js-copytextarea');

  document.getElementById('js-copytextarea').value = value;
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    result = 1;
  } catch (err) {
    result = 0;
  }

  return result;
};