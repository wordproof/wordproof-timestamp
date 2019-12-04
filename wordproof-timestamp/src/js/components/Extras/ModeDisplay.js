import React, {Component} from 'react';

export default class ModeDisplay extends Component{
    render(){
        return <div style={{ display: 'inline-flex' }}>
            <span style={{ paddingTop: '6px', paddingBottom: '6px', paddingLeft: '9px', paddingRight: '9px', borderRadius: '5px 0 0 5px', boxShadow: (this.props.active === 'automatic') ? '0 4px 6px -1px rgba(0,0,0,.15),0 2px 4px -1px rgba(0,0,0,.10)' : '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)', background: (this.props.active === 'automatic') ? '#00d1b1' : '#eee', color: (this.props.active === 'automatic') ? '#fff' : '#797979'}}>Automatic</span>
            <span style={{ paddingTop: '6px', paddingBottom: '6px', paddingRight: '9px', paddingLeft: '9px', borderRadius: '0 5px 5px 0', boxShadow: (this.props.active === 'manual') ? '0 4px 6px -1px rgba(0,0,0,.15),0 2px 4px -1px rgba(0,0,0,.10)' : '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)', background: (this.props.active === 'manual') ? '#00d1b1' : '#eee', color: (this.props.active === 'manual') ? '#fff' : '#797979'}}>Manual</span>
        </div>
    }
}

