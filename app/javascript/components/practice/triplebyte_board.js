
import React from 'react'
import Column from './triplebyte_column'

export default class Board extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      columns: [
        {
          name: 'Winnie',
          cards: [{text: 'wfoo'},{text: 'wbar'}],
          color: '#8E6E95'
        },
        {
          name: 'Bob',
          cards: [{text: 'bfoo'},{text: 'bbar'}],
          color: '#39A59C'
        },
        {
          name: 'Thomas',
          cards: [{text: 'foo'},{text: 'bar'}],
          color: '#344759'
        },
        {
          name: 'George',
          cards: [{text: 'foo'},{text: 'bar'}],
          color: '#E8741E'
        }
      ]
    }
  }

  addCard = (colIndex,cardText) => {
    let columns = this.state.columns
    columns[colIndex]['cards'].push({text: cardText})
    this.setState({columns})
  }

  moveX = (params) => {
    let columnIndex, cardIndex, direction
    ({columnIndex, cardIndex, direction} = params)
    if(columnIndex + direction < 0 || columnIndex + direction > this.state.columns.length){return}
    let initialCards = [...this.state.columns[columnIndex]['cards']]
    let card = initialCards.splice(cardIndex,1)[0]
    let targetCards = [...this.state.columns[columnIndex + direction]['cards']]
    targetCards.push(card)
    console.log(targetCards)
    let columns = [... this.state.columns]
    columns[columnIndex]['cards'] = initialCards
    columns[columnIndex + direction]['cards'] = targetCards
    this.setState({columns})
  }

  render(){
    const block = {
      minWidth: '100px',
      backgroundColor: 'blue',
      minHeight: '50px'
    }
    return (
      <div className='d-flex flex-row mx-5'>
        {this.state.columns.map((col,index) =>
          <div key={col.name}>
            <Column name={col.name}
                    cards={col.cards}
                    index={index} 
                    color={col.color} 
                    addCard={this.addCard}
                    moveX={this.moveX}
                    />
          </div>
        )}
      </div>
    )
  }
}