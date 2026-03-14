const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

router.get('/', async (req, res) => {
    try {
        const { data: states, error } = await supabase
            .from('states')
            .select('*')
            .order('name', { ascending: true });
        if (error) throw error;
        res.json({ success: true, states });
    } catch (error) {
        console.error('[States Route] Error:', error.message, error.code, error.details, error.hint);
        res.status(500).json({ success: false, error: error.message, code: error.code });
    }
});

module.exports = router;
