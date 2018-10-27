import React from 'react';

export default class CalcButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  onclick = () => {
    this.props.click(this.props.text)
    if(this.props.text === '='){
      this.props.setCanAddNumber(false)
    }
    else{
      this.props.setCanAddNumber(true)
    }
  }


  render(){
    return (
      <div className={`border border-primary rounded col-md-${3*(this.props.width || 1)}`} onClick={this.onclick}>
        {this.props.text}
      </div>
    )
  }
}