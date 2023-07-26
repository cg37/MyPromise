var catsUrl = 'https://xieranmaya.github.io/images/cats/cats.json'

class MyPromise {
  constructor(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = undefined
    this.resolvedCallbacks = [] //resolve 回调函数 数组
    this.rejectedCallbacks = [] //reject 回调函数 数组

    let resolve = (result) => {
      this.PromiseState = 'resoved'
      this.PromiseResult = result
      for (let onResolved of this.resolvedCallbacks) {
        onResolved(result)
      }
    }
    let reject = (reason) => {
      this.PromiseState = 'rejected'
      this.PromiseResult = reason

      for (let onRejected of this.rejectedCallbacks) {
        onRejected(reason)
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    if (typeof onResolved === 'function') {
      this.resolvedCallbacks.push(onResolved)
    }

    if (typeof onRejected === 'function') {
      this.rejectedCallbacks.push(onRejected)
    }
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

let p = new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest()
  xhr.open('get', catsUrl)
  xhr.onload = () => {
    resolve(xhr.responseText)
  }
  xhr.onerror = (e) => {
    reject(new Error(String(e)))
  }
  xhr.send()
})

