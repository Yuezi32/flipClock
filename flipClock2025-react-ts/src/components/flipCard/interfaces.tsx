export interface FlipCardHandleInterface {
    flipDown: (
        newFrontText: string | number,
        newBackText: string | number
    ) => void
    flipUp: (
        newFrontText: string | number,
        newBackText: string | number
    ) => void
}

export interface FlipCardPropsInterface {
    initFrontText?: string | number
    initBackText?: string | number
    duration?: number
}
