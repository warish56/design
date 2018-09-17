const Order = require("./../schema/OrderSchema");
const User = require("./../schema/UserSchema");

addOrder = async params => {
  const dataObject = {
    author: params.author,
    user: params.user,
    design: params.design
  };
  const order = new Order(dataObject);
  const result = await order.save();
  if (!result) throw new Error("Internal Server Error -500");

  //  Now adding the order to the users account
  const user = await User.findById(params.user);

  user.orders = [
    ...user.orders,
    {
      author: params.author,
      design: params.design,
      timestamp: result._id.getTimestamp()
    }
  ];
  const update = await user.save();
  if (!update) throw new Error("Internal Server Error -500");

  return result;
};

getOrders = async () => {
  const result = await Order.find()
    .populate({ path: "author", select: "-password" })
    .populate({ path: "user", select: "-password" });
  if (!result) throw new Error("Internal Server Error -500");
  const timeResult = result.map((item, index) => {
    return {
      ...result[index]._doc,
      timestamp: result[index]._id.getTimestamp()
    };
  });
  return timeResult;
};

getSpecificOrder = async orderId => {
  const order = await Order.findById(orderId)
    .populate({ path: "author", select: "-password" })
    .populate({ path: "user", select: "-password" });
  if (!order) throw new Error("Order Not Found -404");
  order._doc.timestamp = order._id.getTimestamp();
  return order;
};

module.exports.addOrder = addOrder;
module.exports.getOrders = getOrders;
module.exports.getSpecificOrder = getSpecificOrder;
