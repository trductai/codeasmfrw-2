import React from 'react'
import { IProduct } from '../../../interface/product'
import StarRating from './starrating'

type Props = {
    product:IProduct
}

const ItemProduct = ({product}:Props) => {
  return (
    <div className='item'>
        <img src={product.image}/>
        <h3>{product.name}</h3>
        <span>{product.price}</span>
        <StarRating score={product.rating}/>
    </div>
  )
}

export default ItemProduct