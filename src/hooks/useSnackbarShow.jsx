import { useSnackbar } from "notistack";

const useSnackbarShow = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant })
    }

    return showSnackbar;
}

export default useSnackbarShow;