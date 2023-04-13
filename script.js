'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//replacing element with splice from the internet gotten
const month = ['jan', 'feb', 'mar','apr','june'];
month.splice(4,  'may', 'july' ,'aug' );

console.log(month);

const displayMovements = function(movements, sort = false){
  containerMovements.innerHTML = '';

const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

  movs.forEach(function(mov, i){  

    const type = mov > 0? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
   `;

    containerMovements.insertAdjacentHTML('afterbegin',html);

  });
}

// displayMovements(account1.movements);

const calcPrintBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;

};

// calcPrintBalance(account1.movements);

const calcDisplaySummary = acc => {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent =  `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100)
  .filter((int, i, arr) => { console.log(arr); return int >= 1;})
  .reduce((acc,int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`
}

// calcDisplaySummary(account1.movements);




const dogDataKate = [4, 1, 15, 8, 3];
const dogDataJulia = [3, 5, 2, 12, 7];
console.log(dogDataJulia.splice(0, 1));
console.log(dogDataJulia.splice(-2));

console.log(dogDataJulia);

const joined = dogDataKate.concat(dogDataJulia);

// console.log(dogDataJulia.slice(1, 3));

joined.forEach(function(value, index){

  const growth = value > 3? 'an Adult' : 'still a puppy';

  console.log(`Dog number ${index + 1} is ${growth}`);
})


const checkDog = function(value, index){

  const growth = value > 3? 'an Adult' : 'still a puppy';

  console.log(`Dog number ${index + 1} is ${growth}`);
};


dogDataJulia.forEach(checkDog);

const dogChecking = function(array1, array2){
  array1.forEach(checkDog);
  array2.forEach(checkDog);
}

console.log(`-----function-----\n`);
dogChecking(dogDataJulia, dogDataKate);



const createUsernames = function(accs){

  accs.forEach(function(acc){
    acc.userName = acc.owner.toLowerCase().split(' ').map((name) =>
    name[0]
  ).join('')
  });



}
createUsernames(accounts);

const updateUI = function(acc){
   //display movements
   displayMovements(acc.movements);

   //display balance
   calcPrintBalance(acc);
 
   //display summary
   calcDisplaySummary(acc);
}
console.log(accounts);

//event handler
let currentAccount ;


btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display UI message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  }

  containerApp.style.opacity = 100;

  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';

  inputLoginPin.blur();

  //update UI
 updateUI(currentAccount);

})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);

inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiverAcc && currentAccount.balance >= amount  && receiverAcc?.userName !== currentAccount.userName){
    console.log('Transfer Valid');
  }

  //doing the transfer
  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);

   //update UI
 updateUI(currentAccount);
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    //add movements

    currentAccount.movements.push(amount);
    //update ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e){
  e.preventDefault();
  console.log('delete');

  

  if(
    inputCloseUsername.value === currentAccount.userName 
    && Number(inputClosePin.value) === currentAccount.pin
  ){

    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName);

      //delete acct
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

});

let sorted = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // console.log('sorted');
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*

const eurToUsd =  1.1;

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const movementsUSD = movements.map(function(mov){
//   return mov * eurToUsd;
// })
const movementsUSD = movements.map(mov =>
   mov * eurToUsd
);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];

for (const mov of movements){
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

// movements.map(function(mov, i , arr){});
//map method

const movementsDescriptions = movements.map((mov, i, arr) => 

  `Transaction ${i + 1} you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
)

console.log(movementsDescriptions);
/////////////////////////////////////////////////
//filter method
const deposits = movements.filter(function(mov){
  return (mov > 0);
});

console.log(movements);
console.log(deposits);

const depositFor = [];
for (const values of movements) if(values > 0) depositFor.push(values);
console.log(depositFor);

const withdrawals = movements.filter(function(value){
  return (value < 0);
})

// const withdrawal = movements.filter(value => (value < 0));
console.log(withdrawals);
// console.log(withdrawal);

//reduce() array method
// const balance = movements.reduce(function(acc, cur, i, arr){
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc,cur,i) => {console.log(`iteration ${i}: ${cur}`); acc + cur;}, 0);

// console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const max = movements.reduce((acc,  mov) => {
  if(acc > mov)return acc;
  else return mov;
}, movements[0]);

