import React, {useCallback, useContext, useRef, useState} from "react";
import {SejamContext} from "../../../pages/main";
import ReactToPrint from "react-to-print";
import {PrinterIcon} from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import PageHeaderFooter from "./PageHeaderFooter";
import {
    legalPersonTypeCategoryEnums
} from "../../common/enums";
import LabelValue from "../../common/component/LabelValue";

export default function TotalBrokerageAgreement() {
    const {userData, userDefaultBank} = useContext<any>(SejamContext)
    const [loading, setLoading] = useState(false);

    const componentRef = useRef(null);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const reactToPrintTrigger = () => {
        return (
            <button className={'flex item-center button bg-red-600 w-fit text-white float-left'}>
                چاپ
                {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
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
                documentTitle="تعهد نامه ثبت نام غیر حضوریقرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار) "
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef} className={'mobileAgreement'} >
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
                                    <h4 className={'mb-5'}>قرارداد جامع مشتري و کارگزار (در خصوص اوراق بهادار) </h4>
                                </div>
                                <p>
                                    <span className="font-weight-bold">این قرارداد بین شرکت کارگزاري توانا (مشاوران سهام سابق)</span>
                                    به
                                    شماره
                                    ثبت
                                    159302 کد اقتصادي
                                    ۴۱۱۱۴۴۸۴۴۴۸۷ به نمایندگی آقاي/خانم
                                    &lrm;<span
                                    className="font-weight-bold"> علی یزدانی با سمت رئیس هیأت مدیره</span>&lrm;
                                    &lrm;و آقاي/خانم&lrm;
                                    &lrm;<span className="font-weight-bold">حمیدرضا طریقی با سمت مدیرعامل </span> بر
                                    اساس آخرین روزنامه رسمی&lrm;
                                    به
                                    نشانی
                                    تهران،خیابان میرعماد، نبش کوچه ی سوم , روبروی فرمانداری پلاک 10 طبقه ی دوم شرقی
                                    کد پستی 1587946317 شماره تلفن <span className="font-weight-bold">42906-021</span> و
                                    نشانی سایت اینترنتی <a href="https://www.tavana.net">www.tavana.net</a> که
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    از این پس در این قرارداد "کارگزار" نامیده می‌شود از یک طرف و "مشتري" با مشخصات مندرج
                                    در جدول زیر از
                                    طرف دیگر،
                                    به شرح مواد ذیل منعقد گردید.
                                </p>
                                <div className="text-right my-5">

                                    <table className={'table table-compact w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>الف) مشتري حقیقی: </h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={'نام و نام خانوادگی'} value={userData?.privatePerson?.firstName + '-' + userData?.privatePerson?.lastName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'نام پدر'} value={userData?.privatePerson?.fatherName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'شماره شناسنامه'} value={userData?.privatePerson?.serial + `/` + userData?.privatePerson?.seriShChar + userData?.privatePerson?.seriSh}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'کد ملی'} value={userData?.uniqueIdentifier}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={'تلفن ثابت'} value={userData?.addresses?.[0]?.tel}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'کد پستی منزل'} value={userData?.addresses?.[0]?.fax}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'شماره تلفن همراه'} value={userData?.addresses?.[0]?.mobile}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'آدرس پست الکترونیکی'} value={userData?.addresses?.[0]?.email}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={' نام بانک'} value={userDefaultBank?.bank?.name + ' ' + (userDefaultBank?.branchCode ? userDefaultBank?.branchCode : '')}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'شماره‌حساب بانکی'} value={userDefaultBank?.accountNumber}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'آدرس منزل'} value={userData?.addresses?.[0]?.remnantAddress}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <table className={'table table-compact w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>ب) مشتري حقوقی:</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={'نام'} value={userData?.legalPerson?.companyName}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'شماره ثبت'} value={userData?.legalPerson?.registerNumber}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'محل ثبت'} value={userData?.legalPerson?.registerPlace}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'تاریخ ثبت'} value={userData?.legalPerson?.registerDate}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={'نوع شخصیت'} value={legalPersonTypeCategoryEnums.find((item: any) => item.id === userData?.legalPerson?.legalPersonTypeCategory)?.title}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'نشانی پست الکترونیک'} value={userData?.legalPerson ? userData?.addresses?.[0]?.email:''}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <LabelValue title={'شماره حساب بانکی'} value={userData?.legalPerson ? userDefaultBank?.accountNumber:''}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'شماره شبا'} value={userData?.legalPerson ? userDefaultBank?.sheba:''}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table className={'table table-compact w-full'}>
                                        <thead>
                                        <tr>
                                            <td><h5>ج) نماینده حقوقی:</h5></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <LabelValue title={'نام و نام خانوادگی'} value={userData?.agent ? (userData?.agent?.firstName + ' '+ userData?.agent?.lastName):''}/>
                                            </td>
                                            <td>
                                                <LabelValue title={'کد ملی'} value={userData?.agent?.uniqueIdentifier}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-right">
                                    <p>
                                        <span className="font-weight-bolder">تبصره: </span> چنانچه این قرارداد یا هر یک
                                        از قراردادهاي متعاقب
                                        آن به
                                        نمایندگی (اعم از وکالت، ولایت، وصایت یا قیومیت )
                                        توسط شخص حقیقی یا حقوقی براي شخص حقیقی یا حقوقی دیگري منعقد شده باشد، نماینده
                                        نیز شخصاً مسئول ایفاي
                                        تعهدات
                                        ناشی از قرارداد حاضر و سایر قراردادهاي متعاقب آن است و در این خصوص با اصیل
                                        متضامناً مسئولیت خواهد
                                        داشت.
                                    </p>

                                    <div>
                                        <h5>ماده 1 </h5>
                                        <p>موضوع قرارداد حاضر عبارت است از ارائه خدمات کارگزاري از طرف کارگزار به مشتري
                                            در چارچوب قوانین و
                                            مقررات
                                            لازم‌الاجرا در بازار سرمایه. مادامی که توافق مکتوبی برخلاف مفاد این قرارداد
                                            بین طرفین منعقد نشده
                                            باشد یا بر
                                            اساس قوانین و مقررات اتخاذ ترتیبات دیگري الزامی نگردد، مفاد این قرارداد
                                            تعیین کننده حقوق و
                                            تکالیف
                                            طرفین بوده
                                            و بر کلیه توافقات و تعاملات بین کارگزار و مشتري حاکم است. </p>
                                    </div>
                                </div>
                                <p>انعقاد این قرارداد مشتري را مکلف نمی‌سازد تا صرفاً از خدمات کارگزار طرف این قرارداد
                                    استفاده نماید و
                                    استفاده
                                    مشتري از خدمات سایر شرکت‌های کارگزاري تأثیري بر نفوذ و اعتبار این قرارداد
                                    ندارد. </p>
                                <div>
                                    <h5>ماده 2 </h5>
                                    <p>این قرارداد از تاریخ امضاء توسط طرفین به مدت نامحدود اعتبار دارد. </p>
                                </div>

                                <h5>ماده 3 </h5>
                                <p>
                                    کلیه اطلاع‌رسانی‌های کارگزار به مشتري در خصوص وضعیت اجراي سفارشِ ارائه شده یا
                                    دریافت‌ها یا پرداخت‌های
                                    انجام
                                    شده فی‌مابین کارگزار و مشتري، از طریق سایت اینترنتی کارگزار به نشانی <a
                                    href="https://www.tavana.net">www.tavana.net</a>
                                    انجام می‌شود و مشتري با
                                    استفاده از نام کاربري و گذرواژه‌ای که به شماره تلفن همراهِ معرفی شده توسط وي در صدر
                                    این قرارداد ارسال
                                    می‌گردد، قادر به دسترسی به اطلاعات مزبور خواهد بود. مشتري مکلف است پس از ارائه هر
                                    سفارش، واریز یا
                                    انتقال وجه
                                    به حساب کارگزار یا ارائه درخواست وجه از کارگزار، با مراجعه به سایت اینترنتی کارگزار
                                    از وضعیت اجراي
                                    سفارشِ
                                    ارائه شده یا دریافت‌ها یا پرداخت‌های انجام شده مطلع شود. درصورتی‌که کارگزار اطلاعات
                                    راجع به اجراي
                                    سفارش‌های
                                    دریافت شده یا دریافت‌ها یا پرداخت‌های انجام شده را بر روي سایت اینترنتی خود قرار
                                    داده باشد، عدم اطلاع
                                    مشتري
                                    به واسطه عدم مراجعه به سایت اینترنتی کارگزار موجب هیچ‌گونه مسئولیتی براي کارگزار
                                    نخواهد بود. درهرحال
                                    عدم طرح
                                    اعتراض از سوي مشتري ظرف مدت یک هفته از تاریخ درج اطلاعات راجع به اجراي سفارش‌ها یا
                                    دریافت‌ها یا
                                    پرداخت‌های
                                    انجام شده بر روي سایت اینترنتی کارگزار، به منزله تأیید و تنفیذ معاملات یا دریافت‌ها
                                    یا پرداخت‌های
                                    مذکور است.
                                </p>

                                <div>
                                    <p>
                                        <span> تبصره 1: </span>
                                        مسئولیت استفاده و حفاظت از رمز عبور و نام کاربري و
                                        نیز
                                        مسئولیت انجام هرگونه معامله و ضرر و زیان
                                        حاصله که از طریق نام کاربري و یا رمز عبور مشتري صورت می‌گیرد، بر عهده مشتري است.
                                    </p>
                                    <p>
                                        <span>تبصره 2: </span>
                                        چنانچه مشتري پیامکِ حاوي نام کاربري و رمز عبور خود
                                        را ظرف
                                        مدت 3 روز از تاریخ امضاي این قرارداد
                                        دریافت ننماید، مکلف است مراتب را به کارگزار اعلام کند. عدم اعلام این امر توسط
                                        مشتري به کارگزار ظرف
                                        موعد
                                        یادشده، به منزله وصول پیامکِ حاوي نام کاربري و رمز عبور به مشتري تلقی خواهد شد.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 4 </h5>
                                    <p>مشتري با امضا ذیل این قرارداد اعلام می‌نماید که به قوانین و مقررات حاکم بر بازار
                                        سرمایه آگاهی کافی
                                        دارد و
                                        از دانش کافی در خصوص انواع ابزارها و اوراق بهادار قابل معامله، شیوه‌های ارائه
                                        سفارش، نحوه انجام
                                        معامله
                                        در
                                        بازار سرمایه و تعهدات و الزامات ناشی از انجام معاملات برخوردار است و کارگزار هیچ
                                        گونه تعهدي به
                                        اطلاع‌رسانی و
                                        ارائه مشاوره در این خصوص، ندارد. بدیهی است در صورت وارد شدن هرگونه ضرر و زیان به
                                        مشتري در نتیجه عدم
                                        اطلاع و
                                        آگاهی از موارد یاد شده، هیچ گونه مسئولیتی متوجه کارگزار نخواهد بود. </p>
                                </div>

                                <div>
                                    <h5>ماده 5 </h5>
                                    <p>تکلیف کارگزار صرفاً اجراي سفارش‌های مشتري در حدود قوانین و مقررات حاکم بر بازار
                                        سرمایه است و کارگزار
                                        در
                                        خصوص نتایج و تبعات مالی یا غیرمالی معاملاتی که به درخواست مشتري و به نام او
                                        انجام می‌شود، هیچ گونه
                                        مسئولیتی
                                        ندارد. </p>
                                </div>
                                <div>
                                    <h5>ماده 6 </h5>
                                    <p>مشتري مکلف است کلیه وجوه را صرفاً به حساب بانکی معرفی شده در سایت اینترنتی
                                        کارگزار واریز نماید.
                                        چنانچه وجوه
                                        توسط مشتري به حساب بانکی دیگري واریز گردد، تمامی تبعات و مسئولیت‌های ناشی از آن
                                        تماماً بر عهده مشتري
                                        خواهد
                                        بود. </p>
                                </div>

                                <div>
                                    <h5>ماده 7 </h5>
                                    <p>
                                        مسئولیت صحت اطلاعات مندرج در صدر این قرارداد تماماً بر عهده مشتري است. همچنین
                                        مشتري متعهد می‌گردد در
                                        صورت
                                        تغییر در هر یک از اطلاعات مندرج در صدر این قرارداد، بلافاصله مراتب را به کارگزار
                                        اطلاع دهد.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 8 </h5>
                                    <p>
                                        مشتري با امضا ذیل این قرارداد تأیید می‌نماید که حساب معرفی شده در مقدمه قرارداد
                                        صرفاً به نام وي است
                                        و
                                        حساب
                                        مزبور، مسدود یا راکد نیست.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 9 </h5>
                                    <p>وجوهی که توسط مشتري به حساب کارگزار واریز می‌شود، در دفاتر کارگزار صرفاً به نام
                                        شخص مشتري ثبت
                                        می‌گردد.
                                        همچنین در صورتی که وجوهی توسط مشتري به حساب کارگزار واریز گردد لیکن هویتِ شخص
                                        واریز کننده مشخص
                                        نباشد،
                                        کارگزار وجوه مزبور را در حساب مشتري ثبت و اعمال نخواهد نمود و وجوه مزبور تا زمان
                                        احراز هویت شخص
                                        واریز
                                        کننده،
                                        در سرفصل حساب واریزی‌های نامشخص ثبت می‌گردد. </p>
                                </div>
                                <div>
                                    <h5>ماده 10 </h5>
                                    <p>مشتري مکلف است پیش از ارائه سفارشِ خرید، نسبت به تأمین منابع مالی لازم جهت اجراي
                                        سفارش اقدام نماید و
                                        در
                                        صورت عدم تأمین منابع مالی، کارگزار تکلیفی به اجراي سفارش ندارد. در صورتی که پس
                                        از اجراي سفارش، مشتري
                                        بنا به
                                        هر دلیلی به استثناي معاملاتی که توسط کارگزار براي مشتري به اشتباه انجام شده است،
                                        به کارگزار بدهکار
                                        شود، مکلف
                                        خواهد بود فوراً نسبت به تسویه بدهی خود که از این محل ناشی می‌شود، اقدام نماید.
                                        چنانچه ظرف مدت 2 روز
                                        کاري از
                                        تاریخ انجام معامله، مشتري نسبت به تسویه حساب اقدام ننماید، مکلف خواهد بود ...
                                        درصد مبلغ بدهی را به
                                        عنوان وجه
                                        التزام به کارگزار بپردازد. </p>
                                </div>
                                <p>
                                    <span className="font-weight-bolder">تبصره 1: </span> در صورت عدم پرداخت بدهی موضوع
                                    این ماده توسط مشتري
                                    ظرف مهلت
                                    2 روز کاري، به‌موجب این قرارداد مشتري
                                    ضمن عقد خارج لازم کارگزار را وکیل و وصی پس از فوت خود قرار می‌دهد تا حسب مورد
                                    اقدامات زیر را انجام
                                    دهد:
                                </p>
                                <ul>
                                    <li>1. در صورت قابل معامله بودن هر یک از اوراق بهادارِ خریداري شده به نامِ مشتري،
                                        کارگزار می‌تواند ظرف
                                        حداکثر پنج روز معاملاتی از زمان اتمام مهلت مندرج در صدر این تبصره، نسبت به فروش
                                        هر یک از اوراق مزبور
                                        به
                                        تشخیص خود معادل مجموع بدهی و وجه التزام تعیین شده، اقدام نماید.
                                    </li>
                                    <li>2. در صورتی که هیچ یک از اوراق بهادارِ خریداري شده موقتاً قابل معامله نباشد،
                                        کارگزار می‌تواند به
                                        تشخیص
                                        خود نسبت به فروش هر یک از اوراق بهادار متعلق به مشتري معادل مجموع بدهی و وجه
                                        التزام تعیین شده، ظرف
                                        مدت
                                        حداکثر پنج روز معاملاتی از زمان اتمام مهلت مندرج در صدر این تبصره، اقدام نماید.
                                    </li>
                                    <li> 3. در صورتی که هیچ یک از اوراق بهادارِ متعلق به مشتري موقتاً قابل معامله نباشد،
                                        کارگزار می‌تواند
                                        ظرف
                                        مدت حداکثر پنج روز معاملاتی پس از فراهم شدن امکان معامله اوراق مذکور، نسبت به
                                        فروش آن اوراق معادل
                                        مجموع
                                        بدهی و وجه التزام تعیین شده، اقدام نماید.
                                    </li>
                                </ul>

                                <p>
                                    <span className="font-weight-bolder">تبصره 2: </span> در صورت اصلاح مقررات مربوط به
                                    تسویه معاملات، مواعد
                                    مقرر در
                                    این ماده و تبصره 1 آن نیز متناسب با
                                    مقرره مزبور اصلاح خواهد شد.
                                </p>
                                <div>
                                    <h5>ماده 11 </h5>
                                    <p>
                                        وجوه ناشی از اجراي سفارش‌های فروش مشتري پس از کسر بدهی هاي ناشی از معاملات، به
                                        حساب مشتري نزد
                                        کارگزار
                                        منظور
                                        خواهد شد و در صورت درخواست مشتري، ظرف مدت یک روز کاري از تاریخ ارائه درخواستِ
                                        قابل استناد و با رعایت
                                        زمان
                                        تسویه با اتاق پایاپاي، صرفاً به حساب معرفی شده توسط مشتري واریز خواهد شد. تغییر
                                        در حساب بانکی مشتري
                                        منوط به
                                        اعلام حساب بانکی جدید از طریق تکمیل فرم هاي مربوطه در کارگزاري خواهد بود.
                                    </p>
                                    <p><span className="font-weight-bolder">تبصره: </span> در صورتی که سفارش راجع به
                                        فروش اوراق بهاداري باشد
                                        که
                                        توسط
                                        کارگزار دیگري براي مشتري خریداري شده است،
                                        کارگزار می‌تواند در صورت اعلام بدهکار بودن مشتري توسط سایر شرکت‌های کارگزاري از
                                        پرداخت وجه حاصل از
                                        فروش به
                                        مشتري تا تعیین تکلیف نهایی موضوع خودداري نماید. </p>
                                </div>


                                <div>
                                    <h5>ماده 12 </h5>
                                    <p>
                                        در صورتی که کارگزار اشتباهاً معامله‌ای را به نام مشتري انجام داده باشد، مجاز است
                                        اقدامات لازم را به
                                        منظور
                                        رفع و اصلاح اشتباه انجام دهد و در صورتی که براي رفع یا اصلاح اشتباه، انجام
                                        معامله یا معاملات دیگري
                                        به
                                        نام
                                        مشتري ضرورت داشته باشد، مشتري ضمن عقد خارج لازم کارگزار را وکیل و وصی پس از فوت
                                        خود قرار می‌دهد تا
                                        نسبت به
                                        انجام معاملات مذکور از طرف مشتري اقدام نماید. در هر حال مسئولیت اشتباهات یاد شده
                                        و معاملاتی که
                                        کارگزار
                                        براي
                                        اصلاح آن‌ها انجام می‌دهد به عهدة کارگزار است و در صورتی که از این امر خسارتی
                                        متوجه مشتري گردد،
                                        کارگزار
                                        باید
                                        بلافاصله و بدون نیاز به مطالبه جبران خسارت از طرف مشتري، خسارت وارده به مشتري را
                                        به طریق مقتضی جبران
                                        نماید.
                                    </p>
                                </div>


                                <div>
                                    <h5>ماده 13 </h5>
                                    <p>مشتري و کارگزار ضمن عقد خارج لازم صرفاً در خصوص موارد ذیل حق اقامه دعوا علیه
                                        یکدیگر را پس از گذشت 2
                                        سال از
                                        مواعد مذکور در هر مورد به کلی از خود سلب و ساقط می‌نمایند و سپري شدن مدت‌های
                                        مورد اشاره در این ماده
                                        به
                                        منزلۀ
                                        صلح بلاعوض تمامی دعاوي احتمالی طرفین علیه یکدیگر در خصوص موارد ذیل است: </p>
                                    <p>1. هرگونه ادعا در مورد معامله‌ای که کارگزار به نام مشتري انجام داده و اطلاعات آن
                                        را در گزارش گردش
                                        حساب
                                        مشتري بر روي سایت اینترنتی خود در دسترس مشتري قرار داده است، پس از گذشت 2 سال از
                                        تاریخ ارائه اطلاعات
                                        یادشده؛ </p>
                                    <p>2. هر گونه ادعا در خصوص سفارش‌های ارائه شده توسط مشتري به کارگزار، پس از گذشت 2
                                        سال از تاریخ ارائه
                                        سفارش؛ </p>
                                    <p>3. هر گونه ادعا در خصوص واریز یا نقل‌وانتقال وجوه بین مشتري و کارگزار، پس از گذشت
                                        2 سال از تاریخ
                                        واریز یا
                                        نقل‌وانتقال وجوه </p>
                                </div>


                                <div>
                                    <h5>ماده 14 </h5>
                                    <p>در صورتی که به دلیل قطعی، کندي یا بروز اختلال در هر یک از سامانه‌هایی که کارگزار
                                        در اختیار مشتري قرار
                                        می‌دهد یا هر یک از سامانه‌هایی که کارگزار براي انجام معامله یا ثبت و ارسال سفارش
                                        از آن‌ها استفاده
                                        می‌کند؛
                                        سفارش یا سفارش‌های ارائه شده توسط مشتري قابل اجرا نباشد و این امر منجر به ورود
                                        خسارت به مشتري شود،
                                        کارگزار
                                        هیچ گونه مسئولیتی جهت جبران خسارت وارده به مشتري نخواهد داشت. </p>
                                </div>
                                <div>
                                    <h5>
                                        ماده 15
                                    </h5>
                                    <p>
                                        هرگاه اجراي تمام یا بخشی از این قرارداد به واسطه عامل خارجیِ غیرقابل رفع و
                                        غیرقابل پیش‌بینی (فورس
                                        ماژور)،
                                        غیرممکن شود یا به تأخیر افتد، مادام که شرایط مزبور برطرف نشده طرفی که در این
                                        وضعیت قرار گرفته است
                                        مسئول
                                        جبران خسارات ناشی از عدم اجرا یا تأخیر در اجراي مفاد قرارداد نیست.
                                    </p>
                                    <p>
                                        <span className="font-weight-bolder">تبصره:</span> مشتري نمی‌تواند به استناد
                                        بروز عامل خارجیِ
                                        غیرقابل رفع
                                        و
                                        غیرقابل پیش‌بینی، از پرداخت بدهی خودداري نماید و درهرحال موظف به پرداخت بدهی خود
                                        ظرف موعد مقرر در
                                        ماده
                                        9
                                        است.
                                    </p>
                                </div>

                                <div>
                                    <h5>ماده 16 </h5>
                                    <p>
                                        در صورت بروز اختلاف در تفسیر یا اجراي مفاد این قرارداد، موضوع توسط هیأت سه نفره
                                        داوري که توسط هیئت
                                        مدیره
                                        کانون کارگزاران بورس و اوراق بهادار انتخاب می‌شوند مورد بررسی و اتخاذ تصمیم قرار
                                        خواهد گرفت. رأي
                                        صادره
                                        از
                                        سوي داوران قطعی و براي طرفین قرارداد لازم‌الاجرا خواهد بود.
                                    </p>
                                </div>
                                <div className="mt-5">
                                    <p>
                                        این قرارداد در 16 ماده و 7 تبصره در دو نسخه که در حکم واحد می‌باشد تنظیم گردید و
                                        در تاریخ
                                        {moment().locale('fa').format("YYYY/MM/DD")}
                                        به امضاي طرفین رسید.
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