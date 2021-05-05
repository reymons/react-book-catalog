import { Button } from 'antd';
import "./../styles/MainPage.scss";

const Books = () => {
  return (
    <div className="books">
      <div className="books__btn-wrapper">
        <Button type="primary" size="large">
          Добавить книгу
        </Button>
      </div>
      <br/>
      <div className="books__library">
        <ul className="books__list">
          <li className="books__book book">
            <div className="book__img">Изображение</div>
            <div className="book__desc">
              <p className="book__desc-item"><b>Название:</b><span className="book__span">Мастер и Маргарита</span></p>
              <p className="book__desc-item"><b>Автор:</b><span className="book__span">М.А. Булгаков</span></p>
              <p className="book__desc-item"><b>Год издания:</b><span className="book__span">1967</span></p>
              <p className="book__desc-item"><b>ISBN:</b><span className="book__span">12084712</span></p>
            </div>
            <div className="book__btn">
              <Button type="primary" size="middle" danger="true">Удалить</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Books;