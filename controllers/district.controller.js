const District = require('../models/district.model');


const addDistrict = async (req, res) => {
    const { districtId, name, province } = req.body;

    try {
        const existingDistrict = await District.findOne({ districtId });
        if (existingDistrict) {
            return res.status(400).json({ message: 'District is already there' });
        }

        const newDistrict = new District({ districtId, name, province });
        await newDistrict.save();
        
        res.status(201).json({ message: 'successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find();
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const deleteDistrict = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDistrict = await District.findByIdAndDelete(id);
        if (!deletedDistrict) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ message: 'Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

module.exports = { addDistrict, getAllDistricts,deleteDistrict };
