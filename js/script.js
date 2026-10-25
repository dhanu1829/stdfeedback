// Submit Feedback Form Listener
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const payload = {
                studentName: document.getElementById('studentName').value,
                studentId: document.getElementById('studentId').value,
                facultyId: document.getElementById('facultySelect').value,
                courseName: document.getElementById('courseName').value,
                rating: document.getElementById('rating').value,
                comments: document.getElementById('comments').value
            };

            try {
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const result = await response.json();
                if (response.ok) {
                    alert('Feedback Submitted Successfully!');
                    feedbackForm.reset();
                } else {
                    alert(result.error || 'Submission failed.');
                }
            } catch (err) {
                console.error('Error submitting feedback:', err);
            }
        });
    }
});