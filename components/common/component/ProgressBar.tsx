import React from "react";
import {useMediaQuery} from 'react-responsive'
import {useContext} from "react";
import {SejamContext} from "../../../pages/main";
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/outline";
import Router from "next/router";

export default function ProgressBar() {
    const {level,regInfo} = useContext<any>(SejamContext)
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});
    const progress = [
        {
            title: 'Profile',
            level: 0,
        },
        {
            title: 'Complete Information',
            level: 2,
        },
        {
            title: 'Upload Documents',
            level: 3,
        },
        {
            title: 'Exam',
            level: 4,
        },
        {
            title: 'Agreements',
            level: 5,
        },
        {
            title: 'Registration Status',
            level: 6,
        }
    ]

    return (
        <div className={'flex md:flex-row flex-col items-center mb-5 z-10'}>
            <div className={'relative grow h-[60px] w-full'}>
                <ul className="steps transition-all min-h-fit absolute top-0 z-10 w-full left-0" >
                    {
                        progress.map((step: any) => {
                            return (
                                <li suppressHydrationWarning={true}
                                    className={`step ${level > step.level ? 'step-success' : (level === step.level ? (regInfo.registrationState===18 ? 'step-success':'step-active') : '')}`}
                                    key={step.level}>{isMobile ? '' : step.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <button
                className={'flex rounded bg-gray-300 py-2 px-5 min-w-fit hover:opacity-70 transition-colors'}
                onClick={() => {
                    Router.push('/')
                }}>
                Log Out
                <ArrowLeftOnRectangleIcon className={'h-5 w-5'}/>
            </button>
        </div>
    )
}