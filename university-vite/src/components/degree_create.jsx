import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDegree() {
  const navigate =useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/degree/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shortcode: `${e.target.shortcode.value}`,
        full_name: `${e.target.full_name.value}`,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate(`/degrees/${e.target.shortcode.value}`);
  };

  return (
    <div className="flex justify-center">
    <form className="bg-white p-10 m-10" onSubmit={handleSubmit}>
      <label htmlFor="shortcode">Shortcode</label>
      <input id="shortcode" name="shortcode" className="border-b-2 border-black" type="text"/><br/>
      <label htmlFor="full_name">Full Name</label>
      <input id="full_name" className='border-b-2 border-black' name="full_name" type="text" /><br/><br/>
      <input type="submit" className='bg-slate-900 text-white rounded-md'/>
    </form>
    </div>
  );
}

export default CreateDegree;
