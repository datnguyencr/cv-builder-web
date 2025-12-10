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

const skillInput = document.getElementById('skill');
const skillSaveBtn = document.getElementById('skillSaveBtn');
const skillCancelBtn = document.getElementById('skillCancelBtn');
const skillListEl = document.getElementById('skillList');

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
/**
 * @param {HTMLElement} container
 * @param {string} text
 */
function showEmpty({
    container,
    text
}) {
    const template = document.getElementById("empty-state-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".empty-message").textContent = text;
    container.innerHTML = "";
    container.appendChild(clone);
}


// ============================
// WORK EXPERIENCES
// ============================
function renderWorkExpList() {
    workExpListEl.innerHTML = '';

    if (cvInfo.workExpArr.length === 0) {
        showEmpty(workExpListEl, 'No work experience added yet.');
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
        });

        workExpListEl.appendChild(clone);
    });
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

function renderEducationList() {
    eduListEl.innerHTML = '';

    if (cvInfo.educationArr.length === 0) {
        showEmpty(eduListEl, 'No education added.');
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
        });

        eduListEl.appendChild(clone);
    });
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

// Render skill list in bottom sheet
function renderSkillList() {
    skillListEl.innerHTML = '';

    if (!cvInfo.skillArr.length) {
        showEmpty(skillListEl, 'No skills added yet.');
        return;
    }

    const template = document.getElementById('skill-item-template');
    cvInfo.skillArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.skillArr = cvInfo.skillArr.filter(s => s.id !== item.id);
            renderSkillList();
        });

        skillListEl.appendChild(clone);
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

function renderReferenceList() {
    referenceListEl.innerHTML = '';

    if (!cvInfo.referenceArr.length) {
        showEmpty(referenceListEl, 'No references added yet.');
        return;
    }

    const template = document.getElementById('reference-item-template');
    cvInfo.referenceArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.referenceArr = cvInfo.referenceArr.filter(s => s.id !== item.id);
            renderReferenceList();
        });

        referenceListEl.appendChild(clone);
    });
}
/**
 * @param {Object} options - Options for the section.
 * @param {string} options.titleText - The text to display as the section title.
 * @param {string} options.id - The `id` to assign to the content container div.
 * @param {boolean} [options.hasBottomLine=false] - Whether to add a bottom border under the title.
 * @param {boolean} [options.uppercase=false] - Whether to render the title text in uppercase.
 * @param {boolean} [options.fontBold=true] - Whether to make the title text bold.
 * @returns {HTMLDivElement} The section container element.
 */
function section({
    titleText,
    id,
    hasBottomLine,
    uppercase,
    fontBold = true
}) {
    const container = document.createElement('div');
    container.className = 'mb-6';
    const title = document.createElement('h2');
    title.className = 'text-xl text-teal-800 pb-1 mb-2';

    if (hasBottomLine) {
        title.classList.add('border-b-2', 'border-gray-300', 'border-teal-800');
    }

    if (uppercase) {
        title.classList.add('uppercase');
    }

    if (fontBold) {
        title.classList.add('font-bold');
    }

    title.textContent = titleText;

    const content = document.createElement('div');
    content.id = id;

    container.appendChild(title);
    container.appendChild(content);

    return container;
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

// Render awards in bottom sheet
function renderAwardList() {
    awardListEl.innerHTML = '';

    if (!cvInfo.awardArr.length) {
        showEmpty(awardListEl, 'No awards added yet.');
        return;
    }
    const template = document.getElementById('award-item-template');
    cvInfo.awardArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.awardArr = cvInfo.awardArr.filter(s => s.id !== item.id);
            renderAwardList();
        });

        awardListEl.appendChild(clone);
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

