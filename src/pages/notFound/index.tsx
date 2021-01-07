import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import rocket from './rocket.png';
import "./style.css";

export default function NotFound() {

  let jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

  useEffect(() => {
    var body = document.querySelector('.not-found');
    var colors = ["#ff6600", "#880000", "#ff9933", "#ff3300", "#ff3366"];

    setInterval(createStar, 100);

    function createStar() {
      var star = document.createElement("div"); // tao ra div.star
      star.classList.add("star");
      body!.appendChild(star);

      var right = Math.floor(Math.random() * 300);
      var top = Math.floor(Math.random() * body!.clientHeight);
      star.style.top = top + "px";
      star.style.zIndex = "999";
      star.style.background = colors[Math.floor(Math.random() * 5)];
      
      function starFly() {
        // tao motion cho star
        right += 5;
        star.style.right = right + "px";
        if (right >= body!.clientWidth) {
          star.remove();
        }
      }
      setInterval(starFly, 10);
      setTimeout(function () {
        star.remove();
      }, 7000);
    }
  }, []);

  return (
    <div className="not-found">
      <img src={rocket} alt="" className="rocket"/>
      <div className="title">
        <h3>404!</h3>
        <p>This page is not found</p>
        <button className="mt-3">
            <Link to={jwt ? "/" : "/login"}>Go back</Link>
        </button>
      </div>
    </div>
  );
}
