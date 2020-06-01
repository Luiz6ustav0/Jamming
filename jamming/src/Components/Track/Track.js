import React from 'react'


export class Track extends React.Component {
    renderAction(isRemoval){
        if(isRemoval){
            return (<button className='Track-action'>-</button>);
        }
        return (<button className='Track-action'>+</button>)
    }

    render(){
        return(
        <div className="Track">
            <div className="Track-information">
                <h3>Track Name</h3>
                <p>Track artist | Track Album</p>
            </div>
            <button className="Track-action">+ or - goes here</button>
        </div>)
    }
}