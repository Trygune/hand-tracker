export type GestureType =
  'none' | 'point' | 'index-pinch' | 'peace' | 'fist' | 'open-hand' | 'rock'

export type GestureDetection = {
  gesture: GestureType
  confidence: number
}
