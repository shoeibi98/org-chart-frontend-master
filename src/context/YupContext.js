import * as persianForm from 'src/helpers/form/persianForm'
import moment from 'moment-jalaali'
import React, { createContext } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import fa from 'src/i18n/validation/fa'
import i18next from 'i18next'

i18next.addResourceBundle('fa', 'validation', fa)

export const YupContext = createContext({})

const YupProvider = ({ children }) => {
  const { t } = useTranslation('validation')

  const messages = {
    password: t('password'),
    irNationalCode: t('national-code'),
    jalaliDate: t('jalali-date')
  }

  const rules = {
    isPassword: Yup.string()
      .min(10)
      .max(100)
      .test('isPassword', messages.password, value => {
        return persianForm.isPassword(value)
      }),
    irNationalCode: Yup.string().test('irNationalCode', null, (value, meta) => {
      const { path, createError } = meta
      if (!value) return true

      let isValid

      if (!/^\d{10}$/.test(value)) {
        isValid = false
      } else {
        const check = +value[9]

        const sum =
          value
            .split('')
            .slice(0, 9)
            .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11
        isValid = sum < 2 ? check === sum : check + sum === 11
      }

      if (isValid) {
        return true
      }

      return createError({
        path,
        message: messages.irNationalCode.replace('{path}', path.toFieldName())
      })
    }),
    isJDate: Yup.string().test('isJDate', null, (value, meta) => {
      const { path, createError } = meta
      if (!value) return true

      return (
        moment(value, 'jYYYY/jMM/jDD').isValid() ||
        createError({
          path,
          message: messages.jalaliDate.replace('{path}', path.toFieldName())
        })
      )
    })
  }

  const value = {
    rules
  }

  return <YupContext.Provider value={value}>{children}</YupContext.Provider>
}

export default YupProvider
