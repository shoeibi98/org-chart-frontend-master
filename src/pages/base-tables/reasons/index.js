// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {Controller, useForm} from 'react-hook-form'


// ** Component Imports
import Input from "../../../components/form/Input";
import SingleSelect from "../../../components/form/SingleSelect";
import JalaliDatePicker from "../../../components/form/JalaliDatePicker";
import MultiSelect from "../../../components/form/MultiSelect";
import ReadOnlyTextArea from "../../../components/form/ReadOnlyTextArea";
import Radio from "../../../components/form/Radio";

const defaultValues = {
  age: '',
  firstName: '',
  skill: '',
  date: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  age: yup
    .string()
    // .min(1, obj => showErrors('age', obj.value.length, obj.min))
    .required(),
  skill: yup
    .array()
    // .min(1, obj => showErrors('skill', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    // .min(3, obj => showErrors('firstName', obj.value.length, obj.min))
    .required(),
  date: yup.date().required()
})

const Reasons = () => {
  // ** Hook
  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues,
    mode: 'onChange',
    // resolver: yupResolver(schema)
  })

  const onSubmit = (val) => {
    console.log("ok", val)
    toast.success('Form Submitted')
  }


  const age = [
    {id: 1, value: 'یک'},
    {id: 2, value: 'دو'},
    {id: 3, value: 'سه'},
    {id: 4, value: 'چهار'},
    {id: 5, value: 'پنج'},
    {id: 6, value: 'شش'},
    {id: 7, value: 'هفت'},
  ]

  const maritalStatus = [
    {id: "1", value: "مجرد"},
    {id: "2", value: "متاهل"},
    {id: "3", value: "سایر"}
  ]
  return <Card>
    <CardHeader title='Validation Schema With OnChange'/>
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='firstName'
                control={control}
                rules={{required: true}}
                render={(fieldProps) => (
                  <Input
                    {...fieldProps}
                    label='نام'
                    type="text"
                    required
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='age'
                control={control}
                rules={{required: true}}
                render={(fieldProps) => (
                  <SingleSelect
                    {...fieldProps}
                    label='سن'
                    required
                    options={age}
                    error={Boolean(errors.age)}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='skill'
                control={control}
                rules={{required: true}}
                render={(fieldProps) => (
                  <MultiSelect
                    {...fieldProps}
                    label='مهارت ها'
                    options={age}
                    required
                    error={Boolean(errors.age)}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='date'
                control={control}
                rules={{required: true}}
                render={(fieldProps) => (
                  <JalaliDatePicker
                    {...fieldProps}
                    label="تاریخ"
                    required
                    error={Boolean(errors.date)}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='city'
                control={control}
                render={(fieldProps) => <ReadOnlyTextArea
                  {...fieldProps}
                  label="شهر"
                  value="تهران"
                />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Controller
                name='marriage'
                control={control}
                rules={{required:true}}
                render={(fieldProps) => (
                  <Radio
                    {...fieldProps}
                    label="وضعیت تاهل"
                    required
                    options={maritalStatus}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/*<Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='lastName'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <TextField
                    value={value}
                    label='Last Name'
                    onChange={onChange}
                    placeholder='Carter'
                    error={Boolean(errors.lastName)}
                    aria-describedby='validation-schema-last-name'
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-schema-last-name'>
                  {errors.lastName.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <TextField
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='carterleonard@gmail.com'
                    aria-describedby='validation-schema-email'
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-schema-email'>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='validation-schema-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <OutlinedInput
                    value={value}
                    label='Password'
                    onChange={onChange}
                    id='validation-schema-password'
                    error={Boolean(errors.password)}
                    type={state.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}/>
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{color: 'error.main'}} id='validation-schema-password'>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>*/}

          <Grid item xs={12}>
            <Button size='large' type='submit' variant='contained'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  </Card>
}
export default Reasons
