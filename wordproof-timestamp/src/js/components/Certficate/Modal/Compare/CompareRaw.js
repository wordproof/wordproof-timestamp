import React from 'react';
import Nav from "../components/Nav";
import SelectArticle from "./SelectArticle";
import Text from "./Text";
import ButtonList from "./ButtonList";

export default class CompareRaw extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
    }

    setArticle = (index) => {
        this.setState({index: index})
    };

    render() {
        return (
            <>
                <Nav title={wStrings.compare.raw.nav} backView={(this.props.noRevisions) ? 'overview' : 'compare'}/>

                <div>

                    <div className={'flex flex-row pt-6 px-12'}>
                        <SelectArticle articles={this.props.articles} selected={this.state.index} for={'raw'}
                                       setArticle={this.setArticle} disabledIndexes={[]}/>
                    </div>

                    <div className={'flex flex-row mx-6'}>
                        <div className={'md:w-1/2 hidden md:block'}>
                            <div className={'m-6 mt-0'}>
                                <Text text={JSON.stringify(this.props.articles[this.state.index].raw)} raw={true}/>
                            </div>
                        </div>
                        <div className={'md:w-1/2 w-full'}>
                            <div className={'m-6 mt-0'}>
                                <Text text={this.props.articles[this.state.index].content}/>
                            </div>
                        </div>
                    </div>

                    <ButtonList view={(this.props.noRevisions) ? 'hide' : 'raw'} hrefBlockchain={this.props.articles[this.state.index].transactionUrl}/>
                </div>
            </>
        );
    }
}
