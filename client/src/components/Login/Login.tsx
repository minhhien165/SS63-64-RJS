import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { UserType } from "../UserType";
import { baseURL } from "../../api";
import bcrypt from "bcryptjs-react";

export default function Login() {
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
    password: "",
    confirmPassword: "",
    cart: [],
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  const [wrongEmail, setWrongEmail] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [showGachaVid, setShowGachaVid] = useState<boolean>(true);
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const navigate = useNavigate();

  setTimeout(() => {
    setShowGachaVid(false);
  }, 20000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email" && value === "") {
      setEmailWarning(true);
    } else {
      setEmailWarning(false);
    }
    if (name === "password" && value === "") {
      setPasswordWarning(true);
    } else {
      setPasswordWarning(false);
    }
    return setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const res = await baseURL.get("users");
      const userData = res.data.password;
      if (userData.email !== user.email) {
        setWrongEmail(true);
        return;
      }
      const isMatch = await bcrypt.compare(user.password, userData.password);
      if (!isMatch) {
        setWrongPassword(true);
        return;
      }
      navigate("/home");
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(() => {});
  return (
    <div className="absolute flex w-[100%] h-[100vh] justify-center items-center overflow-hidden">
      {showGachaVid ? (
        <video
          autoPlay
          muted
          className="absolute w-[100%] z-50"
          src="./src/assets/Jinshi.mp4"
        ></video>
      ) : (
        ""
      )}
      <img className="w-[100%] absolute " src="./src/assets/Jinhshi.png" />
      <form className="w-[500px] p-[20px] bg-[#00000060] rounded-[5px] z-10">
        <h2 className="my-[20px] text-[#cccccc] text-[36px] font-[700] w-[100%] text-center ">
          Đăng Nhập
        </h2>
        <label className="block text-[20px] font-[600 text-[#ccc] mb-[10px]">
          Email
        </label>
        <div className="w-[100% h-[50px] relative">
          <input
            value={user.email}
            name="email"
            onChange={handleChange}
            className="w-[100%] text-[#fff] border-[#fff] outline-none pl-[10px] bg-[#00000060] h-[40px] border-[1px] rounded-[5px]"
          />
          {emailWarning ? (
            <p className="absolute text-red-500">Email không được để trống</p>
          ) : (
            ""
          )}
        </div>
        <label className="text-[#cccccc] text-[20px] font-[600] block mt-[20px] mb-[10px]">
          Mật khẩu
        </label>
        <div className="w-[100%] relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-[100%] border-[1px] text-[#fff] bg-[#00000060] h-[40px] rounded-[5px] outline-none pl-[10px]"
          />
          {showPassword ? (
            <FontAwesomeIcon
              onClick={() => setShowPassword(false)}
              className="absolute right-[10px] cursor-pointer text-[#fff] text-[14px] top-[35%]"
              icon={faEye}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowPassword(true)}
              className="absolute right-[10px] text-[#fff] cursor-pointer text-[14px] top-[35%]"
              icon={faEyeSlash}
            />
          )}
        </div>

        <div className="w-[100%] flex justify-end">
          <p
            onClick={() => navigate("/register")}
            className="text-[14px] text-end cursor-pointer mt-[10px] text-[#36b5ff] hover:text-[#8ed6ff]"
          >
            Đăng kí
          </p>
        </div>

        <button
          onClick={handleClick}
          className=" w-[100%] h-[40px] bg-[#0ccaff8a] mt-[20px] text-white rounded-[5px]"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
