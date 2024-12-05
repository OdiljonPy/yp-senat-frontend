"use client"

import React from 'react'
import Image from 'next/image'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#062B71] z-[1000]">
      <div className="relative w-[300px] h-[300px]">
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="z-10"
          />
        </div>
        
        {/* Rotating Text */}
        <div className="absolute inset-0">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 300 300">
            <defs>
              <path
                id="circlePath"
                d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                fill="none"
              />
            </defs>
            <text fill="white" fontSize="20">
              <textPath href="#circlePath" startOffset="0%">
                YOSHLAR PARLAMENTI • YOSHLAR PARLAMENTI •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

