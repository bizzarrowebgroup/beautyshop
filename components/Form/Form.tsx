import React from 'react';
import { Formik } from 'formik';

interface FormProps {
  children?: any;
  initialValues?: any;
  onSubmit?: () => void;
  validationSchema?: any;
}

export default function Form(FormProps: {
  children,
  initialValues,
  onSubmit,
  validationSchema
}) {
  return (
    <Formik
      initialValues={FormProps.initialValues}
      validationSchema={FormProps.validationSchema}
      onSubmit={FormProps.onSubmit}
    >
      {() => <React.Fragment>{FormProps.children}</React.Fragment>}
    </Formik>
  );
}