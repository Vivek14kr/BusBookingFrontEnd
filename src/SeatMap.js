import React from 'react';

function SeatMap(props) {
  return (
    <div className="seat-map"
    style={{
        margin: "5% 5% 5% 5%",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridGap: "2%",
        justifyContent: "center",
        textAlign: "center",
        paddingBottom: "50px"
      
    }}
    >
      {props.seats.map((seat) => (
        <Seat
          key={seat.seatNumber}
          seatNumber={seat.seatNumber}
          status={seat.status}
          onClick={() => props.onSeatClick(seat)}
        />
      ))}
    </div>
  );
}

function Seat(props) {
  return (
    <button className={`seat ${props.status}`} onClick={props.onClick}>
      {props.seatNumber}
    </button>
  );
}

export default SeatMap;
