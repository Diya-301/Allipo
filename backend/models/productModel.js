import mongoose from "mongoose";

const pharmaGradeSchema = new mongoose.Schema({
    IP: { price: Number },
    BP: { price: Number },
    EP: { price: Number },
    USP: { price: Number },
    Pharma: { price: Number },
    NF: { price: Number },
}, { _id: false });

const gradeSchema = new mongoose.Schema({
    LR: { price: Number },
    AR: { price: Number },
    ACS: { price: Number },
    FCC: { price: Number }
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pharma_grade: pharmaGradeSchema,
    grade: gradeSchema,
    CAS_No: { type: String, required: true }
}, { _id: false });

const productsCollectionSchema = new mongoose.Schema({
    carbonates_bicarbonates: [productSchema],
    citric_and_citrates: [productSchema],
    acetates: [productSchema],
    chlorides: [productSchema],
}, { minimize: false });

const productModel = mongoose.models.product || mongoose.model('product', productsCollectionSchema);

export default productModel;
