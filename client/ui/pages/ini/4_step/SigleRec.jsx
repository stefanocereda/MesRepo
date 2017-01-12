/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SingleMovieToRate from '../../../components/rate/SingleMovieToRate.jsx'
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import InfoFeatures from '/client/ui/components/info_features/InfoFeatures.jsx'
import Modal from 'react-modal';
import MovieThumbnail from '/client/ui/components/thumb_trailer/MovieThumbnail.jsx'


class SingleRec extends Component {
  constructor(props) {
    super(props);
    //this.onHandleRecVote = this.onHandleRecVote.bind(this);
    this.state = {
      currentMovieToRate: null,
      is_loading: false,
      modalIsOpen: false,
      movie_selected: null,
      alreadyVoted:[]
    };
  }

  onHandleRecVote(rate, startDate, callBack) {

    this.setState({
      is_loading: true,
      modalIsOpen:false
    });
    const movie = this.state.movie_selected;
    

    if (movie.IMDB_ID && rate) {
      Meteor.call("save_rec_rate", movie.IMDB_ID, rate, movie.REC_TYPE, movie.PREDICTED_VOTE, startDate, (err, res)=> {
          //callBack();
          this.setState({
            is_loading: false
          });
        const alreadyVoted=this.state.alreadyVoted;

        alreadyVoted.push(movie.IMDB_ID);

          if(!err){
            this.setState({
              alreadyVoted:alreadyVoted
            })
          }
        }
      )
      ;
    }
  }

  renderMovies() {
    return this.props.rec_movies.map((movie, i)=> {
      return (
        <MovieThumbnail
          key={i}
          movie={movie}
          is_selected={false}
          is_selectable={false}
          open_modal={this.openModal.bind(this)} />)
    })
  }

  openModal(movie) {

    this.setState( {
      modalIsOpen: true,
      movie_selected:movie
    } );
  }
  
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  nextPage(){
    Meteor.call("s_clear_rec");

    Meteor.call( "s_set_ini_step", 5, err=> {
      if (!err) {
        FlowRouter.setParams( { ini_step: "5" } );
      }
    } )
  }
  
  render() {
    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: '40'
      },
      content: {
        position: 'absolute',
        top: '90px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '0px',
        background: 'black',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0px',
        outline: 'none',
        padding: '20px',
        color: 'white'
      }
    };
    let genres = null;
    let isAlreadyVoted=false;
    if (this.state.movie_selected) {
      genres = this.state.movie_selected.GENRES.split( "|" );
      const alreadyVotedList=this.state.alreadyVoted;
      isAlreadyVoted = _.contains( alreadyVotedList, this.state.movie_selected.IMDB_ID );

    }
    

    return (
      <div>
        <div className="rec-list_4you">
          <h1>R E C O M M E N D A T I O N S &nbsp; F O R &nbsp; Y O U</h1>
          <div className="movieContainer">

            <div className="container" id="container_mes">
              <div id="listMovies">
                <li>
                  {this.props.rec_movies ?
                    <div>
                      {this.props.rec_movies.length ? this.renderMovies() : <LoadingItem loading_style="loader-spinning" />}
                    </div>
                    : null}
                </li>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          onRequestClose={this.closeModal.bind(this)}>
          <div className="closeModal" onClick={this.closeModal.bind(this)}>x</div>
          {this.state.movie_selected ?
            <div className="movie_modal">
              <SingleMovieToRate
                onHandleVote={this.onHandleRecVote.bind(this)}
                imdb_id={this.state.movie_selected.IMDB_ID}
                poster_img={this.state.movie_selected.POSTER}
                is_already_voted={isAlreadyVoted}
                is_show_bottom_title={false}
                genres={this.state.movie_selected.GENRES}
                imdb_rating={this.state.movie_selected.IMDB_RATING}
                yt_url={this.state.movie_selected.YOU_TUBE_ID}
                can_skip={false}
                message=""
                movie_title={this.state.movie_selected.TITLE}
                year={this.state.movie_selected.YEAR}>
                <InfoFeatures
                  title={this.state.movie_selected.TITLE}
                  genre={genres}
                  f1={this.state.movie_selected.f1.toFixed(2)}
                  f2={this.state.movie_selected.f2.toFixed(2)}
                  f4={this.state.movie_selected.f4.toFixed(2)}
                  f6={this.state.movie_selected.f6.toFixed(2)} />
                
              </SingleMovieToRate>
            </div> : null}
        </Modal>

        <button className="btn btn-default btn_circle row button_ini button-margin"
                onClick={this.nextPage.bind(this)}>N E X T
        </button>
      </div>
    )

  }
}
export default createContainer(() => {


  const handleUser = Meteor.subscribe("pub_myself");
  let currentUser = null;
  let rec_movies = null;
  let len = null;
  if (handleUser.ready()) {
    currentUser = Meteor.user();
    if (currentUser) {
      rec_movies = currentUser.feature_rec;
    }

  }
  return {
    currentUser,
    rec_movies,
    len
  };
}, SingleRec)