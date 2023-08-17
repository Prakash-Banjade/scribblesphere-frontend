import React from 'react'

const Counter = ({ count, variant }) => {

    const styles = {
        line: { background: `linear-gradient(to top, var(--gradient-variant-${variant}-primary),var(--gradient-variant-${variant}-secondary), #2a2a2a33), 50%` },
        counter: { background: `linear-gradient(90deg, var(--gradient-variant-${variant}-primary),var(--gradient-variant-${variant}-secondary))` },
    }


    return (
        <section id="counter" className="flex flex-col justify-center items-center" data-aos="fade-down" data-aos-easing="ease-in-out-sine" data-aos-mirror="true"
        >
            <div className="line h-[80px] w-[2px] bg-blue-700" style={styles.line}>

            </div>

            <div className="h-[40px] w-[40px] rounded-full bg-blue-600 text-xl font-medium flex items-center justify-center" style={{ ...styles.counter, color: 'var(--bg-secondary)' }}>
                {count}
            </div>

        </section>
    )
}

export default Counter
