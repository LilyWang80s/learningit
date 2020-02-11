let optionNum = [2, 4];
let startNum1 = optionNum[Math.round(Math.random())];
let startNum2 = optionNum[Math.round(Math.random())];
let digits = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0
];
let totalScore = 0;
let updateDigits = [];
const backgroundColor = {
  2:"#eee4da",
  4:" #eee1c9",
  8:"#f3b27a",
  16:"#f69664",
  32:"#f77c5f",
  64:"#f75f3b",
  128:"#edd073",
  256:"#edcc62",
  512:"#edc950",
  1024:"#edc53f",
  2048:"#edc22e"
};
const digitsLength = digits.length;
let optArray = [];
const gameAreaLength = 365;
const squareLength = 80;
const gap = 9;

document.getElementById("highestScore").innerHTML = localStorage.getItem('highestScore') || 0;
let startLocation = Math.round(Math.random()*(digitsLength-1));
digits[startLocation] = startNum1;
const optLocation = (value, index) => {
  if (value === 0) {
    optArray.push(index);
  }
}
const randomfunc= (useArray) => {
  useArray.forEach(optLocation);
  let optNum = optArray.length - 1;
  let randomLoc = optArray[Math.round(Math.random()*optNum)];
  useArray[randomLoc] = optionNum[Math.round(Math.random())];
  optArray = [];
}


randomfunc(digits);






const createElement = (value, index) => {
  if(value !== 0) {
    let element = document.createElement("div");
    let base = (index+1)/4;
    let rowNum = Math.ceil(base);
    let columnNum = (index) % 4 + 1;
    let leftGap = gap*columnNum+(columnNum-1)*squareLength;
    let topGap = gap*rowNum+(rowNum-1)*squareLength;
    element.innerHTML = value;
    element.style.left = leftGap + 'px';
    element.style.top = topGap + 'px';
    document.getElementById("squareParent").appendChild(element);
    element.style.backgroundColor = backgroundColor[value];
    if(value === 2 || value === 4) {
      element.style.color = "black";
    } else {
      element.style.color = "white";
    }
    if(value >= 1024) {
      element.style.fontSize = '32px';
    } else if (value >= 16384) {

      element.style.fontSize = '26px';
    }
  }
}
digits.forEach(createElement);


// const downElement = (index, rowNum, columnNum, changeFlag) => {
//   // debugger;
//   if(rowNum < 4 && digits[index] !== 0) {
//     for(let i=4; i>rowNum; i--) {
//       // if(digits[4*i-(4-columnNum)-5] !== 0 && rowNum !== i - 1) {
//       //   break;
//       // }
//       if(digits[4*i-(4-columnNum)-1] === 0) {
//         digits[4*i-(4-columnNum)-1] = digits[index];
//         digits[index] = 0;
//         changeFlag[index] = 1;
//         break;
//       } else if (digits[4*i-(4-columnNum)-5] !== 0 && rowNum !== i - 1) {
//           continue;
//       }
//         else if(digits[4*i-(4-columnNum)-1] === digits[index]) {
//         if(changeFlag[index] === 0) {
//           digits[4*i-(4-columnNum)-1] = digits[index]*2;
//           digits[index] = 0;
//           changeFlag[index] = 1;
//           break;
//         }
//       }
//     }

//   }
  
// }
const movePara = {
  left: (i, j) => i * 4 + j,
  right: (i, j) => 4 * i + 3 - j,
  up: (i, j) => i + j * 4, 
  down: (i, j) => i + 12 - j * 4
}
const moveElement = (moveDirection) => {
  let newDigits = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
  ];
  let scoreNum = 0;
  for(let i = 0; i < 4; i++) {
    const seperateArray = [];

    for(let j = 0; j < 4; j++) {
      let changeFlag = 0;
      const pos = movePara[moveDirection](i, j);
      if(digits[pos] !== 0) {
        if(digits[pos] === seperateArray[seperateArray.length-1] && changeFlag === 0) {
          seperateArray[seperateArray.length-1] = 2 * digits[pos];
          scoreNum += 2 * digits[pos];
          console.log(scoreNum);
          changeFlag = 1;
        } else {
            seperateArray.push(digits[pos]);
        }
      }
    }
    // const length = seperateArray[i].length;
    // if(length < 4) {
    //   for(let k = length; k < 4; k++) {
    //     seperateArray[i].push(0);
    //   }
    // }
    for(let j = 0; j < seperateArray.length; j++) {
      const pos = movePara[moveDirection](i, j);
      newDigits[pos] = seperateArray[j];
    }
    // newDigits = newDigits.concat(seperateArray[i]);
  }
  return {
    score: scoreNum,
    array: newDigits
  };
}
// const leftElement = () => {

