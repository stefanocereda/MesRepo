import React, { Component } from 'react'

import Star from './Star.jsx'

export default class FiveStars extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         starSelectedId: null
      };
   }

   confirmVote() {
   
      this.props.onHandleVote(this.state.starSelectedId, this.props.startDate, ()=> {
         this.setState({
            starSelectedId: null
         })
      });
   }
	resetVote(){
		this.setState({
            starSelectedId: null
         })
	}

   onClickStar(key) {
      if (!this.props.isDisabled) {
         
         this.setState({
            starSelectedId: key
         })
      }
	  this.props.onHandleVote(key, this.props.startDate, ()=> {
         this.setState({
            starSelectedId: null
         })
      });
   }

   render() {
      var ratingList = ratingsList.map((rate, i) => {
         let isSelected = false;
         let noRate = false;
         if (!this.state.starSelectedId) {
            noRate = true
         }

         if (rate._id == this.state.starSelectedId) {
            isSelected = true
         }

         return <Star
           noRate={noRate}
           starId={rate._id}
           onClickStar={this.onClickStar.bind(this)}
           isSelected={isSelected}
           key={rate._id}
           rate={rate.rate_value} />
      });

      return (
        <div className='rating'>
           <div>
              <span style={{color:'white', fontFamily:'MESFont5'}}>{this.props.rate_title}</span>
           </div>
           {ratingList}
		   
           {this.state.starSelectedId && this.props.last=="1"
             ? <button id='button_next_rate' onClick={this.confirmVote.bind(this)}>Go</button>
             : null}
        </div>
      )
   }
}


const ratingsList = [
   {_id: 1, rate_value: 1, message: "one star"},
   {_id: 2, rate_value: 2, message: "two star"},
   {_id: 3, rate_value: 3, message: "three star"},
   {_id: 4, rate_value: 4, message: "four star"},
   {_id: 5, rate_value: 5, message: "five star"},
   {_id: 6, rate_value: 6, message: "six star"},
   {_id: 7, rate_value: 7, message: "seven star"}

];