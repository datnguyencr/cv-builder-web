// ============================
// ELEMENTS
// ============================
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const userInfoBottomSheet = document.getElementById("userInfoBottomSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const openUserInfoBottomSheet = document.getElementById("openUserInfoBottomSheet");
// { id, degree, school, from, to, current }
const workExpListEl = document.getElementById('experienceList');
const workExpTitleEl = document.getElementById('title');
const workExpCompanyEl = document.getElementById('company');
const workExpFromEl = document.getElementById('experienceFrom');
const workExpToEl = document.getElementById('experienceTo');
const workExpCurrentEl = document.getElementById('experienceCurrent');
const workExpSaveBtn = document.getElementById('experienceSaveBtn');
const workExpCancelBtn = document.getElementById('experienceCancelBtn');


let editingWorkExpId = null;
// { id, title, company, from, to }
const eduListEl = document.getElementById('eduList');
const eduDegreeEl = document.getElementById('eduDegree');
const eduSchoolEl = document.getElementById('eduSchool');
const eduFromEl = document.getElementById('eduFrom');
const eduToEl = document.getElementById('eduTo');
const eduSaveBtn = document.getElementById('eduSaveBtn');
const eduCancelBtn = document.getElementById('eduCancelBtn');


var cvInfo = {name:'',
    workExpArr: [],
    educationArr: [],
    skillArr: [],
    referenceArr: [],
    awardArr: [],
    hobbyArr: []
};
let editingId = null;
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
        document.getElementById("inputName").value || "Edward Nolan";

    document.getElementById("titleDisplay").innerText =
        document.getElementById("inputTitle").value || "Software Engineer";

    document.getElementById("contactDisplay").innerText =
        (document.getElementById("inputEmail").value || "edward.nolan@example.com") + " | " +
        (document.getElementById("inputPhone").value || "+1 234 567 8901");

    document.getElementById("linksDisplay").innerText =
        document.getElementById("inputLinks").value || "linkedin.com/in/edward.nolan";

    document.getElementById("avatarImg").src =
        document.getElementById("inputAvatar").value || "";

    document.getElementById("introductionDisplay").innerText =
        document.getElementById("inputIntroduction").value || "Highly motivated software engineer...";
    renderWorkExpPreview();
    renderEducationPreview();

    // Close sheet
    userInfoBottomSheet.classList.remove("open");
    sheetOverlay.classList.add("hidden");
    hamburger.classList.remove("hidden");
});
// ============================
// COMMON FUNCTIONS
// ============================
// helpers
const formatMonth = (monthValue) => {
    if (!monthValue) return '';
    // monthValue like "2022-09" -> display "Sep 2022"
    try {
        const [y, m] = monthValue.split('-');
        const d = new Date(Number(y), Number(m) - 1);
        return d.toLocaleString(undefined, {
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return monthValue;
    }
};

// simple HTML escaping to avoid injection
function escapeHtml(s) {
    return (s || '').toString().replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    } [c]));
}
/**
 * Generic function to render a list of items (education, work, etc.)
 * @param {Array} arr - Array of items to render
 * @param {string} containerId - ID of the container element
 * @param {Function} formatItem - Function to return string representation of each item
 * @param {string} emptyText - Text to show if array is empty
 */
const renderListPreview = (arr, containerId, formatItem, emptyText = 'No items added.') => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (!arr || arr.length === 0) {
        container.innerHTML = `<p class="text-gray-700 text-sm">${emptyText}</p>`;
        return;
    }

    arr.forEach(item => {
        const p = document.createElement('p');
        p.className = 'text-gray-700 text-sm mb-2';
        p.innerText = formatItem(item);
        container.appendChild(p);
    });
};
// ============================
// WORK EXPERIENCES
// ============================
function renderWorkExpPreview() {
    const experienceListDisplay = document.getElementById("experienceListDisplay");
    experienceListDisplay.innerHTML = "";
    try {
        cvInfo.workExpArr.forEach(item => {
            const div = document.createElement("div");
            const dates = item.current ? `${formatMonth(item.from)} – Present` : `${formatMonth(item.from)} – ${formatMonth(item.to)}`;
            div.classList.add("mb-4");
            div.innerHTML = `
          <h3 class="font-semibold">${item.title} - ${item.company}</h3>
          <p class="text-gray-600 text-sm mb-1">${dates}</p>
          <ul class="list-disc list-inside text-gray-700 text-sm">
            ${item.skills.map(d => `<li>${d}</li>`).join("")}
          </ul>`;
            experienceListDisplay.appendChild(div);
        });
    } catch (e) {
        console.log(e);
        experienceListDisplay.innerHTML = "<p class='text-red-500 text-sm'>Invalid JSON</p>";
    }
}

