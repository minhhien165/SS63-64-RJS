import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { baseURL } from "../../api";
import { UserType } from "../UserType";
import axios from "axios";
import bcrypt from "bcryptjs-react";

export default function Register() {
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
    password: "",
    confirmPassword: "",
    cart: [],
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<string>("");
  const [passwordWarning, setPasswordWarning] = useState<string>("");
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState<string>("");
  const [showRepassword, setShowRepassword] = useState<boolean>(false);
  const [showGachaVid, setShowGachaVid] = useState<boolean>(true);
  const navigate = useNavigate();

  setTimeout(() => {
    setShowGachaVid(false);
  }, 20000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;

    if (user.email === "") {
      setEmailWarning("Email không được để trống");
      isValid = false;
    } else {
      setEmailWarning("");
    }

    if (user.password === "") {
      setPasswordWarning("Mật khẩu không được để trống");
      isValid = false;
    } else {
      setPasswordWarning("");
    }

    if (user.confirmPassword === "") {
      setConfirmPasswordWarning("Mật khẩu không được để trống");
      isValid = false;
    } else {
      setConfirmPasswordWarning("");
    }

    if (user.password !== user.confirmPassword) {
      setConfirmPasswordWarning("Mật khẩu không khớp");
      isValid = false;
    }

    return isValid;
  };

  const signUpNewAcc = async () => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const newUser = { ...user, password: hash, confirmPassword: hash };

      await baseURL.post("users", newUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const res = await baseURL.get(`users?email_like=${user.email}`);
      if (res.data.length === 0) {
        await signUpNewAcc();
        navigate("/");
      } else {
        console.log("Tài khoản đã tồn tại");
      }
    } catch (error) {
      console.error("Lỗi, không thể lấy bản ghi", error);
    }
  };

  return (
    <div className="absolute flex w-[100%] h-[100vh] justify-center items-center overflow-hidden">
      {showGachaVid ? (
        <video autoPlay muted className="absolute w-[100%] z-50" src="./src/assets/Changli.mp4"></video>
      ) : (
        ""
      )}
      <img className="w-[100%] absolute" src="./src/assets/Changli.png" />
      <form className="w-[500px] p-[20px] bg-[#00000060] rounded-[5px] z-10">
        <h2 className="my-[20px] text-[#cccccc] text-[36px] font-[700] w-[100%] text-center">
          Đăng kí
        </h2>
        <label className="block text-[20px] font-[600] text-[#ccc] mb-[10px]">
          Email
        </label>
        <div className="w-[100%] h-[50px] relative">
          <input
            value={user.email}
            name="email"
            onChange={handleChange}
            className="w-[100%] text-[#fff] border-[#fff] outline-none pl-[10px] bg-[#00000060] h-[40px] border-[1px] rounded-[5px]"
          />
          {emailWarning && <p className="absolute text-red-500">{emailWarning}</p>}
        </div>

        <label className="text-[#cccccc] text-[20px] font-[600] block mt-[20px] mb-[10px]">
          Mật khẩu
        </label>
        <div className="w-[100%] h-[50px] relative">
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            className="w-[100%] text-[#fff] border-[1px] bg-[#00000060] h-[40px] rounded-[5px] outline-none pl-[10px]"
          />
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-[#f00] right-[10px] cursor-pointer text-[14px] top-[30%]"
            icon={showPassword ? faEye : faEyeSlash}
          />
          {passwordWarning && <p className="absolute text-red-500">{passwordWarning}</p>}
        </div>

        <label className="text-[20px] text-[#cccccc] font-[600] block mt-[20px] mb-[10px]">
          Nhập lại mật khẩu
        </label>
        <div className="w-[100%] relative">
          <input
            name="confirmPassword"
            onChange={handleChange}
            value={user.confirmPassword}
            type={showRepassword ? "text" : "password"}
            className="w-[100%] text-[#fff] border-[1px] bg-[#00000060] h-[40px] rounded-[5px] outline-none pl-[10px]"
          />
          <FontAwesomeIcon
            onClick={() => setShowRepassword(!showRepassword)}
            className="absolute text-[#f00] right-[10px] cursor-pointer text-[14px] top-[35%]"
            icon={showRepassword ? faEye : faEyeSlash}
          />
          {confirmPasswordWarning && <p className="absolute text-red-500">{confirmPasswordWarning}</p>}
        </div>

        <div className="w-[100%] flex justify-end">
          <p
            onClick={() => navigate("/")}
            className="text-[14px] text-end cursor-pointer mt-[10px] text-[#ff5252] hover:text-[#ffa3a3]"
          >
            Đăng Nhập
          </p>
        </div>

        <button type="button" onClick={handleClick} className="w-[100%] h-[40px] bg-[#ff181878] mt-[20px] text-white rounded-[5px]">
          Đăng kí
        </button>
      </form>
    </div>
  );
}
