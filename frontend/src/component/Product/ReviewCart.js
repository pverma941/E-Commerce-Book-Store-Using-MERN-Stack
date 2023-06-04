import React from 'react'
import { Rating } from '@material-ui/lab';

export default function ReviewCart({review}) {
    
    const options={
      size:"large",
      value:review.rating,
      readOnly:true,
      precision:0.5
  }
  return (
    <div className='ReviewCart'>
      <p>{review.name}</p>
      <Rating {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}
