import { auth, db, logout, verifyAuth } from "./auth.js";
import { CVInfo, Skill } from "./model.js";
import * as Template from "./pdf_template.js";
import * as Utils from "./utils.js";
import {
    ref,
    set,
    get,
    push,
    remove,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

import {
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

window.TEMPLATES = {
    1: Template.Template1,
    2: Template.Template2,
    3: Template.Template3,
    4: Template.Template4,
    5: Template.Template5,
    6: Template.Template6,
    7: Template.Template7,
    8: Template.Template8,
    9: Template.Template9,
    10: Template.Template10,
    11: Template.Template11,
    12: Template.Template12,
    13: Template.Template13,
    14: Template.Template14,
    15: Template.Template15,
    16: Template.Template16,
    17: Template.Template17,
    18: Template.Template18,
    19: Template.Template19,
    20: Template.Template20,
    21: Template.Template21,
    22: Template.Template22,
    23: Template.Template23,
    24: Template.Template24,
    25: Template.Template25,
    26: Template.Template26,
    27: Template.Template27,
    28: Template.Template28,
    29: Template.Template29,
    30: Template.Template30,
};
const EYE_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
    </svg>`;

const EYE_SLASH_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
    </svg>`;

const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const userInfoBottomSheet = document.getElementById("userInfoBottomSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const openUserInfoBottomSheet = document.getElementById(
    "openUserInfoBottomSheet"
);

const templateBottomSheet = document.getElementById("templateBottomSheet");

const workExpListEl = document.getElementById("experienceList");
const workExpTitleEl = document.getElementById("title");
const workExpCompanyEl = document.getElementById("company");
const workExpFromEl = document.getElementById("experienceFrom");
const workExpToEl = document.getElementById("experienceTo");
const workExpCurrentEl = document.getElementById("experienceCurrent");
const workExpSaveBtn = document.getElementById("experienceSaveBtn");

const avatarInput = document.getElementById("inputAvatar");

const eduListEl = document.getElementById("eduList");
const eduDegreeEl = document.getElementById("eduDegree");
const eduSchoolEl = document.getElementById("eduSchool");
const eduFromEl = document.getElementById("eduFrom");
const eduToEl = document.getElementById("eduTo");
const eduSaveBtn = document.getElementById("eduSaveBtn");
const eduCancelBtn = document.getElementById("eduCancelBtn");

const skillInput = document.getElementById("skill");
const skillSaveBtn = document.getElementById("skillSaveBtn");
const skillCancelBtn = document.getElementById("skillCancelBtn");
const skillListEl = document.getElementById("skillList");
const slider = document.getElementById("skillValue");
const label = document.getElementById("skillValueLabel");

const workExpDetailsList = document.getElementById("workExpDetailsList");

const educationDetailsList = document.getElementById("educationDetailsList");

const referenceInput = document.getElementById("reference");
const referenceSaveBtn = document.getElementById("referenceSaveBtn");
const referenceCancelBtn = document.getElementById("referenceCancelBtn");
const referenceListEl = document.getElementById("referenceList");
const awardInput = document.getElementById("award");
const awardSaveBtn = document.getElementById("awardSaveBtn");
const awardCancelBtn = document.getElementById("awardCancelBtn");
const awardListEl = document.getElementById("awardList");

const hobbyInput = document.getElementById("hobby");
const hobbySaveBtn = document.getElementById("hobbySaveBtn");

const hobbyListEl = document.getElementById("hobbyList");
let template;
let historyCache = null;
let historyLoading = false;
let selectedTemplateId = 1;
let avatarFile;
let editingSkillId = null;
let editingReferenceId = null;
let editingAwardId = null;
let editingWorkExpId = null;
let editingEducationId = null;
let editingHobbyId = null;
let cvInfo;
///////////////

skillCancelBtn.addEventListener("click", clearSkillForm);

function showToast(message, { type = "error", duration = 2000 } = {}) {
    const toast = document.getElementById("toast");
    toast.textContent = message;

    const isSmallScreen = window.innerWidth < 768;
    const bottomClass = isSmallScreen ? "bottom-40" : "bottom-20";

    toast.className = `
        fixed ${bottomClass} left-1/2 -translate-x-1/2
        px-4 py-3 rounded-md text-sm text-white
        ${type === "error" ? "bg-red-600" : "bg-green-600"}
        z-[9999]
        opacity-100
        transition-opacity duration-300
        pointer-events-none
    `;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.add("opacity-0");
    }, duration);
}

function resetCVToDefault() {
    localStorage.removeItem("cvInfo");
    cvInfo = CVInfo.default();
    save(cvInfo);
    resetUIFromCV(cvInfo);
}
function resetUIFromCV(cv) {
    document.getElementById("inputName").value = cv.name;
    document.getElementById("inputTitle").value = cv.title;
    document.getElementById("inputEmail").value = cv.email;
    document.getElementById("inputPhone").value = cv.phone;
    document.getElementById("inputLinks").value = cv.url;
    document.getElementById("inputIntroduction").value = cv.introduction;

    avatarFile = null;

    renderWorkExpList();
    renderEducationList();
    renderSkillList();
    renderReferenceList();
    renderAwardList();
    renderHobbyList();

    slider.value = 0;
    label.textContent = "0%";

    clearWorkExperienceForm();
    clearEduForm();
    clearSkillForm();
    clearAwardForm();
    clearHobbyForm();
    clearReferenceForm();

    previewPDF();
}

