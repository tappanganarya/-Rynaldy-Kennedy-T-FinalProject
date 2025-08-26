const { Kos, User, Facility } = require("../models");

class KosController {
    static async createKos(req, res) {
        try {
            const { name, address, price, type, facilityIds } = req.body;
            const ownerId = req.userData.id; // ✅ dari token, bukan dari body

            const kos = await Kos.create({ name, address, price, type, ownerId });

            if (facilityIds && facilityIds.length > 0) {
                await kos.setFacilities(facilityIds);
            }

            const kosWithFacilities = await Kos.findByPk(kos.id, {
                include: [
                    { model: User, attributes: ["name", "email"] },
                    { model: Facility, attributes: ["id", "name"], through: { attributes: [] } },
                ],
            });

            res.status(201).json(kosWithFacilities);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    static async getAllKosPublic(req, res) {
        try {
            const kos = await Kos.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email'],
                    },
                    {
                        model: Facility,
                        attributes: ['name'],
                        through: { attributes: [] },
                    },
                ],
            });
            res.json(kos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllKos(req, res) {
        try {
            const userId = req.userData.id;

            const kosList = await Kos.findAll({
                where: { ownerId: userId }, // ✅ filter per user
                include: [
                    { model: User, attributes: ["name", "email"] },
                    { model: Facility, attributes: ["name"], through: { attributes: [] } },
                ],
                order: [["id", "ASC"]],
            });

            return res.status(200).json(kosList);
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
            const { name, address, price, type, facilityIds } = req.body;
            const { id } = req.params;
            const userId = req.userData.id;

            const kos = await Kos.findOne({ where: { id, ownerId: userId } }); // ✅ cek kepemilikan
            if (!kos) return res.status(403).json({ error: "Forbidden: not your kos" });

            await kos.update({ name, address, price, type });

            if (facilityIds && Array.isArray(facilityIds)) {
                await kos.setFacilities(facilityIds);
            }

            const updatedKos = await Kos.findByPk(id, {
                include: [
                    { model: User, attributes: ["name", "email"] },
                    { model: Facility, attributes: ["id", "name"], through: { attributes: [] } }
                ]
            });

            res.json(updatedKos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }



    static async deleteKos(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userData.id;

            const kos = await Kos.findOne({ where: { id, ownerId: userId } }); // ✅ cek kepemilikan
            if (!kos) return res.status(403).json({ error: "Forbidden: not your kos" });

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
