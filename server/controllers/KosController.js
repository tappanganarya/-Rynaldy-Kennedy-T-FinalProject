const { Kos } = require("../models");

class KosController {
    static async createKos(req, res) {
        try {
            const kos = await Kos.create(req.body);
            res.json(kos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllKos(req, res) {
        try {
            const kos = await Kos.findAll();
            res.json(kos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getKosById(req, res) {
        try {
            const kos = await Kos.findByPk(req.params.id);
            if (!kos) return res.status(404).json({ error: "Kos not found" });
            res.json(kos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateKos(req, res) {
        try {
            const { name, address, price, type } = req.body; // ambil dari body
            const { id } = req.params; // ambil dari params

            const kos = await Kos.findByPk(id);
            if (!kos) return res.status(404).json({ error: "kos not found" });

            await kos.update({ name, address, price, type }); // langsung update kos yg sudah ditemukan

            res.json(kos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteKos(req, res) {
        try {
            const kos = await Kos.findByPk(req.params.id);
            if (!kos) return res.status(404).json({ error: "Kos not found" });
            await kos.destroy();
            res.json({ message: "Kos deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = KosController;
