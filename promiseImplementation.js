//implementation of promise.race

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 500)
})


const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('bar')
  }, 200)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('qux')
  }, 400)
})

const promiseArr = [promise1, promise2, promise3]

const test = async () => {
  const val = await Promise.race(promiseArr)
  console.log(val)
}

test()

//raceReturn.then((val) => console.log(val))

//what if the argument is not an iterable?

//most basic implementation: arr of promises we know will settle

