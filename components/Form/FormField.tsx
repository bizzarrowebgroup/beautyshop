import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../TextInput';
import FormErrorMessage from './FormErrorMessage';

export default function FormField({ name, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched
  } = useFormikContext();

  return (
    <React.Fragment>
      <AppTextInput
        value={values[name]}
        onChangeText={text => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        width={otherProps.width}
        {...otherProps}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}