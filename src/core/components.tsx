import React from 'react';

export function Greeting(props: { name: any; }) {
  return <h1>Hello, {props.name}</h1>;
}