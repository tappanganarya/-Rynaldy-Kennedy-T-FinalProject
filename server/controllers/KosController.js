const { Kos, User, Facility } = require("../models");

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
            const kos = await Kos.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email'], // hanya field yang ingin ditampilkan
                    },
                    {
                        model: Facility,
                        attributes: ['name'],          // tampilkan nama fasilitas
                        through: { attributes: [] },   // sembunyikan kolom KosFacilities
                    },
                ],
            });
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

    static async addFacilitiesToKos(req, res) {
        try {
            const { kosId } = req.params;
            const { facilityIds } = req.body; // array id fasilitas yang mau ditambahkan

            const kos = await Kos.findByPk(kosId);
            if (!kos) return res.status(404).json({ error: "Kos not found" });

            // Sequelize magic method untuk many-to-many
            await kos.addFacilities(facilityIds);

            const updatedKos = await Kos.findByPk(kosId, {
                include: [
                    { model: Facility, attributes: ['name'], through: { attributes: [] } }
                ]
            });

            res.json(updatedKos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Ambil detail kos berdasarkan id
    static async detailKost(req, res) {
        try {
            const { id } = req.params;
            const kos = await Kos.findByPk(id, {
                include: [
                    { model: User, attributes: ["id", "name", "email"] },
                    { model: Facility, attributes: ["id", "name"] }
                ]
            }); // ambil berdasarkan primary key
            if (!kos) {
                return res.status(404).json({ message: "Kos tidak ditemukan" });
            }
            res.status(200).json(kos);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};

module.exports = KosController;
