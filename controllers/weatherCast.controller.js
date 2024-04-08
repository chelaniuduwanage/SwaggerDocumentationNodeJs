const { json } = require('body-parser');
const WeatherCast = require('../models/weatherCast.model');

const addWeatherRecord = async (req, res) => {
    const requestData = req.body;
    console.log(requestData);
    try {
        const previousRecords = await WeatherCast.find({ isExpired:false });
        if (previousRecords.length > 0) {
            await WeatherCast.updateMany({ isExpired: true });
        }

    const insertData = await WeatherCast.insertMany(requestData);
        sage
    res.status(200).json({ message: 'Successful', insertData });
    } catch (error) {
        res.status(500).json({ message: 'Error'});
    }
};

const deleteWeatherRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecord = await WeatherCast.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json({ message: 'Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const deleteAllWeather = async (req, res) => {
    try {
        
        await WeatherCast.deleteMany({});

        res.status(200).json({ message: 'Successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const getExpiredWeatherForecasts = async (req, res) => {
    try {
        const expiredForecasts = await WeatherCast.find({ isExpired: true });
        res.status(200).json(expiredForecasts);
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const getNonExpiredWeatherForecasts = async (req, res) => {
    try {
        const nonExpiredForecasts = await WeatherCast.find({ isExpired: false });
        res.status(200).json(nonExpiredForecasts);
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

module.exports = { addWeatherRecord, deleteWeatherRecord,getExpiredWeatherForecasts,getNonExpiredWeatherForecasts,deleteAllWeather };
