import React, { createContext, ReactNode, useReducer, useState } from 'react'
import { cartReducer } from '../reducer/cartreducer'
import { ICart } from '../../interface/cart'
import ProductCartSidebar from '../cart/productscart'

type Props = {
    children:ReactNode
}
export const cartContext = createContext({} as any)
const CartContext = ({children}: Props) => {
  const cartInit:ICart = {
    carts:[],
    isOpenSidebar:false
  }
    // const [count,setCount] = useState<number>(1)
    // const [count,dispatch] = useReducer(reducer,0)
    const [cartstate,dispatch] = useReducer(cartReducer,cartInit)
  return (
    <cartContext.Provider value={{cartstate,dispatch}}>
        {children}
        <ProductCartSidebar/>
    </cartContext.Provider>
  )
}
export default CartContext