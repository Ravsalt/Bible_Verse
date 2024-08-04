document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const verseText = document.getElementById('verse-text');
    const verseSource = document.getElementById('verse-source');
    const verseMeaning = document.getElementById('verse-meaning');

    function showSpinner(show) {
        spinner.style.display = show ? 'block' : 'none';
    }

    async function fetchVerse() {
        showSpinner(true);
        try {
            const response = await fetch('verses.txt');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.text();
            const verses = data.split('\n').filter(line => line.trim() !== '');
            
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
            const verseIndex = dayOfYear % verses.length;
            const [text, source, meaning] = verses[verseIndex].split('|');
            
            verseText.textContent = text;
            verseSource.textContent = source;
            verseMeaning.textContent = meaning;
        } catch (error) {
            console.error('Error fetching the verse:', error);
            verseText.textContent = 'Error loading verse.';
            verseSource.textContent = '';
            verseMeaning.textContent = '';
        } finally {
            showSpinner(false);
        }
    }

    fetchVerse();
});
