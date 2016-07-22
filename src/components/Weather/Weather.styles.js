import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  day: {
      backgroundColor: "#00BFFF",
      //backgroundColor: "#10B0FF",
      color:"white",
      fontSize: 20,
      margin: "10px",
      width: 200,
      textAlign: "center",
      //fontFamily: "Roboto",
      fontFamily: "Arial Rounded MT Bold",
      //fontFamily: "Monaco",
      /*':hover': {
        color: "red",
      }*/
    },
  dusk: {
      backgroundColor: "#191970",
      color:"#4169E1",
      fontSize: 20,
      width: 224,
      textAlign: "center",
      fontFamily: "Arial Rounded MT Bold",
    },
  loc: {
        fontSize: 50,
    },
  refresh: {
        fontSize: 15,
    },
  temp: {
        fontSize: 40,
    },
});

export default styles;
