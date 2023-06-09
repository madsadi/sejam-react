import React, {useContext, useState} from "react";
import CountDown from "../common/component/CountDown";
import OtpInput from 'react-otp-input';
import {toast} from "react-toastify";
import {IdpContext} from "../../pages";
import {useRouter} from "next/router";
import {requestMock} from "../common/functions";

type initialType = {
    Token: string,
}
const initialValue = {
    Token: '',
}

export default function CodeVerify() {
    const [info, setInfo] = useState<initialType>(initialValue)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter()

    const {setLevel, mobile, setToken} = useContext<any>(IdpContext)
    const codeVerifyHandler = async (e: any) => {
        e.preventDefault()
        setIsSubmitting(true)
        await requestMock()
            .then(() => {
                setIsSubmitting(false)
                setToken(info.Token)
                if(router.query?.RefCode){
                    localStorage.setItem('RefCode',`${router.query?.RefCode}`)
                }
                setLevel('infoEntry')
            })
            .catch((err) => {
                setIsSubmitting(false)
                toast.error(`${err?.response?.data?.error?.message}`)
            })
    }
    const infoUpdate = (key: string, value: any) => {
        let _info: any = {};
        _info[key] = value;

        setInfo({...info, ..._info})
    }
    return (
        <>
            <div className={'w-full text-center'}>
                <h2>
                    Two Factor Authentication
                </h2>
                <div>
                    Please type in the received code for this number:
                    <span className={'mx-2'}>{mobile}</span>
                </div>
            </div>
            <div className={'grow flex flex-col'}>
                <OtpInput
                    value={info.Token}
                    onChange={(v: string) => infoUpdate('Token', v)}
                    numInputs={6}
                    inputStyle={'border-b border-border p-1 min-w-[35px] min-h-[30px] focus:outline-tavanaGreen text-black'}
                    containerStyle={'w-full justify-center ltr mt-5 space-x-4'}
                    shouldAutoFocus={true}
                />
                <button className={'hover-button mx-auto mt-10'} onClick={() => setLevel('mobileEntry')}>
                    Change the phone number
                </button>
                <div className={'mt-auto text-center'}>
                    <button className={'button'}
                            onClick={codeVerifyHandler}
                            disabled={isSubmitting}
                    >
                        <div className={'flex items-center mx-auto w-fit'}>
                            Confirm
                            {isSubmitting && <svg className="animate-spin h-5 w-5 ml-3 ..." viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                        </div>
                    </button>
                    <CountDown />
                </div>
            </div>
        </>
    )
}