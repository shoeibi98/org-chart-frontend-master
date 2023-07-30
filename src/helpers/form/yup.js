import * as Yup from 'yup'
import * as persianForm from 'src/helpers/form/persianForm'

const messageValidate = (type = 'matches', message = 'ورودی', object = '') => {
  switch (type) {
    case 'persian':
      return `فقط حروف فارسی وارد نمایید`
    case 'english':
      return `فقط حروف انگلیسی وارد نمایید`
    case 'repeat':
      return `لطفا کارکتر های تکراری وارد نکنید!!`
    case 'required':
      return `لطفا ${message} را وارد نمایید!`
    case 'matches':
      return `${message} معتبر نیست`
    case 'wrong':
      return `${message} اشتباه است!`
    case 'file':
      return `باید اندازه فایل کمتر از ${message} کیلوبایت باشد`
    case 'min':
      return `${message} باید بیشتر از ${object} حرف باشد`
    case 'max':
      return `${message} باید کمتر از ${object} حرف باشد`
    case 'exact':
      return `${object} باید ${message} حرف باشد`
    case 'password':
      return `رمز عبور باید دارای حروف کوچک، بزرگ، عدد و کارکتر باشد!`
    case 'choice':
      return `لطفا یکی از موارد بالا را وارد نمایید!`
    default:
      break
  }

  return ''
}

const methods = {
  isMobilePhone: Yup.string()
    .min(11, messageValidate('exact', '11', 'شماره همراه'))
    .max(11, messageValidate('exact', '11', 'شماره همراه'))
    .required(messageValidate('required', 'شماره همراه'))
    .test('isMobilePhone', messageValidate('matches', 'شماره همراه'), isMobilePhone =>
      persianForm.isMobilePhone(isMobilePhone)
    ),
  isNationalCardSerial: Yup.string()
    .required(messageValidate('required', 'سریال پشت کارت ملی'))
    .min(10, messageValidate('exact', '10', 'سریال پشت کارت ملی'))
    .max(10, messageValidate('exact', '10', 'سریال پشت کارت ملی'))
    .test('isEmail', messageValidate('english'), isEmail => persianForm.isEnglish(isEmail))
    .test('isEmail', messageValidate('matches', 'شماره همراه'), isEmail => persianForm.isEmail(isEmail)),
  isPostalCode: Yup.string()
    .required(messageValidate('required', 'کد پستی'))
    .min(10, messageValidate('exact', '10', 'کد پستی'))
    .max(10, messageValidate('exact', '10', 'کد پستی')),
  isNationalCode: Yup.string()
    .required(messageValidate('required', 'کد ملی'))
    .min(10, messageValidate('exact', '10', 'کد ملی'))
    .max(10, messageValidate('exact', '10', 'کد ملی'))
    .test('isNationalCode', messageValidate('wrong', 'کد ملی'), isNationalCode =>
      persianForm.isNationalCode(isNationalCode)
    )
    .test(
      'isNationalCode',
      messageValidate('repeat'),
      isNationalCode => !persianForm.isDuplicate(isNationalCode, { maxDuplicate: 5 })
    ),
  isSheba: Yup.string()
    .required(messageValidate('required', 'شماره شبا'))
    .min(24, messageValidate('exact', '24', 'شماره شبا'))
    .max(24, messageValidate('exact', '24', 'شماره شبا'))
    .test('isSheba', messageValidate('wrong', 'شماره شبا'), isSheba => {
      persianForm.isSheba(isSheba)
    })
    .test('isSheba', messageValidate('repeat'), isSheba => !persianForm.isDuplicate(isSheba)),
  isCardNumber: Yup.string()
    .required(messageValidate('required', 'شماره کارت'))
    .min(16, messageValidate('exact', '16', 'شماره کارت'))
    .max(16, messageValidate('exact', '16', 'شماره کارت'))
    .test('isCardNumber', messageValidate('wrong', 'شماره کارت'), isCardNumber => {
      persianForm.isCardNumber(isCardNumber)
    })
    .test('isCardNumber', messageValidate('repeat'), isCardNumber => !persianForm.isDuplicate(isCardNumber)),
  isPersian: Yup.string()
    .required(messageValidate('matches'))
    .test('isPersian', messageValidate('persian'), value => persianForm.isPersian(value))
    .test('isPersian', messageValidate('repeat'), value => !persianForm.isDuplicate(value)),
  isUserName: Yup.string()
    .required(messageValidate('required', 'نام کاربری'))
    .test('isUserName', messageValidate('english'), isUserName => persianForm.isEnglish(isUserName))
    .test('isUserName', messageValidate('repeat'), isUserName => !persianForm.isDuplicate(isUserName))
    .min(6, messageValidate('min', 'نام کاربری', '8'))
    .max(16, messageValidate('max', 'نام کاربری', '20')),
  isPassword: Yup.string()
    .required(messageValidate('required', 'رمز عبور'))
    .min(8, messageValidate('min', 'رمز عبور', '8'))
    .max(30, messageValidate('max', 'رمز عبور', '30'))
    .test('isPassword', messageValidate('isPassword'), isPassword => persianForm.isPassword(isPassword)),
  isBirthDate: Yup.string().required(messageValidate('required', 'تاریخ تولد')),
  isDate: Yup.string().required(messageValidate('required', 'تاریخ')),
  isRadioButton: Yup.string().required(messageValidate('choice')),
  isCheckBox: Yup.bool().oneOf([true], messageValidate('required', '')),
  isVin: Yup.string()
    .required(messageValidate('required', 'vin'))
    .test('isVin', messageValidate('english'), isVin => persianForm.isEnglish(isVin))
    .min(17, messageValidate('exact', '17', 'vin'))
    .max(17, messageValidate('exact', '17', 'vin'))
}

Object.keys(methods).forEach(methodName => {
  Yup.addMethod(Yup.string, methodName, function Validate(/* errorMessage */) {
    return methods[methodName]
  })
})

export default Yup
