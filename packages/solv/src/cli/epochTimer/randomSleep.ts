const randomSleep = async (min: number, max: number) => {
  const sleepTime = Math.floor(Math.random() * (max - min + 1) + min)
  await new Promise((resolve) => setTimeout(resolve, sleepTime * 1000))
  return sleepTime
}

export default randomSleep
