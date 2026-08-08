const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const catalog = {
  headphones: { name: "AeroSound Pro", price: 12999 },
  watch: { name: "Pulse Watch S", price: 8499 },
  lamp: { name: "Halo Desk Lamp", price: 3299 },
  chair: { name: "Form Lounge Chair", price: 15999 },
  mat: { name: "Flow Mat Pro", price: 2499 },
  bottle: { name: "Core Bottle", price: 1299 }
};

function sendJson(res, status, body) {
  res.status(status).json(body);
}

module.exports = async function createCheckoutSession(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return sendJson(res, 500, { error: "Stripe is not configured on this deployment." });
  }

  const cart = Array.isArray(req.body?.cart) ? req.body.cart : [];
  const customerEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!cart.length) {
    return sendJson(res, 400, { error: "Your cart is empty." });
  }

  const lineItems = [];
  let total = 0;

  for (const item of cart) {
    const product = catalog[item.id];
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return sendJson(res, 400, { error: "One or more cart items are invalid." });
    }

    total += product.price * quantity;
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: { name: product.name },
        unit_amount: product.price * 100
      },
      quantity
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`;
  const orderId = `CR-${Date.now()}`;
  let orderSaved = false;

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { error } = await supabase.from("orders").insert({
      id: orderId,
      email: customerEmail || null,
      status: "pending",
      total_inr: total,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
    });

    if (error) {
      return sendJson(res, 500, { error: "Unable to create the order." });
    }

    orderSaved = true;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: lineItems,
      metadata: { order_id: orderId },
      success_url: `${origin}/?checkout=success&order=${orderId}`,
      cancel_url: `${origin}/?checkout=cancelled`
    });

    return sendJson(res, 200, { url: session.url, orderId, orderSaved });
  } catch (error) {
    return sendJson(res, 502, { error: "Stripe could not start checkout." });
  }
};
