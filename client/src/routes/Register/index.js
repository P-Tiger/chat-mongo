import React, {
  useEffect, useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Link, useHistory
} from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  clear,
  request
} from '../../store/features/user';
import './styles.css';


export const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userReducer = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    if (userReducer.isSuccess && userReducer.isSuccess === true) {
      dispatch(clear())
      history.push("/");
      Swal.fire(
        'Good job!',
        'Create User Successfully',
        'success'
      )
    }
  }, [userReducer, history, dispatch])

  function handlerSubmit(e) {
    e.preventDefault();
    if (name === '' || password === '' || email === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Missing Field !!!',
      })
    }
    dispatch(request({ "email": email.trim(), "password": password.trim(), "name": name.trim() }))
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter name" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
          </div>

          <button type="submit" onClick={handlerSubmit} className="btn btn-primary btn-block">Submit</button>
        </form>

        <div className='float-right mt-2'>
          <Link to="/" className="btn btn-white text-primary">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary disabled">
            Sign Up
          </Link>
        </div>
      </div>
    </div >
  )
};
