const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const userInfoBottomSheet = document.getElementById("userInfoBottomSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const openUserInfoBottomSheet = document.getElementById("openUserInfoBottomSheet");

const workExpListEl = document.getElementById('experienceList');
const workExpTitleEl = document.getElementById('title');
const workExpCompanyEl = document.getElementById('company');
const workExpFromEl = document.getElementById('experienceFrom');
const workExpToEl = document.getElementById('experienceTo');
const workExpCurrentEl = document.getElementById('experienceCurrent');
const workExpSaveBtn = document.getElementById('experienceSaveBtn');
const workExpCancelBtn = document.getElementById('experienceCancelBtn');


const eduListEl = document.getElementById('eduList');
const eduDegreeEl = document.getElementById('eduDegree');
const eduSchoolEl = document.getElementById('eduSchool');
const eduFromEl = document.getElementById('eduFrom');
const eduToEl = document.getElementById('eduTo');
const eduSaveBtn = document.getElementById('eduSaveBtn');
const eduCancelBtn = document.getElementById('eduCancelBtn');


var cvInfo = {
    name: "",
    title: "",
    email: "",
    phone: "",
    url: "",
    avatar: "",
    introduction: "",
    workExpArr: [],
    educationArr: [],
    skillArr: [],
    referenceArr: [],
    awardArr: [],
    hobbyArr: []
};

let editingSkillId = null;
let editingReferenceId = null;
let editingAwardId = null;
let editingWorkExpId = null;
let editingEducationId = null;
let editingHobbyId = null;

// ============================
// COMMON FUNCTIONS
// ============================

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

function showEmpty(container, text) {
    const template = document.getElementById("empty-state-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".empty-message").textContent = text;
    container.innerHTML = "";
    container.appendChild(clone);
}


// ============================
// WORK EXPERIENCES
// ============================
function renderWorkExpListPreview() {
    const experienceListDisplay = document.getElementById("experienceListDisplay");
    experienceListDisplay.innerHTML = "";
    const template = document.getElementById('work-exp-item-preview-template');
    cvInfo.workExpArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        const dates = item.current ? `${formatMonth(item.from)} - Present` : `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
        clone.querySelector('.title').textContent = escapeHtml(item.title);
        clone.querySelector('.company').textContent = escapeHtml(item.company);
        clone.querySelector('.dates').textContent = escapeHtml(dates);
        experienceListDisplay.appendChild(clone);
    });

}

function renderWorkExpList() {
    workExpListEl.innerHTML = '';

    if (cvInfo.workExpArr.length === 0) {
        showEmpty(workExpListEl, 'No work experience added yet.');
        renderWorkExpListPreview();
        return;
    }

    const template = document.getElementById('work-exp-item-template');
    cvInfo.workExpArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        const left = clone.querySelector('.left');
        left.querySelector('.title').textContent = escapeHtml(item.title);
        left.querySelector('.company').textContent = escapeHtml(item.company);
        left.querySelector('.dates').textContent = item.current ?
            `${formatMonth(item.from)} - Present` :
            `${formatMonth(item.from)} - ${formatMonth(item.to)}`;

        const controls = clone.querySelector('.controls');
        controls.querySelector('.edit').addEventListener('click', () => startEditWorkExperience(item.id));

        controls.querySelector('.delete').addEventListener('click', () => {
            if (!confirm('Delete this work experience item?')) return;
            cvInfo.workExpArr = cvInfo.workExpArr.filter(e => e.id !== item.id);
            renderWorkExpList();
            renderWorkExpListPreview();
        });

        workExpListEl.appendChild(clone);
    });
    renderWorkExpListPreview();
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
    renderWorkExpList();
});

workExpCancelBtn.addEventListener('click', () => {
    clearWorkExperienceForm();
});

// ============================
// EDUCATION
// ============================
function renderEducationPreview() {
    const educationListDisplay = document.getElementById("educationListDisplay");
    educationListDisplay.innerHTML = '';
    const template = document.getElementById("education-item-preview-template");
    cvInfo.educationArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.degree').textContent = escapeHtml(item.degree);
        clone.querySelector('.school').textContent = escapeHtml(item.school);
        clone.querySelector('.dates').textContent = `${formatMonth(item.from)} – ${formatMonth(item.to)}`;
        educationListDisplay.appendChild(clone);
    });
}

function renderEducationList() {
    eduListEl.innerHTML = '';

    if (cvInfo.educationArr.length === 0) {
        showEmpty(eduListEl, 'No education added.');
        renderEducationPreview();
        return;
    }

    const template = document.getElementById('education-item-template');
    cvInfo.educationArr.forEach(item => {
        const clone = template.content.cloneNode(true);

        const left = clone.querySelector('.left');
        left.querySelector('.degree').textContent = escapeHtml(item.degree);
        left.querySelector('.school').textContent = escapeHtml(item.school);
        left.querySelector('.dates').textContent = `${formatMonth(item.from)} – ${formatMonth(item.to)}`;

        const controls = clone.querySelector('.controls');

        controls.querySelector('.edit').addEventListener('click', () => startEditEducation(item.id));
        controls.querySelector('.delete').addEventListener('click', () => {
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
    editingEducationId = id;
    eduDegreeEl.value = it.degree;
    eduSchoolEl.value = it.school;
    eduFromEl.value = it.from || '';
    eduToEl.value = it.to || '';
    eduSaveBtn.innerText = 'Save';
    eduDegreeEl.focus();
}

function clearEduForm() {
    editingEducationId = null;
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

    if (editingEducationId) {
        const idx = cvInfo.educationArr.findIndex(e => e.id === editingEducationId);
        if (idx >= 0) {
            cvInfo.educationArr[idx] = {
                id: editingEducationId,
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

// ============================
// SKILLS
// ============================
const skillInput = document.getElementById('skill');
const skillSaveBtn = document.getElementById('skillSaveBtn');
const skillCancelBtn = document.getElementById('skillCancelBtn');
const skillListEl = document.getElementById('skillList');
const skillListDisplay = document.getElementById('skillListDisplay');

// Render skill list in bottom sheet
function renderSkillList() {
    skillListEl.innerHTML = '';

    if (!cvInfo.skillArr.length) {
        showEmpty(skillListEl, 'No skills added yet.');
        renderSkillPreview();
        return;
    }

    const template = document.getElementById('skill-item-template');
    cvInfo.skillArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.skillArr = cvInfo.skillArr.filter(s => s.id !== item.id);
            renderSkillList();
            renderSkillPreview();
        });

        skillListEl.appendChild(clone);
    });

    renderSkillPreview();
}

// Render skills on CV display
function renderSkillPreview() {
    skillListDisplay.innerHTML = '';
    const template = document.getElementById("skill-item-preview-template");
    cvInfo.skillArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        skillListDisplay.appendChild(clone);
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

function renderReferenceList() {
    referenceListEl.innerHTML = '';

    if (!cvInfo.referenceArr.length) {
        showEmpty(referenceListEl, 'No references added yet.');
        renderReferencePreview();
        return;
    }

    const template = document.getElementById('reference-item-template');
    cvInfo.referenceArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.referenceArr = cvInfo.referenceArr.filter(s => s.id !== item.id);
            renderReferenceList();
            renderReferencePreview();
        });

        referenceListEl.appendChild(clone);
    });
    renderReferencePreview();
}

function renderReferencePreview() {
    referenceListDisplay.innerHTML = '';
    const template = document.getElementById("reference-item-preview-template");
    cvInfo.referenceArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        referenceListDisplay.appendChild(clone);
    });
}

function clearReferenceForm() {
    editingReferenceId = null;
    referenceInput.value = '';
    referenceSaveBtn.textContent = 'Add';
}

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

// Render awards in bottom sheet
function renderAwardList() {
    awardListEl.innerHTML = '';

    if (!cvInfo.awardArr.length) {
        showEmpty(awardListEl, 'No awards added yet.');
        renderAwardPreview();
        return;
    }
    const template = document.getElementById('award-item-template');
    cvInfo.awardArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.awardArr = cvInfo.awardArr.filter(s => s.id !== item.id);
            renderAwardList();
            renderAwardPreview();
        });

        awardListEl.appendChild(clone);
    });
    renderAwardPreview();
}

function renderAwardPreview() {
    awardListDisplay.innerHTML = '';
    const template = document.getElementById("award-item-preview-template");
    cvInfo.awardArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        awardListDisplay.appendChild(clone);
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

function renderHobbyList() {
    hobbyListEl.innerHTML = '';

    if (!cvInfo.hobbyArr.length) {
        showEmpty(awardListEl, 'No hobbies added yet.');
        renderHobbyPreview();
        return;
    }
    const template = document.getElementById('hobby-item-template');
    cvInfo.hobbyArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.hobbyArr = cvInfo.hobbyArr.filter(s => s.id !== item.id);
            renderHobbyList();
            renderHobbyPreview();
        });

        hobbyListEl.appendChild(clone);
    });
    renderHobbyPreview();
}

function renderHobbyPreview() {
    hobbyListDisplay.innerHTML = '';
    const template = document.getElementById("hobby-item-preview-template");
    cvInfo.hobbyArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        hobbyListDisplay.appendChild(clone);
    });
}

function clearHobbyForm() {
    editingHobbyId = null;
    hobbyInput.value = '';
    hobbySaveBtn.textContent = 'Add';
}

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
        name: "Edward Nolan",
        title: "Software Engineer",
        email: "edward.nolan@example.com",
        phone: "+1 234 567 8901",
        url: "linkedin.com/in/edward.nolan",
        avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAAFmUlEQVR4Xu3VMQGAMBDAwFL/Fl8L7Ext5rsxBvLMzLsA4NL+BwA4YSAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQGIgACQGAkBiIAAkBgJAYiAAJAYCQPIB0xsGts1rwxIAAAAASUVORK5CYII=",
        introduction: "Highly motivated software engineer..."

    };
    document.getElementById("inputName").value = cvInfo.name;
    document.getElementById("nameDisplay").innerText = cvInfo.name;

    document.getElementById("inputTitle").value = cvInfo.title;
    document.getElementById("titleDisplay").innerText = cvInfo.title;

    document.getElementById("inputEmail").value = cvInfo.email;
    document.getElementById("inputPhone").value = cvInfo.phone;

    document.getElementById("contactDisplay").innerText = cvInfo.email + " | " + cvInfo.phone;

    document.getElementById("inputLinks").value = cvInfo.url;
    document.getElementById("linksDisplay").innerText = cvInfo.url;

    document.getElementById("avatarImg").src = cvInfo.avatar;
    document.getElementById("inputAvatar").value = cvInfo.avatar;

    document.getElementById("introductionDisplay").innerText = cvInfo.introduction;
    document.getElementById("inputIntroduction").value = cvInfo.introduction;

    renderWorkExpList();
    renderWorkExpListPreview();
    renderEducationList();
    renderEducationPreview();
    renderSkillList();
    renderReferenceList();
    renderAwardList();
    renderHobbyList();
}



document.addEventListener("DOMContentLoaded", () => {
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
        hamburger.classList.add("hidden");
    });

    // Close bottom sheet
    sheetOverlay.addEventListener("click", () => {
        userInfoBottomSheet.classList.remove("open");
        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

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
        renderWorkExpListPreview();
        renderEducationPreview();

        // Close sheet
        userInfoBottomSheet.classList.remove("open");
        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

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
});