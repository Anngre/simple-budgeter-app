import React from 'react'

export default function Icon({name}) {
  switch (name) {
    case 'showIcon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill='#343a40'><path d="M10 10.958 4.833 5.792 6.208 4.438 10 8.229 13.792 4.438 15.167 5.792ZM10 16.062 4.833 10.917 6.208 9.542 10 13.333 13.792 9.542 15.167 10.917Z"/></svg>
      )
    case 'hideIcon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.208 10.375 5 9.167 10 4.167 15 9.167 13.792 10.375 10 6.583ZM6.208 15.333 5 14.125 10 9.125 15 14.125 13.792 15.333 10 11.542Z"/></svg>
      )
    default:
      return
  }
}
