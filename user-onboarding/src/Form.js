import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const initialUserForm = {
  name: "",
  email: "",
  password: "",
  ToS: false
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().required("Please enter your email address"),
  password: yup.string().required("Enter your password").min(6),
  ToS: yup.string().required("Accept our Terms of Service"),
  });

const UserForm = ({onSubmit}) => {
  return (
    <Formik
      validationSchema={validationSchema}
      // initialValues={initialFriendForm}
      onSubmit={onSubmit}
      render={props => {
        return (
          // we will use pre-baked components
          // supplied by formik lib (like Formik)
          <Form>
            {/* {
                !props.dirty && <div>time to start typing!!</div>
              } */}
            <div>
              <label>
                Name
                <Field name="name" type="text" placeholder="Name" />
                <ErrorMessage name="name" component="div" />
              </label>
            </div>
            <div>
              <label>
                Email
                <Field name="email" type="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />
              </label>
            </div>
            <div>
              <label>
                Password
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </label>
            </div>
            <div>
              <label>
                Terms of Service
                <Field name="ToS" type="checkbox" />
                <ErrorMessage name="ToS" component="div" />
              </label>
            </div>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    />
  );
};
export default UserForm;
