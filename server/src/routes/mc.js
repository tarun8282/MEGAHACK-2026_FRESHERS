const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

/**
 * GET /api/mc/dashboard?city_id=<uuid>
 * Returns departments and complaints for a given city_id.
 * Uses the service-role Supabase client, so RLS is bypassed.
 */
router.get('/dashboard', async (req, res) => {
    const { city_id } = req.query;

    if (!city_id) {
        return res.status(400).json({ success: false, error: 'city_id query param is required' });
    }

    try {
        // Fetch departments for the city
        const { data: departments, error: deptError } = await supabase
            .from('departments')
            .select('id, name, category_slug, helpline, email, sla_hours')
            .eq('city_id', city_id)
            .order('name');

        if (deptError) {
            console.error('[MC Dashboard] dept error:', deptError);
            return res.status(500).json({ success: false, error: deptError.message });
        }

        // Fetch all complaints for the city
        const { data: complaints, error: compError } = await supabase
            .from('complaints')
            .select('id, complaint_number, title, category, priority, status, created_at, sla_deadline, resolved_at, ward_number, assigned_department_id, city_id')
            .eq('city_id', city_id)
            .order('created_at', { ascending: false });

        if (compError) {
            console.error('[MC Dashboard] complaints error:', compError);
            return res.status(500).json({ success: false, error: compError.message });
        }

        return res.json({
            success: true,
            data: {
                departments: departments || [],
                complaints: complaints || [],
            }
        });
    } catch (err) {
        console.error('[MC Dashboard] unexpected error:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