console.log(max);

*/
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-3));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice(0, -3));
//splice

// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

//reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['l', 'e', 'a','r','s', 'i'];
console.log(arr2.reverse());

//concat
const letters = arr.reverse().concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]);
//join

console.log(letters.join('-'));
//getting last element

const array = [23, 14, 65];
console.log(array.length[array.length - 1]);
console.log(array.slice(-1));
console.log(array.slice(-1)[0])
*/

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements){
  for (const [i, movement]  of movements.entries()){
  if(movement > 0){
    console.log(`Transaction ${i + 1} you deposited ${movement}`);
  }
  else{
    console.log(`Transaction ${i + 1} you withdrew ${Math.abs(movement)}`);
  }
}

console.log('-----using callback defined in the forEach------')

movements.forEach(function(x){
  if(x > 0){
    console.log(`you deposited ${x}`);
  }else{
    console.log(`you withdrew ${Math.abs(x)}`);
  }
})

console.log('----using externally defined function in the call back-----')

movements.forEach(transaction);

function transaction(x, i, arr){
  if(x > 0){
    console.log(`Transaction ${i + 1} you deposited ${x}`);
  }
  else{
    console.log(`Transaction ${i + 1} you withdrew ${Math.abs(x)}`);
  }

}*/

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

const currenciesUnique = new Set(['USD','GBP', 'USD','EUR','EUR']);

currenciesUnique.forEach(function(value, _, set){
  console.log(`${_}: ${value}`)
})
*/
/*
let humanAge = [];
let mapArr,filterArr, reduceArr;

const ageConversion = inputArray => {
  mapArr = inputArray.map((value, index, array) => {
    if(value <= 2) return(humanAge[index] = 2 * value);
    else if( value > 2)return (humanAge[index] = 16 + (value * 4));
    
    // return humanAge;
  });
  // console.log(inputArray);

 filterArr =  humanAge.filter((value, index, arr) => {
      if(value >= 18) return value;
  });

  console.log(`filtered value ${humanAge}`);

  reduceArr = humanAge.reduce(((acc, value, index, arr) => {
  
  acc += value;
   

    // return acc;
},0));
  console.log(mapArr);
  console.log(filterArr);
  console.log(reduceArr);

}

ageConversion([5, 2, 3, 1, 15, 8 ,3]);
*/

const arrayVal = [5,2,4,1,15,8, 3];
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc,mov) => acc+ mov,0);
console.log(totalDepositsUSD);

// const calcHumanAge = arrayTestData => {
//   let x = 0;
//   arrayTestData.reduce((acc, value, index, array) => {
//     // acc += value;
//     // acc /= arrayTestData.length;
//     // x = acc;
//     return acc += value;
//   }, 0);
//   // console.log(x);

// }

