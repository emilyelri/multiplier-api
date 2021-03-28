const router = require("express").Router();

// GET DOCUMENTATION
router.get("/", (req, res) => {
  try {
    res.json({
      Documentation: {
        Purpose: "API will calculate and return the product of two numbers.",
        Instructions: {
          POST:
            "Send a POST request to /api/ with the two numeric arguments of any variable type (integer, float, string, etc.) in JSON format.",
          Note:
            "Both parameters MUST be numbers or API will return error status 500.",
          Parameters: {
            multiplier: "{number}",
            multiplicand: "{number}",
            Example_Parameters: {
              multiplier: 3,
              multiplicand: 4,
            },
          },
          Result: {
            Product:
              "API will return the product of the two factors in JSON format.",
            Example_Result: { PRODUCT: 12 },
          },
        },
      },
    });
  } catch {
    res.status(500).json({ message: "Failed to accesss API documentation." });
  }
});

// MULTIPLY TWO FACTORS AND RETURN PRODUCT
router.post("/", validateRequest, (req, res) => {
  const { multiplier, multiplicand } = req.body;
  const product = multiplier * multiplicand;

  try {
    res.status(200).json({ PRODUCT: product });
  } catch {
    res.status(500).json({ ERROR: "API failed to return product." });
  }
});

function validateRequest(req, res, next) {
  const { multiplier, multiplicand } = req.body;

  if (!multiplier) {
    return res
      .status(500)
      .send({ ERROR: "Must provide multiplier." });
  }

  if (!multiplicand) {
    return res
      .status(500)
      .send({ ERROR: "Must provide multiplicand." });
  }


  if (isNaN(multiplier)) {
    return res
      .status(500)
      .send({ ERROR: "Multiplier is not a number - please provide a number." });
  }

  if (isNaN(multiplicand)) {
    return res.status(500).send({
      ERROR: "Multiplicand is not a number - please provide a number.",
    });
  }

  next();
}

module.exports = router;
