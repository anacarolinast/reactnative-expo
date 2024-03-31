import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  formContainer: {
    width: "80%",
    height: "60%",
    display: "flex",
    backgroundColor: "#0D0D0D",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  header: {
    marginTop: "6%",
    marginBottom: "8%",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "6%",
  },
  textH1: {
    fontSize: 16,
    color: "white",
  },
  textH2: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  textH3: {
    fontSize: 10,
    color: "white", 
  },
  info: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "4%",
    marginBottom: "4%",
    alignItems: "center"
  },
});

export default styles;
