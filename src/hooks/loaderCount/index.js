import { useState, useEffect } from 'react'




class Store {
  state = 0
  setters = []
  add = () => {
    this.state++
    this.setters.forEach(setter => setter(this.state))
  }
  remove = () => {
    this.state--
    this.setters.forEach(setter => setter(this.state))
  }
}

const store = new Store()




const useLoaderCount = () => {
  const [ state, set ] = useState(store.state)

  if (!store.setters.includes(set)) {
    store.setters.push(set)
  }

  useEffect(() => () => {
    store.setters = store.setters.filter(setter => setter !== set)
  }, [])

  return [ state, store.add, store.remove ]
}



export default useLoaderCount
