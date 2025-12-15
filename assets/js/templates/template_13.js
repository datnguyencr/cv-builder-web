class Template13 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [211, 204, 247],
        mainColor: [0, 0, 0]
    }) {
        super(cvInfo, options);
        this.margin = 20;
        this.rightY = this.margin;
        this.colHeight = this.pageHeight - this.margin * 2;
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Afacad-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Afacad-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Afacad-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }
    blockTitleStyle() {
        return new TextStyle({
            style: 'bold',
            color: this.textColor
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'normal',
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'italic',
            color: this.textColor
        });
    }
    async showAvatar({column="left"}={}) {
        this.avatar(this.cvInfo.avatar, {
            borderColor: this.mainColor,
            column:column
        });
    }

     formatTime = (monthValue) => {
        if (!monthValue) return '';
            const y = monthValue.split('-')[0];
            return y || '';
        };
    blockHeader({
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        column = "left",
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {

        const marker = TIMELINE_MARKERS["circle"];
        this.doc.setFillColor(...timelineColor);
        this.writeTextWithMarker(title.text, {
            style: title.style,
            column: column,
            marker: showTimeLine? marker : null
        });

        const colW =  (this.colWidth(column) - this.margin * 2);
        const textW = colW - 10 - 10;
        var leftRatio=0.6;
        const desciptionLines=this.doc.splitTextToSize(description.text, textW*leftRatio);
        const datesLines=this.doc.splitTextToSize(dates.text, textW*(1-leftRatio));

        const lines = Math.max(desciptionLines.length,datesLines.length);
        this.row(
                (opts) => this.writeTextWithMarker(description.text, {
                    ...opts,
                    style: description.style,
                    column,
                    marker: showTimeLine
                        ? (x, y, w, ctx) => ctx.doc.line(x, y - w * 2, x, y + (w+20) *lines)
                        : null
                }),
                (opts) => this.writeTextWithMarker(dates.text, {
                    ...opts,
                    style: dates.style,
                    column,
                    marker: null,
                    align: "right"
                }),
                {
                    column,
                    leftRatio: leftRatio
                }
            );
            this.addYOffset(column,10);
    }
    async showName({column="left"}={}) {
        this.name(this.cvInfo.name, {column:column,
            textSize: 32,
            textColor: this.mainColor,
        });
    }

    async showTitle({column="left"}={}) {
        this.title(this.cvInfo.title, {column:column,
            textColor: this.textColor,uppercase:true
        });
        this.addYOffset("right", 10);
    }

    async showIntroduction({column="left"}={}) {
        await this.introduction(this.cvInfo.introduction, {
            center: false,
        column:column,
        });
    }

    async showEducation({column="left"}={}) {
        await this.educationBlock({
          column:column,uppercase:true,
        });
    }

    async showWorkExp({column="left"}={}) {
        await this.workExpBlock({
          column:column,uppercase:true,
        });
    }
    async showSkills({column="left"}={}) {
        await this.skillsBlock({column:column,
            uppercase: true
        });
    }

    async showAward({column="left"}={}) {
        await this.awardsBlock({column:column,
            uppercase: true
        });
    }

    async showReference({column="left"}={}) {
        await this.referencesBlock({column:column,
            uppercase: true
        });
    }

    async showHobby({column="left"}={}) {
        await this.hobbyBlock({column:column,
            uppercase: true
        });
    }
    async showContactInfo({column="left"}={}) {
        this.section({
            text: "Contact",
            color: this.textColor,
            uppercase:true
        });
        let textSize = 10;
        let lineHeight = 15;
        this.writePair({
            label: "Phone:",
            value: this.cvInfo.phone,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
        this.writePair({
            label: "Email:",
            value: this.cvInfo.email,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
        this.writePair({
            label: "Links:",
            value: this.cvInfo.url,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
    }
    async showLeftColumn({column="left"}={}) {
        await this.showContactInfo({column:column});
        await this.showSkills({column:column});
        await this.showReference({column:column});
    }

    async showRightColumn({column="right"}={}) {
        this.addYOffset(column,10);
        await this.showAvatar({column:column});
        this.addYOffset(column,10);
        await this.showName({column:column});
        await this.showTitle({column:column});
        await this.showIntroduction({column:column});
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin+this.leftWidth, this.rightY, this.pageWidth - this.margin, this.rightY);
        this.addYOffset(column,10);
        await this.showAward({column:column});
        await this.showHobby({column:column});
        await this.showWorkExp({column:column});
        await this.showEducation({column:column});
    }
}