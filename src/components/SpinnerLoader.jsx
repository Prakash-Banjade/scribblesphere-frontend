import FadeLoader from "react-spinners/FadeLoader";

const SpinnerLoader = () => {

    const overRide = {
        display: 'block',
        margin: '20px auto',
    }

  return <FadeLoader color="#999" cssOverride={overRide} />
}

export default SpinnerLoader
