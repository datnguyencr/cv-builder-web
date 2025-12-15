class Template2 extends PDFGenerator {


    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
    }) {
        super(cvInfo, options);
        this.margin = 20;
        this.rightY = this.margin;
        this.colHeight = this.pageHeight - this.margin * 2;
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }
    
     formatTime = (monthValue) => {
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
         marker: showTimeLine?marker:null
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

    }
    async showName({column = "left",}) {
        this.name(this.cvInfo.name, {column:column,
            textSize: 32,
            textColor: this.mainColor,
            center: true
        });
    }

    async showTitle({column="left"}={}) {
        this.title(this.cvInfo.title, {column:column,
            textColor: this.textColor,
            center: true
        });
        this.addYOffset(column, 20);
    }

    async showContactInfo({column="left"}={}) {

        this.section({
            text: "Contact",
            color: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.contactImage
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

    async showIntroduction({column="left"}={}) {
        this.section({
            text: "Introduction",
            column: column,
            color: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.introductionImage
        });
        this.introduction(this.cvInfo.introduction, {
            center: false,
            column:column
        });
    }

    async showEducation({column="left"}={}) {
        this.educationBlock({
            column:column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.educationImage,
            showTimeLine: true
        });
    }

    async showWorkExp({column="left"}={}) {
        this.workExpBlock({
            column: column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.workExpImage,
            showTimeLine: true
        });
    }

    async showSkills({column="left"}={}) {
        this.skillsBlock({
            column: column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.skillImage
        });
    }
    async showReference({column="left"}={}) {
        this.referencesBlock({
            column: column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.referenceImage
        });
    }

    async showAward({column="left"}={}) {
        this.awardsBlock({
            column: column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.awardImage
        });
    }

    async showHobby({column="left"}={}) {
        await this.hobbyBlock({
            column: column,
            sectionColor: this.textColor,
            underline: true,
            lineColor: this.mainColor,
            icon: this.hobbyImage
        });
    }
    async showLeftColumn({column="left"}={}) {
        await this.showTitle({column:column});
        await this.showIntroduction({column:column});
        await this.showContactInfo({column:column});
    }

    async showRightColumn({column="right"}={}) {
        await this.showSkills({column:column});
        await this.showReference({column:column});
        await this.showAward({column:column});
        await this.showHobby({column:column});
        await this.showWorkExp({column:column});
        await this.showEducation({column:column});
    }
    async showTopContent() {
        this.showAvatar({column:"left"});
        this.showName({column:"right"});
    }
}