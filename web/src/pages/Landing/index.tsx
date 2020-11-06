import { userInfo } from "os";
import React from "react";
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';
import { useUserContext } from "../../contexts/UserContext";

import './styles.css';

export default function Landing() {

  const { user, updateUser } = useUserContext();

  setTimeout(() => {
    updateUser({
      name: "Dayvson",
      age: 20,
      girlfriend_name: "Maria"
    });
  }, 3000);

  setTimeout(() => {
    updateUser({
      name: "Mario",
      age: 20,
      girlfriend_name: "Maria"
    });
  }, 5000);

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
        
        { user?.name }

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </div>

        <Link to="/app" className="enter-app">
          <FaArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}