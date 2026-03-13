const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

/**
 * @route POST /api/auth/register
 * @desc Mock registration (Simplified for demo)
 */
router.post('/register', async (req, res) => {
    try {
        const { phone, full_name, role, city_id, state_id } = req.body;
        
        // In real app, we use supabase.auth.signUp with OTP
        // For hackathon, we'll create a profile and mock auth
        const { data: profile, error } = await supabase
            .from('profiles')
            .insert({
                // id: Use a mock or let Supabase generate (if not linked to auth.users)
                // Note: Schema has FK to auth.users, so this needs real auth IDs normally.
                full_name,
                phone,
                role,
                city_id,
                state_id
            })
            .select()
            .single();

        if (error) throw error;
        res.json({ success: true, profile });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
