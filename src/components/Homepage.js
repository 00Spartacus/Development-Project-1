import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';


function Homepage() {
  const images = [
    'https://scontent.fcgp6-1.fna.fbcdn.net/v/t39.30808-6/241031011_1967400103398697_6325596919281852772_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=YhtGIjHNTtsQ7kNvgGLvt9h&_nc_zt=23&_nc_ht=scontent.fcgp6-1.fna&_nc_gid=AuM_42zaom43dvfh3j1Przu&oh=00_AYAhV_qAfZXNE0gpJLJGHu2EtUIrj2yiop9jkD2yyrKALg&oe=673AAD72',
    'https://scontent.fcgp6-1.fna.fbcdn.net/v/t39.30808-6/387763551_1000582251235798_2834429993378464265_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE_JjFA-3ehVwWtD2RwzuwuSmcecZjmt6pKZx5xmOa3quxGWZ1t3p-QP4ATVfp5Rv7M6bYtdAOWO7gESkeXnnxr&_nc_ohc=KZWtsDadEj4Q7kNvgFk91LA&_nc_zt=23&_nc_ht=scontent.fcgp6-1.fna&_nc_gid=A2EUzYU80DGUHOwfZbT5HnR&oh=00_AYBdytejVCC0ft6GTabLUFg_wdQNIxs7nJBfS-_73LVn0A&oe=673923B3',
    'https://scontent.fcgp6-1.fna.fbcdn.net/v/t39.30808-6/352368956_2123345021390385_7174203551036408653_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=2285d6&_nc_ohc=rswpq7LebTkQ7kNvgG8wiQx&_nc_zt=23&_nc_ht=scontent.fcgp6-1.fna&_nc_gid=AOchi0RsWFofDgDTtawii0w&oh=00_AYBRCXwLsUUy_rCPzYqGqG4wXV777mbFwLPSuKqIDCX5Rg&oe=673ACCFE',
    'https://www.cuet.ac.bd/frontend/images/background-slider-1.jpg',
    
  ];

  return (
    <div className="homepage">
      
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src='https://www.cuet.ac.bd/frontend/images/background-slider-1.jpg' width='2160px' height='720px' class="d-block w-100" ></img>
    
      <div class="carousel-caption d-none d-md-block">
        {/* <h3>First slide label</h3>
        <p>Some representative placeholder content for the first slide.</p> */}
      </div>
      
    </div>
    <div class="carousel-item">
    <img src='https://www.cuet.ac.bd/frontend/images/bg-404.jpg' width='2160px' height='720px' class="d-block w-100" ></img>
    <div class="carousel-caption d-none d-md-block">
        {/* <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p> */}
      </div>
    </div>
    <div class="carousel-item">
    <img src='https://www.cuet.ac.bd/frontend/images/banner-2.jpg' width='2160px' height='720px' class="d-block w-100" ></img>
    <div class="carousel-caption d-none d-md-block">
        {/* <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p> */}
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

      <section className="main-section">
        <div className="column" id="mission">
          <Link to="/mission">
            <h2 style={{ color: '' }}>Our Mission</h2>
            <p style={{ color: 'white' }}>Tells about our motivation and next features.</p>
          </Link>
        </div>
        <div className="column" id="buses">
          <Link to="/buses">
            <h2>About Buses</h2>
            <p style={{ color: 'white' }}>CUET bus pictures come randomly with information.</p>
          </Link>
        </div>
        <div className="column" id="notice">
          <Link to="/notice">
            <h2>Notice</h2>
            <p style={{ color: 'white' }}>Links of recent notices.</p>
          </Link>
        </div>



        <section className="hero">
          <div className="hero-content">
            <Link to="/login">
              <button className="login-buttonh">Login / Register</button>
            </Link>
            <button className="know-buttonh">Know More</button>
            {/* <button className="about-buttonh">About Dev</button> */}
          </div>
        </section>
      </section>

      <div className="map-container">
  <div className="map" id="location">
    <h2>Location</h2>
    <p style={{ color: 'white' }}>
      CUET is located in the scenic area of Chittagong, Bangladesh. Visit us at:
    </p>
    <p style={{ color: 'white' }}>CUET Campus, Chittagong, Bangladesh</p>

    {/* Google Maps Container */}
    <div className="google-map-container">
      <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.3119788206664!2d91.96844922904158!3d22.46006993869187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2fc05a3f700d%3A0x4d4660844f08fe2a!2z4Kaa4KeB4Kav4Ka84KeH4KafIOCmruCnh-Cmh-CmqCDgppfgp4fgpp8!5e0!3m2!1sbn!2sbd!4v1735674899805!5m2!1sbn!2sbd" width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy">
      </iframe>
    </div>

    <a
      href="https://www.google.com/maps/place/Chittagong+University+of+Engineering+and+Technology+(CUET)/@22.4619433,91.9684843,17z/data=!3m1!4b1!4m6!3m5!1s0x30ad2fca34ae5549:0x35c88a37b3e90e97!8m2!3d22.4619433!4d91.9710592!16zL20vMGdtcXY0?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/place/Chittagong+University+of+Engineering+and+Technology+(CUET)/@22.4619433,91.9710592,17z/data=!3m1!4b1!4m6!3m5!1s0x30ad2fca34ae5549:0x35c88a37b3e90e97!8m2!3d22.4619433!4d91.9710592!16zL20vMGdtcXY0?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="view-map-link">
      View on Google Maps
    </a>
  </div>
</div>



      {/* New Sections */}
      <div className="new-sectionm">
        <div className="column" id="about-cuet">
          <h2>About CUET</h2>
          <p style={{ color: 'white' }}>
            CUET (Chittagong University of Engineering & Technology) is a premier institution
            dedicated to providing high-quality education in engineering, technology, and
            applied sciences. Our students excel in both academics and extracurricular activities.
          </p>
        </div>



        <div className="column" id="facilities">
          <h2>Facilities</h2>
          <ul style={{ color: 'white' }}>
            <li>Modern Laboratories</li>
            <li>Library with a vast collection of resources</li>
            <li>Sports Complex</li>
            <li>Hostels for both male and female students</li>
          </ul>
        </div>

        <div className="column" id="departments">
          <h2>Academic Departments</h2>
          <ul style={{ color: 'white' }}>
            <li>Department of Civil Engineering</li>
            <li>Department of Electrical & Electronic Engineering</li>
            <li>Department of Computer Science and Engineering</li>
            <li>Department of Mechanical Engineering</li>
          </ul>
        </div>

        <div className="column" id="contact">
          <h2>Contact Information</h2>
          <p style={{ color: 'white' }}>
            You can contact us at: <br />
            Email: info@cuet.ac.bd <br />
            Phone: +880 31 710236
          </p>
        </div>
      </div>


    </div>
  );
}

export default Homepage;
