// ============================
// ELEMENTS
// ============================
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const userInfoBottomSheet = document.getElementById("userInfoBottomSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const openUserInfoBottomSheet = document.getElementById("openUserInfoBottomSheet");

// ============================
// HAMBURGER MENU TOGGLE
// ============================
hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("-translate-x-full");
  menuOverlay.classList.toggle("hidden");
  hamburger.classList.add("hidden");
});

// Close menu by clicking outside
menuOverlay.addEventListener("click", () => {
  sideMenu.classList.add("-translate-x-full");
  menuOverlay.classList.add("hidden");
  hamburger.classList.remove("hidden");
});

// ============================
// BOTTOM SHEET TOGGLE
// ============================
openUserInfoBottomSheet.addEventListener("click", () => {
  userInfoBottomSheet.classList.add("open");
  sheetOverlay.classList.remove("hidden");
  hamburger.classList.add("hidden"); // hide to avoid overlap
});

// Close bottom sheet
sheetOverlay.addEventListener("click", () => {
  userInfoBottomSheet.classList.remove("open");
  sheetOverlay.classList.add("hidden");
  hamburger.classList.remove("hidden");
});

// Prevent accidental close
userInfoBottomSheet.addEventListener("click", e => e.stopPropagation());

// ============================
// UPDATE CV CONTENT
// ============================
document.getElementById("updateContent").addEventListener("click", () => {

  document.getElementById("nameDisplay").innerText =
    document.getElementById("inputName").value || "John Doe";

  document.getElementById("titleDisplay").innerText =
    document.getElementById("inputTitle").value || "Software Engineer";

  document.getElementById("contactDisplay").innerText =
    document.getElementById("inputEmail").value + " | " +
    document.getElementById("inputPhone").value;

  document.getElementById("linksDisplay").innerText =
    document.getElementById("inputLinks").value;

  document.getElementById("avatarImg").src =
    document.getElementById("inputAvatar").value || "";

  document.getElementById("summaryDisplay").innerText =
    document.getElementById("inputSummary").value || "Highly motivated software engineer...";

  // ============================
  // EXPERIENCE JSON
  // ============================
  const expJson = document.getElementById("inputExperience").value;
  const expDisplay = document.getElementById("experienceDisplay");
  expDisplay.innerHTML = "";

  try {
    const expArr = JSON.parse(expJson);
    expArr.forEach(exp => {
      const div = document.createElement("div");
      div.classList.add("mb-4");
      div.innerHTML = `
        <h3 class="font-semibold">${exp.title} - ${exp.company}</h3>
        <p class="text-gray-600 text-sm mb-1">${exp.dates} | ${exp.location}</p>
        <ul class="list-disc list-inside text-gray-700 text-sm">
          ${exp.details.map(d => `<li>${d}</li>`).join("")}
        </ul>`;
      expDisplay.appendChild(div);
    });
  } catch (e) {
    expDisplay.innerHTML = "<p class='text-red-500 text-sm'>Invalid JSON</p>";
  }

  // ============================
  // EDUCATION JSON
  // ============================
  const eduJson = document.getElementById("inputEducation").value;
  const eduDisplay = document.getElementById("educationDisplay");
  eduDisplay.innerHTML = "";

  try {
    const eduArr = JSON.parse(eduJson);
    eduArr.forEach(edu => {
      const p = document.createElement("p");
      p.classList.add("text-gray-700", "text-sm", "mb-2");
      p.innerText = `${edu.degree}, ${edu.school} | ${edu.dates}`;
      eduDisplay.appendChild(p);
    });
  } catch (e) {
    eduDisplay.innerHTML = "<p class='text-red-500 text-sm'>Invalid JSON</p>";
  }

  // Close sheet
  userInfoBottomSheet.classList.remove("open");
  sheetOverlay.classList.add("hidden");
  hamburger.classList.remove("hidden");
});

// ============================
// PDF GENERATION
// ============================
document.getElementById("generate").addEventListener("click", () => {
  html2pdf().set({
    margin: 0.2,
    filename: "CV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  }).from(document.getElementById("content")).save();
});
