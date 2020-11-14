const UserDetails = ({
  id,
  name,
  language,
  isLoggedIn,
  onSwitchLanguage,
  onLogin,
  onLogout,
}) => {
  return (
    <>
      {isLoggedIn && (
        <>
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
        </>
      )}
      <p>
        <strong>Lang:</strong> {language}
      </p>
      <button type="button" onClick={onSwitchLanguage}>
        Switch lang
      </button>
      {!isLoggedIn && (
        <button type="button" onClick={onLogin}>
          Login
        </button>
      )}
      {isLoggedIn && (
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      )}
    </>
  );
};

export default UserDetails;
