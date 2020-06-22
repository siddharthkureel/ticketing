import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async event => {
      event.preventDefault();
      
    try {
        const response = await axios.post('/api/users/signup', {
            email, password
        })
    } catch (error) {
        console.log(error.response.data)
        setErrors(error.response.data.errors);
       }
    };
  

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
        <div>{errors[0]?.field==='email'&& errors[0]?.message}</div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
        <div>{errors[1]?.field==='password' && errors[1]?.message}</div>
      </div>
      <div>{errors[0]?.field && errors[0]?.message}</div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
