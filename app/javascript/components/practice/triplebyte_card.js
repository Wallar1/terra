
import React from 'react'

const Card = (props) => {
  function left_arrow(){
    return this.props.colIndex !== 0 
  }
  function right_arrow(){
    return this.props.colIndex !== 0 
  }

  function moveLeft(){
    props.moveX({
      columnIndex: props.colIndex,
      cardIndex: props.cardIndex,
      direction: -1
    })
  }
  function moveRight(){
    props.moveX({
      columnIndex: props.colIndex,
      cardIndex: props.cardIndex,
      direction: 1
    })
  }

  function leftArrow(){
    if(props.colIndex !== 0){
      return <p onClick={moveLeft} className='mx-5'>{la}</p>
    }
    return <p className='mx-5'></p>
  }

  function rightArrow(){
    if(props.colIndex !== 3){
      return <p onClick={moveRight} className='mx-5'>{ra}</p>
    }
    return <p className='mx-5'></p>
  }

  const la = '<'
  const ra = '>'
  return (
    <div className='d-flex flex-row shadow rounded pt-3'>
      {leftArrow()}
      <p>
        {props.text.text}
      </p>
      {rightArrow()}
    </div>
  )
}

export default Card