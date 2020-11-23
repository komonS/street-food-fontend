import React,{useContext} from 'react';
import {CounterContext} from '../../store/CounterProvider'
import { LoginContext } from '../../store/LoginProvider'
import ShopAll from './ShopAll';
function Home() {
    const {counter, addCounter, subCounter} = useContext(CounterContext);
    const { login,setLogin } = useContext(LoginContext)
  return (
    <div>
      <ShopAll/>
    </div>
  );
}

export default Home;