//   let newDigits = [];
//   const seperateArray = [[], [], [], []];
//   for(let i = 0; i < 4; i++) {
//     for(let j = i * 4; j < i * 4 + 4; j++) {
//       let changeFlag = 0;
//       if(digits[j] !== 0) {
//         if(digits[j] === seperateArray[i][seperateArray[i].length-1] && changeFlag === 0) {
//           seperateArray[i][seperateArray[i].length-1] = 2 * digits[j];
//           changeFlag = 1;
//         } else {
//             seperateArray[i].push(digits[j]);
//         }
//       }
//     }
//     const length = seperateArray[i].length;
//     if(length < 4) {
//       for(let k = length; k < 4; k++) {
//         seperateArray[i].push(0);
//       }
//     }
//     newDigits = newDigits.concat(seperateArray[i]);
//   }
//   return newDigits;
// }

document.onkeyup = function(event) {
  let e = event || window.event || arguments.callee.caller.arguments[0];
  let scoreToAdd = 0;
  let direction;
  if(e && e.keyCode==40){ //下
    // const changeFlag = [
    //   0, 0, 0, 0,
    //   0, 0, 0, 0,
    //   0, 0, 0, 0,
    //   0, 0, 0, 0
    // ];
    // for(index = digitsLength-1; index>=0; index--) {
    //   let base = (index+1)/4;
    //   let rowNum = Math.ceil(base);
    //   let columnNum = (index) % 4 + 1;
    //   downElement(index, rowNum, columnNum, changeFlag);
    // }
    // if(changeFlag.indexOf(1) >= 0) {
    //   randomfunc(digits);
    // }
    // digits.forEach(createElement);
    direction = 'down';
  }
    
  if(e && e.keyCode==37){ //左
    // updateDigits = [...leftElement()];
    // if(updateDigits.toString() !== digits.toString()) {
    //   randomfunc(updateDigits);
    // }
    // updateDigits.forEach(createElement);
    // digits = [...updateDigits]; 
    direction = 'left';
  }
  if(e && e.keyCode==39){ //右
    direction = 'right';
  }

  if(e && e.keyCode==38){ // 上
    direction = 'up';
  }

  if (direction) {
    document.getElementById('squareParent').innerHTML = '';
    const obj = moveElement(direction);
    updateDigits = obj.array;
    scoreToAdd = obj.score;
  
    if(updateDigits.toString() !== digits.toString()) {
      randomfunc(updateDigits);
    }
    updateDigits.forEach(createElement);
    digits = [...updateDigits];
    totalScore += scoreToAdd;
    document.getElementById("currentScore").innerHTML = totalScore;

    let highestScore = localStorage.getItem('highestScore') || 0;
    if (highestScore < totalScore) {
      highestScore = totalScore;
      localStorage.setItem('highestScore', highestScore);
    }
    document.getElementById("highestScore").innerHTML = highestScore;

    if(updateDigits.indexOf(0) === -1) {
      let isDead = true;
      console.log('hahah', updateDigits);
      for(let i = 0; i < 16; i++) {
        const digit = updateDigits[i]
        if (
          digit === updateDigits[i + 1]
          || digit === updateDigits[i + 4]
          || digit === updateDigits[i - 1]
          || digit === updateDigits[i - 4]
        ) {
          isDead = false;
          break;
        }
      }
      if(isDead) {
        console.log('dead');
        setTimeout(() => {
          window.alert("请点击新游戏重新开始");
        }, 0);
      }
    }
  }
}
document.getElementById('newGame').addEventListener('click', () => {
  location.reload();
});





