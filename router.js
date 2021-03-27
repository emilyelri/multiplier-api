const router = require("express").Router();

// GET DOCUMENTATION
router.get("/", (req, res) => {
  try {
    res.json({ Documentation: "documentation" });
  } catch {
    res.status(500).json({ message: "Failed to accesss API documentation." });
  }
});

// MULTIPLY TWO FACTORS AND RETURN PRODUCT
router.post("/", validateRequest, (req, res) => {
  const { multiplier, multiplicand } = req.body;
  const product = multiplier * multiplicand;

  try {
    res.status(201).json({ PRODUCT: product });
  } catch {
    res.status(500).json({ ERROR: "API failed to return product." });
  }
});

function validateRequest(req, res, next) {
  const { multiplier, multiplicand } = req.body;

  if (!multiplier || !multiplicand) {
    return res
      .status(404)
      .send({ ERROR: "Must provide exactly two integers to multiply." });
  }

  if (isNaN(multiplier)) {
    return res
      .status(404)
      .send({ ERROR: "Multiplier is not a number - please provide a number." });
  }

  if (isNaN(multiplicand)) {
    return res
      .status(404)
      .send({
        ERROR: "Multiplicand is not a number - please provide a number.",
      });
  }

  next();
}

module.exports = router;
