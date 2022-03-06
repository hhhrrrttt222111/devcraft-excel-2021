import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

import CustomTitle from '../../utils/CustomTitle';
import './Profile.css'

function Profile() {

  const { token } = useContext(AuthContext);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')

  const serverURL = process.env.REACT_APP_BACKEND_URL + '/users';

  useEffect(() => {
    console.log(token)
    fetch(serverURL, {
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(r => r.json())
    .then(r => {
      setName(r.user.name)
      setEmail(r.user.email)
      setPassword(r.user.password)
      setCountry(r.user.country)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div className='profile'>
      <CustomTitle title="Profile"/>
      <div className='profile__container'>
        <h1>Account</h1>
        <div className='profile__header'>
          <img src="https://avatars.githubusercontent.com/u/43471295?v=4" alt=''  className='profile_img'/>
          <div className='profile__header_btns'>
            <button className='profile__primary_btn'>Change</button>
            <button className='profile__secondary_btn'>Remove</button>
          </div>
        </div>
        <h1>General</h1>
        <div className='profile__general'>
          <div className='profile_general_input'>
            <label className='profile_label'>Name</label>
            <input className='profile_input' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='profile_general_input'>
            <label className='profile_label'>Country</label>
            <input className='profile_input' type='text' value={country} onChange={(e) => setCountry(e.target.value)}/>
          </div>
        </div>
        <h1>Security</h1>
        <div className='profile__general'>
          <div className='profile_security_input'>
            <label className='profile_label'>Email</label>
            <div className='p_s_div'>
              <input className='p_s__input' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <button className='profile__secondary_btn'>Change <span className='d_none_800'>Email</span></button>
            </div>
          </div>
          <div className='profile_security_input'>
            <label className='profile_label'>Password</label>
            <div className='p_s_div'>
              <input className='p_s__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button className='profile__secondary_btn'>Change <span className='d_none_800'>Password</span></button>
            </div>
          </div>
        </div>
        <div className='profile_save'>
          <button className='profile__primary_btn'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Profile