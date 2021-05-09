import "./../../styles/AuthForm.scss";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import Field from "./Field";
import { auth } from "../../firebase";

const AuthForm = ({ closeForm }) => {
  const [switched, setSwitched] = useState(false);
  const [signInError, setSignInError] = useState();
  const [signUpError, setSignUpError] = useState();
  const [fetching, setFetching] = useState(false);
  const formRef = useRef();

  const authenticate = async (api, data, errorFunc, errorText) => {
    try {
      setFetching(true);
      errorFunc(null)
      await api(data)
        .then(() => {
          setFetching(false);
          closeForm();
        })
    } catch (error) {
      errorFunc(errorText);
      setFetching(false);
      setTimeout(errorFunc, 4000, null);
    }
  }

  const signUp = async (data) => {
    return await auth.createUserWithEmailAndPassword(data.email.value, data.password.value);
  }

  const signIn = async (data) => {
    return await auth.signInWithEmailAndPassword(data.email.value, data.password.value);
  }

  const onSignInFormSubmit = (data) => {
    authenticate(signIn, data, setSignInError, "Ошибка входа");
  }

  const onSignUpFormSubmit = (data) => {
    authenticate(signUp, data, setSignUpError, "Ошибка регистрации");
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target === formRef.current) closeForm();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [closeForm])

  return (
    <div className="authForm" ref={formRef}>
      <div className="authForm__wrapper">
        <div className="authForm__close-ico-wrapper">
          <i className="authForm__close-ico fas fa-times" onClick={() => !fetching && closeForm()}></i>
        </div>
        <header className="authForm__header">
          <div className="authForm__title-btn-wrapper">
            <button className="authForm__title-btn" onClick={() => setSwitched(false)} disabled={fetching}>
              Войти
            </button>
          </div>
          <div className="authForm__title-btn-wrapper">
            <button className="authForm__title-btn" onClick={() => setSwitched(true)} disabled={fetching}>
              Создать
            </button>
          </div>
        </header>
        {
          switched
          ? <Form className="form" onSubmit={onSignUpFormSubmit}>
              <div className="form__input-wrapper">
                <Field className="form__input" type="email" name="email" required placeholder="Почта" />
              </div>
              <div className="form__input-wrapper"> 
                <Field className="form__input" type="password" name="password" required placeholder="Пароль" />
              </div> 
              <div className="form__btn-wrapper">
                <button className="form__btn" disabled={fetching}>Создать</button>
              </div>
              <p className="form__error">{signUpError}</p>
            </Form>
          : <Form className="form" onSubmit={onSignInFormSubmit}>
              <div className="form__input-wrapper">
                <Field className="form__input" type="email" name="email" required placeholder="Почта" />
              </div>
              <div className="form__input-wrapper">
                <Field className="form__input" type="password" name="password" required placeholder="Пароль" />
              </div>
              <div className="form__btn-wrapper">
                <button className="form__btn" disabled={fetching}>Войти</button>
              </div>
              <p className="form__error">{signInError}</p>
            </Form>
        }
      </div>
    </div>
  )
}

export default AuthForm;