const calcHumanAverage2 = function(ages){
  const humanAges = ages.map(age => (age <= 2 ? 2 * age: 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  const average = adults.reduce((acc, age, i , arr) => acc + age/ arr.length , 0);

  return average;
};

const calcAvergeHumanAge = ages => ages
.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
.filter(age => age >= 18)
.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAvergeHumanAge([5, 2 ,4,1, 15, 8, 3]);
const avg2 = calcAvergeHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

//FIND METHOD
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const accountTest = accounts.find(function(acc) {
  return(acc.owner === 'Jessica Davis')
});

console.log(accountTest);

for( const x of accounts){
  if(x.owner === 'Jessica Davis') console.log(x);
}

// calcHumanAge(arrayVal);
console.log(movements);
console.log(movements.includes(-130))

console.log(movements.some(
  (mov, i, arr) => {
    mov === 1500;
    console.log(i, arr);
  }));
const anyDeposit = movements.some(mov => mov === -130);

//every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
console.log(movements.every(deposit));

const arr = [[1,2,3],[4,5,6], 7,8];

const arrDeep = [[[1,2,3],22,11], 4,5,6, [[2,9], 7], 8];
console.log(arr.flat());
console.log(arrDeep.flat());

//using the flat method
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);


const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//using the flatmap ethod
const overalBalance2 = accounts.map(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//sorting

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//number sorting
// < 0 a, b
// > 0 b,a
//if less than 0 , a , b
//if greater than 0, b,a 
console.log(movements);

//ascending
console.log(movements.sort((a, b) => {
  if (a > b)return 1; //switch order
  if( a < b)return -1;// keep order
}));

//descending
console.log(movements.sort((a, b) => {
  if (a > b)return -1; //switch order
  if( a < b)return 1;// keep order
}));

const arr2 = [ 11,2 ,3,4,5,6,7];
console.log([1,2,3,4,5,6,7]);
console.log(new Array(1,2,3,4,5,6,7));

const x = new Array(7);
console.log(x);

x.fill(5);
x.fill(1, 4, 6);
console.log(x);

arr2.fill(23, 2,6);
console.log(arr2);

const y = Array.from({length: 7}, () => 5);
console.log(y);

y.fill(2, 3, 5);
console.log(y);


const z = Array.from({length: 7}, (cur, i) => i + 1);
console.log(z);

// const movementUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementUI);

labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'),el => Number(el.textContent.replace('€', '') ));
  
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movement__value')];
});



//array method practice
//1
const bankDepositSum = accounts
.flatMap(acc => acc.movements)
.filter(mov => mov > 0)
.reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

//2
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
.flatMap(acc => acc.movements)
.reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

console.log(numDeposits1000);

let a = 10;
console.log(++a);
// console.log(a);

//3
const sums = accounts
.flatMap(acc => acc.movements).reduce((sums, cur) => {
  cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  return sums;
}, {deposits: 0, withdrawals: 0});

console.log(sums);


const {deposits, withdrawals} = accounts
.flatMap(acc => acc.movements).reduce((sums, cur) => {
  // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
  return sums;
}, {deposits : 0, withdrawals : 0});

console.log(sums);
console.log(accounts.map((acc) => acc));


const conversion = (text) => {
  const firstStage = text.toLowerCase().split(' ')
  .map((element, i, arr) =>
    // if(element.length > 0)
    // element.replace(element[0], element[0].toUpperCase());
   (element.length > 1 ) ? console.log(element[0].toUpperCase() + element.slice(1))  : console.log(element) 
  
  
).join(' ');
  //  const secStage = firstStage.join(' ');

  // console.log(firstStage);

  // firstStage.reduce((sum, curr) => {
  //   // curr[sum]((curr.length >1) ?'.toUpperCase()' : '.toLowerCase()');
  //   if(curr.length > sum){
  //     // curr.map((current, index, arr) =>{

  //     //   current[sum].toUpperCase();
  //     // })

  //     for(const c of curr)
  //     curr[0].toUpperCase();
  //   }
  // }, 0);
// let transform
//   firstStage.map((element, i, arr)=>{
//     if(element.length > 0)
//     // element.replace(element[0], element[0].toUpperCase());
//    element.charAt(0).toUpperCase();


//   })
// console.log('why?/')
  console.log(firstStage);
};

conversion('this is a test to try');


//solution
const convertTitleCase = function(title){

  const capitalise = str => str[0].toUpperCase() + str.slice(1);
const exception = ['a', 'an', 'the', 'but', 'or', 'and', 'on', 'in', 'with'];

const titleCase = title
.toLowerCase()
.split(' ') //['this','is','a','nice','title']
.map(word => 
  (exception.includes(word)) ? (word) : capitalise(word))
  .join(' ');

return capitalise(titleCase);
}
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAmPLe'));