function clearSkillForm() {
    editingSkillId = null;
    skillInput.value = "";
    skillValue.value = 0;
    skillSaveBtn.textContent = "Add";
    label.textContent = skillValue.value + "%";
}

slider.addEventListener("input", () => {
    label.textContent = slider.value + "%";
});

avatarInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
    }

    if (file.size > 1024 * 1024 * 5) {
        alert("Image too large (max 1MB)");
        return;
    }
    avatarFile = file;
});

async function showEmpty({ container, text }) {
    const template = await Utils.loadTemplate(
        "templates/empty-state-template.html"
    );
    const clone = template.content.cloneNode(true);
    clone.querySelector(".empty-message").textContent = text;
    container.innerHTML = "";
    container.appendChild(clone);
}

async function renderWorkExpList() {
    workExpListEl.innerHTML = "";

    if (cvInfo.workExpArr.length === 0) {
        showEmpty({
            container: workExpListEl,
            text: "No work experience added yet.",
        });
        return;
    }

    const template = await Utils.loadTemplate(
        "templates/work-exp-item-template.html"
    );
    cvInfo.workExpArr.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const left = clone.querySelector(".left");
        left.querySelector(".title").textContent = Utils.escapeHtml(item.title);
        left.querySelector(".company").textContent = Utils.escapeHtml(
            item.company
        );
        left.querySelector(".dates").textContent = item.current
            ? `${Utils.formatMonth(item.from)} - Present`
            : `${Utils.formatMonth(item.from)} - ${Utils.formatMonth(item.to)}`;
        const detailsEl = clone.querySelector(".details");
        detailsEl.innerHTML = "";

        (item.details || []).forEach((d) => {
            const li = document.createElement("li");
            li.textContent = d;
            detailsEl.appendChild(li);
        });

        const controls = clone.querySelector(".controls");
        controls
            .querySelector(".edit")
            .addEventListener("click", () => startEditWorkExperience(item.id));

        controls.querySelector(".delete").addEventListener("click", () => {
            if (!confirm("Delete this work experience item?")) return;
            cvInfo.workExpArr = cvInfo.workExpArr.filter(
                (e) => e.id !== item.id
            );
            renderWorkExpList();
        });

        workExpListEl.appendChild(clone);
    });
}
document.getElementById("addWorkExpDetail").onclick = async () => {
    const workExpDetailTemplate = await Utils.loadTemplate(
        "templates/work-exp-detail-template.html"
    );

    const node = workExpDetailTemplate.content.cloneNode(true);
    node.querySelector(".remove").onclick = (e) =>
        e.target.closest("div").remove();
    workExpDetailsList.appendChild(node);
};

function startEditWorkExperience(id) {
    const it = cvInfo.workExpArr.find((e) => e.id === id);
    if (!it) return;
    editingWorkExpId = id;
    workExpTitleEl.value = it.title;
    workExpCompanyEl.value = it.company;
    workExpFromEl.value = it.from || "";
    workExpToEl.value = it.to || "";
    workExpCurrentEl.checked = !!it.current;
    workExpSaveBtn.innerText = "Save";
    workExpTitleEl.focus();

    workExpDetailsList.innerHTML = "";
    (it.details || []).forEach((detail) => {
        const node = workExpDetailTemplate.content.cloneNode(true);
        const input = node.querySelector(".work-exp-detail-input");
        if (input) input.value = detail;
        const removeBtn = node.querySelector(".remove");
        if (removeBtn) {
            removeBtn.onclick = (e) => e.target.closest("div").remove();
        }
        workExpDetailsList.appendChild(node);
    });
}

function clearWorkExperienceForm() {
    editingWorkExpId = null;
    workExpTitleEl.value = "";
    workExpCompanyEl.value = "";
    workExpFromEl.value = "";
    workExpToEl.value = "";
    workExpCurrentEl.checked = false;
    workExpSaveBtn.innerText = "Add";
    workExpDetailsList.innerHTML = "";
    addWorkExpDetail.click();
}

