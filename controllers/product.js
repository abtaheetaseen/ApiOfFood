const Product = require("../models/product");

const getAllProducts = async (req, res) => {

    const {category, name, featured, sort, select, _id, image} = req.query;

    const queryObject = {};

    if(category) {
        queryObject.category = category;
    }

    if(_id) {
        queryObject._id = _id;
    }

    if(image) {
        queryObject.image = image;
    }

    if(name) {
        queryObject.name = { $regex: name, $options: "i" };
    } 

    if(featured) {
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // Pagination
    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 9;

    // let skip = (page - 1) * limit;

    // apiData = apiData.skip(skip).limit(limit);

    const myProducts = await apiData;

    res.status(200).json(myProducts);
};

const getAllProductsTesting = async (req, res) => {
    const myProducts = await Product.find(req.query);

    res.status(200).json({myProducts});
};

module.exports = {getAllProducts, getAllProductsTesting};