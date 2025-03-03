export interface FlipCardHandleInterface {
  flipDown: (newFrontText: string | number, newBackText: string | number) => void
  flipUp: (newFrontText: string | number, newBackText: string | number) => void
}
