export interface CalculatorInputs {
    wallLength: number;
    wallHeight: number;
    brickLength: number;
    brickWidth: number;
    brickHeight: number;
    thicknessRows: number;
    brickPrice: number;
    mortarThickness: number;
    mortarPrice: number;
}

export interface QuoteResult {
    totalBricks: number;
    totalBrickPrice: number;
    totalMortarVol: number;
    totalMortarPrice: number;
    totalPrice: number;
}
