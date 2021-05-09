import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts";
import { auth } from "../firebase";
import AuthForm from "./Form/AuthForm";

const body = document.body;

const Header = () => {
  const { user } = useContext(AuthContext);
  const [formOpen, setFormOpen] = useState();
  const menu = useRef();

  const closePopUpMenu = () => {
    menu.current.classList.remove("header__item--active");
  }

  const openForm = () => {
    body.style.overflow = "hidden";
    setFormOpen(true);
  }

  const closeForm = () => {
    body.style.overflow = "auto";
    setFormOpen(false);
  }

  return (
    <>
      <header className="header">
        <nav className="header__nav">
          <div className="header__menu-icon" onClick={() => menu.current.classList.toggle("header__item--active")}>
            <div className="header__menu-line"></div>
          </div>
          <div className="header__item" ref={menu}>
            <Link className="header__text header__link" to="/" onClick={closePopUpMenu}>Главная</Link>
            <Link className="header__text header__link" to="/manage" onClick={closePopUpMenu}>Управление</Link>
          </div>
          <div className="header__item">
          {
            user
            ? <>
              <span className="header__text header__auth">{user.email}</span>
              <span className="header__text header__auth" onClick={() => auth.signOut()}>Выйти</span>
              </>
            : <span className="header__text header__auth" onClick={openForm}>Войти</span>
          }
          </div>
        </nav>
      </header>
      { formOpen && <AuthForm closeForm={closeForm} /> }
    </>
  )
}

export default Header;