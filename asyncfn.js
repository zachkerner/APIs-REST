const asyncFuncLong = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 6000);
  });
};

const asyncFuncShort = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

//asyncFuncShort.call().then(v => console.log(v))

let fns = [
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
];

let start = Date.now();

const runPromises = (arr, limit) => {
  return new Promise(async (resolve, reject) => {
    let idx = 0
    let count = 0
    while (idx < arr.length) {
      console.log("count: ", count, "idx: ", idx)
      if (count >= limit) {
        await new Promise((resolve, reject) => {
          if (count < 10) {
            resolve("")
          }
        })
      }
      arr[idx].call().then(v => count--)
      count++
      idx++
    }
    resolve()
  })
}

runPromises(fns, 10).then(() => {
  console.log(Date.now() - start);
});

// this should log around 12000



// const runPromises = (arr, limit) => {
//   return new Promise((resolve, reject) => {
//     let count = 0
//     let idx = 0
//     while (idx < arr.length) {
      
//       if (count < 10) {
//         arr[idx].call()
//       .then(v => {
//         count--
//         console.log("count: ", count, "idx: ", idx)
//       })
//       .catch(v => {
//         count--
//         console.log("count: ", count, "idx: ", idx)
//       })
//       } else {
//         setTimeout(() => {

//         }, 1000)
//       }
      
//       console.log("outside count: ", count, "outside idx: ", idx)

//       idx++
//       count++
//     }
//     resolve()
//   })
// }