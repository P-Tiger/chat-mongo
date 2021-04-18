import React, {
	useEffect, useState
} from 'react';
import {
	useDispatch,
	useSelector
} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	request
} from '../../store/features/login';
import './styles.css';


export const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const loginReducer = useSelector(state => state.loginReducer)
	const dispatch = useDispatch()
	const history = useHistory();

	useEffect(() => {
		if (loginReducer.isLogin && loginReducer.isLogin === true) {
			history.push("/home")
		}
	}, [loginReducer, history])

	function handlerSubmit(e) {
		e.preventDefault();
		dispatch(request({ "email": email, "password": password }))
	}

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form>
					<h3>Sign In</h3>
					<div className="form-group">
						<label>Email</label>
						<input type="username" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
					</div>

					<div className="form-group">
						<label>Password</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
					</div>

					<button type="submit" onClick={handlerSubmit} className="btn btn-primary btn-block">Submit</button>
				</form>
				<div className='float-right'>
					<Link to="/" className="btn btn-primary disabled">
						Sign In
          </Link>
					<Link to="/signup" className="btn btn-white text-primary">
						Sign Up
          </Link>
				</div>
			</div>
		</div>
	)
};
