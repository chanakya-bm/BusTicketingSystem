import {useState} from 'react'
import Login from '../../Components/Auth/Login';
import Signup from '../../Components/Auth/Signup';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
      <div className="flex items-center justify-center rounded-lg bg-gray-100">
        {isLogin ? (
          <Login toggle={() => setIsLogin(false)} />
        ) : (
          <Signup toggle={() => setIsLogin(true)} />
        )}
      </div>
    );
}

export default Auth