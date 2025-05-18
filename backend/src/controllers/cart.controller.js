import { Cart } from "../models/cart.model.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId", "-description -productTags -specification");
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart." });
  }
};

// Add or update item in cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Create new cart and push item
      await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
      return res.status(201).json({ message: "Cart created and item added." });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // Update quantity using positional operator
      cart.items[existingItemIndex].quantity += quantity;
      await cart.save();
    } else {
      // Push new item
      await Cart.updateOne(
        { userId: req.user.id },
        { $push: { items: { productId, quantity } } }
      );
    }

    const updatedCart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add/update item in cart." });
  }
};

// update quntity
export const updateQuantityInCart = async (req, res) => {
  const { productId, action } = req.body;

  if (!["inc", "dec"].includes(action)) {
    return res.status(400).json({ error: "Invalid action. Use 'inc' or 'dec'." });
  }

  try {
    // Step 1: Increment or Decrement quantity
    const quantityChange = action === "inc" ? 1 : -1;

    const updateResult = await Cart.updateOne(
      { userId: req.user.id, "items.productId": productId },
      {
        $inc: { "items.$.quantity": quantityChange },
      }
    );

    // Step 2: If decrement made quantity <= 0, remove the item
    await Cart.updateOne(
      { userId: req.user.id },
      {
        $pull: { items: { productId: productId, quantity: { $lte: 0 } } },
      }
    );

    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item quantity." });
  }
};


// Remove item from cart using $pull
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const result = await Cart.updateOne(
      { userId: req.user._id },
      { $pull: { items: { productId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Item not found in cart." });
    }

    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from cart." });
  }
};

// Clear all items from cart using $set
export const clearCart = async (req, res) => {
  try {
    await Cart.updateOne({ userId: req.user._id }, { $set: { items: [] } });
    res.status(200).json({ message: "Cart cleared." });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart." });
  }
};
