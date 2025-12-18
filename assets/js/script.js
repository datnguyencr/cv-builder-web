const {
    jsPDF
} = window.jspdf;
window.TEMPLATES = {
    1:Template1,
    2:Template2,
    3:Template3,
    4:Template4,
    5:Template5,
    6:Template6,
    7:Template7,
    8:Template8,
    9:Template9,
    10:Template10,//
    11:Template11,
    12:Template12,
    13:Template13,
    14:Template14,
    15:Template15,
};
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const userInfoBottomSheet = document.getElementById("userInfoBottomSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const openUserInfoBottomSheet = document.getElementById("openUserInfoBottomSheet");

const templateBottomSheet = document.getElementById("templateBottomSheet");

const workExpListEl = document.getElementById('experienceList');
const workExpTitleEl = document.getElementById('title');
const workExpCompanyEl = document.getElementById('company');
const workExpFromEl = document.getElementById('experienceFrom');
const workExpToEl = document.getElementById('experienceTo');
const workExpCurrentEl = document.getElementById('experienceCurrent');
const workExpSaveBtn = document.getElementById('experienceSaveBtn');
const workExpCancelBtn = document.getElementById('experienceCancelBtn');

const avatarInput = document.getElementById("inputAvatar");
const avatarPreview = document.getElementById("avatarPreview");

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

avatarInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // basic validation
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
    }

    // optional size guard (e.g. 5MB)
    if (file.size > 1024 * 1024*5) {
        alert("Image too large (max 1MB)");
        return;
    }

    const img  = await fileToJsPdfImage(file,  128,  "circle");

    cvInfo.avatar = img.base64;
    avatarPreview.src = img.base64;
    avatarPreview.classList.remove("hidden");

    previewPDF();
});

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
let selectedTemplateId = 1;

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
                name: "JavaScript",
                value:60,
            },
            {
                id: 2,
                name: "Python",
                value:50,
            },
            {
                id: 3,
                name: "Dart",
                value:100,
            },
            {
                id: 4,
                name: "React",
                value:30,
            },
            {
                id: 5,
                name: "Node.js",
                value:30,
            },
            {
                id: 6,
                name: "Flutter",
                value:90,
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
        avatar: "data:image/png;base64,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",
        introduction: "Passionate software engineer with experience in building scalable web and mobile applications. Skilled in JavaScript, Python, and modern frameworks like React and Flutter.\nStrong problem-solving abilities with a focus on clean, maintainable code.Committed to continuous learning and delivering innovative software solutions."

    };
    document.getElementById("inputName").value = cvInfo.name;
    document.getElementById("inputTitle").value = cvInfo.title;
    document.getElementById("inputEmail").value = cvInfo.email;
    document.getElementById("inputPhone").value = cvInfo.phone;
    document.getElementById("inputLinks").value = cvInfo.url;
    document.getElementById("inputIntroduction").value = cvInfo.introduction;
    renderWorkExpList();
    renderEducationList();
    renderSkillList();
    renderReferenceList();
    renderAwardList();
    renderHobbyList();
}

function getTemplate(id) {
  return new (window.TEMPLATES[id] || Template1)(cvInfo);
}


async function  generatePDF() {
    let template=getTemplate(selectedTemplateId);
    return template.generate();
}

async function previewPDF() {
    const doc = await generatePDF();
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

async function downloadPDF() {
    const doc = await generatePDF();
    const timestamp = Date.now();
    doc.save(`CV_${timestamp}.pdf`);
}

document.addEventListener("DOMContentLoaded", () => {

    const storedTemplateId = localStorage.getItem("selectedTemplateId");
    if (storedTemplateId) {
        selectedTemplateId = Number(storedTemplateId); // convert to number
    }
    const aboutUsMenu = document.querySelector("#sideMenu .about-us-menu");
    const templateMenu = document.querySelector("#sideMenu .template-menu");

    const aboutModal = document.getElementById("aboutModal");
    const closeBtn = document.getElementById("closeAboutModal");

    aboutUsMenu.addEventListener("click", () => {
        aboutModal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        aboutModal.classList.add("hidden");
    });

    aboutModal.addEventListener("click", (e) => {
        if (e.target === aboutModal) aboutModal.classList.add("hidden");
    });

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

    templateMenu.addEventListener("click", () => {
        const templates = [];
        for (let i = 1; i <= 39; i++) {
            templates.push({
                id: i,
                name: `Template ${i}`,
                src: `templates/${i}.avif`
            });
        }


        const templateGrid = document.getElementById("templateGrid");
        templateGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(192px, 1fr))";
        templates.forEach(t => {
            const item = document.createElement("div");

            item.dataset.templateId = t.id;

            item.className =
                "template-item w-48 aspect-[616/800] overflow-hidden rounded cursor-pointer " +
                "border hover:border-blue-500 hover:border-2  transition-all";
            if (selectedTemplateId == item.dataset.templateId) {
                item.classList.add("border-blue-500","border-2");
            }
            const img = document.createElement("img");
            img.src = t.src;
            img.alt = t.name;
            img.className = "w-full h-full object-cover";
            item.appendChild(img);
            templateGrid.appendChild(item);

            item.addEventListener("click", (e) => {
                templateGrid.querySelectorAll(".template-item").forEach(i => i.classList.remove("border-blue-500"));
                item.classList.add("border-blue-500", "border-2");
                selectedTemplateId = t.id;
                localStorage.setItem("selectedTemplateId", selectedTemplateId);
                previewPDF();
            });
        });

        templateBottomSheet.classList.add("open");
        sheetOverlay.classList.remove("hidden");
        hamburger.classList.add("hidden");
    });
    closeTemplateSheet.addEventListener("click", () => {
        templateBottomSheet.classList.remove("open");
        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

    openUserInfoBottomSheet.addEventListener("click", () => {
        userInfoBottomSheet.classList.add("open");
        sheetOverlay.classList.remove("hidden");
        hamburger.classList.add("hidden");
    });

    sheetOverlay.addEventListener("click", () => {
        userInfoBottomSheet.classList.remove("open");
        templateBottomSheet.classList.remove("open");
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

        previewPDF();

    });

    initInfo();
    previewPDF();

    document.getElementById("generate").addEventListener("click", () => {
        downloadPDF();
    });

});