function renderWorkExpEditor() {
    workExpListEl.innerHTML = '';

    if (cvInfo.workExpArr.length === 0) {
        workExpListEl.innerHTML = '<p class="text-gray-500 text-sm">No work experience added yet.</p>';
        renderWorkExpPreview();
        return;
    }

    const template = document.getElementById('experience-item-template');

    cvInfo.workExpArr.forEach(item => {
        const clone = template.content.cloneNode(true);

        const left = clone.querySelector('.left');
        left.querySelector('.font-semibold').textContent = escapeHtml(item.title);
        left.querySelector('.text-gray-700').textContent = escapeHtml(item.company);
        left.querySelector('.text-xs').textContent = item.current ?
            `${formatMonth(item.from)} – Present` :
            `${formatMonth(item.from)} – ${formatMonth(item.to)}`;

        const [editBtn, delBtn] = clone.querySelectorAll('.controls button');

        editBtn.addEventListener('click', () => startEditWorkExperience(item.id));

        delBtn.addEventListener('click', () => {
            if (!confirm('Delete this work experience item?')) return;
            cvInfo.workExpArr = cvInfo.workExpArr.filter(e => e.id !== item.id);
            renderWorkExpEditor();
            renderWorkExpPreview();
        });

        workExpListEl.appendChild(clone);
    });

    renderWorkExpPreview();
}

function startEditWorkExperience(id) {
    const it = cvInfo.workExpArr.find(e => e.id === id);
    if (!it) return;
    editingWorkExpId = id;
    workExpTitleEl.value = it.title;
    workExpCompanyEl.value = it.company;
    workExpFromEl.value = it.from || '';
    workExpToEl.value = it.to || '';
    workExpCurrentEl.checked = !!it.current;
    workExpSaveBtn.innerText = 'Save';
    workExpTitleEl.focus();
}

function clearWorkExperienceForm() {
    editingWorkExpId = null;
    workExpTitleEl.value = '';
    workExpCompanyEl.value = '';
    workExpFromEl.value = '';
    workExpToEl.value = '';
    workExpCurrentEl.checked = false;
    workExpSaveBtn.innerText = 'Add';
}

workExpSaveBtn.addEventListener('click', () => {
    const title = workExpTitleEl.value.trim();
    const company = workExpCompanyEl.value.trim();
    const from = workExpFromEl.value || '';
    const to = workExpToEl.value || '';
    const current = !!workExpCurrentEl.checked;

    if (!title || !company || !from) {
        alert('Please fill role, company and from date.');
        return;
    }

    if (!current && !to) {
        if (!confirm('No end date provided. Save as "Present"? Click OK to mark as Present, Cancel to set end date.')) {
            return;
        }
    }

    if (editingWorkExpId) {
        const idx = cvInfo.workExpArr.findIndex(e => e.id === editingWorkExpId);
        if (idx >= 0) {
            cvInfo.workExpArr[idx] = {
                id: editingWorkExpId,
                title: title,
                company: company,
                from,
                to,
                current
            };
        }
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.workExpArr.push({
            id,
            title: title,
            company: company,
            from,
            to,
            current,
            skills: []
        });
    }

    clearWorkExperienceForm();
    renderWorkExpEditor();
});

workExpCancelBtn.addEventListener('click', () => {
    clearWorkExperienceForm();
});

