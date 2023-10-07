const Notification = ({ data }) => {
console.log("msg", data);
  if (!data.message) return null;
  const style = {
    color: data.type == "ok" ? "green" : "red",
    fontSize: 15,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  };
  return <div style={style}>{data.message}</div>;
};

export default Notification;