function renderHobbyList() {
    hobbyListEl.innerHTML = '';

    if (!cvInfo.hobbyArr.length) {
        showEmpty(awardListEl, 'No hobbies added yet.');
        return;
    }
    const template = document.getElementById('hobby-item-template');
    cvInfo.hobbyArr.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.item').textContent = item.name;
        clone.querySelector('.delete').addEventListener('click', () => {
            cvInfo.hobbyArr = cvInfo.hobbyArr.filter(s => s.id !== item.id);
            renderHobbyList();
        });

        hobbyListEl.appendChild(clone);
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
                details: ["Developed responsive web applications with React and Tailwind CSS.",
                    "Collaborated with UX designers to improve user interfaces.",
                    "Implemented client-side routing, state management, and API integrations.",
                    "Participated in code reviews and mentoring junior developers."
                ],
                skillArr: ["React",
                    "Tailwind CSS",
                    "JavaScript",
                    "HTML5",
                    "CSS3",
                    "REST APIs",
                    "Git"
                ]
            },
            {
                id: 2,
                title: "Fullstack Developer",
                company: "NextGen Apps",
                from: "2023-07",
                to: "",
                current: true,
                details: ["Building fullstack applications using Node.js and Flutter.",
                    "Designing and implementing database schemas in MongoDB.",
                    "Integrating third-party APIs and cloud services.",
                    "Leading small project teams and reviewing code for best practices."
                ],
                skillArr: ["Node.js",
                    "Flutter",
                    "MongoDB",
                    "Express.js",
                    "REST APIs",
                    "Firebase",
                    "Docker",
                    "Git"
                ]
            }
        ],
        educationArr: [{
                id: 1,
                degree: "BSc Computer Science",
                school: "State University",
                from: "2017-09",
                to: "2021-06",
                details: [
                    "Worked collaboratively on software development projects.",
                    "Participated in an external research project with faculty.",
                    "Member of the university programming club.",
                    "Completed capstone project on web application development.",
                    "GPA 4.0"
                ]
            },
            {
                id: 2,
                degree: "MSc Software Engineering",
                school: "Tech University",
                from: "2021-09",
                to: "2023-06",
                details: [
                    "Focused on software architecture and cloud systems.",
                    "Completed thesis on scalable microservices design.",
                    "Led a team in an Agile software development project.", "Research Grant Recipient"
                ],
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
        introduction: "Passionate software engineer with experience in building scalable web and mobile applications.\n Skilled in JavaScript, Python, and modern frameworks like React and Flutter.\nStrong problem-solving abilities with a focus on clean, maintainable code.\nCommitted to continuous learning and delivering innovative software solutions."

    };
    document.getElementById("inputName").value = cvInfo.name;
    document.getElementById("inputTitle").value = cvInfo.title;
    document.getElementById("inputEmail").value = cvInfo.email;
    document.getElementById("inputPhone").value = cvInfo.phone;
    document.getElementById("inputLinks").value = cvInfo.url;
    document.getElementById("inputAvatar").value = cvInfo.avatar;
    document.getElementById("inputIntroduction").value = cvInfo.introduction;
    renderWorkExpList();
    renderEducationList();
    renderSkillList();
    renderReferenceList();
    renderAwardList();
    renderHobbyList();
}

function generatePDF() {
    let template = new Template1(cvInfo);
    let doc = template.generate();
    return doc;
}

function previewPDF() {
    const doc = generatePDF();
    const pdfDataUri = doc.output('datauristring');
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = '';

    const embed = document.createElement('embed');
    embed.src = pdfDataUri;
    embed.type = 'application/pdf';
    embed.style.width = '794px';
    embed.style.height = '1123px';
    embed.style.margin = 0;
    embed.style.display = 'block';

    contentEl.appendChild(embed);
}

function downloadPDF() {
    const doc = generatePDF();
    const timestamp = Date.now();
    doc.save(`CV_${timestamp}.pdf`);
}

document.addEventListener("DOMContentLoaded", () => {
    hamburger.addEventListener("click", () => {
        sideMenu.classList.toggle("-translate-x-full");
        menuOverlay.classList.toggle("hidden");
        hamburger.classList.add("hidden");
    });

    menuOverlay.addEventListener("click", () => {
        sideMenu.classList.add("-translate-x-full");
        menuOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

    openUserInfoBottomSheet.addEventListener("click", () => {
        userInfoBottomSheet.classList.add("open");
        sheetOverlay.classList.remove("hidden");
        hamburger.classList.add("hidden");
    });

    sheetOverlay.addEventListener("click", () => {
        userInfoBottomSheet.classList.remove("open");
        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

    userInfoBottomSheet.addEventListener("click", e => e.stopPropagation());

    document.getElementById("updateContent").addEventListener("click", () => {
        userInfoBottomSheet.classList.remove("open");
        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");

        cvInfo.name = document.getElementById("inputName").value;
        cvInfo.title = document.getElementById("inputTitle").value;
        cvInfo.email = document.getElementById("inputEmail").value;
        cvInfo.phone = document.getElementById("inputPhone").value;
        cvInfo.url = document.getElementById("inputLinks").value;
        cvInfo.avatar = document.getElementById("inputAvatar").value;
        cvInfo.introduction = document.getElementById("inputIntroduction").value;

        // then preview the PDF
        previewPDF();

    });

    initInfo();
    previewPDF();

    document.getElementById("generate").addEventListener("click", () => {
        downloadPDF();
    });

});