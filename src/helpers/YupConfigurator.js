import { useContext } from 'react'
import * as Yup from 'yup'
import { YupContext } from 'src/context/YupContext'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import fa from 'src/i18n/attributes/fa'

i18next.addResourceBundle('fa', 'attributes', fa)

function YupConfigurator({ children }) {
  const { rules } = useContext(YupContext)
  const { t } = useTranslation('validation')

  String.prototype.toFieldName = function ToFieldName() {
    const attributeName = this.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
      .toLowerCase()
      .split('.')
      .pop()
      .replaceAll('_', '_')

    return t(attributeName, { ns: 'attributes' })
  }

  Yup.setLocale({
    mixed: {
      required: ({ path }) => t('required', { path: path.toFieldName() }),
      oneOf: ({ path }) => t('one-of', { path: path.toFieldName() })
    },
    string: {
      min: ({ path, min }) => t('min-length', { path: path.toFieldName(), min }),
      max: ({ path, max }) => t('max-length', { path: path.toFieldName(), max }),
      email: ({ path }) => t('email', { path: path.toFieldName() }),
      length: ({ path, length }) => t('length', { path: path.toFieldName(), length })
    },
    number: {
      min: ({ path, min }) => t('min-number', { path: path.toFieldName(), min }),
      max: ({ path, max }) => t('max-number', { path: path.toFieldName(), max }),
      integer: ({ path }) => t('integer', { path: path.toFieldName() }),
      lessThan: ({ path, less }) => t('less-than', { path: path.toFieldName(), less }),
      moreThan: ({ path, more }) => t('more-than', { path: path.toFieldName(), more })
    },
    boolean: {
      isValue: ({ path }) => t('boolean', { path: path.toFieldName() })
    },
    array: {
      min: ({ path, min }) => t('min-select', { path: path.toFieldName(), min }),
      max: ({ path, max }) => t('max-select', { path: path.toFieldName(), max })
    }
  })

  Object.keys(rules).forEach(methodName => {
    Yup.addMethod(Yup.string, methodName, function Validate(/* errorMessage */) {
      return rules[methodName]
    })
  })

  return <>{children}</>
}

export default YupConfigurator
