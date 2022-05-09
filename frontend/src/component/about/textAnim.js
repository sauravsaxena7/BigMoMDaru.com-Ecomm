import React from 'react'

import "./textAnim.css"

const contact = () => {

  localStorage.setItem("refresh",false);

  return (
    
        <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Web Developer</div>
              <div className="i-title-item">YouTuber</div>
              <div className="i-title-item">Photographer</div>
              <div className="i-title-item">Writer</div>
              <div className="i-title-item">Content Creator</div>
            </div>
          </div>
    
  )
}

export default contact