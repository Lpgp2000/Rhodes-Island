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
    .from('rhodes-cloud') // your actual bucket
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
    .from('rhodes-cloud') // updated to correct bucket name
    .list('uploads');

  if (error) {
    console.error(error);
    return;
  }

  fileList.innerHTML = data
    .map(file => `<div><a href="${SUPABASE_URL}/storage/v1/object/public/rhodes-cloud/uploads/${file.name}" target="_blank">${file.name}</a></div>`)
    .join('');
}

loadFiles();

// 🌙 Soft welcoming message
document.addEventListener('DOMContentLoaded', function () {
  const message = "Your Rhodes Island is ready.";
  alert(message);
});

const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const windowEl = document.getElementById('chat-window');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  // Basic AI placeholder
  if (text.startsWith('@PRTS')) {
    const reply = await fakeReply(text);
    appendMessage('ai', reply);
  }
});

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
  div.textContent = message;
  windowEl.appendChild(div);
  windowEl.scrollTop = windowEl.scrollHeight;
}

// Temporary mock for AI
async function fakeReply(input) {
  return "I hear you. I'm with you. Let's continue.";
}
