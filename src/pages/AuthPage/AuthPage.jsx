import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    return (
        <div className="flex flex-col">
            <div className="my-4">
            <SignUpForm setUser={setUser} />
            </div>
            <div className="my-4">
            <LoginForm setUser={setUser} />
            </div>
        </div>
    )
}