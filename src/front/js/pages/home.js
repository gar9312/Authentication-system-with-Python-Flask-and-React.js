import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const isMountedRef = useRef(true); // Create a ref to track mounted state

  // useEffect(() => {
  // if (store.token && store.token !="" && store.toke !=undefined){

  // }
  // }, [store.token]);

  

  return (
    <div className="text-center mt-5">
      <div className="ml-auto">
      </div>
      <h1>Home</h1>
    </div>
  );
};
