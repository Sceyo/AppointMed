
import 'bootstrap/dist/css/bootstrap.min.css';

import './Navbar.css'

export default function Navbar() {


    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand" href="/" style={{ fontSize: '30px', fontWeight: 'bold', color: 'white' }}>AppointMed</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link" aria-current="page" href="/">Home</a>
        
        </li>
        <li class="nav-item">
        <a class="nav-link " aria-current="page" href="/profile">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    );
}

