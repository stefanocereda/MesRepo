/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import Star from '/client/ui/components/rate/Star.jsx'

export default class SingleQuestion extends Component {
   constructor(props) {
      super(props);

      this.state = {
         voteSelected: null
      };
   }

   onClickStar(key) {
      if (!this.props.isDisabled) {
         this.setState({
            voteSelected: key
         })
      }
      this.props.onHandleVote(key, this.props.question_number, this.clearState.bind(this))
   }

   clearState(){
      this.setState({
         voteSelected: null
      })
   }
   
   render() {
	   var ratingListTwo=null
	   if(this.props.question_number<3){
		   ratingListTwo=ratingsList.slice(0,5)
	   }else{
		   if(this.props.question_number<6){
		   ratingListTwo=ratingsList.slice(1,6)
				}else{
					ratingListTwo=ratingsList.slice(1,4)
				}
	   }
      var ratingList = ratingListTwo.map((rate, i) => {
         let isSelected = false;
         let noRate = false;
         if (!this.state.voteSelected) {
            noRate = true
         }
         if (rate._id == this.state.voteSelected) {
            isSelected = true
         }
		 
         return <Star
           noRate={noRate}
           starId={rate._id}
           onClickStar={this.onClickStar.bind(this)}
           isSelected={isSelected}
           key={rate._id}
           rate={rate.group} />
      });

      return (
        <div className='rating'>
           <div className="question">
              <div>
                 <p> {this.props.question}</p>
              </div>
              {ratingList}
           </div>
        </div>
      )
   }

}


let ratingsList = [
	{_id: 6, group: 0},
   {_id: 1, group: 1},
   {_id: 2, group: 2},
   {_id: 3, group: 3},
   {_id: 4, group: 4},
   {_id: 5, group: 5}

];