import React, { Component } from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

class Search extends Component {
    state = {
        trackTitle: ''
    }

    findTracks = async (dispatch, e) =>{
        e.preventDefault()

        const tracks = await axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${	
                process.env.REACT_APP_MM	
              }`
        )

        dispatch({
            type:'SEARCH_TRACKS',
            payload:tracks.data.message.body.track_list
        })

        this.setState({trackTitle:''})

    }

    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value

                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="music icon"></i> Serach For A Song
                            </h1>
                            <p className="lead text-center">
                                Get the lyrics for any song
                            </p>
                            <form onSubmit={this.findTracks.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={(e)=> this.setState({trackTitle:e.target.value})}>
                                    </input>
                                </div>
                                <button type='submit' className="btn btn-primary btn-lg btn-block mb-5">
                                    Get Track Lyrics
                                </button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search
