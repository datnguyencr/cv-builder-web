const {
    jsPDF
} = window.jspdf;

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
function convertToPng(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = base64;
    });
}

/**
 * Convert any File into a jsPDF-compatible base64 image
 * with optional pre-clipping to circle/square.
 * @param {File} file - Image file
 * @param {number} size - Output size in px
 * @param {"circle"|"square"} shape - Shape to preclip
 * @returns {Promise<{base64: string, type: "PNG"|"JPEG"}>}
 */
async function fileToJsPdfImage(file, size = 128, shape = "square") {
    // Helper: convert to PNG using canvas
    const convertToPng = (base64) =>
        new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");

                // Clip if circle
                if (shape === "circle") {
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                }

                // Scale and center
                const scale = Math.max(size / img.width, size / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const dx = (size - w) / 2;
                const dy = (size - h) / 2;

                ctx.drawImage(img, dx, dy, w, h);
                resolve(canvas.toDataURL("image/png"));
            };
            img.src = base64;
            
        });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                let base64 = reader.result;

                // Convert non-PNG/JPEG → PNG
                if (
                    base64.startsWith("data:image/webp") ||
                    base64.startsWith("data:image/avif") ||
                    base64.startsWith("data:image/heic")
                ) {
                    base64 = await convertToPng(base64);
                }

                // If preclip circle/square
                if (shape === "circle" || shape === "square") {
                    base64 = await convertToPng(base64); // always PNG after preclip
                }

                resolve({
                    base64,
                    type: base64.includes("image/jpeg") ? "JPEG" : "PNG"
                });
                console.log(base64);
            } catch (e) {
                reject(e);
            }
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}



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
            },
            {
                id: 3,
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

function getTemplate(templateId) {    
    switch (templateId) {
        case 1:
            return new Template1(cvInfo);
        case 3:
            return new Template3(cvInfo);
        case 9:
            return new Template9(cvInfo);
        case 13:
            return new Template13(cvInfo);
        case 14:
            return new Template14(cvInfo);
        case 15:
            return new Template15(cvInfo); 
        default:
            return new Template1(cvInfo);
    }
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
                src: `templates/${i}.webp`
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