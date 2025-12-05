import type { CalculatorInputs, QuoteResult } from '../types';

export function calculateQuote(inputs: CalculatorInputs): QuoteResult {
    const {
        wallLength,
        wallHeight,
        brickLength,
        brickWidth,
        brickHeight,
        thicknessRows,
        brickPrice,
        mortarThickness,
        mortarPrice
    } = inputs;

    // Convert units to Meters
    const brickL = brickLength / 100;
    const brickW = brickWidth / 100;
    const brickH = brickHeight / 100;
    const mortarThick = mortarThickness / 100;

    // 1. Calculate Bricks (Strict logic from prompt)
    // "Nombre de rangées verticales = hauteur mur / hauteur brique"
    const rowsVertical = wallHeight / brickH;
    
    // "Nombre de briques par rangée = (longueur mur / longueur brique) × nombre de rangées d’épaisseur"
    const bricksPerRow = (wallLength / brickL) * thicknessRows;
    
    // "Nombre total = rangées verticales × briques par rangée"
    const totalBricks = Math.ceil(rowsVertical * bricksPerRow);

    // 2. Calculate Mortar Volume (Precise logic)
    
    // Wall Width (Thickness)
    const wallWidth = (brickW * thicknessRows) + (mortarThick * (thicknessRows - 1));

    // Horizontal Joints Volume
    const volHorizontal = (wallLength * wallWidth * mortarThick) * rowsVertical;

    // Vertical Joints Volume (Transverse)
    const numBricksLinear = wallLength / brickL;
    const volVerticalPerWythe = numBricksLinear * (brickH * brickW * mortarThick) * rowsVertical;
    const volVerticalTotal = volVerticalPerWythe * thicknessRows;

    // Internal Longitudinal Joints (Collar joint) if thickness > 1
    let volInternal = 0;
    if (thicknessRows > 1) {
        volInternal = wallLength * wallHeight * mortarThick * (thicknessRows - 1);
    }

    const totalMortarVol = volHorizontal + volVerticalTotal + volInternal;

    // 3. Calculate Prices
    const totalBrickPrice = totalBricks * brickPrice;
    const totalMortarPrice = totalMortarVol * mortarPrice;
    const totalPrice = totalBrickPrice + totalMortarPrice;

    return {
        totalBricks,
        totalBrickPrice,
        totalMortarVol,
        totalMortarPrice,
        totalPrice
    };
}
