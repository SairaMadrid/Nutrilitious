import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = forwardRef(({ value, onChange }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <div>
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
         value={value}
        onChange={onChange} 
        placeholder="Enter password"
      />
      <button type="password-button" onClick={handleTogglePassword}>
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  );
});

export default PasswordInput;
