let myArry = [
    {name:"tanzil", date:"7-25-20"},
    {name:"ab", date:"7-25-20"},
    {name:"cd", date:"7-25-20"},
    {name:"ef", date:"7-25-20"},
    {name:"gh", date:"7-25-40"},
    {name:"ig", date:"7-25-40"},
    {name:"kl", date:"7-25-30"},
    {name:"mn", date:"7-25-50"},
    {name:"op", date:"7-25-30"},
    {name:"qr", date:"7-25-10"},
    {name:"st", date:"7-25-10"},
]

let dateCounts = myArry.reduce((counts, item) => {
    if (!counts[item.date]) {
      counts[item.date] = { date: item.date, count: 1 };
    } else {
      counts[item.date].count++;
    }
    return counts;
  }, {});
  
 
  let uniqueDates = Object.keys(dateCounts);
  console.log(uniqueDates.length);