workExpSaveBtn.addEventListener("click", () => {
    const title = workExpTitleEl.value.trim();
    const company = workExpCompanyEl.value.trim();
    const from = workExpFromEl.value || "";
    const to = workExpToEl.value || "";
    const current = !!workExpCurrentEl.checked;

    if (!title || !company || !from) {
        showToast("Please fill role, company and from date.");
        if (!title) {
            workExpTitleEl.focus();
        } else if (!company) {
            workExpCompanyEl.focus();
        } else if (from === "") {
            workExpFromEl.focus();
        }
        return;
    }

    if (!current && !to) {
        if (
            !confirm(
                'No end date provided. Save as "Present"? Click OK to mark as Present, Cancel to set end date.'
            )
        ) {
            return;
        }
    }
    const details = [
        ...workExpDetailsList.querySelectorAll(".work-exp-detail-input"),
    ]
        .map((i) => i.value.trim())
        .filter(Boolean);

    let opts = {
        title: title,
        company: company,
        from: from,
        to: to,
        current: current,
        details: details,
        skills: [],
    };

    if (editingWorkExpId) {
        const idx = cvInfo.workExpArr.findIndex(
            (e) => e.id === editingWorkExpId
        );
        if (idx >= 0) {
            opts.id = editingWorkExpId;
            cvInfo.workExpArr[idx] = opts;
        }
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        opts.id = id;
        cvInfo.workExpArr.push(opts);
    }

    clearWorkExperienceForm();
    renderWorkExpList();
});

document.getElementById("experienceCancelBtn").addEventListener("click", () => {
    clearWorkExperienceForm();
});

async function renderEducationList() {
    eduListEl.innerHTML = "";

    if (cvInfo.educationArr.length === 0) {
        showEmpty({
            container: eduListEl,
            text: "No education added.",
        });
        return;
    }

    const template = await Utils.loadTemplate(
        "templates/education-item-template.html"
    );
    cvInfo.educationArr.forEach((item) => {
        const clone = template.content.cloneNode(true);

        const left = clone.querySelector(".left");
        left.querySelector(".degree").textContent = Utils.escapeHtml(
            item.degree
        );
        left.querySelector(".school").textContent = Utils.escapeHtml(
            item.school
        );
        left.querySelector(".dates").textContent = `${Utils.formatMonth(
            item.from
        )} - ${Utils.formatMonth(item.to)}`;
        const detailsEl = clone.querySelector(".details");
        detailsEl.innerHTML = "";

        (item.details || []).forEach((d) => {
            const li = document.createElement("li");
            li.textContent = d;
            detailsEl.appendChild(li);
        });
        const controls = clone.querySelector(".controls");

        controls
            .querySelector(".edit")
            .addEventListener("click", () => startEditEducation(item.id));
        controls.querySelector(".delete").addEventListener("click", () => {
            if (!confirm("Delete this education item?")) return;
            cvInfo.educationArr = cvInfo.educationArr.filter(
                (e) => e.id !== item.id
            );
            renderEducationList();
        });

        eduListEl.appendChild(clone);
    });
}
document.getElementById("addEducationDetail").onclick = async () => {
    const educationDetailTemplate = await Utils.loadTemplate(
        "templates/education-detail-template.html"
    );
    const node = educationDetailTemplate.content.cloneNode(true);
    node.querySelector(".remove").onclick = (e) =>
        e.target.closest("div").remove();
    educationDetailsList.appendChild(node);
};

async function startEditEducation(id) {
    const it = cvInfo.educationArr.find((e) => e.id === id);
    if (!it) return;
    editingEducationId = id;
    eduDegreeEl.value = it.degree;
    eduSchoolEl.value = it.school;
    eduFromEl.value = it.from || "";
    eduToEl.value = it.to || "";
    eduSaveBtn.innerText = "Save";
    eduDegreeEl.focus();

    educationDetailsList.innerHTML = "";
    const educationDetailTemplate = await Utils.loadTemplate(
        "templates/education-detail-template.html"
    );
    (it.details || []).forEach((detail) => {
        const node = educationDetailTemplate.content.cloneNode(true);
        const input = node.querySelector(".education-detail-input");
        if (input) input.value = detail;
        const removeBtn = node.querySelector(".remove");
        if (removeBtn) {
            removeBtn.onclick = (e) => e.target.closest("div").remove();
        }
        educationDetailsList.appendChild(node);
    });
}

function clearEduForm() {
    editingEducationId = null;
    eduDegreeEl.value = "";
    eduSchoolEl.value = "";
    eduFromEl.value = "";
    eduToEl.value = "";
    eduSaveBtn.innerText = "Add";
    educationDetailsList.innerHTML = "";
    addEducationDetail.click();
}

eduSaveBtn.addEventListener("click", () => {
    const degree = eduDegreeEl.value.trim();
    const school = eduSchoolEl.value.trim();
    const from = eduFromEl.value || "";
    const to = eduToEl.value || "";

    if (!degree || !school || !from) {
        showToast("Please fill degree, school and from date.");
        if (!degree) {
            eduDegreeEl.focus();
        } else if (!school) {
            eduSchoolEl.focus();
        } else if (from === "") {
            eduFromEl.focus();
        }
        return;
    }
    const details = [
        ...educationDetailsList.querySelectorAll(".education-detail-input"),
    ]
        .map((i) => i.value.trim())
        .filter(Boolean);
    let opts = {
        degree: degree,
        school: school,
        from: from,
        to: to,
        details: details,
    };
    if (editingEducationId) {
        const idx = cvInfo.educationArr.findIndex(
            (e) => e.id === editingEducationId
        );
        if (idx >= 0) {
            opts.id = editingEducationId;
            cvInfo.educationArr[idx] = opts;
        }
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        opts.id = id;
        cvInfo.educationArr.push(opts);
    }

    clearEduForm();
    renderEducationList();
});

