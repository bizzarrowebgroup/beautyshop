import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

export default function FormButton({
  title,
  color,
  textColor,
  hasBorder = false,
  height = 50,
  style,
}) {
  const { handleSubmit } = useFormikContext();

  return <AppButton style={style} height={height} title={title} onPress={handleSubmit} color={color} textColor={textColor} hasBorder={hasBorder} />;
}