function renderWorkExpPreview() {
    const formatItem = (item) => {
        const dates = item.current ? `${formatMonth(item.from)} – Present` : `${formatMonth(item.from)} – ${formatMonth(item.to)}`;
        return `${item.title}, ${item.company} | ${dates}`;
    };
    renderListPreview(cvInfo.workExpArr, 'experienceDisplay', formatItem, 'No experience added.');
}
// ============================
// EDUCATION
// ============================
function renderEducationPreview() {
    const educationListDisplay = document.getElementById("educationListDisplay");
    educationListDisplay.innerHTML = "";

    try {
        cvInfo.educationArr.forEach(item => {
            const p = document.createElement("p");
            const dates = `${formatMonth(item.from)} – ${formatMonth(item.to)}`;
            p.classList.add("text-gray-700", "text-sm", "mb-2");
            p.innerText = `${item.degree}, ${item.school} | ${dates}`;
            educationListDisplay.appendChild(p);
        });
    } catch (e) {
        educationListDisplay.innerHTML = "<p class='text-red-500 text-sm'>Invalid JSON</p>";
    }
}

function renderEducationList() {
    eduListEl.innerHTML = '';

    if (cvInfo.educationArr.length === 0) {
        eduListEl.innerHTML = '<p class="text-gray-500 text-sm">No education added yet.</p>';
        renderEducationPreview();
        return;
    }

    const template = document.getElementById('education-item-template');

    cvInfo.educationArr.forEach(item => {

        const clone = template.content.cloneNode(true);

        const left = clone.querySelector('.left');
        left.querySelector('.font-semibold').textContent = escapeHtml(item.degree);
        left.querySelector('.text-gray-700').textContent = escapeHtml(item.school);
        left.querySelector('.text-xs').textContent = `${formatMonth(item.from)} – ${formatMonth(item.to)}`;

        const [editBtn, delBtn] = clone.querySelectorAll('.controls button');

        editBtn.addEventListener('click', () => startEditEducation(item.id));

        delBtn.addEventListener('click', () => {
            if (!confirm('Delete this education item?')) return;
            cvInfo.educationArr = cvInfo.educationArr.filter(e => e.id !== item.id);
            renderEducationList();
            renderEducationPreview();
        });

        eduListEl.appendChild(clone);
    });

    renderEducationPreview();
}

function startEditEducation(id) {
    const it = cvInfo.educationArr.find(e => e.id === id);
    if (!it) return;
    editingId = id;
    eduDegreeEl.value = it.degree;
    eduSchoolEl.value = it.school;
    eduFromEl.value = it.from || '';
    eduToEl.value = it.to || '';
    eduSaveBtn.innerText = 'Save';
    eduDegreeEl.focus();
}

function clearEduForm() {
    editingId = null;
    eduDegreeEl.value = '';
    eduSchoolEl.value = '';
    eduFromEl.value = '';
    eduToEl.value = '';
    eduSaveBtn.innerText = 'Add';
}

eduSaveBtn.addEventListener('click', () => {
    const degree = eduDegreeEl.value.trim();
    const school = eduSchoolEl.value.trim();
    const from = eduFromEl.value || '';
    const to = eduToEl.value || '';

    if (!degree || !school || !from) {
        alert('Please fill degree, school and from date.');
        return;
    }

    if (editingId) {
        const idx = cvInfo.educationArr.findIndex(e => e.id === editingId);
        if (idx >= 0) {
            cvInfo.educationArr[idx] = {
                id: editingId,
                degree,
                school,
                from,
                to
            };
        }
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.educationArr.push({
            id,
            degree,
            school,
            from,
            to
        });
    }

    clearEduForm();
    renderEducationList();
});

eduCancelBtn.addEventListener('click', () => {
    clearEduForm();
});

function renderEducationPreview() {
    const formatItem = (edu) => {
        const dates = `${formatMonth(edu.from)} – ${formatMonth(edu.to)}`;
        return `${edu.degree}, ${edu.school} | ${dates}`;
    };
    renderListPreview(cvInfo.educationArr, 'educationDisplay', formatItem, 'No education added.');
}
// ============================
// SKILLS
// ============================
const skillInput = document.getElementById('skill');
const skillSaveBtn = document.getElementById('skillSaveBtn');
const skillCancelBtn = document.getElementById('skillCancelBtn');
const skillListEl = document.getElementById('skillList');
const skillListDisplay = document.getElementById('skillListDisplay');

