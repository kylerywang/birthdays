import { Component } from 'react'
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
  state = {
      name: '',
      email: '',
      phone:'',
      password: '',
      confirm: '',
      error: ''
  }

  handleChange = (evt) => {
      this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
      })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("handleSubmit() in SignUpForm")
    try {
      const formData = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      }
      const user = await signUp(formData)
      this.props.setUser(user)
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' })
    }
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="w-full max-w">
        <h1 className="font-bold text-gray-900 text-2xl m-4">Sign Up</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Email 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Phone 
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
              <p className="text-gray-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
              <p className="text-gray-500 text-xs italic">Please confirm your password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={disable}>
                Sign Up
              </button>
            </div>
        </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    
    );
  }
}

