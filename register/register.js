
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add");
  const participantsGrid = document.querySelector(".participants");

  
  let count = participantsGrid.querySelectorAll("section.participant").length;

  addBtn.addEventListener("click", () => {
    count += 1;
    addBtn.insertAdjacentHTML("beforebegin", participantTemplate(count));
  });

 
  function participantTemplate(num) {
    return `
<section class="participant participant${num}">
  <p>Participant ${num}</p>

  <div class="item">
    <label for="fname_${num}">First Name<span>*</span></label>
    <input id="fname_${num}" name="fname_${num}" type="text" required>
  </div>

  <div class="item activities">
    <label for="activity_${num}">Activity #<span>*</span></label>
    <input id="activity_${num}" name="activity_${num}" type="text">
  </div>

  <div class="item">
    <label for="fee_${num}">Fee ($)<span>*</span></label>
    <input id="fee_${num}" name="fee_${num}" type="number" min="0" step="1">
  </div>

  <div class="item">
    <label for="date_${num}">Desired Date<span>*</span></label>
    <input id="date_${num}" name="date_${num}" type="date">
  </div>

  <div class="item">
    <p>Grade</p>
    <select name="grade_${num}" id="grade_${num}">
      <option disabled selected value=""></option>
      <option value="1">1st</option><option value="2">2nd</option>
      <option value="3">3rd</option><option value="4">4th</option>
      <option value="5">5th</option><option value="6">6th</option>
      <option value="7">7th</option><option value="8">8th</option>
      <option value="9">9th</option><option value="10">10th</option>
      <option value="11">11th</option><option value="12">12th</option>
    </select>
  </div>
</section>`;
  }
});