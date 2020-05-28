
const promiseTimeout = function (ms, promise): Promise<Response> {
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id)
      reject('Timed out in ' + ms + 'ms.')
    }, ms)
  })

  return Promise.race([promise, timeout])
}

export default promiseTimeout