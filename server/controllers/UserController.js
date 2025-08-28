const { User } = require("../models");
const { encryptPwd, decryptPwd } = require("../helpers/brcrypt");
const { tokenGenerator } = require("../helpers/jwt");

class UserController {

    static async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const encrypted = encryptPwd(password)
            const user = await User.create({
                name,
                email,
                password: encrypted,
                role: "admin",
            });
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

    // POST /api/login
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let userFound = await User.findOne({
                where: { email },
            });

            if (!userFound) {
                return res.status(404).json({ message: "Email Not Found" });
            }

            if (!decryptPwd(password, userFound.password)) {
                return res.status(400).json({ message: "Invalid Password" });
            }

            const access_token = tokenGenerator(userFound);

            res.status(200).json({
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                role: userFound.role,   // ini penting untuk cek di frontend
                access_token
            });

        } catch (err) {
            res.status(500).json(err);
        }
    }



};

module.exports = UserController;