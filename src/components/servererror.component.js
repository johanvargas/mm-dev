import React, { Component } from 'react';
import { Link } from 'react-dom';

const ErrorMsg = 
  <div>
  <h3>Sorry but there seems to be a problem connecting to the server.</h3>
  <p>Please try again.</p>
  </div>

export default function ServerError() {
  return ErrorMsg;
}
