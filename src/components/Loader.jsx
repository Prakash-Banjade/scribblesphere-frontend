import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  const override = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  };

  return <HashLoader color="#36d7b7" cssOverride={override} />;
};

export default Loader;