eduCancelBtn.addEventListener("click", () => {
    clearEduForm();
});

function startEditSkill(id) {
    const it = cvInfo.skillArr.find((e) => e.id === id);
    if (!it) return;
    editingSkillId = id;
    skillValue.value = it.value || 0;
    skillInput.value = it.name || "";
    label.textContent = it.value + "%";
    skillSaveBtn.innerText = "Save";
    skillInput.focus();
}

async function renderSkillList() {
    skillListEl.innerHTML = "";

    if (!cvInfo.skillArr.length) {
        showEmpty({
            container: skillListEl,
            text: "No skills added yet.",
        });
        return;
    }

    const template = await Utils.loadTemplate(
        "templates/skill-item-template.html"
    );
    cvInfo.skillArr.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        clone.querySelector(".delete").addEventListener("click", () => {
            cvInfo.skillArr = cvInfo.skillArr.filter((s) => s.id !== item.id);
            renderSkillList();
        });
        clone
            .querySelector(".edit")
            .addEventListener("click", () => startEditSkill(item.id));
        clone.querySelector(".bar").style.width = item.value + "%";
        skillListEl.appendChild(clone);
    });
}

skillSaveBtn.addEventListener("click", () => {
    const name = skillInput.value.trim();
    const value = parseInt(skillValue.value, 10);

    if (!name) {
        showToast("Skill cannot be empty.");
        skillInput.focus();
        return;
    }

    var skill = new Skill({
        name: name,
        value: value,
    });
    if (editingSkillId) {
        const idx = cvInfo.skillArr.findIndex((s) => s.id === editingSkillId);
        if (idx >= 0)
            cvInfo.skillArr[idx] = skill.copy({
                id: editingSkillId,
            });
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.skillArr.push(
            skill.copy({
                id: id,
            })
        );
    }

    clearSkillForm();
    renderSkillList();
});

function startEditReference(id) {
    const it = cvInfo.referenceArr.find((e) => e.id === id);
    if (!it) return;
    editingReferenceId = id;
    referenceInput.value = it.name || "";
    referenceSaveBtn.innerText = "Save";
    referenceInput.focus();
}

async function renderReferenceList() {
    referenceListEl.innerHTML = "";

    if (!cvInfo.referenceArr.length) {
        showEmpty({
            container: referenceListEl,
            text: "No references added yet.",
        });
        return;
    }

    const template = await Utils.loadTemplate(
        "templates/reference-item-template.html"
    );
    cvInfo.referenceArr.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        clone.querySelector(".delete").addEventListener("click", () => {
            cvInfo.referenceArr = cvInfo.referenceArr.filter(
                (s) => s.id !== item.id
            );
            renderReferenceList();
        });
        clone
            .querySelector(".edit")
            .addEventListener("click", () => startEditReference(item.id));
        referenceListEl.appendChild(clone);
    });
}

function section({ titleText, id, hasBottomLine, uppercase, fontBold = true }) {
    const container = document.createElement("div");
    container.className = "mb-6";
    const title = document.createElement("h2");
    title.className = "text-xl text-teal-800 pb-1 mb-2";

    if (hasBottomLine) {
        title.classList.add("border-b-2", "border-gray-300", "border-teal-800");
    }

    if (uppercase) {
        title.classList.add("uppercase");
    }

    if (fontBold) {
        title.classList.add("font-bold");
    }

    title.textContent = titleText;

    const content = document.createElement("div");
    content.id = id;

    container.appendChild(title);
    container.appendChild(content);

    return container;
}

function clearReferenceForm() {
    editingReferenceId = null;
    referenceInput.value = "";
    referenceSaveBtn.textContent = "Add";
}

referenceSaveBtn.addEventListener("click", () => {
    const name = referenceInput.value.trim();
    if (!name) {
        showToast("Reference cannot be empty.");
        referenceInput.focus();
        return;
    }

    if (editingReferenceId) {
        const idx = cvInfo.referenceArr.findIndex(
            (r) => r.id === editingReferenceId
        );
        if (idx >= 0) cvInfo.referenceArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.referenceArr.push({
            id,
            name,
        });
    }

    clearReferenceForm();
    renderReferenceList();
});

referenceCancelBtn.addEventListener("click", clearReferenceForm);

function startEditAward(id) {
    const it = cvInfo.awardArr.find((e) => e.id === id);
    if (!it) return;
    editingAwardId = id;
    awardInput.value = it.name || "";
    awardSaveBtn.innerText = "Save";
    awardInput.focus();
}

