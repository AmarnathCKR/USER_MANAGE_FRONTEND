import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeUser,
  unsuscribeEmail,
  unsuscribeToken,
  unsuscribeUser,
} from "../../store/index";
import PageWrapper from "../../layouts/user/PageWrapper";
import Swal from "sweetalert2";
import { postAnyAuth } from "../../api/api";
const MySwal = Swal;

function Profile() {
  const delta = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setData] = useState(delta);

  const handleSubmit = ()=>{
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    postAnyAuth()
  }

  
  const handleEdit = async (userData) => {
    MySwal.fire({
      title: "Edit Profile",
      html:  `<div class="flex flex-col p-4 gap-2"><input class="border w-full p-2" type="text" value=${userData.name}  id="name" /><input class="p-2 border w-full" type="text" value=${userData.email}  id="email" /></div>`,
      showCancelButton: true,
      confirmButtonText: "Edit",
      preConfirm: () => handleSubmit(),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(unsuscribeUser());
    localStorage.removeItem("token");
    dispatch(unsuscribeToken());
    localStorage.removeItem("email");
    dispatch(unsuscribeEmail());
    navigate("/login");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col  justify-center text-white align-middle items-center h-max mt-40">
        <div className="bg-[#1E1E1E] p-16 mx-auto  z-10 w-[350px] md:w-[400px] flex flex-col justify-center rounded-lg items-center opacity-70">
          <h1 className="text-white z-10 md:text-3xl text-2xl mx-3 tracking-wide pb-8">
            Profile Page
          </h1>
          <p>Full Name : {userData.name}</p>
          <p>Email : {userData.email}</p>

          <div className="flex justify-around mt-5 w-full">
            <button onClick={()=>{handleEdit(userData)}} className="bg-black rounded border border-white px-3 p-2">Edit Profile</button>
            <button className="bg-red-900  px-2 rounded border border-white p-2" onClick={handleLogout}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Profile;
