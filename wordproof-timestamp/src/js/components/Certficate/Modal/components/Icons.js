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

const LockSafe = props => (
    <svg viewBox={'0 0 87 115'} width={87} height={115} {...props}>
        <g transform="translate(0 8)" fill="none" fillRule="evenodd">
            <path
                d="M21 38V26C21 11.64 32.64 0 47 0c14.328.044 25.92 11.672 25.92 26v12"
                stroke="#032BC4"
                strokeWidth={14.17}
            />
            <path
                d="M86.91 34v33A39.94 39.94 0 0 1 47 107 39.94 39.94 0 0 1 7 67V34h79.91z"
                fill="#032BC4"
            />
            <circle fill="#000" cx={46.97} cy={63.52} r={10.08} />
            <path
                fill="#000"
                d="M57.05 83.69H36.89l10.08-20.17zM7.02 31.42h79.89V38H7.02z"
            />
            <circle fill="#01DCC6" cx={10.99} cy={89.97} r={10.97} />
            <path
                stroke="#FFF"
                strokeWidth={2.59}
                d="M3.99 90.94l4.77 4.88 8.23-11.14"
            />
        </g>
    </svg>
);

const LockUnsafe = props => (
    <svg viewBox={'0 0 131 115'} width={131} height={115} {...props}>
        <g transform="translate(0 8)" fill="none" fillRule="evenodd">
            <path
                d="M72 38V26C72 11.66 83.61.028 97.95 0c14.336.033 25.94 11.664 25.94 26v12"
                stroke="#032BC4"
                strokeWidth={14.17}
            />
            <path
                d="M86 34v33a39.94 39.94 0 0 1-40 40A39.94 39.94 0 0 1 6.11 67V34H86z"
                fill="#032BC4"
            />
            <circle fill="#000" cx={46.05} cy={63.52} r={10.08} />
            <path
                fill="#000"
                d="M56.13 83.69H35.97l10.08-20.17zM6.11 31.42H86V38H6.11z"
            />
            <circle fill="#FF4343" cx={11.93} cy={89.7} r={10.97} />
            <path
                d="M6.93 84.98l10 10M7.18 95.23l9.75-10.25"
                stroke="#FFF"
                strokeWidth={3}
                strokeLinecap="square"
            />
        </g>
    </svg>
);

const LockSafeOutline = props => (
    <svg viewBox={'0 0 52 76'} width={52} height={76} {...props}>
        <g stroke="#FBB03B" strokeWidth={1.23} fill="none" fillRule="evenodd">
            <path d="M51.24 27.47V50C51.212 63.92 39.92 75.19 26 75.19 12.08 75.19.788 63.92.76 50V27.47h50.48z" />
            <path d="M32.37 47.75a6.37 6.37 0 1 0-9.21 5.68l-3.53 7.07h12.74l-3.53-7.07a6.35 6.35 0 0 0 3.53-5.68zM.76 27.47h50.47v4.16H.76zM14.85 27.47v-7.13c0-6.158 4.992-11.15 11.15-11.15a11.15 11.15 0 0 1 11.15 11.15v7.13h8.38v-7.13C45.53 9.554 36.786.81 26 .81 15.214.81 6.47 9.554 6.47 20.34v7.13h8.38z" />
        </g>
    </svg>
);


const LockUnsafeOutline = props => (
    <svg viewBox={'0 0 770 760'} width={77} height={76} {...props}>
        <g stroke="#FBB03B" strokeWidth={1.23} fill="none" fillRule="evenodd">
            <path d="M51.24 27.47V50C51.212 63.92 39.92 75.19 26 75.19 12.08 75.19.788 63.92.76 50V27.47h50.48z" />
            <path d="M32.37 47.75a6.37 6.37 0 1 0-9.21 5.68l-3.53 7.07h12.74l-3.53-7.07a6.35 6.35 0 0 0 3.53-5.68zM.76 27.47h50.47v4.16H.76zM45.65 27.47v-7.13c0-6.158 4.992-11.15 11.15-11.15A11.15 11.15 0 0 1 68 20.34v7.13h8.38v-7.13A19.53 19.53 0 0 0 56.8.81c-10.786 0-19.53 8.744-19.53 19.53v7.13h8.38z" />
        </g>
    </svg>
);



export {Pen, Clock, Check, Cross, Close, LockSafe, LockUnsafe, LockSafeOutline, LockUnsafeOutline};

