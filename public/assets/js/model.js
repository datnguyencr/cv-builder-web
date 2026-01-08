export class Skill {
    constructor({ id = 1, name = "", value = 0 }) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
    copy({ id = null, name = null, value = null }) {
        return new Skill({
            id: id ?? this.id,
            name: name ?? this.name,
            value: value ?? this.value,
        });
    }
}
export const TimeFormat = Object.freeze({
    YEAR: "YEAR",
    MONTH_YEAR: "MONTH_YEAR",
});

export const FontStyle = Object.freeze({
    NORMAL: "NORMAL",
    BOLD: "BOLD",
    ITALIC: "ITALIC",
});
export const ContactInfoType = Object.freeze({
    COLUMN: "COLUMN",
    LIST: "LIST",
});
export const SkillListType = Object.freeze({
    DEFAULT: "DEFAULT",
    LIST: "LIST",
    BAR: "BAR",
});

export const AvatarShape = Object.freeze({
    CICLE: "CICLE",
    RECTANGLE: "RECTANGLE",
});
export class CVInfo {
    static default() {
        return new CVInfo({
            sections: {
                experience: true,
                education: true,
                skills: true,
                references: true,
                awards: true,
                hobbies: true,
            },
            name: "Edward Nolan",
            title: "Software Engineer",
            email: "edward.nolan@example.com",
            phone: "+1 234 567 8901",
            url: "linkedin.com/in/edward.nolan",
            introduction:
                "Passionate software engineer with experience in building scalable web and mobile applications.",
            workExpArr: [
                {
                    id: 1,
                    title: "Frontend Developer",
                    company: "Tech Solutions Inc.",
                    from: "2021-01",
                    to: "2023-06",
                    current: false,
                    details: [
                        "Implemented client-side routing, state management, and API integrations.",
                        "Mentored junior developers.",
                    ],
                    skillArr: [
                        "Tailwind CSS",
                        "JavaScript",
                        "HTML5",
                        "CSS3",
                        "REST APIs",
                        "Git",
                    ],
                },
                {
                    id: 2,
                    title: "Frontend Developer",
                    company: "GrimWard Inc.",
                    from: "2020-02",
                    to: "2021-01",
                    current: false,
                    details: [
                        "Implemented client-side routing, state management, and API integrations.",
                        "Mentored junior developers.",
                    ],
                    skillArr: [
                        "Tailwind CSS",
                        "JavaScript",
                        "HTML5",
                        "CSS3",
                        "REST APIs",
                        "Git",
                    ],
                },
            ],
            educationArr: [
                {
                    id: 1,
                    degree: "BSc Computer Science",
                    school: "State University",
                    from: "2017-09",
                    to: "2021-06",
                    details: [
                        "Member of the university programming club.",
                        "Led a team in an Agile software development project.",
                        "GPA 4.0",
                    ],
                },
            ],
            skillArr: [
                new Skill({ id: 1, name: "JavaScript", value: 60 }),
                new Skill({ id: 2, name: "Python", value: 50 }),
                new Skill({ id: 3, name: "Dart", value: 100 }),
            ],
            referenceArr: [],
            awardArr: [],
            hobbyArr: [],
        });
    }

    constructor(data = {}) {
        this.sections = {
            experience: true,
            education: true,
            skills: true,
            references: false,
            awards: false,
            hobbies: false,
            ...data.sections,
        };

        this.name = data.name || "";
        this.title = data.title || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.url = data.url || "";
        this.avatar = data.avatar || "";
        this.introduction = data.introduction || "";

        this.workExpArr = data.workExpArr || [];
        this.educationArr = data.educationArr || [];
        this.skillArr = data.skillArr || [];
        this.referenceArr = data.referenceArr || [];
        this.awardArr = data.awardArr || [];
        this.hobbyArr = data.hobbyArr || [];
    }
}
