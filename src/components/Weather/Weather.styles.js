import { StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  day: {
      backgroundColor: "#00BFFF",
      //backgroundColor: "#10B0FF",
      color:"white",
      fontSize: 20,
      width: 224,
      textAlign: "center",
      //fontFamily: "Roboto",
      fontFamily: "Arial Rounded MT Bold",
      //fontFamily: "Monaco",
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
        fontSize: 5,
        color: "red",
    },
  temp: {
        fontSize: 30,
    },
});

export default styles;
