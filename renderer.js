window. addEventListener ('DOMContentLoaded', async () => {
    const textarea = document.getElementById('note' );
    const saveBtn = document.getElementById('save' );

    // Load saved note on startup
    const savedNote = await window. electronAPI. loadNote();
    textarea. value = savedNote;

    const deleteBtn = document. getElementById('deleteBtn' );

    deleteBtn.addEventListener('click', async () => {
        if (confirm('Really delete ALL notes? This cannot be undone!')) {
            try {
                await window.electronAPI.deleteNote();
                textarea.value = '';
                lastSavedText = '';
                statusEl.textContent = 'All notes deleted!';
                statusEl.style.color = 'red';
            } catch (err) {
                alert('Delete failed!');
            }
        }
    });

    saveBtn. addEventListener('click', async () => {
        await window. electronAPI.saveNote(textarea.value);
        alert ('Note saved successfully!' ) ;
    });   

    const saveAsBtn = document.getElementById('save-as');

    saveAsBtn.addEventListener('click', async () => {
        const result = await window.electronAPI.saveAs(textarea.value);
        if (result.success) {
            lastSavedText = textarea.value;
            statusEl.textContent = `Saved to: ${result.filePath}`;
        } else {
            statusEl.textContent = 'Save As cancelled.';
        }
    });
});