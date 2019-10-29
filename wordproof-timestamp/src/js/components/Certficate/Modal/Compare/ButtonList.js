import React from 'react';
import ButtonListItem from "./ButtonListItem";
import {QuestionMark, Eye, Clock, Blockchain} from "../components/Icons";

export default class ButtonList extends React.Component {
    render() {
        return (
            <div className={'shadow-lg mx-6 mb-1 border-gray-300 bg-gray-200 border rounded-lg'}>
                <div className={'flex items-center flex-wrap flex-grow justify-around md:justify-between px-4'}>
                    <ButtonListItem href={''} navigate={'compare.explanation'} icon={<QuestionMark/>}>{wStrings.compare.buttons.explanation}</ButtonListItem>
                    <ButtonListItem href={'https://wordproof.io/check/'} icon={<Clock color={'#0017B1'}/>} hideMobile={true}>{wStrings.compare.buttons.checker}</ButtonListItem>

                    {(this.props.view === 'compare') &&
                        <ButtonListItem href={''} navigate={'compare.raw'} hideMobile={true}
                                    icon={<Eye/>}>{wStrings.compare.buttons.raw}</ButtonListItem>
                    }
                    {(this.props.view === 'raw') &&
                        <ButtonListItem href={''} navigate={'compare'} hideMobile={true}
                                    icon={<Eye/>}>{wStrings.compare.buttons.compare}</ButtonListItem>
                    }
                    <ButtonListItem href={this.props.hrefBlockchain} icon={<Blockchain/>}>{wStrings.compare.buttons.blockchain}</ButtonListItem>
                </div>
            </div>
        );
    }
}
