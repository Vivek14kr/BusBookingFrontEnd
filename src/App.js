import React, { useEffect, useState } from "react";
import "./App.css";
import SeatMap from "./SeatMap";

function App() {
  const [seats, setSeats] = useState([]);
  const [login, setLogin] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [lastname, setLastName] = useState("");
  const [signUpUser, setUser] = useState(false);
  const [Admin, setAdmin] = useState(false);

  const [adminfirst, setAdminFirst] = useState("");
  const [adminlast, setAdminLast] = useState("");
  useEffect(() => {
    console.log("line 10");
    fetch("http://localhost:2344/seat")
      .then((res) => res.json())
      .then((res) => setSeats(res));
  }, []);

  console.log(seats, " checking");

  const handleSeatCancel = async (seatNumber) => {
    console.log(seatNumber, " checking number ", userDetails);

    if (seatNumber.status == false) {
      alert("Already Cancelled");
      return;
    } else {
      console.log(seatNumber);
      await fetch(
        `http://localhost:2344/seat/cancelseat/${seatNumber._id}/${userDetails}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "Showin ");
        });

      await fetch("http://localhost:2344/seat")
        .then((res) => res.json())
        .then((res) => setSeats(res));
    }

  }

  const handleSeatClick = async (seatNumber) => {
    console.log(seatNumber, " checking number ", userDetails);

    if (seatNumber.status == true) {
      alert("Already Booked");
      return;
    } else {
      console.log(seatNumber);
      await fetch(
        `http://localhost:2344/seat/bookseat/${seatNumber._id}/${userDetails}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "Showin ");
        });

      await fetch("http://localhost:2344/seat")
        .then((res) => res.json())
        .then((res) => setSeats(res));
    }
  };
  const handleSignup = () => {
    fetch("http://localhost:2344/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(true);
        setUserDetails(res.data._id);
        console.log(res, " post req");
      });
  };

  const handleLogin = () => {
    fetch(
      `http://localhost:2344/user/firstname/${firstname}/lastname/${lastname}`
    )
      .then((res) => res.json())
      .then((res) => {
        setLogin(true);
        setUserDetails(res._id);
      });
  };
  console.log("after login", userDetails);

  const handleAdmin = () =>{
    if (adminfirst && adminlast == "admin"){
      setAdmin(true)
    }
  }
  return (
    <div className="app">
     

      {signUpUser || login || Admin ? (
        <div style={{display:"flex"}}>
          <div
            style={{
              height: "fit-content",
              width: "500px",
              border: "5px solid black",
              alignContent: "center",
              margin: "0 auto",
            }}
          >
            <h1>Bus Seat Booking</h1>

            <div>
              Available - Not Filled
              <br />
              Not Available - Filled
            </div>
            <div
              style={{
                margin: "0 auto",
                paddingLeft: "20%",
              }}
            >
              <SeatMap seats={seats} onSeatClick={handleSeatClick} />
            </div>
          </div>
          {Admin ? (
            <div>
              <div
                style={{
                  height: "fit-content",
                  width: "500px",
                  border: "5px solid black",
                  alignContent: "center",
                  margin: "0 auto",
                }}
              >
                <h1>Cancel Seat Booking</h1>

                <div>
                  Available - Not Filled
                  <br />
                  Not Available - Filled
                </div>
                <div
                  style={{
                    margin: "0 auto",
                    paddingLeft: "20%",
                  }}
                >
                  <SeatMap seats={seats} onSeatClick={handleSeatCancel} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1>ADMIN SIGNUP</h1>

              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setAdminFirst(e.target.value);
                }}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setAdminLast(e.target.value);
                }}
              />
              <br />
              <button onClick={handleAdmin}>Signup</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>
            <h1>SIGNUP</h1>

            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <br />
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <button onClick={handleSignup}>Signup</button>
          </div>
          <br />
          <h1>OR</h1>
          <br />

          <h1>LOGIN</h1>
          <br />

          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />

          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
