import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";

const UsersApi = "https://reqres.in/api/users";
const initialUserForm = {
  name: "",
  email: "",
  password: "",
  termsOfService: false
};

export default function Container() {
  const [usersList, setUsersList] = useState([]);
  const [serverError, setServerError] = useState("");

  const fetchUsers = () => {
    axios
      .get(UsersApi)
      .then(res => {
        setUsersList(res.data.data);
      })
      .catch(err => {
        debugger;
        setServerError(err.message);
      });
  };

  // 2- THIS GOES INTO <Formik /> `onSubmit` prop
  const addUser = (formValues, actions) => {
    const friendToPost = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      termsOfService: formValues.termsOfService
    };
    axios
      .post(UsersApi, friendToPost)
      .then(res => {
        // res.data contains the newly created friend
        const newLyCreatedFriendFromServer = res.data;
        setUsersList(usersList.concat(newLyCreatedFriendFromServer));
        actions.resetForm();
      })
      .catch(err => {
        debugger;
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* should be its own component: */}
      {serverError}

      <UserForm onSubmit={addUser} />

      {/* should be its own component: */}
      {usersList.length
        ? usersList.map(user => (
            <div key={user.id}>
              {user.name} uses the address {user.email}
            </div>
          ))
        : "No Users Avialable!"}
    </div>
  );
}
//------------------------------------------------

const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().required("Please enter your email address"),
  password: yup
    .string()
    .required("Enter your password")
    .min(6),
  termsOfService: yup.string().required("Accept our Terms of Service")
});

const UserForm = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialUserForm}
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
                <Field
                  name="termsOfService"
                  type="checkbox"
                  checked={props.values.termsOfService}
                />
                <ErrorMessage name="termsOfService" component="div" />
              </label>
            </div>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    />
  );
};
// export default UserForm;
