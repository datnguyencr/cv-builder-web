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
    async showAvatar() {
        this.avatar(this.cvInfo.avatar, {
            borderColor: this.mainColor,
            column:"right"
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
    async showName() {
        this.name(this.cvInfo.name, {column:"right",
            textSize: 32,
            textColor: this.mainColor,
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {column:"right",
            textColor: this.textColor,uppercase:true
        });
        this.addYOffset("right", 10);
    }

    async showIntroduction() {
        await this.introduction(this.cvInfo.introduction, {
            center: false,
            column: "right"
        });
    }

    async showEducation() {
        await this.educationBlock({
            column: "right",uppercase:true,
        });
    }

    async showWorkExp() {
        await this.workExpBlock({
            column: "right",uppercase:true,
        });
    }
    async showSkills() {
        await this.skillsBlock({
            uppercase: true
        });
    }

    async showAward() {
        await this.awardsBlock({
            uppercase: true
        });
    }

    async showReference() {
        await this.referencesBlock({
            uppercase: true
        });
    }

    async showHobby() {
        await this.hobbyBlock({
            uppercase: true
        });
    }
    async showContactInfo() {
        let column = "left";
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
    async showLeftColumn() {
        await this.showContactInfo();
        await this.showSkills();
        await this.showReference();
    }

    async showRightColumn() {
        this.addYOffset("right",10);
        await this.showAvatar();
        this.addYOffset("right",10);
        await this.showName();
        await this.showTitle();
        await this.showIntroduction();
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin+this.leftWidth, this.rightY, this.pageWidth - this.margin, this.rightY);
        this.addYOffset("right",10);
        await this.showAward();
        await this.showHobby();
        await this.showWorkExp();
        await this.showEducation();
    }
}