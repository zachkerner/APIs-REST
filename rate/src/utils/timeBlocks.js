const start = Date.now()

const oneSec = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("hi"), 1000)
    
  })
  
  console.log(Date.now() - start)
}

oneSec()