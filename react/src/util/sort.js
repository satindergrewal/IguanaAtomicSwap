export function sortByDate(data) {
  return data.sort(function(a, b){
    return new Date(b.blocktime || b.timestamp) - new Date(a.blocktime || a.timestamp);
  });
}