async function renderAwardList() {
    awardListEl.innerHTML = "";

    if (!cvInfo.awardArr.length) {
        showEmpty({
            container: awardListEl,
            text: "No awards added yet.",
        });
        return;
    }
    const template = await Utils.loadTemplate(
        "templates/award-item-template.html"
    );
    cvInfo.awardArr.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        clone.querySelector(".delete").addEventListener("click", () => {
            cvInfo.awardArr = cvInfo.awardArr.filter((s) => s.id !== item.id);
            renderAwardList();
        });
        clone
            .querySelector(".edit")
            .addEventListener("click", () => startEditAward(item.id));
        awardListEl.appendChild(clone);
    });
}

function clearAwardForm() {
    editingAwardId = null;
    awardInput.value = "";
    awardSaveBtn.textContent = "Add";
}

awardSaveBtn.addEventListener("click", () => {
    const name = awardInput.value.trim();
    if (!name) {
        showToast("Award cannot be empty.");
        awardInput.focus();
        return;
    }

    if (editingAwardId) {
        const idx = cvInfo.awardArr.findIndex((a) => a.id === editingAwardId);
        if (idx >= 0) cvInfo.awardArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.awardArr.push({
            id,
            name,
        });
    }

    clearAwardForm();
    renderAwardList();
});

awardCancelBtn.addEventListener("click", clearAwardForm);

function startEditHobby(id) {
    const it = cvInfo.hobbyArr.find((e) => e.id === id);
    if (!it) return;
    editingHobbyId = id;
    hobbyInput.value = it.name || "";
    hobbySaveBtn.innerText = "Save";
    hobbyInput.focus();
}

async function renderHobbyList() {
    hobbyListEl.innerHTML = "";

    if (!cvInfo.hobbyArr.length) {
        showEmpty({
            container: hobbyListEl,
            text: "No hobbies added yet.",
        });
        return;
    }
    const template = await Utils.loadTemplate(
        "templates/hobby-item-template.html"
    );
    cvInfo.hobbyArr.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".item").textContent = item.name;
        clone.querySelector(".delete").addEventListener("click", () => {
            cvInfo.hobbyArr = cvInfo.hobbyArr.filter((s) => s.id !== item.id);
            renderHobbyList();
        });
        clone
            .querySelector(".edit")
            .addEventListener("click", () => startEditHobby(item.id));
        hobbyListEl.appendChild(clone);
    });
}

function clearHobbyForm() {
    editingHobbyId = null;
    hobbyInput.value = "";
    hobbySaveBtn.textContent = "Add";
}

hobbySaveBtn.addEventListener("click", () => {
    const name = hobbyInput.value.trim();
    if (!name) {
        showToast("Hobby cannot be empty.");
        hobbyInput.focus();
        return;
    }

    if (editingHobbyId) {
        const idx = cvInfo.hobbyArr.findIndex((h) => h.id === editingHobbyId);
        if (idx >= 0) cvInfo.hobbyArr[idx].name = name;
    } else {
        const id = Date.now() + Math.floor(Math.random() * 1000);
        cvInfo.hobbyArr.push({
            id,
            name,
        });
    }

    clearHobbyForm();
    renderHobbyList();
});

document
    .getElementById("hobbyCancelBtn")
    .addEventListener("click", clearHobbyForm);

async function initInfo() {
    cvInfo = await load();
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
    addWorkExpDetail.click();
    addEducationDetail.click();
}

function getTemplate(id) {
    return new (window.TEMPLATES[id] || Template1)(cvInfo);
}

async function generatePDF() {
    const template = getTemplate(selectedTemplateId);

    const file =
        avatarFile ||
        (await fetch("images/default.avif").then((r) => r.blob()));

    const img = await Utils.fileToJsPdfImage(
        file,
        template.avatarWidth,
        template.avatarHeight,
        template.avatarShape
    );

    cvInfo.avatar = img.base64;

    return template.generate();
}

async function previewPDF() {
    const doc = await generatePDF();
    const pdfDataUri = doc.output("datauristring");
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = "";

    const embed = document.createElement("embed");
    embed.src = pdfDataUri;
    embed.type = "application/pdf";
    embed.style.width = "794px";
    embed.style.height = "1123px";
    embed.style.margin = 0;
    embed.style.display = "block";

    contentEl.appendChild(embed);
}

async function getAllPDFs() {
    const user = auth.currentUser;

    if (user) {
        const snap = await get(ref(db, `users/${user.uid}/pdfs`));

        if (!snap.exists()) return [];

        return Object.entries(snap.val()).map(([id, data]) => ({
            id,
            ...data,
        }));
    }

    return getAllPDFsLocal();
}

