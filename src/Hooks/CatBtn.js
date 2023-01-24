import styles from "../styles/CatBtn.css";

export default function Catbtn({ name, catActive, handleSetCat }) {
  return (
    <button
      className={`cat_btn hover ${catActive ? "active_btn" : null}`}
      onClick={() => handleSetCat(name)}
    >
      {name}
    </button>
  );
}
