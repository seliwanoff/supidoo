import { Link } from "react-router-dom";
import image1 from "../assets/images/bg-03-bg.webp";
import image2 from "../assets/images/service-icon-01.png";
import image3 from "../assets/images/service-icon-01.png";
import image4 from "../assets/images/service-icon-02.png";
import image5 from "../assets/images/service-icon-03.png";
import logo2 from "../assets/images/logo2.png";
import { useEffect, useRef, useState } from "react";

//import "../auth/assets/js/main2";

const MainHomePage = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.display = isNavVisible ? "block" : "none";
    }
  }, [isNavVisible]);

  return (
    <>
      <header
        className="header-area header-sticky"
        style={{
          marginTop: "-40px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <Link to={"/"} className="logo">
                  <img
                    src={logo2}
                    alt=""
                    style={{
                      width: "200px",
                      marginLeft: "-50px",
                    }}
                  />
                </Link>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <div className="nav" id="nav" ref={navRef}>
                  <li className="scroll-to-section">
                    <Link to={"/"} className="active">
                      Home
                    </Link>
                  </li>

                  <li className="scroll-to-section">
                    <a href="#our-facts">About Us</a>
                  </li>

                  <li className="scroll-to-section">
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link to={"/register"}>Register</Link>
                  </li>
                </div>
                <a
                  className="menu-trigger"
                  id="menu-trigger"
                  onClick={toggleNav}
                >
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section
        className="section main-banner"
        id="top"
        data-section="section1"
        style={{
          position: "relative",
        }}
      >
        <img id="bg-video" src={image1} />
        <source src={image1} type="video/mp4" />
        <div
          className="video-overlay header-text"
          style={{
            position: "absolute",
            height: "100vh",
          }}
        >
          <div
            className="container"
            style={{
              height: "100vh",
            }}
          >
            <div
              className="row"
              style={{
                height: "100vh",
                top: "0",
                position: "absolute",
                width: "100%",
              }}
            >
              <div className="col-lg-12">
                <div className="caption">
                  <h2>Welcome to Supidoo</h2>
                  <p
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    At Supidoo, we believe that financial success is within
                    everyone's reach. Our platform offers a variety of tasks
                    that you can complete to earn points. These tasks are
                    designed to be simple, engaging, and educational, helping
                    you learn more about managing your finances while you earn.
                  </p>
                  <div className="main-button-red">
                    <div className="scroll-to-section">
                      <Link
                        to="/register"
                        style={{
                          background: "#fa4299",
                        }}
                      >
                        Get Started !
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ***** Main Banner Area End ***** */}
      <section
        className="services"
        style={{
          border: "1px solidn red",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="owl-service-item owl-carousel">
                <div className="item">
                  <div className="icon">
                    <img src="" alt="" />
                  </div>
                  <div className="down-content">
                    <h4>Best Services</h4>
                    <p>
                      We provide 24/7 services for you to enjoy and our services
                      are -notch.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <img src={image2} alt="" />
                  </div>
                  <div className="down-content">
                    <h4>Best Tools</h4>
                    <p>
                      We provide you with unique tools at your disposal and
                      -rated tools among others.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <img src={image3} alt="" />
                  </div>
                  <div className="down-content">
                    <h4>Best Customers</h4>
                    <p>
                      We relate with our customers with a great mind to help
                      with the tools bought from our platform.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <img src={image4} alt="" />
                  </div>
                  <div className="down-content">
                    <h4>Online Meeting</h4>
                    <p>
                      We provide online meetings with our customers in case they
                      have a problem with tools and a possible return is
                      guaranteed.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="icon">
                    <img src={image5} alt="" />
                  </div>
                  <div className="down-content">
                    <h4>Best Networking</h4>
                    <p>
                      We provide you with -notch networking platforms and means
                      of utilizing our tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="our-facts" id="our-facts">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <h2
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    A Few Facts About Supidoo
                  </h2>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content percentage">
                        <div className="count-digit">94.2</div>
                        <div className="count-title">Total payout</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">322</div>
                        <div className="count-title">Total customers</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content new-students">
                        <div className="count-digit">52</div>
                        <div className="count-title">New customers</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">1204</div>
                        <div className="count-title">Transactions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div
                className="video"
                style={{
                  background: "#fa4299",
                  padding: "10px",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".9rem",
                      textAlign: "left",
                    }}
                  >
                    Unlock Your Earning Potential with Supidoo - Your Gateway to
                    Financial Freedom
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".9rem",
                      textAlign: "left",
                    }}
                  >
                    Explore a vast array of opportunities, complete tasks, and
                    earn rewards on our cutting-edge platform, designed to
                    propel your financial growth and success.
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".9rem",
                      textAlign: "left",
                    }}
                  >
                    Supidoo is a pioneering platform that empowers individuals
                    to achieve financial stability, independence, and
                    prosperity. Our innovative ecosystem offers a diverse range
                    of features, tools, and resources to help you amplify your
                    earnings, acquire new skills, and connect with like-minded
                    individuals who share your financial aspirations.
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "start",
                    padding: "10px",
                  }}
                >
                  <h5
                    style={{
                      textAlign: "left",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    Key Features Section:
                  </h5>
                  <ul>
                    <li
                      style={{
                        fontSize: ".9rem",
                        textAlign: "left",
                      }}
                    >
                      <span>Earn Rewards:</span>
                      <span
                        style={{
                          fontSize: ".9rem",
                          textAlign: "left",
                        }}
                      >
                        Complete tasks, participate in activities, and receive
                        rewards that translate into real earnings.
                      </span>
                    </li>
                    <li
                      style={{
                        fontSize: ".9rem",
                        textAlign: "left",
                      }}
                    >
                      <span>Discover Opportunities:</span>
                      <span
                        style={{
                          fontSize: ".9rem",
                          textAlign: "left",
                        }}
                      >
                        Uncover new avenues for income generation, tailored to
                        your skills and interests.
                      </span>
                    </li>{" "}
                    <li
                      style={{
                        fontSize: ".9rem",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Develop Skills:
                      </span>
                      <span
                        style={{
                          fontSize: ".9rem",
                          textAlign: "left",
                        }}
                      >
                        Enhance your knowledge and expertise through our
                        comprehensive training programs and resources.
                      </span>
                    </li>{" "}
                    <li
                      style={{
                        fontSize: ".9rem",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Community Support:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: ".9rem",
                          textAlign: "left",
                        }}
                      >
                        Join a vibrant community that offers encouragement,
                        guidance, and support every step of the way.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-us" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 align-self-center">
              <div className="row">
                <div className="col-lg-12">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Let's get in touch</h2>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="name"
                            type="text"
                            id="name"
                            placeholder="YOUR NAME...*"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            id="email"
                            pattern="[^ @]*@[^ @]*"
                            placeholder="YOUR EMAIL..."
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="subject"
                            type="text"
                            id="subject"
                            placeholder="SUBJECT...*"
                            required
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            className="form-control"
                            id="message"
                            placeholder="YOUR MESSAGE..."
                            required
                            defaultValue={""}
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <button
                            type="submit"
                            id="form-submit"
                            className="button"
                            style={{
                              background: "#fa4299",
                            }}
                          >
                            SEND MESSAGE NOW
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Copyright © 2022 Supidoo Ltd. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
};

export default MainHomePage;
