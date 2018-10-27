import React from 'react';
import CalcButton from './CalcButton';

export default class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      total: '0',
      canAddNumber: true
    }
  }

  addToCalc = (val) => {
    if(!Number(val)){
      var total = this.state.total + val
    }
    else if(this.state.canAddNumber){
      var total =  this.state.total === '0' ? val : this.state.total + val
    }
    else{
      var total = val
    }
    this.setState({total})
  }

  calcTotal = (val) => {
    try{
      var total = eval(this.state.total)
    }
    catch(err){
      var total = 'ERROR'
    }
    
    this.setState({
      total: total
    })
  }

  clear = (val) => {
    this.setState({
      total: '0'
    })
  }

  setCanAddNumber = (bool) => {
    this.setState({canAddNumber: bool})
  }

  render(){
    return(
      <div>
        <div className="border border-primary rounded text-right pr-2">
          {this.state.total}
        </div>
        <div className="d-flex flex-row">
          <CalcButton text='7' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='8' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='9' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='/' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
        </div>
        <div className="d-flex flex-row">
          <CalcButton text='4' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='5' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='6' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='*' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
        </div>
        <div className="d-flex flex-row">
          <CalcButton text='1' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='2' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='3' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='-' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
        </div>
        <div className="d-flex flex-row">
          <CalcButton text='0' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='.' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='=' click={this.calcTotal} setCanAddNumber={this.setCanAddNumber}/>
          <CalcButton text='+' click={this.addToCalc} setCanAddNumber={this.setCanAddNumber}/>
        </div>
        <div className="d-flex flex-row align-right">
          <CalcButton text='Clear' click={this.clear} width={2} setCanAddNumber={this.setCanAddNumber}/>
        </div>
      </div>
    )
  }
}