import "./styles.css";
interface IProps {
  removeToken: () => void;
}
function LoggedIn({removeToken}: IProps) {
  return (
    <>
      <div className="logged-in-text">Logged In Successfully</div>
      <button className="cancel-btn" onClick={removeToken}>Cancel</button>
    </>
  );
}

export { LoggedIn };
