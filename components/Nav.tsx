import Head from "next/head"
import Link from "next/link";

const Nav = () => {
  return <div>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>

        {/* <!-- google fonts jetbrains font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;1,100;1,200&display=swap" rel="stylesheet" />
        {/* <!-- google fonts Dancing Script --> */}
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet" /> 
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="myNav">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <h1 className="handwriten">Home</h1>
        </Link>
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/about" className="nav-link">about</Link>
          </li>
          <li className="nav-item">
            <Link href="/crime" className="nav-link">crime</Link>
          </li>
          <li className="nav-item">
            <Link href="/criminal" className="nav-link">criminal</Link>
          </li>
          <li className="nav-item">
            <Link href="/fir" className="nav-link">fir</Link>
          </li>
          <li className="nav-item">
            <Link href="/police" className="nav-link">police-station</Link>
          </li>
          <li className="nav-item">
            <Link href="/reportCrime" className="nav-link">report-crime</Link>
          </li>
          <li className="nav-item">
            <a href="#footer" className="nav-link">contact</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
}

export default Nav;
