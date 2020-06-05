import React, { Component } from 'react'
import {Consumer} from '../../context'

class Tracks extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    console.log(value)
                }}
            </Consumer>
        )
    }
}


export default Tracks