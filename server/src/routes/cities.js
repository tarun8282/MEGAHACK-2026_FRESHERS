const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

router.get('/', async (req, res) => {
    try {
        const { state_id } = req.query;
        let query = supabase.from('cities').select('*');
        if (state_id) query = query.eq('state_id', state_id);
        const { data: cities, error } = await query;
        if (error) throw error;
        res.json({ success: true, cities });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
