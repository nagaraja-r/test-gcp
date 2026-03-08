document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('scheduleContainer');
  const talkTemplate = document.getElementById('talkTemplate');
  const searchInput = document.getElementById('searchInput');

  let talksData = [];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const createSchedule = (talks) => {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2024-01-01 10:00:00');

    talks.forEach((talk, index) => {
      const talkElement = talkTemplate.content.cloneNode(true);
      const timeSlot = talkElement.querySelector('.time-slot');
      const talkDetails = talkElement.querySelector('.talk-details');

      const startTime = formatTime(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
      const endTime = formatTime(currentTime);

      timeSlot.textContent = `${startTime} - ${endTime}`;
      talkDetails.querySelector('.talk-title').textContent = talk.title;
      talkDetails.querySelector('.speakers').textContent = 'By: ' + talk.speakers.join(', ');
      talkDetails.querySelector('.category').textContent = 'Category: ' + talk.category.join(', ');
      talkDetails.querySelector('.description').textContent = talk.description;
      
      scheduleContainer.appendChild(talkElement);

      // Add lunch break
      if (index === 2) {
        const lunchElement = talkTemplate.content.cloneNode(true);
        const lunchTimeSlot = lunchElement.querySelector('.time-slot');
        const lunchDetails = lunchElement.querySelector('.talk-details');

        const lunchStartTime = formatTime(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + 60);
        const lunchEndTime = formatTime(currentTime);

        lunchTimeSlot.textContent = `${lunchStartTime} - ${lunchEndTime}`;
        lunchDetails.querySelector('.talk-title').textContent = 'Lunch Break';
        lunchDetails.querySelector('.speakers').textContent = '';
        lunchDetails.querySelector('.category').textContent = '';
        lunchDetails.querySelector('.description').textContent = '';
        scheduleContainer.appendChild(lunchElement);
      }
      
      // Add transition break
      if (index < talks.length -1 && index !==2) {
        currentTime.setMinutes(currentTime.getMinutes() + 10);
      }
    });
  };

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talksData = data;
      createSchedule(talksData);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talksData..filter(talk => {
      return talk.category.some(category => category.toLowerCase().includes(searchTerm));
    });
    if (searchInput.value) {
        createSchedule(filteredTalks);
    } else {
        createSchedule(talksData);
    }
  });
});
