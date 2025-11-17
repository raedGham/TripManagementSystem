import React from "react";
import {
  selectUserID,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

function PaymentsList() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <div className="m-[80px] text-gray-200">Payment goes here</div>
      ) : (
        <p className="text-center text-gray-500 font-medium m-[80px]">
          Please log in to view your payments.
        </p>
      )}
    </div>
  );
}

export default PaymentsList;
