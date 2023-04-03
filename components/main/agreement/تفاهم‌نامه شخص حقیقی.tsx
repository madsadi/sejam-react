import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {PrinterIcon} from "@heroicons/react/24/outline";
import ReactToPrint from "react-to-print";
import PageHeaderFooter from "./PageHeaderFooter";
import {formatNumber, jalali} from "../../common/functions";
import {accountTypeEnums, tradingKnowledgeLevelEnums, transactionLevelPrivatePersonEnums} from "../../common/enums";

export default function PrivatePersonAgreement(){
    const {userData} = useContext<any>(SejamContext)
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("old boring text");

    const componentRef = useRef(null);

    const onBeforeGetContentResolve = useRef(null);

    const handleAfterPrint = useCallback(() => {
        console.log("`onAfterPrint` called");
    }, []);

    const handleBeforePrint = useCallback(() => {
        console.log("`onBeforePrint` called");
    }, []);

    const handleOnBeforeGetContent = useCallback(() => {
        console.log("`onBeforeGetContent` called");
        setLoading(true);
        setText("Loading new text...");

        return new Promise<void>((resolve) => {
            // @ts-ignore
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText("New, Updated Text!");
                resolve();
            }, 2000);
        });
    }, [setLoading, setText]);

    useEffect(() => {
        if (
            text === "New, Updated Text!" &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            // @ts-ignore
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, text]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);
    const reactToPrintTrigger = () => {
        return (
            <button className={'flex item-center button bg-red-600 w-fit text-white float-left'}>
                چاپ
                {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>:<PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return(
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="تفاهم‌نامه شخص حقیقی"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef}>
                <table className={'w-full'} dir={'rtl'}>
                    <thead>
                    <tr>
                        <td>
                            <div className="page-header-space">&nbsp;</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={'w-full content'}>
                            <div className={'leading-8 text-justify page'}>
                                <div className="text-center">
                                    <h4>
                                        تفاهم‌نامه شخص حقیقی
                                    </h4>
                                </div>

                                <div>
                                    <h5>ماده 1 </h5>

                                    <p>
                                        این تفاهم‌نامه بین <span
                                        className="font-semibold"> شرکت کارگزاري توانا (مشاوران سهام سابق)</span> به
                                        شماره
                                        ثبت <span className="font-semibold">159302</span>تهران،خیابان میرعماد، نبش کوچه ی سوم , روبروی
                                        فرمانداری پلاک
                                        10 طبقه ی دوم شرقی
                                        کد پستی 1587946317 شماره تلفن <span className="font-semibold">42906-021</span> و
                                        نشانی سایت اینترنتی <a href="https://www.tavana.net">www.tavana.net</a> که
                                        داراي پایگاه
                                        اطلاعاتی سامان بورس از یکسو و آقا/خانم
                                        <span>{userData?.privatePerson?.firstName + '-' + userData?.privatePerson?.lastName}</span>
                                        به کد
                                        ملی با مشخصات
                                        <span>{userData?.uniqueIdentifier}</span>
                                        مندرج در فرم احراز هویت پیوست منعقد می‌شود.
                                    </p>
                                    <p><span className="font-semibold">تبصره : </span> در صورتی که سفارش راجع به فروش اوراق بهاداري
                                        باشد که
                                        توسط
                                        کارگزار دیگري براي مشتري خریداري شده است،
                                        کارگزار می‌تواند در صورت اعلام بدهکار بودن مشتري توسط سایر شرکت‌های کارگزاري از پرداخت وجه حاصل از
                                        فروش به
                                        مشتري تا تعیین تکلیف نهایی موضوع خودداري نماید. </p>
                                </div>

                                <div>
                                    <h5>ماده 2 </h5>
                                    <p>
                                        این قرارداد براي مدت نامحدود بین طرفین منعقد می‌شود. در طول مدت قرارداد کارگزار می‌تواند با اعلام
                                        کتبی
                                        نسبت
                                        به فسخ قرارداد حاضر اقدام نماید. فسخ قرارداد باعث رفع مسئولیت‌هایی که کارگزار تا زمان فسخ بر عهده
                                        گرفته است
                                        نخواهد بود.
                                    </p>

                                </div>
                                <div>
                                    <h5>ماده 3 </h5>
                                    <p>
                                        مشتري مکلف است پیش از ارایه سفارش خرید نسبت به تأمین منابع مالی لازم براي اجراي سفارش خرید اقدام
                                        نماید
                                        و در
                                        صورت عدم تأمین منابع مالی، کارگزاري تکلیفی به انجام سفارش ندارد. چنانچه به هر دلیلی به جز اشتباه
                                        معاملاتی
                                        کارگزار، در پی اجراي سفارش مشتري، مشتري به کارگزار بدهکار باشد، مشتري مکلف خواهد بود تا فوراً نسبت
                                        به
                                        تسویه
                                        بدهی خود که از این محل ناشی می‌شود اقدام نماید. چنانچه ظرف 2 روز از انجام معامله، مشتري نسبت به
                                        تسویه
                                        حساب
                                        اقدام ننمایند مکلف است بصورت روز شمار مبلغ 0,2 درصد مبلغ بدهی را بعنوان جریمه دیر کرد بپردازد. به
                                        هنگام
                                        تسویه حساب ابتدا جرایم تسویه می‌شود و سپس اصل بدهی تسویه خواهد شد.
                                    </p>


                                    <p><span className="font-semibold">تبصره : </span>
                                        در صورت عدم پرداخت به موقع بدهی موضوع این ماده مشتري به موجب این تفاهم‌نامه به کارگزار اجازه می‌دهد
                                        تا
                                        نسبت
                                        به فریز اوراق بهادار مشتري نزد کارگزار اقدام نماید. بدیهی است پس از پرداخت کامل بدهی و جرائم متعلقه
                                        کارگزار
                                        مکلف به رفع فریز از اوراق بهادار مشتري است.
                                    </p>
                                </div>
                                <div>
                                    <h5>ماده 4</h5>
                                    <p>
                                        وجوه ناشی از اجرای سفارش‌های فروش مشتري به حساب بستانکار مشتري نزد کارگزار منظور خواهد شد و در پی
                                        درخواست
                                        مشتري ظرف مدتی کمتر از 2 روز کاري از تاریخ درخواست نخواهد بود به حسابی که به هنگام احراز هویت توسط
                                        مشتري
                                        معرفی شده است واریز خواهد شد. تغییر در حساب بانکی مشتري منوط به اعلام حساب بانکی جدید در قالب تکمیل
                                        فرم
                                        احراز هویت جدید خواهد بود. با پرداخت وجوه به حساب معرفی شده از سوي کارگزار، کارگزار در این خصوص دیگر
                                        مسئولیتی نخواهد داشت.
                                    </p>

                                    <p><span className="font-semibold">تبصره 1: </span>
                                        در صورتی که سفارش راجب فروش اوراق بهاداري باشد که توسط کارگزار دیگري براي مشتري خریداري شده باشد،
                                        پرداخت
                                        وجوه به مشتري منوط است به ارائه گواهی نقل‌وانتقال سهام و یا رضایت کتبی کارگزار سابق.
                                    </p>

                                    <p><span className="font-semibold">تبصره 2: </span>
                                        پرداخت وجه به حساب شخصی غیر از مشتري تنها با رضایت کتبی مشتري که در محل کارگزاري تنظیم می‌شود در
                                        قالب
                                        مقررات
                                        مبارزه با پول‌شویی و دستورالعمل‌های مربوطه امکان‌پذیر است.
                                    </p>
                                </div>
                                <div>
                                    <h5>ماده 5</h5>
                                    <p>
                                        در صورتی که کارگزار اشتباهاً معامله‌ای را به نام مشتري انجام داده یا ثبت نماید، مجاز است اقدامات
                                        لازم
                                        را به
                                        منظور رفع و اصلاح اشتباه انجام دهد و در صورتی که براي رفع یا اصلاح اشتباه، انجام معامله یا معاملات
                                        دیگري به
                                        نام مشتري ضرورت داشته باشد، کارگزار از طرف مشتري براي انجام معامله یا معاملات یاد شده وکالت دارد،
                                        لاکن
                                        باید
                                        در این معاملات تشریفات و شرایط پیش‌بینی شده در مقررات را رعایت نماید. در هر حال مسئولیت اشتباهات یاد
                                        شده و
                                        معاملاتی که کارگزار براي اصلاح آن‌ها انجام می‌دهد به عهده کارگزار است و در صورتی که از این امر
                                        خسارتی
                                        متوجه
                                        مشتري گردد، کارگزار باید بلافاصله و بدون نیاز به مطالبه جبران خسارت از طرف مشتري، خسارت وارده به
                                        مشتري
                                        را به
                                        طریق مقتضی جبران نماید.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 6</h5>
                                    <p>
                                        مشتري و کارگزار پس از گذشت 2 سال حق اقامه دعوا علیه یکدیگر را از خود اسقاط نمودند، به عبارت دیگر
                                        سپري
                                        شدن
                                        مدت‌های مزبور به منزله صلح بلاعوض تمامی دعاوي احتمالی طرفین علیه یکدیگر است:
                                    </p>
                                </div>
                                <div>
                                    <h5>ماده 7</h5>
                                    <p>
                                        2- مشتري به استثناء، شرایط توافق شده در قرارداد خرید اعتباري (در صورت وجود)، مکلف است قبل از ارائه
                                        سفارش خرید
                                        و یا نهایتاً موعد مقرر جهت تسویه تعهد خرید توسط شرکت سپرده‌گذاری مرکزي (سررسید تسویه) هرکدام به
                                        صلاحدید
                                        کارگزاري، نسبت به واریز بهاي خرید اقدام نماید. در صورت عدم تسویه وجوه مذکور در موعد مقرر، خرید مشتري
                                        باطل تلقی
                                        گردیده و عدم تسویه به منزله درخواست فروش بدون قید و شرط است لذا کارگزاري مختار است به وکالت بلاعزل
                                        از
                                        مشتري با
                                        فروش اوراق بهادار موضوع این بند، نسبت به تسویه مذکور اقدام نماید مشتري کلیه دعاوي احتمالی علیه
                                        کارگزاري را در
                                        مورد معاملات مذکور صلح بلاعوض می‌نماید. لذا از تاریخ سررسید تا زمان فروش اوراق بهادار و یا تسویه
                                        نقدي
                                        آن توسط
                                        مشتري، جریمه‌ای معادل 25/0 درصد روزانه به عنوان جریمه عدم رعایت مقررات و دیر کرد در تسویه از مشتري
                                        اخذ
                                        خواهد
                                        شد.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 8</h5>
                                    <p>
                                        3- در صورتیکه مشتري مدارك لازم و مورد درخواست کارگزاري را به موقع تحویل و ارائه ننماید، کارگزاري
                                        مجاز
                                        است تا
                                        زمان تکمیل مدارك، مشتري را از ارائه کلیه خدمات محروم نماید. مفاد این بند نسبت به سایر توافقات
                                        فی‌مابین
                                        اولویت
                                        دارد.
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <div className="page-footer-space">&nbsp;</div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                <PageHeaderFooter/>
            </div>
        </>
    )
}