import React, { Component } from 'react';
import crown from '../res/crown.png'
import '../styles/animated.css'
import gem from '../res/gem.png'
import epic from '../res/epic_gift.png'
import legendary from '../res/legendary_gift.png'
import regular from '../res/regular_gift.png'

export class AnimatedBG extends Component {
    
    render() {
        return (
            
            <div class="box">
                <div><img src={ gem } alt="Shape"></img></div>
                <div><img src={ gem } alt="Shape"></img></div>
                <div><img src={ gem } alt="Shape"></img></div>
                <div><img src={ crown } alt="Shape"></img></div>
                <div><img src={ crown } alt="Shape"></img></div>
                <div><img src={ crown } alt="Shape"></img></div>
                <div><img src={ epic } alt="Shape"></img></div>
                <div><img src={ legendary } alt="Shape"></img></div>
                <div><img src={ regular } alt="Shape"></img></div>
                <div><img src={ crown } alt="Shape"></img></div>
            </div>
        )
    }
}

export default AnimatedBG