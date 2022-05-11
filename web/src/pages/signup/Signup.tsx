// React modules
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import SignupForm from '../../components/signup-form/SignupForm';

// Styles
import '../../App.css';

function Signup() {
  return (
    <div className="center">
      <SignupForm />
      <div className="center-item">
        계정이 있으신가요? <Link className="signup" to="/signin">로그인</Link>
      </div>

    </div>
  );
}

export default Signup;