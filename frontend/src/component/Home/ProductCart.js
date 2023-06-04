import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from '@material-ui/lab';

import './Home.css'

function ProductCart({ product }) {

const options={
  size:"small",
  value:product.ratings,
  readOnly:true,
  precision:0.5
}
  return (
    <Link className='productCart' to={`/product/${product._id}`}>
      {/* {console.log(product.image[0].url)} */}
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>
        <div>
            <Rating {...options} /> 
            <span className="productCartSpan">({product.numOfReviwes} Reviwes)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default ProductCart
