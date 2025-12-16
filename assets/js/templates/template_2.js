class Template2 extends PDFGenerator {


    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    formatTime(monthValue) {
        if (!monthValue) return '';
        const y = monthValue.split('-')[0];
        return y || '';
    };

    blockTitleStyle() {
        return new TextStyle({
            color: this.textColor,
            style: 'bold'
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'bold',
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'normal',
            color: this.textColor
        });
    }

    blockHeader(ctx, {
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        column = "left",
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {
        const marker = TIMELINE_MARKERS["circle"];
        this.doc.setFillColor(...timelineColor);

        this.writeTextWithMarker(ctx, title.text, {
            style: title.style,
            marker: showTimeLine ? marker : null
        });

        const colW = this.colWidth(column);
        const textW = colW - 10 - 10;
        const leftRatio = 0.6;

        const descriptionLines = this.doc.splitTextToSize(description.text, textW * leftRatio);
        const datesLines = this.doc.splitTextToSize(dates.text, textW * (1 - leftRatio));

        const linesCount = Math.max(descriptionLines.length, datesLines.length);

        this.row(ctx,
            (opts) => this.writeTextWithMarker(ctx, description.text, {
                ...opts,
                style: description.style,
                marker: showTimeLine ?
                    (x, y, w, ctx) => ctx.doc.line(x, y - w * 2, x, y + (w + 20) * linesCount) :
                    null
            }),
            (opts) => this.writeTextWithMarker(ctx, dates.text, {
                ...opts,
                style: dates.style,
                marker: null,
                align: "right"
            }), {
                leftRatio: leftRatio
            }
        );
    }

    async showName({
        column = "left",
    }) {
        this.name(this.cvInfo.name, {
            column: column,
            textSize: 32,
            textColor: this.mainColor,
            center: true
        });
    }

    async showTitle({
        column = "left"
    } = {}) {
        this.title(this.cvInfo.title, {
            column: column,
            textColor: this.textColor,
            center: true
        });
        this.addYOffset(column, 20);
    }

    async showContactInfo({
        column = "left"
    } = {}) {

        this.header({
            text: "Contact",
            color: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.contactImage
        });
        let textSize = 10;
        let lineHeight = 15;
        this.writePair({
            label: new PdfText({
                text: "Phone:",
                style: this.contactLabelTextStyle()
            }),
            value: new PdfText({
                text: this.cvInfo.phone,
                style: this.contactValueTextStyle()
            }),
            column: column,
            lineHeight: lineHeight
        });
        this.writePair({
            label: new PdfText({
                text: "Email:",
                style: this.contactLabelTextStyle()
            }),
            value: new PdfText({
                text: this.cvInfo.email,
                style: this.contactValueTextStyle()
            }),
            column: column,
            lineHeight: lineHeight
        });
        this.writePair({
            label: new PdfText({
                text: "Links:",
                style: this.contactLabelTextStyle()
            }),
            value: new PdfText({
                text: this.cvInfo.url,
                style: this.contactValueTextStyle()
            }),
            column: column,
            lineHeight: lineHeight
        });
    }

    async showIntroduction({
        column = "left"
    } = {}) {
        this.header({
            text: "Introduction",
            column: column,
            color: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.introductionImage
        });
        this.introduction(this.cvInfo.introduction, {
            center: false,
            column: column
        });
    }

    async showEducation({
        column = "left"
    } = {}) {
        this.educationBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.educationImage,
            showTimeLine: true
        });
    }

    async showWorkExp({
        column = "left"
    } = {}) {
        this.workExpBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.workExpImage,
            showTimeLine: true
        });
    }

    async showSkills({
        column = "left"
    } = {}) {
        this.skillsBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.skillImage
        });
    }
    async showReference({
        column = "left"
    } = {}) {
        this.referencesBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.referenceImage
        });
    }

    async showAward({
        column = "left"
    } = {}) {
        this.awardsBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.awardImage
        });
    }

    async showHobby({
        column = "left"
    } = {}) {
        await this.hobbyBlock({
            column: column,
            headerColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.hobbyImage
        });
    }
    async showLeftColumn({
        column = "left"
    } = {}) {
        await this.showTitle({
            column: column
        });
        await this.showIntroduction({
            column: column
        });
        await this.showContactInfo({
            column: column
        });
    }

    async showRightColumn({
        column = "right"
    } = {}) {
        await this.showSkills({
            column: column
        });
        await this.showReference({
            column: column
        });
        await this.showAward({
            column: column
        });
        await this.showHobby({
            column: column
        });
        await this.showWorkExp({
            column: column
        });
        await this.showEducation({
            column: column
        });
    }

    async showTopContent() {
        this.renderSection(new Section({
            leftRatio: 0.2,
            rightRatio: 0.8,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(this.cvInfo.avatar, {
                    x: left.x,
                    y: left.y,
                    size: 90
                });
                left.advance(110);


                right.advance(40);
                pdf.name(right, this.cvInfo.name, {
                    textColor: this.textColor
                });
                pdf.title(right, this.cvInfo.title, {
                    textColor: this.textColor
                });
            }
        }));

        this.renderSection(new Section({
            leftRatio: .4,
            rightRatio: .6,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.workExpBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,
                    showTimeLine: true
                });
            }
        }));
    }
}