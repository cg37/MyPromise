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
}
