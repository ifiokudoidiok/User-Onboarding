import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const UserForm = () =>{
    return(
        <Formik
        // validationSchema={validationSchema}
        // validate={validate}
        // initialValues={initialFriendForm}
        // onSubmit={onSubmit}
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
                  <Field name='name' type='text' placeholder='Name' />
                  <ErrorMessage name='name' component='div' />
                </label>
              </div>
              <div>
                <label>
                  Email
                  <Field name='email' type='email' placeholder='Email' />
                  <ErrorMessage name='email' component='div' />
                </label>
              </div>
              <div>
                <label>
                  Password
                  <Field name='password' type='password' placeholder='Password' />
                  <ErrorMessage name='password' component='div' />
                </label>
              </div>
              <div>
                <label>
                  Terms of Service
                  <Field name='ToS' type='checkbox' />
                  <ErrorMessage name='ToS' component='div' />
                </label>
              </div>
              <button type='submit'>Submit</button>
            </Form>
          );
        }}
      />
    )
}
export default  UserForm