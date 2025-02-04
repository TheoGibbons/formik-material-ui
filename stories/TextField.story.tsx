import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import MuiTextField from '@mui/material/TextField';
import { action } from '@storybook/addon-actions';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
} from '../packages/formik-material-ui/src/TextField';
import FormValues from './FormValues';
import Wrapper from './Wrapper';

interface Values {
  user: { email: string };
  password: string;
  uppercasing: string;
  select: string;
  outlined: string;
}

const schema = yup.object().shape({
  user: yup.object().shape({
    email: yup.string().email().required(),
  }),
  password: yup.string().required(),
  select: yup.mixed().required(),
});

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

const UpperCasingTextField = (props: TextFieldProps) => {
  return (
    <MuiTextField
      {...fieldToTextField(props)}
      onChange={(event) => {
        const { value } = event.target;

        const { form, field } = props;
        form.setFieldValue(field.name, value ? value.toUpperCase() : '');
      }}
    />
  );
};

const TextFieldStory = () => (
  <Wrapper title="Text Field">
    <Formik<Values>
      initialValues={{
        user: { email: '' },
        password: '',
        uppercasing: '',
        select: '',
        outlined: '',
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          action('submit')(values);
        }, 2000);
      }}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form>
          <Field
            component={TextField}
            type="email"
            label="Email"
            name="user.email"
            helperText="Please Enter Email"
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          <Field
            component={UpperCasingTextField}
            label="Uppercasing"
            name="uppercasing"
          />
          <br />
          <br />
          <Field
            component={TextField}
            label="Outlined"
            name="outlined"
            variant="outlined"
            InputProps={{ notched: true }}
          />
          <br />
          <br />
          <Field
            component={TextField}
            label="Filled"
            name="filled"
            variant="filled"
          />
          <br />
          <br />
          <Field
            component={TextField}
            type="text"
            name="select"
            label="With Select"
            select
            helperText="Please select Range"
            margin="normal"
          >
            {ranges.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
          <br />
          <FormValues values={values} />
        </Form>
      )}
    </Formik>
  </Wrapper>
);

export default TextFieldStory;
