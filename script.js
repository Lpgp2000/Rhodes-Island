// Replace with your Supabase credentials
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return alert('Please select a file');

  const { data, error } = await supabase.storage
    .from('your-bucket') // replace with your actual bucket
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
