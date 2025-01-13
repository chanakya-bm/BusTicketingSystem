import {useState} from 'react'
import Login from '../../Components/Auth/Login';
import Signup from '../../Components/Auth/Signup';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
      <div className='w-[100vw] h-screen flex items-center justify-center '>
        <div className=" rounded-lg bg-gray-100">
        {isLogin ? (
          <Login toggle={() => setIsLogin(false)} />
        ) : (
          <Signup toggle={() => setIsLogin(true)} />
        )}
      </div>
      </div>
    );
}

export default Auth