import React from "react";

const Pen = props => (
    <svg viewBox={'0 0 32 32'} width={32} height={32} {...props}>
        <path
            d="M31.738 9.3c-.4-.4-1-.4-1.4 0l-2.3 2.3-7.6-7.6 2.3-2.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-3 3c-.4.4-.4 1 0 1.4l.2.2c-2.9 1.9-9.2 2.9-11.6 3.1-.4 0-.8.3-.9.7l-6 22c-.1.4 0 .8.3 1 .2.2.6.4 1 .3l22-6c.4-.1.7-.5.7-.9.2-2.4 1.2-8.7 3.1-11.6l.2.2c.4.4 1 .4 1.4 0l3-3c.4-.4.4-1 0-1.4zm-9.6 14.9L4.438 29l6.5-6.5c.5.3 1.1.4 1.7.4.9 0 1.8-.3 2.5-1 1.4-1.4 1.4-3.6 0-4.9-1.4-1.4-3.6-1.4-4.9 0-1.1 1.1-1.3 2.8-.6 4.1l-6.6 6.5 4.8-17.7c2.3-.3 8.9-1.2 12.1-3.6l5.7 5.7c-2.3 3.3-3.2 9.9-3.5 12.2zm-10.7-3.6c-.6-.6-.6-1.5 0-2.1.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.6.6.6 1.5 0 2.1-.6.5-1.6.5-2.2 0z"
            fill="#000"
            fillRule="nonzero"/>
    </svg>
);

const Clock = props => (
    <svg viewBox={'0 0 34 35'} width={32} height={32} {...props}>
        <path
            d="M17 0C7.625 0 0 7.716 0 17.203c0 9.487 7.625 17.204 17 17.204s17-7.717 17-17.204C34 7.716 26.375 0 17 0zm0 2.373c8.108 0 14.655 6.626 14.655 14.83 0 8.205-6.547 14.83-14.655 14.83S2.345 25.409 2.345 17.204C2.345 9 8.892 2.373 17 2.373zm0 3.56a1.18 1.18 0 0 0-1.172 1.186v10.084c0 .328.135.62.348.835l6.21 6.303c.458.463 1.209.463 1.667 0a1.208 1.208 0 0 0 0-1.687l-5.88-5.933V7.12A1.18 1.18 0 0 0 17 5.932z"
            fill="#000"
            fillRule="nonzero"
        />
    </svg>
);

const Check = props => (
    <svg viewBox={'0 0 23 24'} width={18} height={18} {...props}>
        <g transform="translate(0 .785)" fill="none" fillRule="evenodd">
            <circle fill="#00D1B1" cx={11.5} cy={11.5} r={11.5} />
            <path stroke="#FFF" strokeWidth={3} d="M4 12.75L9.134 18 18 6" />
        </g>
    </svg>
);

const Cross = props => (
    <svg viewBox={'0 0 23 24'} width={18} height={18} {...props}>
        <g transform="translate(0 .785)" fill="none" fillRule="evenodd">
            <circle fill="#00D1B1" cx={11.5} cy={11.5} r={11.5} />
            <path stroke="#FFF" strokeWidth={3} d="M4 12.75L9.134 18 18 6" />
        </g>
    </svg>
);

const Close = props => (
    <svg viewBox={'0 0 30 29'} width={20} height={20} {...props}>
        <g transform="translate(-8 -8)" fill="none" fillRule="evenodd">
            <path
                d="M24.111 22.489l5.087-4.985a.785.785 0 0 0 0-1.09.825.825 0 0 0-1.11 0L23 21.4l-5.087-4.985a.825.825 0 0 0-1.111 0 .785.785 0 0 0 0 1.089l5.087 4.985-5.087 4.985c-.293.287-.351.803 0 1.09.292.286.818.343 1.11 0L23 23.577l5.087 4.985c.293.287.819.344 1.111 0 .293-.286.351-.802 0-1.089l-5.087-4.985z"
                fill="#5ECDB2"
                fillRule="nonzero"/>
            <ellipse
                stroke="#5ECDB2"
                strokeWidth={2}
                cx={23}
                cy={22.5}
                rx={13.72}
                ry={13.4}
            />
        </g>
    </svg>
);

export {Pen, Clock, Check, Cross, Close};

