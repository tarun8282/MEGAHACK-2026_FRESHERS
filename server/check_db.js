const { supabase } = require('./src/lib/supabase');
const fs = require('fs');

async function checkCitizens() {
  let output = '';
  output += 'Checking Citizens Table...\n';
  const { data, error } = await supabase
    .from('citizens')
    .select('id, full_name, email, state_id, city_id');

  if (error) {
    output += `Error fetching citizens: ${error.message}\n`;
  } else {
    output += `Citizens found: ${data.length}\n`;
    output += JSON.stringify(data, null, 2) + '\n';
  }

  output += '\nChecking Officers Table (Admins/Officers)...\n';
  const { data: officers, error: officerError } = await supabase
    .from('officers')
    .select('id, full_name, username, role, state_id, city_id');

  if (officerError) {
    output += `Error fetching officers: ${officerError.message}\n`;
  } else {
    output += `Officers found: ${officers.length}\n`;
    output += JSON.stringify(officers, null, 2) + '\n';
  }

  fs.writeFileSync('db_check_results.txt', output);
  console.log('Results written to db_check_results.txt');
}

checkCitizens();
