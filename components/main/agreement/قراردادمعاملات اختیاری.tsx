import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import {jalali} from "../../common/functions";
import {accountTypeEnums, legalPersonTypeCategoryEnums} from "../../common/enums";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./PageHeaderFooter";

export default function OptionalAgreement() {
    const {userData, userDefaultBank} = useContext<any>(SejamContext)
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
                </svg> : <PrinterIcon className={'h-5 w-5 mr-2'}/>}
            </button>
        ); // eslint-disable-line max-len
    }

    return (
        <>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="قرارداد معاملات اختیاری"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div className={'leading-8 text-justify page'}>
                <PageHeaderFooter/>
                <div className="text-center">
                    <h4>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        "قرارداد اختيار معامله سهام "
                    </h4>
                </div>

                <div>
                    <h5>
                        ماده 1- طرفین قرارداد
                    </h5>
                    <p>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        این قرارداد بین شرکت کارگزاری با مشخصات زیر:1.
                    </p>
                    <table className={'table table-compact w-full'}>
                        <tbody>
                        <tr>
                            <td>
                                عضو: شرکت کارگزاری توانا نام
                            </td>
                            <td>
                                شماره ثبت: 159302
                            </td>
                            <td>
                                تاریخ ثبت: 09/11/78
                            </td>
                            <td>
                                محل ثبت: تهران
                            </td>
                        </tr>
                        <tr>
                            <td>
                                شماره ثبت نزد سازمان بورس: 10637
                            </td>
                            <td>
                                شماره تلفن دفتر مرکزی: 42906-021
                            </td>
                            <td>
                                شماره فاکس دفتر مرکزی: 42906-021 داخلی 6
                            </td>
                            <td>
                                کدپستی: 1587946313
                            </td>
                        </tr>
                        <tr>
                            حمیدرضا طریقی سمت: مدیرعامل و عضو هیئت مدیره:نام، نام خانوادگی آخرین صاحب امضاء مجاز
                        </tr>
                        <tr>
                            تهران، خیابان مطهری، خیابان میرعماد، نبش کوچه سوم پلاک 10، طبقه دوم:آدرس دفتر مرکزی
                        </tr>
                        <tr>
                            آدرس پست الکترونیکی: info@tavana.net
                        </tr>
                        </tbody>
                    </table>
                    <p>
                        و مشتری با مشخصات جدول زیر:
                    </p>
                </div>
                <div className=" mt-4">
                    <h5>
                        الف) اشخاص حقیقی / نماینده ایرانی:
                    </h5>
                    <table className={'table table-compact w-full'}>
                        <tbody>
                        <tr>
                            <td>
                                <span>جنسیت:</span>
                                <span>{userData?.privatePerson?.gender === 'Male' ? 'مرد' : 'زن'}</span>
                            </td>
                            <td>
                                <span> نام و نام خانوادگی: </span>
                                <span>{userData.privatePerson?.firstName + ' ' + userData.privatePerson?.lastName}</span>
                            </td>
                            <td>
                                <span>نام پدر:</span>
                                <span>{userData?.privatePerson?.fatherName}</span>
                            </td>
                            <td>
                                <span>شماره تلفن همراه:</span>
                                <span>{userData?.addresses?.[0]?.mobile}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span> تاریخ تولد:</span>
                                <span>{jalali(userData.privatePerson?.birthDate).date}</span>
                            </td>
                            <td>
                                <span> محل تولد: </span>
                                <span>{userDefaultBank.privatePerson?.placeOfBirth}</span>
                            </td>
                            <td>
                                <span>کد ملی:</span>
                                <span>{userData.uniqueIdentifier}</span>
                            </td>
                            <td>
                                <span>آدرس پست الکترونیکی:</span>
                                <span>{userData?.addresses?.[0]?.email}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span> شماره شناسنامه: </span>
                                <span>{`${userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}`}</span>
                            </td>
                            <td>
                                <span> صادره از: </span>
                                <span>{userDefaultBank.privatePerson?.placeOfIssue}</span>
                            </td>
                            <td>
                                <span> شماره تلفن منزل با کد شهر: </span>
                                <span>{userDefaultBank.addresses?.[0].cityPrefix + '-' + userDefaultBank.addresses?.[0].tel}</span>
                            </td>
                            <td>
                                <span>تلفن محل کار:  </span>
                                <span>{userData?.jobInfo?.companyCityPrefix + '-' + userData?.jobInfo?.companyPhone}</span>
                            </td>
                        </tr>
                        <tr>
                            <span> نشانی محل کار:  </span>
                            <span>{userData?.jobInfo?.companyAddress}</span>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className=" mt-4">
                    <h5>ب) اشخاص حقوقی ایرانی: </h5>
                    <table className={'table table-compact w-full'}>
                        <tbody>
                        <tr>
                            <td>
                                <span>نام: </span>
                                <span>{userData?.legalPerson?.companyName}</span>
                            </td>
                            <td>
                                <span>شماره ثبت:</span>
                                <span>{userData?.legalPerson?.registerNumber}</span>
                            </td>
                            <td>
                                <span>محل ثبت:</span>
                                <span>{userData?.legalPerson?.registerPlace}</span>
                            </td>
                            <td>
                                <span>تاریخ ثبت:</span>
                                <span>{jalali(userData?.legalPerson?.registerDate)?.date}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>شناسه ملی:</span>
                                <span>{userData?.legalPerson?.economicCode}</span>
                            </td>
                            <td>
                                <span>نوع شخصیت:</span>
                                <span>{legalPersonTypeCategoryEnums.find((item: any) => item.id === userData.legalPerson?.legalPersonTypeCategory)?.title}</span>
                            </td>
                            <td>
                                <span> شماره حساب بانکی: </span>
                                <span>{userDefaultBank?.accountNumber}</span>
                            </td>
                            <td>
                                <span>شماره شبا:</span>
                                <span>{userDefaultBank?.sheba}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p>
                        به شرح مواد آتی منعقد شد .
                    </p>
                </div>

                <div className="mt-4 ">
                    <p>
                        .در اين قرارداد سازمان بورس و اوراق بهادار، اختصاراً سازمان، شركت بورس اوراق بهادار تهران (شركت سهامي عام) اختصاراً بورس، قوانين، مصوبات هيأت وزيران، شورای عالي بورس و اوراق بهادار، سازمان و بورس، اختصاراً مقررات ناميده شده اند.                    </p>
                    <p>
                        3. دستورالعمل معاملات قرارداد اختيار معامله در شركت بورس اوراق بهادار تهران، مصوب 17/09/95 هيأت مديره سازمان بورس  و اوراق  بهادار، در اين قرارداد دستورالعمل ناميده مي شود و تعاريف آن در اين قرارداد به همان مفاهيم به كار رفته اند.                     </p>
                    <p>
                        4. اتاق پاياپای، واحدی در شركت سپرده گذاری مركزی اوراق بهادار و تسويه وجوه است كه براساس دستورالعمل، وظيفة انجام امور تسويه، پاياپای و اعمال قرارداد اختيار معامله را بر عهده دارد.                    </p>
                </div>
                <div>
                    <h5>
                        ماده 2-موضوع قرارداد
                    </h5>
                    <p>
                        موضوع قرارداد، ارائه خدمات زير توسط كارگزار به مشتری است:
                    </p>
                    <p>
                        ١. اجرای درخواست هاي اتخاذ موقعيت خريد و اتخاذ موقعيت فروش و همچنين درخواستهای اعمال و اعلام نوع تسويه در بازار معاملات قرارداد اختيار معامله؛
                    </p>
                    <p>
                        ٢. ايفای تعهدات مشتری در مقابل اتاق پاياپای و بورس.
                    </p>
                </div>

                <div>
                    <h5>
                        ماده ٣: مدت قرارداد
                    </h5>
                    <p>
                        قرارداد از تاريخ {moment().locale('fa').format('YYYY/MM/DD')} امضا و ابلاغ قرارداد آغاز ميشود و در صورت تحقق هر يك از موارد زير خاتمه می یابد:
                    </p>
                    <p>
                        ١. فسخ قرارداد و تسويه حساب قطعي بين كارگزار و مشتری؛
                    </p>
                    <p>
                        ٢. تعليق مجوز معاملات قرارداد اختيار معامله كارگزار بيش از ٢٠ روز؛
                    </p>
                    <p>
                        ٣. لغو مجوز قرارداد اختيار معامله كارگزار يا عدم تمديد مجوز وی پس از اتمام دوره مجوز.
                    </p>
                </div>

                <div>
                    <h5>
                        ماده ٤: مبلغ قرارداد
                    </h5>
                    <p>
                        مبلغ قرارداد، صرفاً معادل كارمزدهای معامله است كه كارگزار بر اساس مقررات از مشتری دريافت مي كند.
                    </p>
                </div>

                <div>
                    <h5>
                        ماده ٥: تعهدات مشتری
                    </h5>
                    <p>
                        ١.  مشتری متعهد ميشود در صورت تغيير اطلاعات مندرج در جدول مشخصات مشتری، مراتب را در اسرع وقت به كارگزار اطلاع دهد.
                    </p>
                    <p>
                        ٢.  مشتری متعهد ميشود كه بدون مطالعه و آگاهي از مقررات مربوط به اختيار معامله، هيچگونه سفارشي براي معامله قرارداد اختيار معامله صادر نكند. مشتری اعلام مي كند از ريسك ها و مقررات حاكم بر بازار قرارداد اختيار معامله كاملاً مطلع بوده و آنها را پذيرفته است و از اين رو، بيانيه ريسك (فرم پيوست قرارداد) را تكميل و امضا كرده است. مشتری اعلام مي دارد توانايي ارزيابي و تحمل ريسك مالي را كه خريد يا فروش اختيار معامله به همراه خواهد داشت، دارد.
                    </p>
                    <p>
                        ٣.  كارگزار مي تواند در مورد سفار ش های فروش، علاوه بر وجه تضمين اوليه، به منظور اطمينان از ايفای تعهدات مشتری، وثايق يا تضاميني تا سقف تعيين شده در مشخصات قرارداد از مشتری دريافت كند، بر اين اساس مشتری موظف به توديع وثايق لازم نزد كارگزار مي باشد.
                    </p>
                    <p>
                        ٤ . اتاق پاياپای از طرف مشتری وكالت بلاعزل دارد متناسب با تغييرات، بخشي از وجه تضمين را به عنوان اباحه تصرف در اختيار كارگزار طرف ديگر قرارداد اختيار معامله (بر حسب مورد خريدار يا فروشنده) قرار دهد و وی حق استفاده از آن را خواهد داشت تا در دوره تحويل تسويه كند.
                    </p>
                    <p>
                        ٥.  مشتری موظف است در صورتي كه پس از عمليات به روزرساني حساب توسط كارگزار، وجه تضمين مربوط به موقعيتهای باز وی به كمتر از حداقل وجه تضمين كاهش يابد، بر اساس اخطاريه افزايش وجه تضميني كه كارگزار به وی به روش تعيين شده در اين قرارداد ارسال مي كند، بايد تا12  ساعت پس از شروع معاملات روز بعد،,وجه تضمين خود را تا وجه تضمين لازم روز معاملاتي قبل افزايش دهد. در غير اين صورت كارگزار بايد در همان روز معاملاتي، راساً اقدام به بستن آن دسته از موقعيت های باز مشتري كه تعهدات وجه تضمين آن ايفا نشده است، بكند. درصورتی كه به هر دليلی طي مهلت های مقرر مشتری تعهدات خود را ايفا ننمايد، كارگزار ميتواند رأساً از محل بستانكاری مشتری و يا وثايق وی نزد كارگزار، اقدام به تأمين و جبران تعهدات مشتری نمايد.
                    </p>
                    <p>
                        ٦. بورس در اقدام شركتي ناشر سهم پايه (افزايش سرمايه و تقسيم سود)، قيمت اعمال، اندازه قراردادهاي اختيار معامله و سقف موقعيتهای يك گروه اختيار معامله را تعديل میکند و مشتری با علم به اين موضوع اقدام به اتخاذ موقعيت باز در بازار قرارداداختيار معامله مي كند.
                    </p>
                    <p>
                        ٧.  مشتري از سقف موقعيت های باز هر نماد معاملاتي به ازای مشتري و كارگزار آگاه است و با علم به اين موضوع كارگزار را انتخاب و اقدام به اتخاذ موقعيت باز در بازار قرارداد اختيار معامله مي كند.
                    </p>
                    <p>
                        ٨. خسارت های مقرر در مشخصات قرارداد از محل حساب عملياتي كارگزار و در صورت عدم كفايت، از محل وثايق كارگزار نزد اتاق پاياپای تأمين و رأساً برداشت مي شود. در صورت عدم كفايت وثايق، كارگزار مكلف است حسب دستور اتاق پاياپای خسارت های مربوطه را پرداخت كند. بديهی است كارگزار مي تواند اين خسارات را رأساً از محل وثايق يا تضامين مشتری برداشت كند و در صورت عدم كفايت از مشتری مطالبه كند. مستندات اين اقدامات بايد در سوابق كارگزاری نگهداري شود. در صورتيكه به هر دليلي مشتری تعهدات خود را ايفا ننمايد، كارگزار ميتواند رأساً از محل بستانكاری مشتری و يا وثايق وی نزد كارگزار، اقدام به تأمين و جبران تعهدات مشتری نمايد.
                    </p>
                    <p>
                        ٩. مشتری متعهد است در ارائه سفارش های خريد و فروش، همه قوانين و مقررات مربوطه به ويژه مقررات مربوط به فصل ششم قانون بازار (دارندگان اطلاعات نهاني، دست كاری قيمت) را رعايت كند.
                    </p>
                    <p>
                        ١٠ . مشتری متعهد به تأديه كارمزد معامله و اعمال است. كارمزد اعمال از همه دارندگان موقعيت باز تخصيص يافته توسط اتاق پاياپای (هم قابل اعمال و هم غيرقابل اعمال) اخذ مي شود.
                    </p>
                    <p>
                        ١١ . چنانچه تسويه به صورت فيزيكي باشد، از همه دارندگان موقعيت باز فروش در قرارداد اختيار معامله خريد و همه دارندگان موقعيت باز خريد در قرارداد اختيار معامله فروش كه سهم پايه موضوع قرارداد را به طرف مقابل تحويل مي دهند، ماليات اخذ خواهد شد.
                    </p>
                    <p>
                        ١٢ . بورس مي تواند در مورد تعداد كارگزاراني كه يك مشتری مي تواند از طريق آنها معامله كند، محدوديت تعيين كند.در اين صورت تغيير كارگزار صرفاً با رعايت مقررات اتاق پاياپای و تكميل فرم مربوطه و تاييد آن توسط كارگزار مبداء، كارگزار مقصد و اتاق پاياپای امكان پذير است. مسئوليت تخلف از مفاد اين بند و جبران خسارت های مربوطه بر عهده مشتری است.
                    </p>
                    <p>
                        ١٣ . مشتری ملزم است سفارش خود را در فرمهای تعيين شده توسط بورس تكميل و ارائه كند.
                    </p>
                    <p>
                        ١٤ . مشتری با امضايی اين قرارداد، همه مقررات و مفاد دستورالعمل و اصلاحات بعدی آن را مي پذيرد و متعهد به ايفای تمام وظايف و تعهدات خود مطابق قرارداد و مقررات است، هر چند در اين قرارداد ذكر نشده باشد.
                    </p>
                    <p>
                        ١٥ .در صورت تعيين ساير روش های تخصيص غير از روش ردگيری موقعيت، فروشندگان اختيار معامله بايد حين انعقاد قرارداد به اتاق پاياپای وكالت و اجازه دهند كه اتاق پاياپای، مشتری طرف قرارداد آنان يا هر دارنده اختيار معامله را برای اعمال اختيار به آنان حواله دهد.
                    </p>
                    <p>
                        . در همه مواردی كه مشتري ملزم به واريز وجه به حساب كارگزار است، مبالغ بايد به شماره حساب جاری .......................................
                        نزد بانك عامل بانك  ................    شعبه .................  بابت معاملات قرارداد اختيار معامله به نام كارگزار واريز شود و رسيد واريز وجه به شماره  ..................  داخلی ...... فكس و تصوير اسكن شده آن به آدرس  .....................................................    ايميل شود.
                    </p>
                </div>
                <div>
                    <h5>
                        ماده6:
                    </h5>
                    <p>
                        1.	نماینده كارگزار جهت اجرای مفاد این قرارداد و ارتباط با مشتری، آقا/خانم ................... است.تکمیل وامضای سایر مدارک توسط نماینده برای کارگزار الزام آور است.
                    </p>
                    <p>
                        2.	كارگزار مسئوليت ايفای تعهدات مشتريان در مقابل اتاق پاياپاي را به شرح دستورالعمل بر عهده دارد.
                    </p>
                    <p>
                        3.	كارگزار بايد سفارش مشتريان را در فرمهای تعيين شده توسط بورس ثبت و نگهداری كند.
                    </p>
                    <p>
                        4.	كارگزار بايد فرم های ثبت سفارش را براي هر مشتری به ترتيب شماره سريال، بايگاني كند و حسب درخواست به بورس يا سازمان ارائه نمايد. جهت رعايت نوبت مشتريان ثبت تاريخ و زمان دقيق تكميل فرم سفارش الزامي است.
                    </p>
                    <p>
                        5.	كارگزار بايد در زمان اخذ سفارش خريد يا فروش، هزينه های معاملاتي به علاوه ارزش معاملاتي قرارداد اختيار معامله يا وجه تضمين موردنياز را، حسب مورد، به حساب مشتری منظور كند. حساب مشتری از محل وجوه واريزی وي به حساب عملياتي كارگزار، بستانكاری وی در دفاتر كارگزاری و وجوه متعلق به كارگزار قابل تأمين است.
                    </p>
                    <p>
                        6.	كارگزار موظف است شماره حساب جاری خود نزد بانك عامل را كه مطابق فرم اعلام حساب در اختيار، افتتاح آن را به اطلاع بورس و شركت سپرده گذاري مركزي اوراق بهادار و تسويه وجوه رسانده است، در بند ١٦ ماده ٥ مرقوم كند.
                    </p>
                    <p>
                        7.	كارگزار موظف است در دفاتر خود برای هر مشتری و نماد معاملاتي، سرفصل های جداگانه ای ايجاد كند و در زمان اجرای سفارش های مشتری از كفايت وجه تضمين اوليه در حساب وی اطمينان يابد.
                    </p>
                    <p>
                        ٨.  كارگزار بايد سوابق معاملات و صورتحساب مشتری را به نحوی نگهداری كند كه حسب مورد به سازمان، بورس يا شركت سپرده گذاری قابل ارائه باشد.
                    </p>
                    <p>
                        9. در صورتي كه مشتری پس از ارائه سفارش و قبل از انجام معامله در چارچوب مقررات از اجراي سفارش منصرف شود يا كارگزار به هر علت نتواند نسبت به اجرای سفارش مشتری اقدام كند، حسب درخواست مشتري وجوه وی بايد توسط كارگزار مسترد شود.
                    </p>
                    <p>
                        ١٠ . كارگزار مي تواند در مورد سفارش های فروش، علاوه بر وجه تضمين اوليه، به منظور اطمينان از ايفای تعهدات مشتری، وثايق يا تضاميني تا سقف تعيين شده در مشخصات قرارداد از مشتری دريافت كند.
                    </p>
                    <p>
                        ١١ . كارگزار موظف است در صورت دريافت وجه تضمين اوليه از مشتری، سفارش وی را در سامانه معاملات بازار اختيار معامله ثبت كند و مجاز نيست به هيچ وجه از وجوه مشتريان به نفع خود يا ساير اشخاص استفاده نمايند.
                    </p>
                    <p>
                        ١٢ .كارگزار پس از دريافت گزارش اتاق پاياپای عمليات به روزرساني حساب ها را بر اساس مفاد دستورالعمل انجام مي دهد.
                    </p>
                    <p>
                        ١٣ . شيوه ابلاغ اخطاريه افزايش وجه تضمين به مشتري به يكي از روش های زير است:
                    </p>
                    <p>
                        ١) حضوری و اخذ امضای مشتری؛
                    </p>
                    <p>
                        ) ارسال به شماره فاكس {userData?.addresses[0]?.fax}   و پست الكترونيكي به آدرس {userData?.addresses[0]?.email}  و يا تماس با شماره {userData?.addresses[0]?.mobile}2
                    </p>
                    <p>
                        1٤ . كارگزار موظف است اگر مشتری مشمول دريافت اخطاريه افزايش وجه تضمين شده است، تا پيش از واريز وجوه يا بستن موقعيت های باز توسط مشتری، متناسب با اخطاريه افزايش وجه تضمين، سفارش های افزاينده موقعيت های باز مشتری را نپذيرد.
                    </p>
                    <p>
                        ١٥ . اگر مشتری تا ................................... ساعت پس از شروع معاملات روز بعد، وجه تضمين خود را تا وجه تضمين لازم روز معاملاتي قبل افزايش ندهد، كارگزار بايد در همان روز معاملاتي، راساً اقدام به بستن آن دسته از موقعيت های باز مشتری كه تعهدات وجه تضمين آن ايفا نشده است، كند. در صورت بستن موقعيت توسط كارگزار، قرارداد اختيار معامله بر اساس قيمت معامله ای كه منجر به بستن موقعيت شده است، تسويه مي شود.
                    </p>
                    <p>
                        . كارگزار بايد مازاد موجودی حساب مشتری نسبت به وجه تضمين تعيين شده را در صورت درخواست مشتری به حساب بستانكاری مشتری منظور و حداكثر دو روز كاری پس از درخواست مشتری به وی پرداخت كند
                    </p>
                    <p>
                        ١٧ . مشتري مي تواند پس از پايان جلسه معاملات، تا انتهای روز كاري از كارگزار درخواست كند تا اطلاعات موقعيت های باز وي را به لحاظ تغييرات وجه تضمين، سود (زيان) روزانه و ساير موارد به وی ارائه كند و كارگزار موظف است پيش از شروع جلسه معاملات روز كاری بعد، اطلاعات درخواستي را در اختيار مشتری قرار دهد.
                    </p>
                    <p>
                        ١٨ . اگر از تاخير يا عدم اقدام كارگزار در ايفای تعهدات موضوع دستورالعمل در مقابل اتاق پاياپای، خسارتي به مشتري وارد شود يا مشتری متحمل هزينه هايي شود، كارگزار ملزم به جبران همه هزينه ها و خسارات وارده است. مسئوليت كارگزار منوط به تأمين به موقع وجوه توسط مشتري نزد كارگزار است.
                    </p>
                    <p>
                        ١٩ . كارگزار موظف است نسبت به حفظ و عدم افشای اطلاعات سفارش ها و معاملات مشتری مطابق مقررات، تمهيدات لازم را به كار برد.
                    </p>
                    <p>
                        ٢٠ .كارگزار موظف است نسبت به حفظ و عدم افشای اطلاعات سفارش ها و معاملات مشتری مطابق مقررات، تمهيدات لازم را به كار برد.
                    </p>
                    <p>
                        ٢١ .كارگزار موظف است بنا به درخواست مشتری، گزارش كاملي از ريز معاملات انجام شده مشتري و وضعيت حساب وي را به يكي از روشهای مندرج در بند ١٣ ماده ٦ قرارداد مشتري-كارگزار ارائه نمايد.
                    </p>
                </div>
                <div>
                    <h5>
                        ماده ٧ :تسويه نهايی قرارداد اختيار معامله
                    </h5>
                    <p>
                        ١. دارنده موقعيت باز خريد در صورت تمايل به اعمال قرارداد اختيار معامله، بايد درخواست اعمال و نوع تسويه خود را در مهلت مقرر در مشخصات قرارداد به روش تعیین شده توسط کارگزار به كارگزار ارائه كند.
                    </p>
                    <p>
                        ٢. كارگزار بايد در زمان مشخص شده در مشخصات قرارداد، درخواست هاي اعمال را به همراه نوع تسويه به اتاق پاياپای اعلام كند. اعلام كارگزار مبنای تخصيص وجوه موجود در حساب اعمال كارگزار به تفكيك مشتری است.
                    </p>
                    <p>
                        ٣. كارگزار بايد در زمان مشخص شده  ، تعهدات مربوط به اعمال دارندگان موقعيت باز تخصيص يافته را به اطلاع ايشان برساند. شيوه ابلاغ به مشتری به يكي از روش هاي زير است:
                    </p>
                    <p>
                        ١) حضوري و اخذ امضای مشتری؛
                    </p>
                    <p>
                        ٢) ارسال به شماره فاكس .................  و پست الكترونيكي به آدرس ...............................
                    </p>
                    <p>
                        3) آنلاین
                    </p>

                    ٤. اگر دارنده موقعيت باز خريد، قرارداد اختيار معامله را اعمال كند، دارنده موقعيت باز فروش موظف به انجام تعهدات خود مطابق با دستورالعمل مي باشد. اگر دارنده موقعيت باز فروش به تعهدات خود عمل نكند، قرارداد اختيار معامله بر اساس قيمت پاياني سهم پايه در آخرين روز معاملاتي، تسويه نقدی و خسارت های مقرر در مشخصات قرارداد از وی دريافت مي شود.
                </div>
                <p>
                    ٥. اجرای درخواست اعمال فيزيكي قرارداد اختيار معامله خريد، مستلزم تامين ارزش اعمال قرارداد اختيار معامله توسط دارندة موقعيت باز خريد و اجراي درخواست اعمال فيزيكي قرارداد اختيار معامله فروش، مستلزم وجود سهم پايه به تعداد اندازة قرارداد در كد مالكيت دارنده موقعيت باز خريد در زمان مشخصشده در مشخصات قرارداد است.                </p>

                <p>
                    ٦. در مورد موقعيت های باز فروش، فروشنده بايد در مهلت مقرر در مشخصات قرارداد، حسب مورد، ارزش اعمال قرارداد اختيار معامله را در حساب اعمال كارگزار تامين كرده يا سهم پايه موضوع قرارداد اختيار معامله را در كد مالكيت خود در شركت سپرده گذاری مركزی اوراق بهادار و تسويه وجوه داشته باشد. سهم پايه موجود در كد مالكيت فروشنده به ميزان تعهد وی در قرارداد اختيار معامله توسط شركت سپرده گذاری مركزی اوراق بهادار و تسويه وجوه مسدود مي شود. در غير اين صورت، قرارداد اختيارمعامله بر حسب قيمت پاياني سهم پايه در آخرين روز معاملاتي، تسويه نقدي مي شود و مشتري ملزم به پرداخت خساراتي است كه توسط اتاق پاياپای از كارگزار دريافت مي شود.                </p>
                <p>
                    ٧. اگر درخواست اعمال ارائه شده توسط كارگزار به دليل عدم وجود شرايط موضوع ماده ٤٣ دستورالعمل اجرا نشود، عليرغم عدم اجرای درخواست اعمال، كارگزار مكلف به پرداخت كارمزد هاي اعمال مي باشد. مشتری ملزم به پرداخت خسارتهای موضوع اين بند به كارگزار    مي باشد.
                </p>
                <p>
                    ٨. اعمال قرارداد اختيار معامله در زمان توقف نماد معاملاتي آن امكان پذير نيست. صرفاً قرارداد اختيار معامل های كه تا پايان دوره معاملاتي متوقف باشد، در آخرين روز معاملاتي مي تواند اعمال شود كه در اين صورت قرارداد اختيار معامله براساس آخرين قيمت پاياني سهم پايه در بازار نقدی، تسويه نقدی مي شود.                </p>
                <p>
                    ٩. در صورتي كه پس از اعمال، ميزان مالكيت سهامدار از سقف هاي مجاز سهامداری بيشتر گردد، سهامدار مزبور موظف به عرضه سهام مازاد ايجاد شده به علت اعمال در مهلت تعيين شده توسط بورس خواهد بود.                </p>
                <p>
                    ١٠ . درخواست اعمال مشتری، پس از ارسال آن توسط كارگزار به اتاق پاياپای، قابل اصلاح يا لغو نيست.
                </p>

                <div>
                    <h5>
                        ماده ٨: حوادث ناگهانی و فورس ماژور
                    </h5>
                    <div>
                        هرگاه اجراي تمام يا بخشي از قرارداد به واسطه يك علت خارجي، غيرقابل پيشگيری، مقاومت ناپذير و غيرقابل يپش بيني غيرممكن شود يا به تأخير افتد، طرفي كه در اين وضعيت قرار گرفته است مسئول جبران خسارات ناشي از عدم اجرا يا تاخير در اجرای قرارداد نيست. در اين صورت وی مكلف است در اسرع وقت (حداكثر ٧ روز كاري) مراتب را كتباً به طرف مقابل اطلاع دهد.
                    </div>
                    <div>
                        اعلام رسمي بورس يا شركت سپرده گذاری مركزي در حكم اطلاع مشتری است.
                    </div>
                </div>

                <div>
                    <h5>
                        ماده ٩:فسخ قرارداد
                    </h5>
                    <p>
                        ١. هر يك از طرفين مي توانند در صورت تحقق موارد ذيل، مراتب را با ذكر مستندات به طرف ديگر اعلام كند. اگر در مدت ده روز كاری پاسخي ارائه نشود يا پاسخ ارائه شده مورد قبول اخطاردهنده نباشد، فسخ قرارداد كتباً به طرف ديگر اعلام مي شود:
                    </p>
                    <p>
                        ١) نقض هر يك از شروط قرارداد*
                    </p>
                    <p>
                        ٢) بروز حوادث موضوع ماده ٨ و تداوم آن بيش از بيست روز كاری*
                    </p>
                    <p>
                        ٢. هر گاه مشتری از ادامه همكاری در بازار قرارداد اختيار معامله از طريق كارگزار منصرف شود، ميتواند قرارداد را فسخ كند، مشروط به آن كه مراتب را از قبل، ظرف دو روز كاري به كارگزار اعلام كند.
                    </p>
                    <p>
                        تبصره ١) فسخ قرارداد مانع مطالبه هزينه ها و خسارات مقرر در قرارداد نيست.
                    </p>
                    <p>
                        تبصره ٢) همزمان با فسخ قرارداد، هر يك از طرفين موظف به اعلام كتبي مراتب با ذكر دقيق تاريخ فسخ، به بورس هستند.
                    </p>
                    <p>
                        تبصره ٣) در صورت فسخ قرارداد توسط هر يك از طرفين، نسبت به تسويه حساب مطابق اعلام كارگزار اقدام می شود.
                    </p>
                </div>

                <div>
                    <h5>
                        ماده ١٠ :حل اختلافات
                    </h5>
                    <p>
                        در صورت بروز اختلاف در تفسير يا اجرای مفاد تمام يا بخشي از قرارداد، طرفين بدواً سعی خواهند كرد كه آن را از طريق مذاكره حل وفصل كنند. در صورت عدم حصول نتيجه، ترتيبات مواد ٣٦ و ٣٧ قانون بازار اوراق بهادار در مورد حل اختلاف لاز م الاجرا است.
                    </p>
                </div>

                <div>
                    <h5>
                        ماده ١١ :اقامتگاه قانونی طرفين
                    </h5>
                    <p>
                        اقامتگاه طرفين همان است كه در ماده يك قرارداد ذكر شده است. هر يك از طرفين در صورت تغيير نشاني موظف است اقامتگاه جديد خود را ظرف مدت حداكثر ٧ روز كاري پس از تغيير به طرف ديگر اطلاع دهد. تا زماني كه نشاني جديد اعلام نشده است، مكاتبات به آدرس قبلي ارسال مي شوند و دريافتشده تلقي مي شوند. اين قرارداد در ١١ ماده و ٣ تبصره، در سه نسخه تنظيم شد و در تاريخ {moment().locale('fa').format("YYYY/MM/DD")} به امضای طرفين رسيد. يك نسخه از قرارداد نزد طرفين خواهد بود و نسخه ديگر به بورس ارائه مي شود.
                    </p>
                </div>

                <div>
                    <h4>
                        فرم بيانيه ريسك
                    </h4>
                    <p>
                        اين بيانيه در راستاي اجراي بند ١٨ ماده ١ و ماده ١٨ دستورالعمل معاملات قرارداد اختيار معامله سهام ، مصوب مورخ 17/09/1395 هيأت مديره سازمان بورس و اوراق بهادار، توسط شركت بورس اوراق بهادار تهران تنظيم شده است و بايد پيش از آغاز معاملات به امضای مشتری برسد. با توجه به ريسك در معاملات قراردادهای اختيار معامله، مشتری با امضای اين بيانيه، آگاهي و پذيرش خود را از موارد زير اعلام     مي كند:
                    </p>
                    <p>
                        1) محدود نشدن حداكثر ضرر به وجوه تضمين پرداخت شده توسط مشتري: دارنده موقعيت باز خريد در اعمال حق خود، مختار است و در صورت صرف نظر كردن از اعمال قرارداد، تنها مبلغي ( قيمت قرارداد اختيار معامله) را كه در ازاي اين حق پرداخت است، از دست ميدهد. به بيان ديگر دارنده موقعيت باز خريد مي تواند در صورتيكه شرايط به نفع او نباشد، از اعمال اختيار خودداري كرده و هزينه او محدود به همان مبلغ اوليه ای است كه برای ايجاد حق يا اختيار به فروشنده پرداخت نموده است. اما دارنده موقعيت باز فروش در صورت درخواست اعمال خريدار متعهد به انجام موضوع قرارداد ميباشد. در همين راستا به منظور جلوگيری از امتناع از انجام تعهدات قرارداد، وجهي در قالب شرط ضمن عقد ذيل عناوين وجه تضمين اوليه، لازم، جبراني و اضافي (حسب مورد) توسط كارگزار از او دريافت مي شود. با توجه به ويژگي های اهرمي قرارداد اختيار معامله، ريسك دارنده موقعيت باز فروش محدود به وجه تضميين سپرده شده نخواهد بود، بلكه ممكن است ضرر و زياني به ميزان چندين برابر وجوه تضمين مشتری به حساب وی منظور گردد.
                    </p>
                    <p>
                        ٢) خسارتهاي عدم ايفاي تعهدات: مبلغي است كه به عنوان وجه التزام بابت عدم ايفاي تعهدات دارندگان موقعيت هاي باز، متناسب با موقعيت هاي ايشان براساس شرايط مندرج در مشخصات قرارداد اخذ مي شود.
                    </p>
                    <p>
                        ٣)رعايت سقف هاي پيش بيني شده: در صورت اعلام بورس مبني بر رعايت سقفهاي مربوط به قراردادهاي اختيارمعامله در يك نماد معين، موقعيت های باز و هم جهت نبايد از سقف های تعيين شده تجاوز كند. سقف موقعيت های باز در سطح مشتري، كارگزار و بازار و سقف موقعيت های هم جهت در سطح مشتری و كارگزار در مشخصات قرارداد تعيين ميشود. همچنين بورس ميتواند حداكثر تعداد مجاز قرارداد اختيار معامله به ازای هر سفارش را تحت عنوان سقف سفارش تعيين و در مشخصات قرارداد اعلام كند.
                    </p>
                    <p>
                        ٤) احتمال كاهش نقدشوندگي بازار تحت شرايط خاص: متداول ترين روش خروج از بازار قراردادهای اختيار معامله، انجام معامله متقابل موقعيت باز فعلي (معامله معكوس) مشتری است. مشتری ممكن است در شرايط خاص با توجه به نيروهاي عرضه و تقاضا و تغييرات قيمت روزانه، در زمان مناسب (و با قيمت مورد نظر) نتواند از بازار خارج شود و زياني به وي تحميل شود. در اين صورت مشتری حق اعتراض ندارد.
                    </p>
                    <p>
                        ٥) اثر توقف نماد معاملاتي: توقف و بازگشايي نماد معاملاتي قراردادهاي اختيار معامله، به طور همزمان با توقف و بازگشايي سهم پايه در بازار نقدي و به يك روش انجام مي شود. در شرايط خاصي طبق دستورالعمل، سازمان يا مديرعامل شركت بورس ميتواند دستور توقف نماد معاملاتي را صادر كند. بازگشايي مجدد نماد تحت شرايطي مي تواند بر سود و زيان موقعيت های باز تاثيرگذار باشد.همچنين اعمال قرارداد اختيار معامله در زمان توقف نماد معاملاتي آن امكان پذير نيست. صرفاً قرارداد اختيارمعامله ای كه تا پايان دوره معاملاتي متوقف باشد، در آخرين روز معاملاتي مي تواند اعمال شود كه در اين صورت قرارداد اختيار معامله براساس آخرين قيمت پاياني سهم پايه در بازار نقدی، تسويه نقدی مي شود.
                    </p>
                    <p>
                        ٦) اطلاعات مندرج در مشخصات قرارداد و ساير مقررات مربوطه: آشنايي با مقررات، به مشتري امكان مي دهد تا از حقوق و تعهدات خود، آگاهي و پذيرش كامل داشته باشد. مطالعه دقيق بيانيه ريسك، قرارداد مشتري-كارگزار،دستورالعمل معاملات و سايرمقررات مرتبط، از الزامات فعاليت در اين بازار بوده و كارگزار و بورس مسئوليتي درخصوص فقدان آگاهي مشتري نخواهند داشت.
                    </p>
                    <p>
                        ٧) اهميت و مديريت تاريخ سررسيد و سبك اعمال تعيين شده در قرارداد: تاريخ سررسيد، تاريخي است كه پس از آن قرارداد اختيار معامله منقضي ميشود. دارندة موقعيت باز خريد مي تواند براساس سبك اعمال تعيين شده در مشخصات قرارداد، قرارداد اختيار معامله خود را اعمال كند. اعمال مي تواند براساس ضوابط اين دستورالعمل تا آخرين روز معاملاتي، صرفاً در آخرين روز معاملاتي يا در برخي از روزهای معاملاتي صورت پذيرد.
                    </p>
                    <p>
                        ٨) آگاهي از كارمزدها و كسور قانوني: كارمزدهای بازار قراردادهای اختيار معامله، شامل كارمزد معاملات و كارمزد اعمال است. كارمزد اعمال از همه دارندگان موقعيت باز تخصيص يافته توسط اتاق پاياپای (هم قابل اعمال و هم غيرقابل اعمال) اخذ مي شود.
                    </p>
                    <p>
                        همچنين چنانچه تسويه به صورت فيزيكي باشد، از همه دارندگان موقعيت باز فروش در قرارداد اختيار معامله خريد و همه دارندگان موقعيت باز خريد در قرارداد اختيار معامله فروش كه سهم پايه موضوع قرارداد را به طرف مقابل تحويل ميدهند، ماليات اخذ خواهد شد.
                    </p>
                    <p>
                        ٩) ثبت سفارشها و اولويت بندی ها: همه مشتريان به منظور فعاليت در بازار مشتقه بايد فرم بيانيه ريسك و قرارداد في مابين مشتري و كارگزار را نزد كارگزار تكميل و امضا كنند. فرم بيانيه ريسك توسط بورس تهيه و ابلاغ مي شود.انواع سفارش و اعتبار آن در بازار مشتقه به شرح دستورالعمل اجرايي نحوه انجام معاملات در بورس اوراق بهادار تهران، مصوب هيئت مديره سازمان بورس و اوراق بهادار است كه براساس ملاحظات فني، توسط بورس انتخاب مي شود. اجرای سفارش هاي ثبت شده در سامانه معاملاتی بر اساس اولويت قيمت و در صورت برابری قيمت ها، بر اساس اولويت زماني ثبت سفارش انجام مي شود
                    </p>
                    <p>
                        .١٠ ) خطای كاربری يا سامانه معاملاتي: اگر كارگزار به دليل خطای كاربری يا سامانة معاملاتي، نسبت به معاملات معترض باشد، بايد مراتب اعتراض خود را با ذكر دليل براي رسيدگي تا پايان معاملات همان روز به بورس اعلام كند.تصميم مديرعامل بورس در اين زمينه لازم الاجرا است. چنانچه كارگزار و بورس در اثر اختلالات مخابراتي و سيستم های الكترونيكي و ساير عواملي كه خارج از اراده كارگزار و بورس ميباشد، قادر به اجرای سفارشهای مشتري نباشند و به واسطه ی اين اختلالات، خسارتي به مشتری وارد آيد، مسئوليتي متوجه كارگزار و بورس نخواهد بود و تمامي مسئوليت ها متوجه مشتری ميباشد.
                    </p>
                    <p>
                        &lrm;به موجب اين سند، اينجانب/اين شركت&lrm;
                        &lrm;{userData?.privatePerson?.firstName+' '+userData?.privatePerson?.lastName}&lrm;
                        بيانيه ريسك را دريافت و مطالعه نموده و ضمن اعلام اطلاع از كليه مقررات و خصوصيات معاملاتي و تمامي ريسك هايي كه در بازار قرارداد اختيار معامله متصور بوده و يا احتمال وقوع دارد و نيز با شناخت و درك كامل از ماهيت امر و پذيرش مقررات مربوطه، مراتب را تاييد كرده و ملتزم ميگردد.
                    </p>
                </div>
            </div>
        </>
    )
}