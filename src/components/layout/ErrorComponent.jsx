import React from 'react'
import { Button } from '@mui/material'

const ErrorComponent = () => {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:p-5 sm:p-3 p-2 flex flex-col items-center gap-3">

            <h2 className="text-xl font-semibold text-center" style={{ color: 'var(--text-200)' }}>An unexpected error has occurred.</h2>
            <Button variant="contained" onClick={() => location.reload()}>Reload</Button>

        </div>
    )
}

export default ErrorComponent
