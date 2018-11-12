
in_search_of_an_easy_problem = async () => {
  let readlineSync = require('readline-sync')

  let n = readlineSync.question('How many people? ');
  let arr = readlineSync.question('What were the responses? ').split(' ')
  let ret = arr.reduce((cum, i)=>{return i + cum}) <= 0 ? 'Easy' : 'Hard'
  console.log(ret)
}

fingerprints = async () => {
  let readlineSync = require('readline-sync')

  let n = readlineSync.question('1. ');
  let seq = readlineSync.question('2. ').split(' ')
  let poss = readlineSync.question('3. ').split(' ')

  ret = seq.filter((num)=>{return poss.indexOf(num) >= 0})
  console.log(ret.join(' '))
}


nearly_lucky = async () => {
  let readlineSync = require('readline-sync')
  let n = readlineSync.question('n: ');
  let len = n.length.toString().split('')

  let lucky = "YES"
  len.forEach((num)=>{
    if(num !== '4' && num !== '7'){lucky = "NO"}
  })
  console.log(lucky)
}


rounding = async () => {
  let readlineSync = require('readline-sync')
  let n = readlineSync.question('n: ');
  n = Number(n)
  console.log(Math.round(n/10)*10)
}

two_gram = async () => {
  let readlineSync = require('readline-sync')
  let str = readlineSync.question('str: ');
  let obj = {}

  for(let i = 0; i< str.length - 1; i++){
    let gram = `${str[i]}${str[i+1]}`
    if(obj[gram]){
      obj[gram] = obj[gram] + 1
    }else{
      obj[gram] = 1
    }
  }

  let keys = Object.keys(obj)
  let maxnum = 0
  let maxgram = ''

  keys.forEach((key)=>{
    if(obj[key] > maxnum){
      maxnum = obj[key]
      maxgram = key
    }
  })
  console.log(maxgram)
}

two_gram()
