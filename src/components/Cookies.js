// // import React, { useState, useEffect } from "react";

// // const Cookies = () => {
// //   const [showCookieBox, setShowCookieBox] = useState(true);

// //   useEffect(() => {
// //     // Check if the cookie is set
// //     const checkCookie = document.cookie.indexOf("CookieBy=CodingNepal");
// //     setShowCookieBox(checkCookie === -1); // Show the cookie box if cookie is not set
// //   }, []);

// //   const handleDeny = () => {
// //     setShowCookieBox(false); // Hide the cookie box when denied
// //   };

// //   return (
// //     <>
// //       {showCookieBox && (
// //         <div className="wrapper">
// //           <img src="#" alt="" />
// //           <div className="content">
// //             <header>We Use Cookies</header>
// //             <p>Please, accept these sweeties to continue enjoying our site!</p>
// //             <div className="buttons">
// //               <a href="#" className="item hidenowcookie" onClick={handleDeny}>
// //                 Nope. I'm on a diet
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Cookies;
// import React, { useState, useEffect } from "react";

// function CookieCheckCard() {
//   const [cookiesAllowed, setCookiesAllowed] = useState(false);

//   useEffect(() => {
//     // Check if cookies are allowed
//     const areCookiesAllowed = navigator.cookieEnabled;
//     setCookiesAllowed(areCookiesAllowed);
//   }, []);

//   return (
//     <div>
//       {!cookiesAllowed && (
//         <div
//           style={{
//             backgroundColor: "lightgray",
//             padding: "10px",
//             position: "fixed",
//             bottom: 0,
//             width: "100%",
//             textAlign: "center",
//           }}
//         >
//           <p>
//             Cookies are not enabled in your browser. Please go to settings and
//             enable cookies to use this website properly.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <h1>Your Website</h1>
//       <p>Welcome to your website. Please enjoy your stay.</p>
//       <CookieCheckCard />
//     </div>
//   );
// }

// export default App;
