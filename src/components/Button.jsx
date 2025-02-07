import React from 'react'

function Button({
    children,
    type="submit",
    bgColor="bg-blue-500",
    textcolor="text-white",
    className="",
    ...props
}) {
  return (
    <div >
      <button className={`px-4 py-2 ${bgColor} ${textcolor} ${className}`} {...props}>{children}</button>
    </div>
  )
}

export default Button