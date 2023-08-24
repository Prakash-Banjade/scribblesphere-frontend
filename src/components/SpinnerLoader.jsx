import FadeLoader from "react-spinners/FadeLoader";

const SpinnerLoader = () => {

    const overRide = {
        display: 'block',
        margin: '20px auto',
    }

  return <div className="flex items-center justify-center"><FadeLoader color="#777" cssOverride={overRide} /></div>
}

export default SpinnerLoader
