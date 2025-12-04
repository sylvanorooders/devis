document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculator-form");
  const resultsContainer = document.getElementById("results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculate();
  });

  function calculate() {
    // 1. Get Inputs
    const wallLength = parseFloat(document.getElementById("wall-length").value);
    const wallHeight = parseFloat(document.getElementById("wall-height").value);

    const brickLengthCm = parseFloat(
      document.getElementById("brick-length").value
    );
    const brickWidthCm = parseFloat(
      document.getElementById("brick-width").value
    );
    const brickHeightCm = parseFloat(
      document.getElementById("brick-height").value
    );
    const thicknessRows = parseInt(
      document.getElementById("wall-thickness-rows").value
    );
    const brickPrice = parseFloat(document.getElementById("brick-price").value);

    const mortarThicknessCm = parseFloat(
      document.getElementById("mortar-thickness").value
    );
    const mortarPrice = parseFloat(
      document.getElementById("mortar-price").value
    );

    // Validation
    if (
      [
        wallLength,
        wallHeight,
        brickLengthCm,
        brickWidthCm,
        brickHeightCm,
        thicknessRows,
        brickPrice,
        mortarThicknessCm,
        mortarPrice,
      ].some((v) => isNaN(v) || v < 0)
    ) {
      alert("Veuillez remplir tous les champs avec des valeurs valides.");
      return;
    }

    // 2. Convert units to Meters
    const brickL = brickLengthCm / 100;
    const brickW = brickWidthCm / 100;
    const brickH = brickHeightCm / 100;
    const mortarThick = mortarThicknessCm / 100;

    // 3. Calculate Bricks (Strict logic from prompt)
    // "Nombre de rangées verticales = hauteur mur / hauteur brique"
    const rowsVertical = wallHeight / brickH;

    // "Nombre de briques par rangée = (longueur mur / longueur brique) × nombre de rangées d’épaisseur"
    const bricksPerRow = (wallLength / brickL) * thicknessRows;

    // "Nombre total = rangées verticales × briques par rangée"
    const totalBricks = Math.ceil(rowsVertical * bricksPerRow);

    // 4. Calculate Mortar Volume (Precise logic)
    // We calculate the volume of joints.

    // Wall Width (Thickness)
    // If 1 row: brickW
    // If 2 rows: 2 * brickW + 1 * mortarThick (between wythes)
    const wallWidth =
      brickW * thicknessRows + mortarThick * (thicknessRows - 1);

    // Horizontal Joints Volume
    // Area of one horizontal joint layer = Wall Length * Wall Width
    // Number of horizontal layers approx = Rows Vertical
    const volHorizontal = wallLength * wallWidth * mortarThick * rowsVertical;

    // Vertical Joints Volume (Transverse)
    // Area of one vertical joint = Brick Height * Wall Width (approx, actually brick width usually but let's assume full width for simplicity or per wythe)
    // Actually, vertical joints are between bricks in a row.
    // Number of vertical joints per row approx = (Wall Length / Brick Length)
    // Volume per vertical joint = Brick Height * Wall Width * Mortar Thick?
    // No, usually vertical joints don't cross the cavity if there is one, but here we assume solid wall or full mortar.
    // Let's be precise per wythe:
    // Per wythe, volume of vertical joints = (N_bricks_per_row_per_wythe) * (Brick_H * Brick_W * Mortar_Thick) * N_rows_vertical
    const numBricksLinear = wallLength / brickL;
    const volVerticalPerWythe =
      numBricksLinear * (brickH * brickW * mortarThick) * rowsVertical;
    const volVerticalTotal = volVerticalPerWythe * thicknessRows;

    // Internal Longitudinal Joints (Collar joint) if thickness > 1
    let volInternal = 0;
    if (thicknessRows > 1) {
      // Length * Height * Thickness * (N_wythes - 1)
      volInternal = wallLength * wallHeight * mortarThick * (thicknessRows - 1);
    }

    const totalMortarVol = volHorizontal + volVerticalTotal + volInternal;

    // 5. Calculate Prices
    const totalBrickPrice = totalBricks * brickPrice;
    const totalMortarPrice = totalMortarVol * mortarPrice;
    const totalPrice = totalBrickPrice + totalMortarPrice;

    // 6. Display Results
    document.getElementById("res-brick-count").textContent =
      totalBricks.toLocaleString("fr-FR");
    document.getElementById("res-brick-price").textContent =
      totalBrickPrice.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });

    document.getElementById("res-mortar-vol").textContent =
      totalMortarVol.toFixed(3);
    document.getElementById("res-mortar-price").textContent =
      totalMortarPrice.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });

    document.getElementById("res-total-price").textContent =
      totalPrice.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
      });

    resultsContainer.classList.remove("hidden");

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  }
});
