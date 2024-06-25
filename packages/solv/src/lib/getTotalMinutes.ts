const getTotalMinutes = (estimatedTimeUntilNextEpoch: string) => {
  const pattern = /(\d+)(d|h|m)/g
  let match
  let days = 0,
    hours = 0,
    minutes = 0

  // Search for the pattern in the string
  while ((match = pattern.exec(estimatedTimeUntilNextEpoch)) !== null) {
    const value = Number(match[1])
    const unit = match[2]

    if (unit === 'd') {
      days = value
    } else if (unit === 'h') {
      hours = value
    } else if (unit === 'm') {
      minutes = value
    }
  }
  console.log({ days, hours, minutes })

  // Calculate the total minutes
  let totalMinutes = days * 24 * 60 + hours * 60 + minutes

  // Ensure totalMinutes is not -0
  if (Object.is(totalMinutes, -0)) {
    totalMinutes = 0
  }

  return totalMinutes
}

export default getTotalMinutes
