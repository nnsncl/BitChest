export const container = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    },
    hidden: {
        opacity: 0
    },
}

export const article = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            duration: 0.3
        },
    }
}

export const list = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03
        },
    },
    hidden: {
        opacity: 0
    },
}

export const item = {
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0
    }
}