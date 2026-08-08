const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

module.exports = async function stripeWebhook(req, res) {
  if (req.method !== "POST" || !process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).json({ error: "Webhook is not configured." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).json({ error: "Invalid webhook signature." });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event.data.object.metadata?.order_id;

    if (orderId && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
      });
      await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
    }
  }

  return res.status(200).json({ received: true });
};

module.exports.config = {
  api: { bodyParser: false }
};
