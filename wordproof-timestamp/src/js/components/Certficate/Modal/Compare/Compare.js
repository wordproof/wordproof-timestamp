import React from 'react';
import { renderToString } from 'react-dom/server'
import {diffWords} from 'diff';

import Nav from "../components/Nav";
import Text from "./Text";
import Removed from "./Removed";
import Added from "./Added";

export default class Compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            old: this.props.articles[1].content,
            new: this.props.articles[0].content,
        }
    }

    componentDidMount() {
        this.compare();
    }

    compare = () => {
        console.log(this.props.articles);
        let changes = diffWords(this.state.old.toString(), this.state.new.toString());
        console.log(changes);
        this.handleChanges(changes);
    };

    handleChanges = (list) => {
        let oldText = [];
        let newText = [];
        console.log(list);

        list.forEach((change) => {
            if (change.removed) {
                oldText.push(renderToString(<Removed>{ change.value }</Removed>));
                newText.push(renderToString(<Removed>{ change.value }</Removed>));
            } else if (change.added) {
                // oldText.push(renderToString(<Added>{ change.value }</Added>));
                // oldText.push(renderToString(<Blank/>));
                newText.push(renderToString(<Added>{ change.value }</Added>));
            } else {
                oldText.push(change.value);
                newText.push(change.value);
            }
        });

        // console.log('new:');
        // console.log(oldText);
        // console.log(newText);

        this.setState({
            old: oldText.join(''),
            new: newText.join('')
        });
    };

    changeNew = () => {

    };

    changeOld = () => {

    };

    render() {
        return (
            <>
                <Nav title={'Browse through previous versions'}/>

                <div className={'flex flex-row'}>
                    <Text text={this.state.old}/>
                    <Text text={this.state.new}/>
                </div>
            </>
        );
    }
}
