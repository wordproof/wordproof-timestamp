import React from 'react';
import {renderToString} from 'react-dom/server'
import {diffWords} from 'diff';

import Nav from "../components/Nav";
import Text from "./Text";
import SelectArticle from "./SelectArticle";
import Removed from "./Removed";
import Added from "./Added";
import ButtonList from "./ButtonList";

export default class Compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldIndex: 1,
            newIndex: 0,
            oldText: '',
            newText: '',
        }
    }

    componentDidMount() {
        this.compare();
    }

    compare = () => {
        const oldContent = this.props.articles[this.state.oldIndex].content;
        const newContent = this.props.articles[this.state.newIndex].content;
        let changes = diffWords(oldContent.toString(), newContent.toString());
        this.handleChanges(changes);
    };

    handleChanges = (list) => {
        let oldText = [];
        let newText = [];

        list.forEach((change) => {
            if (change.removed) {
                oldText.push(renderToString(<Removed>{change.value}</Removed>));
                newText.push(renderToString(<Removed>{change.value}</Removed>));
            } else if (change.added) {
                newText.push(renderToString(<Added>{change.value}</Added>));
            } else {
                oldText.push(change.value);
                newText.push(change.value);
            }
        });

        this.setState({
            oldText: oldText.join(''),
            newText: newText.join('')
        });
    };

    setNew = (index) => {
        this.setState({newIndex: index});
        this.compare();
    };

    setOld = (index) => {
        this.setState({oldIndex: index});
        this.compare();
    };

    render() {
        return (
            <>
                <Nav title={'Browse through previous versions'} backView={'overview'}/>

                <div className={'flex flex-row mx-6'}>
                    <div className={'w-1/2 m-6'}>
                        <SelectArticle articles={this.props.articles} selected={1} for={'old'} setOld={this.setOld}/>
                        <Text text={this.state.oldText}/>
                    </div>
                    <div className={'w-1/2 m-6'}>
                        <SelectArticle articles={this.props.articles} selected={0} for={'new'} setNew={this.setNew}/>
                        <Text text={this.state.newText}/>
                    </div>
                </div>

                <ButtonList/>
            </>
        );
    }
}
