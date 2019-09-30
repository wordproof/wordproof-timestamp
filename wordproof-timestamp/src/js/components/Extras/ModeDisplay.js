
import React, {Component} from 'react';

export default class ModeDisplay extends Component{
    render(){
        return <div style={{ display: 'inline-flex' }}>
            <span style={{ paddingTop: '6px', paddingBottom: '6px', paddingLeft: '9px', paddingRight: '9px', borderRadius: '5px 0 0 5px', background: (this.props.active === 'automatic') ? '#9ce18d' : '#eee'}}>Automatic</span>
            <span style={{ paddingTop: '6px', paddingBottom: '6px', paddingRight: '9px', paddingLeft: '9px', borderRadius: '0 5px 5px 0', background: (this.props.active === 'manual') ? '#9ce18d' : '#eee'}}>Manual</span>
        </div>
    }
}