cvInfo.skillArr = []; // initialize skills array
let editingSkillId = null;

// Render skill list in bottom sheet
function renderSkillList() {
    skillListEl.innerHTML = '';

    if (!cvInfo.skillArr.length) {
        skillListEl.innerHTML = '<p class="text-gray-500 text-sm">No skills added yet.</p>';
        renderSkillPreview();
        return;
    }

    cvInfo.skillArr.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'p-2 bg-gray-100 rounded flex justify-between items-center';
        div.textContent = skill.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-2 text-red-600 text-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cvInfo.skillArr = cvInfo.skillArr.filter(s => s.id !== skill.id);
            renderSkillList();
            renderSkillPreview();
        });

        div.appendChild(removeBtn);
        skillListEl.appendChild(div);
    });

    renderSkillPreview();
}

// Render skills on CV display
function renderSkillPreview() {
    skillListDisplay.innerHTML = '';
    cvInfo.skillArr.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full mr-2 mb-1 text-sm';
        span.textContent = skill.name;
        skillListDisplay.appendChild(span);
    });
}

// Clear skill form
function clearSkillForm() {
    editingSkillId = null;
    skillInput.value = '';
    skillSaveBtn.textContent = 'Add';
}

// Add / Save skill
skillSaveBtn.addEventListener('click', () => {
    const name = skillInput.value.trim();
    if (!name) return;

    if (editingSkillId) {
        const idx = cvInfo.skillArr.findIndex(s => s.id === editingSkillId);
        if (idx >= 0) cvInfo.skillArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.skillArr.push({
            id,
            name
        });
    }

    clearSkillForm();
    renderSkillList();
});

// Cancel
skillCancelBtn.addEventListener('click', clearSkillForm);
// ============================
// REFERENCES
// ============================
const referenceInput = document.getElementById('reference');
const referenceSaveBtn = document.getElementById('referenceSaveBtn');
const referenceCancelBtn = document.getElementById('referenceCancelBtn');
const referenceListEl = document.getElementById('referenceList');
const referenceListDisplay = document.getElementById('referenceListDisplay');

cvInfo.referenceArr = []; // initialize references array
let editingReferenceId = null;

// Render references in bottom sheet
function renderReferenceList() {
    referenceListEl.innerHTML = '';

    if (!cvInfo.referenceArr.length) {
        referenceListEl.innerHTML = '<p class="text-gray-500 text-sm">No references added yet.</p>';
        renderReferencePreview();
        return;
    }

    cvInfo.referenceArr.forEach(ref => {
        const div = document.createElement('div');
        div.className = 'p-2 bg-gray-100 rounded flex justify-between items-center';
        div.textContent = ref.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-2 text-red-600 text-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cvInfo.referenceArr = cvInfo.referenceArr.filter(r => r.id !== ref.id);
            renderReferenceList();
            renderReferencePreview();
        });

        div.appendChild(removeBtn);
        referenceListEl.appendChild(div);
    });

    renderReferencePreview();
}

// Render references on CV display
function renderReferencePreview() {
    referenceListDisplay.innerHTML = '';
    cvInfo.referenceArr.forEach(ref => {
        const p = document.createElement('p');
        p.className = 'text-gray-700 text-sm mb-2';
        p.textContent = ref.name;
        referenceListDisplay.appendChild(p);
    });
}

// Clear reference input
function clearReferenceForm() {
    editingReferenceId = null;
    referenceInput.value = '';
    referenceSaveBtn.textContent = 'Add';
}

// Add / Save reference
referenceSaveBtn.addEventListener('click', () => {
    const name = referenceInput.value.trim();
    if (!name) return;

    if (editingReferenceId) {
        const idx = cvInfo.referenceArr.findIndex(r => r.id === editingReferenceId);
        if (idx >= 0) cvInfo.referenceArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.referenceArr.push({
            id,
            name
        });
    }

    clearReferenceForm();
    renderReferenceList();
});

