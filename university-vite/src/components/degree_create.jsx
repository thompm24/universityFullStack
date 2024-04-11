import React from 'react';
import { useState, useEffect } from 'react';

function CreateDegree() {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shortcode">Shortcode</label>
      <input id="shortcode" name="shortcode" type="text"/>
      <label htmlFor="full_name">Full Name</label>
      <input id="full_name" name="full_name" type="text" />
      <input type="submit" />
    </form>
  );
}

export default CreateDegree;
