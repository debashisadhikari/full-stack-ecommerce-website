
const cron = require("node-cron");
const Order = require("../Model/order");

// Check every hour
cron.schedule(
  "0 * * * *",
  async () => {
    try {
      const currentDate = new Date();

      const result = await Order.updateMany(
        {
          Products: {
            $elemMatch: {
              deliveryDate: { $lt: currentDate },
              status: { $in: ["pending", "shipped"] },
            },
          },
        },
        {
          $set: {
            "Products.$[item].status": "cancelled",
          },
        },
        {
          arrayFilters: [
            {
              "item.deliveryDate": { $lt: currentDate },
              "item.status": { $in: ["pending", "shipped"] },
            },
          ],
        }
      );

      console.log(
        "Automatic cancellation completed:",
        result.modifiedCount,
        "orders updated"
      );

    } catch (error) {
      console.error("Order cron error:", error);
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);