// Cancel
referenceCancelBtn.addEventListener('click', clearReferenceForm);
// ============================
// AWARDS
// ============================
const awardInput = document.getElementById('award');
const awardSaveBtn = document.getElementById('awardSaveBtn');
const awardCancelBtn = document.getElementById('awardCancelBtn');
const awardListEl = document.getElementById('awardList');
const awardListDisplay = document.getElementById('awardListDisplay');

cvInfo.awardArr = []; // initialize awards array
let editingAwardId = null;

// Render awards in bottom sheet
function renderAwardList() {
    awardListEl.innerHTML = '';

    if (!cvInfo.awardArr.length) {
        awardListEl.innerHTML = '<p class="text-gray-500 text-sm">No awards added yet.</p>';
        renderAwardPreview();
        return;
    }

    cvInfo.awardArr.forEach(award => {
        const div = document.createElement('div');
        div.className = 'p-2 bg-gray-100 rounded flex justify-between items-center';
        div.textContent = award.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-2 text-red-600 text-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cvInfo.awardArr = cvInfo.awardArr.filter(a => a.id !== award.id);
            renderAwardList();
            renderAwardPreview();
        });

        div.appendChild(removeBtn);
        awardListEl.appendChild(div);
    });

    renderAwardPreview();
}

// Render awards on CV display
function renderAwardPreview() {
    awardListDisplay.innerHTML = '';
    cvInfo.awardArr.forEach(award => {
        const p = document.createElement('p');
        p.className = 'text-gray-700 text-sm mb-2';
        p.textContent = award.name;
        awardListDisplay.appendChild(p);
    });
}

// Clear award input
function clearAwardForm() {
    editingAwardId = null;
    awardInput.value = '';
    awardSaveBtn.textContent = 'Add';
}

// Add / Save award
awardSaveBtn.addEventListener('click', () => {
    const name = awardInput.value.trim();
    if (!name) return;

    if (editingAwardId) {
        const idx = cvInfo.awardArr.findIndex(a => a.id === editingAwardId);
        if (idx >= 0) cvInfo.awardArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.awardArr.push({
            id,
            name
        });
    }

    clearAwardForm();
    renderAwardList();
});

// Cancel
awardCancelBtn.addEventListener('click', clearAwardForm);
// ============================
// HOBBIES
// ============================
const hobbyInput = document.getElementById('hobby');
const hobbySaveBtn = document.getElementById('hobbySaveBtn');
const hobbyCancelBtn = document.getElementById('hobbyCancelBtn');
const hobbyListEl = document.getElementById('hobbyList');
const hobbyListDisplay = document.getElementById('hobbyListDisplay');

cvInfo.hobbyArr = []; // initialize hobbies array
let editingHobbyId = null;

// Render hobbies in bottom sheet
function renderHobbyList() {
    hobbyListEl.innerHTML = '';

    if (!cvInfo.hobbyArr.length) {
        hobbyListEl.innerHTML = '<p class="text-gray-500 text-sm">No hobbies added yet.</p>';
        renderHobbyPreview();
        return;
    }

    cvInfo.hobbyArr.forEach(hobby => {
        const div = document.createElement('div');
        div.className = 'p-2 bg-gray-100 rounded flex justify-between items-center';
        div.textContent = hobby.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-2 text-red-600 text-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cvInfo.hobbyArr = cvInfo.hobbyArr.filter(h => h.id !== hobby.id);
            renderHobbyList();
            renderHobbyPreview();
        });

        div.appendChild(removeBtn);
        hobbyListEl.appendChild(div);
    });

    renderHobbyPreview();
}

// Render hobbies on CV display
function renderHobbyPreview() {
    hobbyListDisplay.innerHTML = '';
    cvInfo.hobbyArr.forEach(hobby => {
        const p = document.createElement('p');
        p.className = 'text-gray-700 text-sm mb-2';
        p.textContent = hobby.name;
        hobbyListDisplay.appendChild(p);
    });
}

// Clear hobby input
function clearHobbyForm() {
    editingHobbyId = null;
    hobbyInput.value = '';
    hobbySaveBtn.textContent = 'Add';
}

