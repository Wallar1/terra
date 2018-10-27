
import React from 'react'
import Card from './triplebyte_card'


export default class Column extends React.Component{

  constructor(props){
    super(props)
  }

  handleAddCardClick = () => {
    let userInput = window.prompt('Please enter some text: ')
    this.props.addCard(this.props.index,userInput)
  }

  render(){
    const bg_style = {
      backgroundColor: this.props.color,
      color: 'white',
      textAlign: 'center',
      padding: '0px 15px 0px 15px'
    }

    const colWid = {
      minWidth: '250px'
    }

    return (
      <div className='mx-5' style={colWid}>
        <h3 style={bg_style}> {this.props.name} </h3>
        {this.props.cards.map((text,index) => <Card text={text} key={index} cardIndex={index} colIndex={this.props.index} moveX={this.props.moveX}/>)}
        <p onClick={this.handleAddCardClick}> + Add a Card </p> 
      </div>
    )
  }
}