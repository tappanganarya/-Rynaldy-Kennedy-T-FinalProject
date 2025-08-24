const { User } = require("../models");

class UserController {

    static async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const { name, email, password } = req.body; // ambil dari body
            const { id } = req.params; // ambil dari params

            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: "User not found" });

            await user.update({ name, email, password }); // langsung update user yg sudah ditemukan

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    static async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });
            await user.destroy();
            res.json({ message: "User deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = UserController;