// Add / Save hobby
hobbySaveBtn.addEventListener('click', () => {
    const name = hobbyInput.value.trim();
    if (!name) return;

    if (editingHobbyId) {
        const idx = cvInfo.hobbyArr.findIndex(h => h.id === editingHobbyId);
        if (idx >= 0) cvInfo.hobbyArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.hobbyArr.push({
            id,
            name
        });
    }

    clearHobbyForm();
    renderHobbyList();
});

// Cancel
hobbyCancelBtn.addEventListener('click', clearHobbyForm);

// Initial render

function initInfo() {
    cvInfo = {
        workExpArr: [{
                id: 1,
                title: "Frontend Developer",
                company: "Tech Solutions Inc.",
                from: "2021-01",
                to: "2023-06",
                current: false,
                skills: ["React", "Tailwind CSS", "JavaScript"]
            },
            {
                id: 2,
                title: "Fullstack Developer",
                company: "NextGen Apps",
                from: "2023-07",
                to: "",
                current: true,
                skills: ["Node.js", "Flutter", "MongoDB"]
            }
        ],
        educationArr: [{
                id: 1,
                degree: "BSc Computer Science",
                school: "State University",
                from: "2017-09",
                to: "2021-06"
            },
            {
                id: 2,
                degree: "MSc Software Engineering",
                school: "Tech University",
                from: "2021-09",
                to: "2023-06"
            }
        ],
        skillArr: [{
                id: 1,
                name: "JavaScript"
            },
            {
                id: 2,
                name: "Python"
            },
            {
                id: 3,
                name: "Dart"
            },
            {
                id: 4,
                name: "React"
            },
            {
                id: 5,
                name: "Node.js"
            },
            {
                id: 6,
                name: "Flutter"
            }
        ],
        referenceArr: [{
                id: 1,
                name: "Dr. John Smith, Head of Engineering, Tech Solutions Inc."
            },
            {
                id: 2,
                name: "Ms. Jane Doe, Manager, NextGen Apps"
            }
        ],
        awardArr: [{
                id: 1,
                name: "Employee of the Year 2022"
            },
            {
                id: 2,
                name: "Hackathon Winner 2023"
            }
        ],
        hobbyArr: [{
                id: 1,
                name: "Playing Guitar"
            },
            {
                id: 2,
                name: "Cycling"
            },
            {
                id: 3,
                name: "Chess"
            }
        ],
        name:"Edward Nolan",
        title:"Software Engineer",
        email:"edward.nolan@example.com",
        phone:"+1 234 567 8901",
        url:"linkedin.com/in/edward.nolan",
        avatar:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAAFmUlEQVR4Xu3VMQGAMBDAwFL/Fl8L7Ext5rsxBvLMzLsA4NL+BwA4YSAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQPIB0xsGts1rwxIAAAAASUVORK5CYII=",
        introduction:"Highly motivated software engineer..."

    };
    document.getElementById("inputName").value =cvInfo.name;
    document.getElementById("nameDisplay").innerText =cvInfo.name;
   
    document.getElementById("inputTitle").value=cvInfo.title;
    document.getElementById("titleDisplay").innerText =cvInfo.title;

    document.getElementById("inputEmail").value = cvInfo.email;
    document.getElementById("inputPhone").value = cvInfo.phone;

    document.getElementById("contactDisplay").innerText =cvInfo.email + " | " + cvInfo.phone;

    document.getElementById("inputLinks").value =cvInfo.url;
    document.getElementById("linksDisplay").innerText =cvInfo.url;
        
    document.getElementById("avatarImg").src =cvInfo.avatar;
    document.getElementById("inputAvatar").value =cvInfo.avatar;

    document.getElementById("introductionDisplay").innerText =cvInfo.introduction;
    document.getElementById("inputIntroduction").value =cvInfo.introduction;

    renderWorkExpEditor();
    renderWorkExpPreview();
    renderEducationList();
    renderEducationPreview();
    renderSkillList();
    renderReferenceList();
    renderAwardList();
    renderHobbyList();
}

initInfo();
// ============================
// PDF GENERATION
// ============================
document.getElementById("generate").addEventListener("click", () => {
    html2pdf().set({
        margin: 0.2,
        filename: "CV.pdf",
        image: {
            type: "jpeg",
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0
        },
        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    }).from(document.getElementById("content")).save();
});