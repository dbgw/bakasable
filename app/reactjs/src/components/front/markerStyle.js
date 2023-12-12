const K_SIZE = 100;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE,
  height: 40,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  borderRadius: 24,
  backgroundColor: "white",
  textAlign: "center",
  color: "#000",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 5px #3f51b5",
  fontSize: "22px",
  fontWeight: 700,
  padding: "8px 15px",
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: "5px solid #3f51b5",
  color: "#f44336",
};

export { greatPlaceStyle, greatPlaceStyleHover, K_SIZE };
