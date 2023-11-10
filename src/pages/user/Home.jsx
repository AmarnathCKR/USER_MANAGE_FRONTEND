import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {  subscribeToken, subscribeUser, unsuscribeToken, unsuscribeUser } from "../../store/index";
import PageWrapper from "../../layouts/user/PageWrapper";
import { useEffect } from "react";
import { getAnyApi } from "../../api/api";


function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(unsuscribeUser())
    localStorage.removeItem("token");
    dispatch(unsuscribeToken())
    
    navigate("/login");
  };
  
  const userData = useSelector((state) =>  state.user);
  const token = useSelector((state)=>state.token);
  useEffect(()=>{
    console.log(token)
    if(!userData){
      console.log("visited");
      
      getAnyApi("/user/fetch-user",token)
      .then((res)=>{
        dispatch(subscribeUser(res.data.user));
      }).catch((err)=>{
        console.log(err);
        handleLogout();
      })
    }
  },[])


  return (
    <PageWrapper>
      <div>
        <h1 className="text-success">Login Successful!!!</h1>
        <h3>Welcome Back, {userData?.name}</h3>
        <Link to="/profile">
          <button className="btn btn-primary">Profile</button>
        </Link>
        <span className="mx-3">Or</span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Click here to Logout
        </button>
      </div>
    </PageWrapper>
  );
}

export default Home;
