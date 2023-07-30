import { validSheba } from './helper'
import { banks, NationalIdJSON, ProvincesJSON } from './data'

export const isValidFile = file => {
  if (!file) return false

  return file.size >= 3000
}

export const isPostalCode = num => {
  if (!num) return false

  const strNum = num.toString()
  const regex = /^(\d[3-9|1]{4}-?\d[3-9|1]{4})$/
  const arr = []
  let repeatChar = false
  arr.push(strNum.split(''))
  const postalCode = arr[0]
  for (let i = 0; i <= postalCode.length; i++) {
    if (i <= 3) {
      const temp = postalCode[i]
      for (let j = i + 1; j <= 3; j++) {
        if (temp === postalCode[j]) {
          repeatChar = true
        }
      }
    } else if (i === 4) {
      if (postalCode[i] === '5') {
        repeatChar = true
      }
    }
  }
  return regex.test(strNum) && !repeatChar
}

export const isGpa = str => {
  if (!str) return false

  let regex = null
  const arr = str.split('')
  if (arr.length >= 3 && arr.length <= 5) {
    if (arr.length === 4) {
      console.log('bib')
      regex = /^([0-9]{1}\.?[0-9]{2})$/g
    } else {
      regex = /^([0-1]{1}[0-9]{1}\.?[0-9]{2})|(([2][0])\.?[0]{2})$/g
    }
  } else if (arr.length <= 2 && arr[0] !== 2 && arr[1] !== 0) {
    regex = /(^([0-9]{1})?([1]{1}[0-9]))|([2]{1}[0]{1})|(^([0-9]{1}))$/g
  } else if (arr.length === 2 && arr[0] === 2 && arr[1] === 0) {
    regex = /^[2]{1}[0]{1}$/g
  }

  if (regex) {
    if (regex.test(str)) {
      return true
    }
    return !str
  }

  return false
}

export const isMobilePhone = num => {
  if (!num) return false

  const strNum = num.toString()
  const regex = /^09\d{9}$/
  if (regex.test(strNum)) {
    return true
  }
  return strNum === null
}

export const isHomePhone = num => {
  if (!num) return false

  const strNum = num.toString()
  const regex = /^0\d{2}\d{8}$/
  if (regex.test(strNum)) {
    return true
  }
  return strNum === null
}

export const isFax = num => {
  if (!num) return true

  const strNum = num.toString()
  const regex = /^0\d{2}\d{8}$/
  return regex.test(strNum)
}

export const isNationalCode = num => {
  if (!num) return false

  let strNum = num.toString()
  if (!strNum.match(/^\d{10}$/)) return false
  strNum = `0000${strNum}`.substr(strNum.length + 4 - 10)
  if (parseInt(strNum.substr(3, 6), 10) === 0) return false
  const lastNumber = parseInt(strNum.substr(9, 1), 10)
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(strNum.substr(i, 1), 10) * (10 - i)
  }
  sum %= 11
  return (sum < 2 && lastNumber === sum) || (sum >= 2 && lastNumber === 11 - sum)
}

export const isPersian = (str, option = { isNumber: true }) => {
  if (!str) return false
  return false
  /*const regex = new RegExp(
    `^[\\u0600-\\u06FF\\uFB8A\\u067E\\u0686\\u06AF${
      option.isNumber ? "\\d" : null
    }]( ?[\\u0600-\\u06FF\\uFB8A\\u067E\\u0686\\u06AF${
      option.isNumber ? "\\d" : null
    }] ?)*$`
  )
  return regex.test(str);*/
}

export const isEnglish = (str, option = { isNumber: true }) => {
  //if (!str || str.split("")[0] === /\s/) return false
  return false
  /*const regex = new RegExp(
    `^[A-Za-z.@${option.isNumber ? "\\d" : null}]( ?[A-Za-z.@${
      option.isNumber ? "\\d" : null
    }] ?)*$`
  )
  return regex.test(str)*/
}

export const isPassword = str => {
  if (!str) return false

  const regex = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)
  return regex.test(str)
}

export const isEmail = str => {
  if (!str) return false

  const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/)
  return regex.test(str)
}

export const isAddress = (str, option = { maxNumber: 3 }) => {
  if (!str) return false

  const arr = []
  arr.push(str.split(''))
  const address = arr[0]
  let counter = 0
  for (let i = address.length; i >= 0; i--) {
    if (!Number.isNaN(arr[i]) && arr[i] !== String.fromCharCode(32)) {
      counter++
    }
  }
  return counter < option.maxNumber + 1
}

export const isDuplicate = (str, option = { maxDuplicate: 3 }) => {
  if (!str) return false

  const regex = new RegExp(`^(?:(.)(?!\\1{${option.maxDuplicate}}))+$`)
  return !regex.test(str)
}

export const isSheba = num => {
  if (!num) return false

  const strNum = num.toString()
  const pattern = /[0-9]{24}/
  if (strNum.length !== 24) {
    return false
  }
  if (!pattern.test(strNum)) {
    return false
  }
  let newStr = strNum.substr(4)
  const d1 = strNum.charCodeAt(0) - 65 + 10
  const d2 = strNum.charCodeAt(1) - 65 + 10
  newStr += d1.toString() + d2.toString() + strNum.substr(2, 2)
  return validSheba(newStr)
}

export const isCardNumber = num => {
  if (!num) return false

  const strNum = num.toString()
  const numResult = `${strNum}`
  const { length } = numResult
  if (length < 16 || parseInt(numResult.substr(1, 10), 10) === 0 || parseInt(numResult.substr(10, 6), 10) === 0) {
    return false
  }
  let sum = 0
  let even
  let subDigit
  for (let i = 0; i < 16; i++) {
    even = i % 2 === 0 ? 2 : 1
    subDigit = parseInt(numResult.substr(i, 1), 10) * even
    sum += subDigit > 9 ? subDigit - 9 : subDigit
  }
  return sum % 10 === 0
}

export const getBankNameFromCardNumber = num => {
  if (!num) return false

  const strNum = num.toString()
  if (strNum && strNum.toString().length === 16) {
    const code = strNum.toString().substr(0, 6)
    const findBank = banks.find(bank => bank.code === code)
    if (findBank) {
      return findBank.name
    }
    return null
  }
  return null
}

export const getPlaceByNationalCode = num => {
  if (!num) return false

  const strNum = num.toString()
  if (strNum && strNum.length === 10) {
    let code = strNum.toString().substring(0, 3)
    const find = NationalIdJSON.filter(row => row.code.toString().includes(code))
    if (find.length) {
      const findProvinces = ProvincesJSON.filter(province => province.code === find[0].parentCode)
      code = find[0].code.toString()
      return {
        city: find[0].city,
        province: findProvinces.length ? findProvinces[0].city : 'unknown',
        codes: code.includes('-') ? code.split('-') : [code]
      }
    }
    return null
  }
  return null
}