async function getAllPDFsLocal() {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction("pdfs", "readonly");
        const store = tx.objectStore("pdfs");

        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function renderHistoryWithData(pdfs) {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    if (!pdfs.length) {
        const emptyTpl = await Utils.loadTemplate(
            "templates/history-empty-template.html"
        );
        list.appendChild(emptyTpl.content.cloneNode(true));
        return;
    }

    const itemTpl = await Utils.loadTemplate(
        "templates/history-item-template.html"
    );

    // Sort by newest first
    pdfs.sort((a, b) => b.createdAt - a.createdAt).forEach((item) => {
        const node = itemTpl.content.cloneNode(true);

        const nameEl = node.querySelector(".history-name");
        const previewBtn = node.querySelector(".history-preview");
        const downloadBtn = node.querySelector(".history-download");
        const deleteBtn = node.querySelector(".history-delete");

        nameEl.textContent = item.name;

        // Add date element
        const dateEl = node.querySelector(".history-date");
        if (dateEl) {
            const d = new Date(item.createdAt);
            dateEl.textContent = `${d.getFullYear()}/${String(
                d.getMonth() + 1
            ).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
        }

        previewBtn.onclick = () => {
            const blob = getBlob(item);
            const url = URL.createObjectURL(blob);
            window.open(url);
        };

        downloadBtn.onclick = () => {
            const blob = getBlob(item);
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = item.name;
            a.click();

            URL.revokeObjectURL(url);
        };
        deleteBtn.onclick = async () => {
            if (!confirm("Delete this CV? This cannot be undone.")) return;

            await deletePDF(item);
            renderHistoryWithData(pdfs.filter((p) => p.id !== item.id));
        };
        list.appendChild(node);
    });
}
async function deleteLocalPDF(id) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction("pdfs", "readwrite");
        tx.objectStore("pdfs").delete(id);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
    });
}

async function deleteFirebasePDF(id) {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("User not authenticated");

    await remove(ref(db, `users/${uid}/pdfs/${id}`));
}

async function deletePDF(item) {
    if (item.source === "local") {
        return deleteLocalPDF(item.id);
    }

    if (item.source === "firebase") {
        return deleteFirebasePDF(item.id);
    }

    throw new Error("Unknown PDF source");
}

async function renderHistory() {
    if (historyCache) {
        renderHistoryWithData(historyCache);
    }

    if (historyLoading) return;
    historyLoading = true;

    try {
        const fresh = await getAllPDFs();

        if (!isSameList(historyCache, fresh)) {
            historyCache = fresh;
            renderHistoryWithData(historyCache);
        }
    } finally {
        historyLoading = false;
    }
}
function isSameList(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i].id !== b[i].id) return false;
        if (+new Date(a[i].createdAt) !== +new Date(b[i].createdAt))
            return false;
    }
    return true;
}

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open("cv-pdf-db", 1);

        req.onupgradeneeded = () => {
            req.result.createObjectStore("pdfs", { keyPath: "id" });
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
function base64ToBlob(base64, type = "application/pdf") {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return new Blob([bytes], { type });
}
function getBlob(item) {
    if (item.blob instanceof Blob) {
        return item.blob; // IndexedDB case
    }

    if (item.base64) {
        return base64ToBlob(item.base64); // Firebase case
    }

    throw new Error("Invalid PDF data");
}

async function savePDF(blob, filename) {
    const user = auth.currentUser;
    const createdAt = Date.now();
    if (user) {
        const pdfRef = push(ref(db, `users/${user.uid}/pdfs`));
        const base64 = await blobToBase64(blob);

        const item = {
            id: pdfRef.key,
            name: filename,
            base64,
            createdAt,
            source: "firebase",
        };

        await set(pdfRef, item);
        return item;
    }

    const dbInstance = await openDB();
    const id = crypto.randomUUID();

    const item = {
        id,
        name: filename,
        blob,
        createdAt,
        source: "local",
    };

    return new Promise((resolve, reject) => {
        const tx = dbInstance.transaction("pdfs", "readwrite");
        const store = tx.objectStore("pdfs");

        store.put(item);

        tx.oncomplete = () => resolve(item);
        tx.onerror = () => reject(tx.error);
    });
}
async function savePDFFile() {
    const doc = await generatePDF();
    const timestamp = Date.now();
    const filename = `CV_${timestamp}.pdf`;
    let blob = doc.output("blob");
    await savePDF(blob, filename);
    showToast("PDF saved successfully", { type: "success" });
}

async function downloadPDF() {
    const doc = await generatePDF();
    const timestamp = Date.now();
    const filename = `CV_${timestamp}.pdf`;
    doc.save(filename);
}

function applySectionVisibility() {
    document.querySelectorAll(".section").forEach((section) => {
        const key = section.dataset.section;
        if (!key || !cvInfo.sections) return;

        const body = section.querySelector(".section-body");
        const icon = section.querySelector(".toggle-icon");

        const enabled = cvInfo.sections[key] !== false;

        body.classList.toggle("hidden", !enabled);
        icon.innerHTML = enabled ? EYE_ICON : EYE_SLASH_ICON;
    });
}
function setupDialog({
    dialogId,
    openBtn,
    onNegativePressed: onNegativePressed,
    onPositivePressed: onPositivePressed,
}) {
    const dialog = document.getElementById(dialogId);

    function openDialog() {
        dialog.classList.remove("hidden");
        dialog.classList.add("flex");
    }

    function closeDialog() {
        dialog.classList.add("hidden");
        dialog.classList.remove("flex");
    }

    openBtn?.addEventListener("click", openDialog);

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closeDialog();
    });
    const negativeBtn = dialog.querySelector("button.negative-btn");
    negativeBtn?.addEventListener("click", () => {
        if (onNegativePressed) {
            onNegativePressed();
        }
        closeDialog();
    });

    const positiveBtn = dialog.querySelector("button.positive-btn");
    positiveBtn?.addEventListener("click", () => {
        if (onPositivePressed) {
            onPositivePressed();
        }
        closeDialog();
    });

    return { openDialog, closeDialog };
}
async function load() {
    const user = auth.currentUser;
    if (user) {
        const snap = await get(ref(db, `users/${user.uid}/cvInfo`));
        if (snap.exists()) {
            return new CVInfo(snap.val());
        }
        return CVInfo.default();
    }

    const raw = localStorage.getItem("cvInfo");
    if (!raw) return CVInfo.default();
    try {
        return new CVInfo(JSON.parse(raw));
    } catch {
        localStorage.removeItem("cvInfo");
        return CVInfo.default();
    }
}
async function save(data) {
    const user = auth.currentUser;
    data.updatedAt = Date.now();
    if (user) {
        await set(ref(db, `users/${user.uid}/cvInfo`), data);
    } else {
        localStorage.setItem("cvInfo", JSON.stringify(data));
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    const provider = new GoogleAuthProvider();
    const templateMenu = document.querySelector("#template-menu");
    const closeTemplateSheet = document.querySelector("#closeTemplateSheet");
    var signInBtn = document.getElementById("sign-in");
    var signOutBtn = document.getElementById("sign-out");
    skillValue.value = 0;
    skillInput.value = "";
    label.textContent = skillValue.value + "%";
    verifyAuth(async (user) => {
        if (user) {
            signInBtn.classList.add("hidden");
            signOutBtn.classList.remove("hidden");
        } else {
            signInBtn.classList.remove("hidden");
            signOutBtn.classList.add("hidden");
        }
        await initInfo();
        const storedTemplateId = localStorage.getItem("selectedTemplateId");
        if (storedTemplateId) {
            selectedTemplateId = Number(storedTemplateId);
            template = getTemplate(selectedTemplateId);
        }
        applySectionVisibility();
        template = getTemplate(selectedTemplateId);
        previewPDF();
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
        templateBottomSheet.classList.remove("translate-y-full");
        templateBottomSheet.classList.add("translate-y-0");
        sheetOverlay.classList.remove("hidden");
        hamburger.classList.add("hidden");

        const templates = [];
        for (let i = 1; i <= 30; i++) {
            templates.push({
                id: i,
                name: `Template ${i}`,
                src: `images/templates/template_${i}.avif`,
            });
        }
        const templateGrid = document.getElementById("templateGrid");
        templateGrid.innerHTML = "";
        templateGrid.style.gridTemplateColumns =
            "repeat(auto-fill, minmax(192px, 1fr))";
        templates.forEach((t) => {
            const item = document.createElement("div");

            item.dataset.templateId = t.id;

            item.className =
                "template-item w-48 aspect-[616/800] overflow-hidden rounded cursor-pointer " +
                "border hover:border-blue-500 hover:border-2 transition-all";
            if (selectedTemplateId == item.dataset.templateId) {
                item.classList.add("border-blue-500", "border-2");
            }
            const img = document.createElement("img");
            img.src = t.src;
            img.alt = t.name;
            img.className = "w-full h-full object-contain";
            item.appendChild(img);
            templateGrid.appendChild(item);

            item.addEventListener("click", (e) => {
                templateGrid
                    .querySelectorAll(".template-item")
                    .forEach((i) => i.classList.remove("border-blue-500"));
                item.classList.add("border-blue-500", "border-2");
                selectedTemplateId = t.id;
                localStorage.setItem("selectedTemplateId", selectedTemplateId);
                previewPDF();
            });
        });
    });

    closeTemplateSheet.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        templateBottomSheet.classList.add("translate-y-full");
        templateBottomSheet.classList.remove("translate-y-0");

        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

    openUserInfoBottomSheet.addEventListener("click", () => {
        userInfoBottomSheet.classList.remove("translate-y-full");
        userInfoBottomSheet.classList.add("translate-y-0");

        sheetOverlay.classList.remove("hidden");
        hamburger.classList.add("hidden");
    });

    sheetOverlay.addEventListener("click", () => {
        userInfoBottomSheet.classList.add("translate-y-full");
        userInfoBottomSheet.classList.remove("translate-y-0");

        templateBottomSheet.classList.add("translate-y-full");
        templateBottomSheet.classList.remove("translate-y-0");

        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");
    });

    templateBottomSheet.addEventListener("click", (e) => e.stopPropagation());
    userInfoBottomSheet.addEventListener("click", (e) => e.stopPropagation());

    document.getElementById("updateContent").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        userInfoBottomSheet.classList.add("translate-y-full");
        userInfoBottomSheet.classList.remove("translate-y-0");

        sheetOverlay.classList.add("hidden");
        hamburger.classList.remove("hidden");

        cvInfo.name = document.getElementById("inputName").value;
        cvInfo.title = document.getElementById("inputTitle").value;
        cvInfo.email = document.getElementById("inputEmail").value;
        cvInfo.phone = document.getElementById("inputPhone").value;
        cvInfo.url = document.getElementById("inputLinks").value;
        cvInfo.avatar = document.getElementById("inputAvatar").value;
        cvInfo.introduction =
            document.getElementById("inputIntroduction").value;

        previewPDF();
        save(cvInfo);
    });
    document.getElementById("save-info").addEventListener("click", () => {
        savePDFFile();
    });
    document.getElementById("generate").addEventListener("click", () => {
        downloadPDF();
    });

    document.querySelectorAll(".section-toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const section = toggle.closest(".section");
            const body = section.querySelector(".section-body");
            const icon = toggle.querySelector(".toggle-icon");

            const sectionKey = section.dataset.section;

            const hidden = body.classList.toggle("hidden");

            icon.innerHTML = hidden ? EYE_SLASH_ICON : EYE_ICON;
            cvInfo.sections[sectionKey] = !hidden;
        });
    });

    await Utils.loadDialog(
        "templates/confirm-sign-out-dialog.html",
        "confirmSignOutDialog"
    );
    setupDialog({
        dialogId: "confirmSignOutDialog",
        openBtn: signOutBtn,
        onNegativePressed: () => {},
        onPositivePressed: async () => {
            await logout();
        },
    });
    await Utils.loadDialog("templates/login-dialog.html", "loginDialog");

    setupDialog({
        dialogId: "loginDialog",
        openBtn: signInBtn,
        onNegativePressed: () => {},
        onPositivePressed: async () => {
            await signInWithPopup(auth, provider);
        },
    });

    await Utils.loadDialog("templates/about-dialog.html", "aboutDialog");
    setupDialog({
        dialogId: "aboutDialog",
        openBtn: document.getElementById("about-us-menu"),
        onNegativePressed: () => {},
        onPositivePressed: () => {},
    });

    await Utils.loadDialog(
        "templates/confirm-new-cv-dialog.html",
        "confirmNewCvDialog"
    );
    setupDialog({
        dialogId: "confirmNewCvDialog",
        openBtn: document.getElementById("new-cv-menu"),
        onNegativePressed: () => {},
        onPositivePressed: () => {
            resetCVToDefault();
        },
    });

    await Utils.loadDialog("templates/history-dialog.html", "historyDialog");
    setupDialog({
        dialogId: "historyDialog",
        openBtn: document.getElementById("my-pdf-menu"),
        onPositivePressed: () => {},
    });
    document
        .getElementById("my-pdf-menu")
        .addEventListener("click", renderHistory);

    Sortable.create(workExpListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.workExpArr.splice(evt.oldIndex, 1)[0];
            cvInfo.workExpArr.splice(evt.newIndex, 0, movedItem);
        },
    });
    Sortable.create(eduListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.educationArr.splice(evt.oldIndex, 1)[0];
            cvInfo.educationArr.splice(evt.newIndex, 0, movedItem);
        },
    });
    Sortable.create(skillListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.skillArr.splice(evt.oldIndex, 1)[0];
            cvInfo.skillArr.splice(evt.newIndex, 0, movedItem);
        },
    });
    Sortable.create(referenceListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.referenceArr.splice(evt.oldIndex, 1)[0];
            cvInfo.referenceArr.splice(evt.newIndex, 0, movedItem);
        },
    });
    Sortable.create(awardListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.awardArr.splice(evt.oldIndex, 1)[0];
            cvInfo.awardArr.splice(evt.newIndex, 0, movedItem);
        },
    });

    Sortable.create(hobbyListEl, {
        animation: 150,
        onEnd: (evt) => {
            const movedItem = cvInfo.hobbyArr.splice(evt.oldIndex, 1)[0];
            cvInfo.hobbyArr.splice(evt.newIndex, 0, movedItem);
        },
    });
});
async function loadJSZip() {
    if (window.JSZip) return window.JSZip;

    await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");

    return window.JSZip;
}

async function downloadAllTemplates() {
    const JSZip = await loadJSZip();
    const zip = new JSZip();

    const templateIds = Object.keys(window.TEMPLATES)
        .map(Number)
        .sort((a, b) => a - b);

    for (const id of templateIds) {
        selectedTemplateId = id;
        const doc = await generatePDF();
        zip.file(`template_${id}.pdf`, doc.output("blob"));
    }

    const blob = await zip.generateAsync({
        type: "blob",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "all_templates.zip";
    a.click();
}
if (Utils.isProduction()) {
    Utils.enableContentProtection();
}
