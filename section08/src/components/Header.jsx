import './Header.css'

const Header = () => {
  return (
    <div className='Header'>
      <p>오늘은 🗓️</p>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default Header;
