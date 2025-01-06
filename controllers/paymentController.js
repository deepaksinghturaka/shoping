 
 
const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env; 
const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const renderProductPage = (req, res) => { 
    res.render('payment');
};

const createOrder = (req, res) => {
    const amount = req.body.amount * 100; // Amount in paise
    const options = {
        amount: amount,
        currency: 'INR',
        receipt: 'order_rcptid_11'
    };

    razorpayInstance.orders.create(options, (err, order) => {
        if (!err) {
            res.status(200).send({
                success: true,
                order_id: order.id,
                key_id: RAZORPAY_ID_KEY,
                product_name: req.body.name,
                description: req.body.description,
                amount: order.amount, // Return the amount for the frontend
                contact: "8699204627",
                name: "deepak",
                email: "devdeepak394@gmail.com"
            });
        } else {
            res.status(400).send({ success: false, msg: 'Something went wrong' });
        }
    });
};

module.exports = {
    renderProductPage,
    createOrder
};
