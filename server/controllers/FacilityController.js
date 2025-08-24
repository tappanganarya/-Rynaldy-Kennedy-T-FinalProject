const { Facility } = require("../models");

class FacilityController {
    static async createFacility(req, res) {
        try {
            const facility = await Facility.create(req.body);
            res.json(facility);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllFacilities(req, res) {
        try {
            const facilities = await Facility.findAll();
            res.json(facilities);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getFacilityById(req, res) {
        try {
            const facility = await Facility.findByPk(req.params.id);
            if (!facility) return res.status(404).json({ error: "Facility not found" });
            res.json(facility);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateFacility(req, res) {
        try {
            const { name } = req.body; // ambil dari body
            const { id } = req.params; // ambil dari params

            const facility = await Facility.findByPk(id);
            if (!facility) return res.status(404).json({ error: "facility not found" });

            await facility.update({ name }); // langsung update facility yg sudah ditemukan

            res.json(facility);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteFacility(req, res) {
        try {
            const facility = await Facility.findByPk(req.params.id);
            if (!facility) return res.status(404).json({ error: "Facility not found" });
            await facility.destroy();
            res.json({ message: "Facility deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = FacilityController;