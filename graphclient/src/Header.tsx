import './header.css'

export default function Header() {
  let isSignedIn = false
  let displayMsg = isSignedIn ? "Welcome --UserName--" : " ! Please Sign In"
  
  return (
      <header className="navigationContainer">
        <nav>
          <div className="navDisplay">
            <h2>Grapher.IO <span>{displayMsg}</span></h2>
          </div>
        </nav>
      </header>
  );
};
  