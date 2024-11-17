import Logo from '../assets/wind.png';

export const Header = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </header>
  );
};