// let ownersEatTooMuch, 
let ownersEatTooLittle = []
let ownersEatTooMuch = new Array();
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

let check;

//1
dogs.forEach((mov, i, arr) => {
  mov.recommendedFood = Math.trunc(mov.weight ** 0.75 * 28);

  //2
  /*
  check = mov.owners.includes('Sarah');
  if((check ) &&
    (mov.curFood > mov.recommendedFood)){
      console.log('sarah dog eats too much');
  }
  else {
    console.log('sarah dog eating too little ');
  }
*/
  
})

const sarahDogs = dogs.find((mov, i, arr) => {
  check = mov.owners.includes('Sarah');
 if(check ) {
    if(mov.curFood > mov.recommendedFood )
    console.log(`sarah dog eat much`);
    else 
    console.log(`sarah dog eat too little`);

 }


return check ;
})

console.log(sarahDogs);

//3
const dogMuch = dogs.flatMap((element, i , arr) => {
 if( element.curFood > element.recommendedFood)
 return element.owners;

})

const dogLittle = dogs.flatMap((element, i , arr) => {
 if( element.curFood < element.recommendedFood)
 return element.owners;
})


ownersEatTooLittle = dogLittle;
ownersEatTooMuch = dogMuch;


const littleArray = (ownersEatTooLittle.slice(0, 2).concat(ownersEatTooLittle.slice(4)));
const muchArray = (ownersEatTooMuch.slice(1, 4));
//4
console.log('\n solution 4');
console.log(littleArray.join(' and ') + ' dogs eat too much');
console.log(muchArray.join(' and ') + ' dogs eat too little');

//5
console.log('\n solution 5');
const exactAmount = dogs.some((element, i , arr) => {
  return (element.curFood === element.recommendedFood)
});

console.log(exactAmount);

//6
//dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

const okayAmount = dogs.some((element, i , arr) => {
  return((element.curFood === (element.recommendedFood + (0.1 * element.recommendedFood))) ||
  (element.curFood === (element.recommendedFood - (0.1 * element.recommendedFood))));


});
console.log(okayAmount);

//7 okay array 
const okayDogsArray = dogs.filter((element, i, arr) => {
  return((element.curFood === (element.recommendedFood + (1.1 * element.recommendedFood))) ||
  (element.curFood === (element.recommendedFood - (0.9 * element.recommendedFood))));
});

const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

  console.log(dogs.filter(checkEatingOkay));

// console.log(okayDogsArray);
//8
const recPortion = dogs.map((element, i , arr) => element.recommendedFood)
.sort((a,b) => {
  if(a.recommendedFood > b.recommendedFood)
  return 1;
  if(a.recommendedFood < b.recommendedfood)
  return -1;
});

console.log(recPortion);

console.log('jonas schmedtmann answers\n');
//1
dogs.forEach((dog => dog.recFood = Math.trunc(dog['weight'] ** 0.75 * 28)));

console.log(dogs);

//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

console.log(`Sarah dog eats too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);

//3
const ownersEatTooLittle2 = dogs.filter(dog => {if(dog.curFood < dog.recFood) return dog.owners}).map(dog => dog.owners).flat();
console.log(ownersEatTooLittle2);

const ownersEatTooMuch2 = dogs.filter( dog => dog.curFood > dog.recFood).map(dog => dog.owners).flat();
console.log(ownersEatTooMuch2);

//4
console.log(`${ownersEatTooMuch2.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle2.join(' and ')}'s dogs eat too Little!`);

//5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6
// const checkEatingOkay = dog => dogcurFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
console.log(dogs.some(checkEatingOkay));

//7
console.log(dogs.filter(checkEatingOkay));
//8
const dogSorted = dogs.slice().sort((a,b) =>a.recFood - b.recFood) ;
console.log(dogSorted);
