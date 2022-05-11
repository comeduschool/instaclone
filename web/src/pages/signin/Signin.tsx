// React modules
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import SigninForm from '../../components/signin-form/SigninForm';

// Styles
import '../../App.css';

function Signin() {
  return (
    <div className="center">
      <SigninForm />
      <div className="center-item">
        계정이 없으신가요? <Link className="signup" to="/signup">가입하기</Link>
      </div>
    </div>
  );
}

export default Signin;