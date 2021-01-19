import React from 'react';
import {renderToString} from 'react-dom/server'
import {diffWords} from 'diff';

import Nav from "../components/Nav";
import Text from "./Text";
import SelectItem from "./SelectItem";
import Removed from "./Removed";
import Added from "./Added";
import ButtonList from "./ButtonList";

const returnPlaceholder = '!!WORDPROOF_RETURN!!';

export default class Compare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldIndex: 1,
            newIndex: 0,
            oldText: '',
            newText: '',
            oldDisabled: [],
            newDisabled: [],
        }
    }

    componentDidMount() {
        if (this.props.noRevisions) {
            document.dispatchEvent(new Event('wordproof.modal.navigate.compare.raw'));
        } else {
            this.compare();
            console.log(this.props.items);
        }
    }

    componentDidUpdate() {
        console.log(this.state.oldText);
        console.log(this.state.newText);
    }

    compare = () => {
        const oldContent = this.cleanup(this.props.items[this.state.oldIndex].content);
        const newContent = this.cleanup(this.props.items[this.state.newIndex].content);
        let changes = diffWords(oldContent.toString(), newContent.toString());
        this.getSelectArrays();
        this.handleChanges(changes);
    };

    cleanup = (html) => {
        let string = html.replaceAll('<!-- /wp:paragraph -->', returnPlaceholder);
        string = string.replaceAll(/(<([^>]+)>)/gi, "");
        return string;
    };

    handleChanges = (list) => {
        let oldText = [];
        let newText = [];

        list.forEach((change) => {
            if (change.removed) {
                let value = change.value.replaceAll(returnPlaceholder, '');
                oldText.push(value);
                newText.push(renderToString(<Removed>{value}</Removed>));
            } else if (change.added) {
                let value = change.value.replaceAll(returnPlaceholder, '');
                newText.push(renderToString(<Added>{value}</Added>));
            } else {
                let value = change.value.replaceAll(returnPlaceholder, '<br/><br/>');
                oldText.push(value);
                newText.push(value);
            }
        });

        this.setState({
            oldText: oldText.join(''),
            newText: newText.join('')
        });
    };

    setNew = (index) => {
        this.setState({newIndex: index}, this.compare);
    };

    setOld = (index) => {
        this.setState({oldIndex: index}, this.compare);
    };

    getSelectArrays = () => {
        const lastIndex = this.props.items.length - 1;
        let oldDisabled = this.range(0, this.state.newIndex);
        let newDisabled = this.range(this.state.oldIndex, lastIndex);
        this.setState({
            oldDisabled: oldDisabled,
            newDisabled: newDisabled
        })
    };

    range = (start, end) => {
        let list = [];
        for (let i = parseInt(start); i <= parseInt(end); i++) {
            list.push(i);
        }
        return list;
    };

    render() {
        return (
            <>
                <Nav title={wStrings.compare.nav} backView={'overview'}/>

                <div>
                    <div className={'flex flex-row mx-6'}>
                        <div className={'w-1/2 p-6 hidden md:block'}>
                            <SelectItem items={this.props.items} selected={this.state.oldIndex} for={'old'}
                                        setOld={this.setOld} disabledIndexes={this.state.oldDisabled}/>
                            <Text text={this.state.oldText}/>
                        </div>
                        <div className={'md:w-1/2 p-6 w-full'}>
                            <div className={'md:hidden'}>
                                <SelectItem items={this.props.items} selected={this.state.oldIndex} for={'old'}
                                            setOld={this.setOld} disabledIndexes={this.state.oldDisabled}/>
                            </div>
                            <SelectItem items={this.props.items} selected={this.state.newIndex} for={'new'}
                                        setNew={this.setNew} disabledIndexes={this.state.newDisabled}/>
                            <Text text={this.state.newText}/>
                        </div>
                    </div>

                    <ButtonList view={'compare'}
                                hrefBlockchain={this.props.items[this.state.newIndex].transactionUrl}/>
                </div>
            </>
        );
    }
}
