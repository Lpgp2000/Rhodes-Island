// Replace with your Supabase credentials
const SUPABASE_URL = 'https://itsyknxpygubozjydqut.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0c3lrbnhweWd1Ym96anlkcXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5Nzc3NDUsImV4cCI6MjA2MjU1Mzc0NX0.kPNsdOEWQeNBhpZd5kNdgK5Lxkk21SXVsN3Pb4Hv4S0';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return alert('Please select a file');

  const { data, error } = await supabase.storage
    .from('rhodes-cloud') // replace with your actual bucket
    .upload(`uploads/${file.name}`, file);

  if (error) {
    alert('Upload failed: ' + error.message);
  } else {
    alert('Upload successful!');
    loadFiles();
  }
});

async function loadFiles() {
  const { data, error } = await supabase.storage
    .from('your-bucket')
    .list('uploads');

  if (error) {
    console.error(error);
    return;
  }

  fileList.innerHTML = data
    .map(file => `<div><a href="${SUPABASE_URL}/storage/v1/object/public/your-bucket/uploads/${file.name}" target="_blank">${file.name}</a></div>`)
    .join('');
}

loadFiles();
