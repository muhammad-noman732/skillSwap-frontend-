import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegister } from '../../features/Queries/authQuerie';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { mutate, isPending, error, isSuccess, data } = useRegister();
  const navigate = useNavigate();

  // to show error message
  const getErrorMessage = (error) => {
    if (!error) return null;

    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.message) {
      return error.message;
    }

    return "Something went wrong. Please try again.";
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain uppercase, lowercase, number, and special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    location: Yup.string().required('Location is required'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await mutate(values, {
          onSuccess: () => {
            // No need to do anything extra here
          },
          onError: () => {
            setSubmitting(false); // prevent button lock if error
          },
        });
      } catch (err) {
        console.log("Mutation error:", err);
        setSubmitting(false);
      }
    },
  });

  // On successful signup, reset form and optionally redirect
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log("Signup Success Response:", data);
  //     formik.resetForm();
     
  //   }
  // }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.touched.userName && formik.errors.userName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.userName}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.touched.email && formik.errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.touched.password && formik.errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.touched.location && formik.errors.location ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select your location</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.location && formik.errors.location && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.location}</div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isPending || formik.isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isPending ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isPending ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-sm text-red-600 text-center bg-red-100 p-2 rounded">
              {getErrorMessage(error)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
